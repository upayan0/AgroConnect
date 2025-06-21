from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import uvicorn
import json
import os
import base64
import io 
from PIL import Image
import numpy as np
import tensorflow as tf
from tensorflow import keras
import requests
import tempfile
from contextlib import asynccontextmanager
import gdown

DRIVE_MODEL_ID = "1HM2Q94tejdA7cPAAF-5N2aYNoKE_ZEik"
DRIVE_MODEL_URL = f"https://drive.google.com/uc?id={DRIVE_MODEL_ID}"

# Local path to save the downloaded model
MODEL_PATH = "PDDS.keras"
# CLASS_NAMES_PATH = "class_names.txt"

# Download the model from Google Drive if not present
if not os.path.exists(MODEL_PATH):
    print(f"Model not found locally. Downloading from Google Drive: {DRIVE_MODEL_URL}")
    gdown.download(DRIVE_MODEL_URL, MODEL_PATH, quiet=False)

# Load the model
try:
    model = tf.keras.models.load_model(MODEL_PATH)
except Exception as e:
    raise RuntimeError(f"Failed to load model from {MODEL_PATH}: {e}")

# Load class names
if os.path.exists("class_names.txt"):
    with open("class_names.txt", "r") as f:
        class_names = [line.strip() for line in f.readlines()]
else:
    print("Error: class_names.txt file not found.")

# Create FastAPI app
app = FastAPI(title="Plant Disease Detection API")

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Preprocess image function
def preprocess_image(img):
    img = img.resize((224, 224))
    img_array = tf.keras.preprocessing.image.img_to_array(img)
    img_array = np.expand_dims(img_array, axis=0)
    img_array = img_array / 255.0
    return img_array




# FastAPI endpoint for testing root
@app.get("/")
async def root():
    return {"message": "Welcome to the Plant Disease Detection API!"}

# FastAPI endpoint for prediction
@app.post("/predict/")
async def predict(file: UploadFile = File(...)):
    # Read and convert the file to PIL Image
    contents = await file.read()
    img = Image.open(io.BytesIO(contents)).convert("RGB")

    # Preprocess the image
    processed_img = preprocess_image(img)

    # Make prediction
    predictions = model.predict(processed_img)
    predicted_class_idx = np.argmax(predictions[0])
    predicted_class = class_names[predicted_class_idx]
    confidence = float(predictions[0][predicted_class_idx])

    # Return prediction
    return {
        "predicted_class": predicted_class,
        "confidence": confidence,
        "class_names": class_names,
        "probabilities": predictions[0].tolist()
    }

if __name__ == "__main__":
    
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)