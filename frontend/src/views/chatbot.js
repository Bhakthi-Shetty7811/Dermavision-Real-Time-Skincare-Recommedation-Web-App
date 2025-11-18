import React, { useState, useEffect } from "react";
import "./Chatbot.css";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [robotVisible, setRobotVisible] = useState(false);
  const [chat, setChat] = useState([]); // Stores chat history
  const [message, setMessage] = useState(""); // Stores user input
  const [loading, setLoading] = useState(false); // Tracks bot response status

  useEffect(() => {
    // Make the robot appear and disappear repeatedly
    const interval = setInterval(() => {
      setRobotVisible(true);
      setTimeout(() => setRobotVisible(false), 2000); // Robot peeps for 2 seconds
    }, 5000); // Repeats every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const toggleChat = () => setIsOpen(!isOpen);

  // Function to format bot response (adds line breaks & basic formatting)
  const formatResponse = (text) => {
    if (!text) return "";
    
    // Replace newline characters with actual line breaks
    return text
      .replace(/\*\*(.*?)\*\*/g, "<b>$1</b>") // Bold: **text**
      .replace(/\*(.*?)\*/g, "<i>$1</i>") // Italics: *text*
      .replace(/\n/g, "<br />"); // Line breaks
  };

  // Function to send message & fetch API response
  const sendMessage = async () => {
    if (!message.trim()) return;

    setLoading(true);
    const userMessage = message;
    setMessage(""); // Clear input before sending

    try {
      const response = await fetch("http://localhost:5000/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch response");
      }

      const data = await response.json();
      const botResponse = formatResponse(data.reply || "I'm not sure how to respond to that.");

      // Update chat history
      setChat((prevChat) => [...prevChat, { user: userMessage, bot: botResponse }]);
    } catch (error) {
      console.error("Chatbot Error:", error);
      setChat((prevChat) => [...prevChat, { user: userMessage, bot: "Sorry, something went wrong. Please try again later!" }]);
    }

    setLoading(false);
  };

  return (
    <div className="chatbot-container">
      {!isOpen && (
        <div className="chatbot-icon" onClick={toggleChat}>
          🤖
          {robotVisible && (
            <div className="robot">
              <span className="robot-text">Hi!</span>
            </div>
          )}
        </div>
      )}
      
      {isOpen && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <h3>Dermavision Chatbot</h3>
            <button className="close-btn" onClick={toggleChat}>✖</button>
          </div>
          <div className="chatbot-messages">
            <p className="chatbot-greeting">Hello! How can I assist you today? 😊</p>
            {chat.map((c, i) => (
              <div key={i} className="chat-message">
                <p><strong>You:</strong> {c.user}</p>
                <p><strong>Bot:</strong> <span dangerouslySetInnerHTML={{ __html: c.bot }} /></p>
              </div>
            ))}
          </div>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Ask something..."
            className="chatbot-input"
            style={{ borderColor: "#ff6f61" }}
          />
          <button onClick={sendMessage} disabled={loading} className="chatbot-button" style={{ backgroundColor: "#ff6f61" }}>
            {loading ? "Thinking..." : "Send"}
          </button>
        </div>
      )}
    </div>
  );
};

export default Chatbot;