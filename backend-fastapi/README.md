# AgroConnect FastAPI Backend

This is the FastAPI backend for the AgroConnect plant disease prediction system.

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
- `POST /predict` - Predict disease from base64 encoded image
- `POST /predict-file` - Predict disease from uploaded file

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

Once the server is running, you can access:
- Interactive API docs: `http://localhost:8000/docs`
- ReDoc documentation: `http://localhost:8000/redoc`

## Usage Examples

### Predict from Base64 Image
```python
import requests
import base64

# Read and encode image
with open("plant_image.jpg", "rb") as f:
    image_data = base64.b64encode(f.read()).decode()

response = requests.post("http://localhost:8000/predict", json={
    "image_data": image_data,
    "crop_type": "Tomato"
})

print(response.json())
```

### Predict from File Upload
```python
import requests

with open("plant_image.jpg", "rb") as f:
    files = {"file": f}
    data = {"crop_type": "Tomato"}
    response = requests.post("http://localhost:8000/predict-file", files=files, data=data)

print(response.json())
```

## Development

The current implementation uses a mock prediction function. In a production environment, you would replace the `predict_disease` function with actual machine learning model inference.

## Note

This is a demonstration API. The disease prediction is currently mocked and returns sample data from the diseases database.
