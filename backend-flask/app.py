from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import io
import base64
import numpy as np
import tensorflow as tf
from tensorflow import keras
from PIL import Image
import gdown

# Tell TF not to even look for GPUs
os.environ["CUDA_VISIBLE_DEVICES"] = "-1"
# (Optional) also mute INFO logs:
os.environ["TF_CPP_MIN_LOG_LEVEL"] = "1"

DRIVE_MODEL_ID = "1HM2Q94tejdA7cPAAF-5N2aYNoKE_ZEik"
DRIVE_MODEL_URL = f"https://drive.google.com/uc?id={DRIVE_MODEL_ID}"

# Local path to save the downloaded model
MODEL_PATH = "PDDS.keras"

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
    class_names = []

# Flask app
app = Flask(__name__)
CORS(app)  # allow all origins


# Preprocess image function
def preprocess_image(img):
    img = img.resize((224, 224))
    img_array = tf.keras.preprocessing.image.img_to_array(img)
    img_array = np.expand_dims(img_array, axis=0)
    img_array = img_array / 255.0
    return img_array

# Root endpoint
@app.route("/", methods=["GET"])
def root():
    return jsonify({"message": "Welcome to the Plant Disease Detection API!"})

# Prediction endpoint
@app.route("/predict", methods=["POST"])
def predict():
    if "file" not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files["file"]
    img = Image.open(io.BytesIO(file.read())).convert("RGB")

    # Preprocess the image
    processed_img = preprocess_image(img)

    # Make prediction
    predictions = model.predict(processed_img)
    predicted_class_idx = np.argmax(predictions[0])
    predicted_class = class_names[predicted_class_idx] if class_names else str(predicted_class_idx)
    confidence = float(predictions[0][predicted_class_idx])

    return jsonify({
        "predicted_class": predicted_class,
        "confidence": confidence,
        "class_names": class_names,
        "probabilities": predictions[0].tolist()
    })

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000, debug=True)

