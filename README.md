# **Dermavision - AI Powered Real-Time Skincare Analysis, Recommendations & AR Visualization**

Dermavision is a full-stack skincare intelligence system that uses **computer vision, deep learning, AR overlays, allergy-safe product recommendations, community discussions, and an AI assistant** to help users understand and improve their skin.

---

# 📌 Table of Contents

* [Overview](#-overview)
* [Features](#-features)
* [Project Structure](#-project-structure)
* [Workflow](#-workflow)
* [Additional Resources](#-aditional-resources)
---

# 🔍 Overview

Dermavision provides **real-time skin analysis**, **acne & tone detection**, **skin disease alerts**, **allergy-safe product recommendations**, **AR-based previews**, and a **community-driven platform** for skincare discussions.

The system blends:

* Deep learning (EfficientNetB0 & EfficientNetV2S)
* Clustering (YCbCr + HSV + K-means)
* AR visualization
* Semantic search + AI chatbot
* Community Q/A features

---

# ✨ Features

### **1. AR-Based Product Visualization**

* Real-time webcam filters for skin-tone correction, acne reduction, and glow effects.
* Uses facial landmarks (eyes, cheeks, lips, forehead) to anchor filters accurately.

### **2. Signup & Login Authentication**

* Secure JWT-based authentication.
* Stores user preferences, allergies, and analysis history.

### **3. Allergen Flagging**

* Users enter allergy/sensitivity info.
* System scans every product’s ingredients.
* Shows red warnings for unsafe items.

### **4. AI Chatbot Assistance**

* Hybrid Retrieval + Generative model.
* Helps with:

  * Skincare routines
  * Ingredient explanations
  * Acne/scar queries
  * Product suitability

### **5. Community Forum**

* Users can:

  * Ask skincare questions
  * Answer others
  * Upvote helpful responses
* Builds an active skincare community.

### **6. DIY Remedies / Quick Fixes**

* Home-based remedies with safe methods and warnings.
* Good for users who prefer natural care options.

### **7. Skin Disease Detection**

* EfficientNetV2S trained on HAM10000 dataset.
* Identifies 7 types of skin lesions.
* Accuracy ~87.67% (NOT a medical diagnosis).

---

# 📂 Project Structure

```
/frontend/                 → React.js UI (webcam, AR filters, results UI)
/backend/                  → Node.js API backend
/models/                   → CNN models + clustering scripts
/images/                   → Sample test images
/my-app/                   → Experimental / additional frontend
requirements.txt           → Python dependency list
backend.code-workspace     → VS Code workspace configuration
README.md                  → Project documentation
```

---

# 🔄 Workflow (Detailed)

Dermavision follows an end-to-end intelligent processing pipeline:

---

## **1. User Opens the WebApp**

* React.js frontend loads.
* User chooses:

  * **Webcam (AR mode)**
  * **Image Upload mode**

Image sent to backend for processing.

---

## **2. Face Detection**

Using **face-api.js**:

* Detects face bounding box
* Extracts 68+ facial landmarks
* Removes background
* Prepares regions for AR overlays

---

## **3. Image Quality Check**

Using OpenCV:

* **Blur detection** → Laplacian variance
* **Brightness/exposure** → histogram check
* **Face completeness** → landmark confidence

If poor quality → user is asked to retake the photo.

---

## **4. Skin Pixel Extraction**

### **4.1 Otsu’s Thresholding**

Automatically finds threshold to separate skin vs non-skin.

Adjusted final threshold:

```
T_final = (T_max + T_otsu) / 2
```

### **4.2 YCbCr + HSV Color Filtering**

Lighting-stable filtering:

* H ≤ 170
* 140 ≤ Cr ≤ 170
* 90 ≤ Cb ≤ 120

Produces a clean skin mask.

### **4.3 K-Means Clustering**

Refines skin region further:

* Removes noise
* Corrects highlights/shadows
* Eliminates background leaks

---

## **5. Deep Learning Classification (EfficientNetB0)**

Model outputs:

* **Skin Type** → Oily / Dry / Normal 
* **Acne Severity** → Mild, Moderate, Severe

Process:

* CNN extracts features
* Softmax gives probabilities
* Cross-entropy used for training

---

## **6. Skin Tone Detection**

Two-step approach:

1. Convert to **YCbCr + HSV**
2. Cluster with **K-Means**
3. Map to **Fitzpatrick scale** via **KNN**

Outputs ⚡:

* Tone group
* SPF + product recommendations

---

## **7. Product Recommendation Engine**

Uses **cosine similarity**:

```
similarity = A • B / |A||B|
```

Match based on:

* Skin type
* Acne severity
* Skin tone
* Ingredient safety (allergen filter)
* User preferences

---

## **8. Skin Disease Detection**

* EfficientNetV2S
* Dataset: HAM10000
* Accuracy: ~87.67%
* Detects (e.g., melanoma, keratosis, benign lesions)
* Provides **warning**, not diagnosis.

---

## **9. AI Chatbot**

* Retrieval-based → quick facts
* Generative → personalized advice
* Handles:

  * Acne causes
  * Ingredient side effects
  * Routine suggestions
  * Product comparisons

---

## **10. Community Features**

Users can:

* Post questions
* Reply
* Upvote
* Learn from each other

---

## **11. DIY Home Remedies**

Provides:

* Step-by-step remedies
* What to avoid
* Patch test instructions

---

# 📁 Additional Resources

All project documents, research materials and demo videos are available in the following folder:

🔗 Google Drive
👉 https://drive.google.com/drive/folders/11Tnux4npTKoD8SfUP40pURmyqO0Aogh9
