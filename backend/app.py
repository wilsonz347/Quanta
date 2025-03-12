from flask import Flask, request, jsonify
from flask_cors import CORS
import sys
import os
import torch
from transformers import AutoTokenizer, AutoModelForCausalLM, pipeline
import re

backend_dir = os.path.abspath(os.path.dirname(__file__))
sys.path.append(backend_dir)

from models.medical_chain import get_response, initialize_components
from utils.error_handler import ChatbotError, handle_error

app = Flask(__name__)
CORS(app)  

app.register_error_handler(ChatbotError, handle_error)

# Global variables
direct_tokenizer = None
direct_model = None
direct_generator = None

# Utilize the direct hugging face model (fallback)
def initialize_direct_model():
    global direct_tokenizer, direct_model, direct_generator
    
    if direct_tokenizer is None or direct_model is None or direct_generator is None:
        try:
            direct_tokenizer = AutoTokenizer.from_pretrained(
                "medalpaca/medalpaca-7b", 
                use_fast=False
            )
            
            direct_model = AutoModelForCausalLM.from_pretrained(
                "medalpaca/medalpaca-7b", 
                device_map="auto",
                torch_dtype=torch.float16
            )
            
            direct_generator = pipeline(
                "text-generation", 
                model=direct_model, 
                tokenizer=direct_tokenizer, 
                max_new_tokens=256,
                temperature=0.1,
                repetition_penalty=1.2,
                no_repeat_ngram_size=3,
                top_p=0.92,
            )
            
            return True
        except Exception as e:
            print(f"Error initializing direct model: {str(e)}")
            return False
    return True


# Preprocess response from the direct model
def preprocess_direct_response(raw_response, original_query):
    if raw_response.startswith(original_query):
        answer = raw_response[len(original_query):].strip()
    else:
        answer = raw_response
    
    lines = answer.split('\n')
    unique_lines = []
    for line in lines:
        line = line.strip()
        if line and line not in unique_lines:
            unique_lines.append(line)
    
    clean_response = '\n'.join(unique_lines)
    
    clean_response = re.sub(r'Human:.*', '', clean_response)
    clean_response = re.sub(r'Assistant:.*', '', clean_response)
    
    return clean_response.strip()


# Get direct response from the raw model
def get_direct_response(question):
    try:
        if not initialize_direct_model():
            return "Failed to initialize direct model components."
        
        prompt = f"{question}"
        
        # Generate response
        raw_result = direct_generator(prompt)
        generated_text = raw_result[0]['generated_text']
        
        # Preprocess the response
        clean_response = preprocess_direct_response(generated_text, prompt)
        
        return clean_response
    except Exception as e:
        print(f"Error in direct model response: {str(e)}")
        return f"Error generating direct response: {str(e)}"
    

# Endpoint for getting chatbot response 
@app.route('/api/chat', methods=['POST'])
def chat():
    try:
        data = request.get_json()
        
        if not data or 'message' not in data:
            raise ChatbotError("No message provided", 400)
        
        user_message = data['message']
        response_source = 'RAG'
        
        try: 
            response = get_response(user_message)
        except Exception as RAG_error:
            print(f"Error with RAG: {str(RAG_error)}.")
            response = get_direct_response(user_message)
            response_source = "direct"
        
        return jsonify({
            "response": response,
            "source": response_source,
            "status": "success"
        }), 200
    
    except Exception as e:
        if isinstance(e, ChatbotError):
            raise e
        else:
            raise ChatbotError(f"An error occurred: {str(e)}")


# Initialize the vector store, LLM pipeline, and QA chain
@app.route('/api/initialize', methods=['POST'])
def initialize():
    try:
        initialize_components()
        return jsonify({"status": "success", "message": "Components initialized successfully"}), 200
    
    except Exception as e:
        raise ChatbotError(f"Failed to initialize components: {str(e)}")


# Check if server is running
@app.route('/', methods=['GET', 'POST'])
def home():
    return jsonify({"status": "ok", "message": "Server is running"}), 200


if __name__ == '__main__':
    try:
        initialize_components()
    except Exception as e:
        print(f"Error initializing components: {e}")
    
    app.run(port=5000, debug=True)