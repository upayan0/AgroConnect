# AgroConnect Flask Backend

This is the Flask backend for the AgroConnect plant disease prediction system.

## Features

- Plant disease prediction from images
- RESTful API endpoints
- CORS support for frontend integration
- Disease database management
- Treatment and fertilizer recommendations

## API Endpoints

### Core Endpoints
- `GET /` - Root endpoint with API information
- `GET /health` - Health check endpoint
- `GET /diseases` - Get all diseases in database
- `GET /diseases/{disease_id}` - Get specific disease information
- `GET /crops` - Get available crop types

### Prediction Endpoints
- `POST /predict/` - Predict disease from uploaded file

## Installation

1. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Run the server:
```bash
python app.py
```

The API will be available at `http://localhost:8000`

## API Documentation

Once the server is running, you can access the API at `http://localhost:8000`. Since this is now a Flask application, automatic API documentation is not included by default (unlike FastAPI), but you can test the endpoints using tools like Postman or curl.

## Usage Examples

### Predict from File Upload
```python
import requests

with open("plant_image.jpg", "rb") as f:
    files = {"file": f}
    response = requests.post("http://localhost:8000/predict/", files=files)

print(response.json())
```

## Development

The current implementation uses a TensorFlow/Keras model for plant disease prediction. The model is automatically downloaded from Google Drive if not present locally.
