import os
from dotenv import load_dotenv
from transformers import AutoTokenizer, AutoModelForCausalLM

load_dotenv()

class Config:
    BACKEND_DIR = os.path.abspath(os.path.dirname(os.path.dirname(__file__)))
    TOKENIZER = AutoTokenizer.from_pretrained("distilbert/distilgpt2") # Change this tokenizer
    MODEL = AutoModelForCausalLM.from_pretrained("distilbert/distilgpt2",) # Change this model
    TEMPERATURE = float(os.getenv('TEMPERATURE', 0.3))
    MAX_TOKENS = int(os.getenv('MAX_TOKENS', 1024))
    CONTEXT_WINDOW = int(os.getenv('CONTEXT_WINDOW', 2048))
    VECTOR_STORE_PATH = os.path.join(BACKEND_DIR, 'data', 'vector_store')