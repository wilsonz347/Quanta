import os
from dotenv import load_dotenv
from transformers import AutoTokenizer, AutoModelForMaskedLM

load_dotenv()

class Config:
    MODEL = AutoModelForMaskedLM.from_pretrained("medicalai/ClinicalBERT")
    TOKENIZER = AutoTokenizer.from_pretrained("medicalai/ClinicalBERT")
    TEMPERATURE = float(os.getenv('TEMPERATURE', 0.7))
    MAX_TOKENS = int(os.getenv('MAX_TOKENS', 512))
    CONTEXT_WINDOW = int(os.getenv('CONTEXT_WINDOW', 2048))
    VECTOR_STORE_PATH = os.getenv('VECTOR_STORE_PATH', '../data/vector_store')