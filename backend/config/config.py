import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    MODEL_PATH = os.getenv('MODEL_PATH', '../models/llama2_model.gguf')
    TEMPERATURE = float(os.getenv('TEMPERATURE', 0.7))
    MAX_TOKENS = int(os.getenv('MAX_TOKENS', 512))
    CONTEXT_WINDOW = int(os.getenv('CONTEXT_WINDOW', 2048))
    VECTOR_STORE_PATH = os.getenv('VECTOR_STORE_PATH', '../data/vector_store')