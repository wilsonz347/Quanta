import requests
from bs4 import BeautifulSoup
import json
import os
import re
from urllib.parse import urlparse
import html

def clean_text(text):
    """Clean the text by handling Unicode escape sequences and other issues."""
    text = text.replace('\u00a0', ' ')
    text = text.replace('\u201c', '"').replace('\u201d', '"')
    text = text.replace('\u2019', "'")
    text = html.unescape(text)
    text = text.replace('\n', ' ')
    text = re.sub(r'\s+', ' ', text)
    
    return text.strip()


def extract_disease_name(url):
    """Extract the disease name from the URL path."""
    path = urlparse(url).path
    disease = path.rstrip('/').split('/')[-1]
    return disease


def scrape_disease_info(url):
    """Scrape disease information from the specified URL and append it to a JSON file"""
    # Extract the disease name as the key
    key_name = extract_disease_name(url)
    
    file_path = "../data/medical_kb/disease_data.json"
    data = {}
    
    if os.path.exists(file_path):
        with open(file_path, 'r', encoding='utf-8') as file:
            try:
                data = json.load(file)
            except json.JSONDecodeError:
                data = {}
    
    # Check if key already exists
    if key_name in data:
        print(f"Key '{key_name}' already exists in the data file. Skipping.")
        return
    
    try:
        response = requests.get(url)
        response.raise_for_status()
    except requests.exceptions.RequestException as e:
        print(f"Error fetching URL: {e}")
        return
    
    soup = BeautifulSoup(response.text, 'html.parser')
    
    try:
        text_editors = soup.select('.elementor-widget-text-editor .elementor-widget-container')
        
        if not text_editors:
            print(f"Could not find any text content for {key_name}.")
            return
        
        content = ""
        for editor in text_editors:
            paragraphs = editor.find_all('p')
            if paragraphs:
                content = " ".join([p.get_text() for p in paragraphs])
                if content.strip():  
                    break
        
        if not content.strip():
            print(f"No paragraph content found for {key_name}.")
            return
            
        cleaned_content = clean_text(content)
        
        data[key_name] = cleaned_content
        
        # Save the updated data 
        with open(file_path, 'w', encoding='utf-8') as file:
            json.dump(data, file, indent=4, ensure_ascii=False)
            
        print(f"Successfully scraped and saved content for '{key_name}'")
        
    except Exception as e:
        print(f"Error parsing HTML for {key_name}: {e}")
        import traceback
        traceback.print_exc()


if __name__ == "__main__":
    # List of disease URLs to scrape
    disease_urls = [
        "https://www.lji.org/diseases/allergies/", "https://www.lji.org/diseases/alzheimers-disease/", 
        "https://www.lji.org/diseases/asthma/", "https://www.lji.org/diseases/atopic-dermatitis-eczema/",
        "https://www.lji.org/diseases/autoimmune-disease/", "https://www.lji.org/diseases/cancer-immunotherapy/", 
        "https://www.lji.org/diseases/chikungunya/", "https://www.lji.org/diseases/cmv/", "https://www.lji.org/diseases/covid-19/",
        "https://www.lji.org/diseases/dengue/", "https://www.lji.org/diseases/ebola/", "https://www.lji.org/diseases/epstein-barr-virus/",
        "https://www.lji.org/diseases/fibrosis/", "https://www.lji.org/diseases/food-allergies/", "https://www.lji.org/diseases/atherosclerosis/", "https://www.lji.org/diseases/hiv-vaccine/", "https://www.lji.org/diseases/inflammatory-bowel-disease/", 
        "https://www.lji.org/diseases/japanese-encephalitis/", "https://www.lji.org/diseases/lassa-fever/", 
        "https://www.lji.org/diseases/lung-cancer/", "https://www.lji.org/diseases/measles/", "https://www.lji.org/diseases/mpox/",
        "https://www.lji.org/diseases/nipah/", "https://www.lji.org/diseases/parkinsons-disease/", 
        "https://www.lji.org/diseases/powassan-virus/", "https://www.lji.org/diseases/seasonal-allergies/",
        "https://www.lji.org/diseases/strep-throat/", "https://www.lji.org/diseases/tuberculosis/", "https://www.lji.org/diseases/type-1-diabetes/", "https://www.lji.org/diseases/vasculitis/", "https://www.lji.org/diseases/whooping-cough/",
        "https://www.lji.org/diseases/yellow-fever/", "https://www.lji.org/diseases/zika/",
    ]
    
    for url in disease_urls:
        print(f"Processing: {url}")
        scrape_disease_info(url)