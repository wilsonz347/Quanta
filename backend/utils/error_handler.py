from flask import jsonify

class ChatbotError(Exception):
    def __init__(self, message, status_code=500):
        self.message = message
        self.status_code = status_code

def handle_error(error):
    response = {
        'error': str(error.message),
        'status': error.status_code
    }
    return jsonify(response), error.status_code