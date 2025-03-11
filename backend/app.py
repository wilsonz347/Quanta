from flask import Flask, request, jsonify
from flask_cors import CORS
import sys
import os

backend_dir = os.path.abspath(os.path.dirname(__file__))
sys.path.append(backend_dir)

from models.medical_chain import get_response, initialize_components
from utils.error_handler import ChatbotError, handle_error

app = Flask(__name__)
CORS(app)  

app.register_error_handler(ChatbotError, handle_error)

# Check if server is running
@app.route('/', methods=['GET', 'POST'])
def home():
    return jsonify({"status": "ok", "message": "Server is running"}), 200


# Endpoint for getting chatbot response
@app.route('/api/chat', methods=['POST'])
def chat():
    try:
        data = request.get_json()
        
        if not data or 'message' not in data:
            raise ChatbotError("No message provided", 400)
        
        user_message = data['message']
        
        response = get_response(user_message)
        
        return jsonify({
            "response": response,
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


if __name__ == '__main__':
    try:
        initialize_components()
    except Exception as e:
        print(f"Error initializing components: {e}")
    
    app.run(host='0.0.0.0', port=5000, debug=True)