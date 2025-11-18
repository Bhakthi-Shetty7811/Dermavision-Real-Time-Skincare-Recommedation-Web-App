const express = require("express");
const multer = require("multer");
require("dotenv").config();
const axios = require("axios");

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

// Temporary user database (replace with actual DB in production)
const users = {};

router.post("/", upload.single("image"), async (req, res) => {
    const userId = req.body.userId || "guest"; // Identify user
    const userMessage = req.body.message;
    const userImage = req.file;
    let responseText = "Sorry, I couldn't process that.";

    // Ensure user profile exists
    if (!users[userId]) {
        users[userId] = { skinType: null, history: [] };
    }

    // Process Text Message using Together AI
    if (userMessage) {
        users[userId].history.push(userMessage);
        try {
            const response = await axios.post(
                "https://api.together.xyz/v1/chat/completions",
                {
                    model: "meta-llama/Llama-3.3-70B-Instruct-Turbo-Free",
                    messages: [
                        { role: "system", content: `You are a skincare expert. The user has a ${users[userId].skinType || "unknown"} skin type.` },
                        { role: "user", content: userMessage },
                    ],
                },
                {
                    headers: {
                        "Authorization": `Bearer ${process.env.TOGETHER_API_KEY}`,
                        "Content-Type": "application/json",
                    },
                }
            );
            responseText = response.data.choices[0].message.content;
        } catch (error) {
            console.error("Together AI Error:", error.response ? error.response.data : error.message);
            responseText = "Error processing your request. Please try again later.";
        }
    }

    // Process Image for Skin Tone Analysis via Python API
    if (userImage) {
        try {
            const skinResponse = await axios.post(
                "http://127.0.0.1:5001/analyze_skin", // Call Python API
                userImage.buffer,
                {
                    headers: { "Content-Type": "application/octet-stream" },
                }
            );

            const skinType = skinResponse.data.skin_tone;
            users[userId].skinType = skinType;

            // Call Recommender API
            const recResponse = await axios.post(
                "http://127.0.0.1:5002/recommend_products", // Call Python API
                { skin_type: skinType },
                { headers: { "Content-Type": "application/json" } }
            );

            const recommendedProducts = recResponse.data.recommended_products;

            responseText = `Your detected skin type is ${skinType}. Based on this, here are some recommended products: \n`;
            responseText += recommendedProducts.join("\n");
        } catch (error) {
            console.error("Skin Analysis Error:", error.message);
            responseText = "Error analyzing image or recommending products. Please try again later.";
        }
    }

    res.json({ reply: responseText, userProfile: users[userId] });
});

module.exports = router;
