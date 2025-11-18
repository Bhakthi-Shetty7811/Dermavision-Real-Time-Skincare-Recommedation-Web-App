require("dotenv").config();
console.log("Loaded API Key:", process.env.TOGETHER_API_KEY);

const express = require("express");
const cors = require("cors");
const chatbotRoutes = require("./chatbotRoutes");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/chatbot", chatbotRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

