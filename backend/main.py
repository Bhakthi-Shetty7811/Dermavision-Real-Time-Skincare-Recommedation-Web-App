# backend/main.py
from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from PIL import Image
import io
from fastapi import FastAPI, File, UploadFile, Form
from fastapi.responses import Response
import cv2
import numpy as np
import mediapipe as mp

from effects import foundation, primer, concealer, cleanser, moisturizers, maskandpeel, eyecream

app = FastAPI()

# Allow CORS (important for frontend to access)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/apply_effect/")
async def apply_effect(effect: str = Form(...), file: UploadFile = File(...)):
    image = Image.open(io.BytesIO(await file.read()))

    if effect == 'Foundation':
        processed = foundation.apply(image)
    elif effect == 'Primer':
        processed = primer.apply(image)
    elif effect == 'Concealer':
        processed = concealer.apply(image)
    elif effect == 'Cleanser':
        processed = cleanser.apply(image)
    elif effect == 'Face-Moisturizers':
        processed = moisturizers.apply(image)
    elif effect == 'Mask and Peel':
        processed = maskandpeel.apply(image)
    elif effect == 'Eyecream':
        processed = eyecream.apply(image)   
    else:
        return {"error": "Invalid effect name"}

    # Convert to Bytes and return
    buf = io.BytesIO()
    processed.save(buf, format="PNG")
    buf.seek(0)
    return StreamingResponse(buf, media_type="image/png")



