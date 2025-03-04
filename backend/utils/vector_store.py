import json
import os
from langchain_community.vectorstores import FAISS
from langchain_huggingface import HuggingFaceEmbeddings
from langchain.schema import Document
import sys

backend_dir = os.path.abspath(os.path.dirname(os.path.dirname(__file__)))
sys.path.append(backend_dir)

from config.config import Config


def load_medical_data(file_path):
    with open(file_path, 'r', encoding='utf-8') as file:
        data = json.load(file)
    return data


def create_documents_from_data(data):
    documents = []
    for disease_name, description in data.items():
        # Create a document with the disease name and description
        doc = Document(
            page_content=f"Disease: {disease_name}\n\nInformation: {description}",
            metadata={"disease": disease_name}
        )
        documents.append(doc)
    return documents


def initialize_vector():
    # Knowledge base and vector store paths
    kb_path = os.path.join(backend_dir, 'data', 'medical_kb', 'disease_data.json')
    vector_store_path = os.path.join(backend_dir, 'data', 'vector_store')
    
    # Check if the vector store already exists
    if os.path.exists(os.path.join(vector_store_path, 'index.faiss')):
        embeddings = HuggingFaceEmbeddings(model_name="pritamdeka/S-PubMedBert-MS-MARCO")
        vector_store = FAISS.load_local(vector_store_path, embeddings)
        return vector_store
    
    medical_data = load_medical_data(kb_path)
    medical_doc = create_documents_from_data(medical_data)
    
    hf_embedding = HuggingFaceEmbeddings(model_name="pritamdeka/S-PubMedBert-MS-MARCO")
    
    # Initialize FAISS vector store and populates with embedded docs 
    vector_store = FAISS.from_documents(medical_doc, hf_embedding)
    
    os.makedirs(Config.VECTOR_STORE_PATH, exist_ok=True)
    vector_store.save_local(Config.VECTOR_STORE_PATH)
    
    return vector_store


if __name__ == "__main__":
    initialize_vector()