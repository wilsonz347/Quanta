import os
from langchain_huggingface import HuggingFaceEmbeddings, HuggingFacePipeline
from langchain_community.vectorstores import FAISS
from langchain.chains import RetrievalQA
from transformers import pipeline
import sys

backend_dir = os.path.abspath(os.path.dirname(os.path.dirname(__file__)))
sys.path.append(backend_dir)

from config.config import Config
from models.prompt_templates import prompt

# Global variables 
vector_store = None
llm_pipeline = None
qa_chain = None


def initialize_components():
    # Initialize the vector store, LLM pipeline, and QA chain.
    global vector_store, llm_pipeline, qa_chain
    
    if vector_store is None:
        vector_store_path = Config.VECTOR_STORE_PATH
        index_file = os.path.join(vector_store_path, "index.faiss")
        
        if not os.path.exists(index_file):
            raise ValueError("FAISS index file not found. Please run the indexing script first.")
    
        vector_store = FAISS.load_local(
            vector_store_path, 
            HuggingFaceEmbeddings(model_name="pritamdeka/S-PubMedBert-MS-MARCO"), 
            allow_dangerous_deserialization=True
        )
        print("Vector store initialized.")
    
    if llm_pipeline is None:
        generator = pipeline(
            "text-generation", 
            model=Config.MODEL, 
            tokenizer=Config.TOKENIZER, 
            truncation=True, 
            max_length=Config.MAX_TOKENS,
            temperature=Config.TEMPERATURE, 
            do_sample=True,
            repetition_penalty=1.2,  
            no_repeat_ngram_size=3,
            top_p=0.92,
            pad_token_id=Config.TOKENIZER.eos_token_id,
            eos_token_id=Config.TOKENIZER.eos_token_id,
        )
        llm_pipeline = HuggingFacePipeline(pipeline=generator)
        print("LLM pipeline initialized.")
    
    if qa_chain is None:
        qa_chain = RetrievalQA.from_chain_type(
            llm=llm_pipeline,
            chain_type="stuff", 
            retriever=vector_store.as_retriever(search_kwargs={"k": 3}),
            chain_type_kwargs={"prompt": prompt},
            return_source_documents=True,
        )
        print("QA chain initialized.")
    
    return qa_chain


# Response function
def get_response(question):
    # Generate a response to the user's question using the QA chain.
    try:
        qa_chain = initialize_components()
        response = qa_chain.invoke({"query": question})
        
        if isinstance(response, dict):
            answer = response.get("result", "")
            return answer
        else:
            return str(response)
    except Exception as e:
        print(f"Error generating response: {e}")


if __name__ == "__main__":
    initialize_components()
    
    user_question = "What are the symptoms of allergies?"
    response = get_response(user_question)
    print("Response:", response)