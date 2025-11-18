from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import tensorflow as tf
from tensorflow.keras.models import load_model
import numpy as np
from PIL import Image
import io
import os

app = FastAPI()

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For production: replace with specific domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load model
model_path = os.path.join("C:\\Users\\BHAKTHI\\Downloads\\dermavision-project-main\\dermavision-project-main\\backend\\models\\skin_disease\\model_skin_disease_tf.keras")
try:
    model = load_model(model_path)
except Exception as e:
    raise RuntimeError(f"Failed to load model: {e}")

# Class label map
class_label_map = {
    0: "Actinic keratoses and intraepithelial carcinoma / Bowen's disease (AKIEC)",
    1: "Basal cell carcinoma (BCC)",
    2: "Benign keratosis-like lesions (BKL)",
    3: "Dermatofibroma (DF)",
    4: "Melanoma (MEL)",
    5: "Melanocytic nevi (NV)",
    6: "Vascular lesions (VASC)"
}

# Prediction endpoint
@app.post("/predict/")
async def predict(file: UploadFile = File(...)):
    if not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="Invalid file type. Please upload an image.")

    try:
        contents = await file.read()
        image = Image.open(io.BytesIO(contents)).resize((224, 224)).convert("RGB")
        img_array = np.expand_dims(np.array(image) / 255.0, axis=0)

        prediction = model.predict(img_array)
        predicted_class = int(np.argmax(prediction))
        confidence = float(np.max(prediction))

        return {
            "disease": class_label_map.get(predicted_class, "Unknown"),
            "confidence": round(confidence, 4)
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction failed: {str(e)}")
