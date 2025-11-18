import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { auth } from "../firebaseconfiguration";
import { FaUserCircle } from "react-icons/fa";
import { FaUser, FaLeaf } from "react-icons/fa";
import logo from "../assets/logo(3).png"
import "./Homepage.css";
import "./Auth.css";

const Homepage = () => {
  const [isSticky, setIsSticky] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // Sticky Navbar Effect
  const handleScroll = () => {
    if (window.scrollY > 100) {
      setIsSticky(true);
    } else {
      setIsSticky(false);
    }
  };

  // Add scroll event listener on component mount
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="homepage">
      {/* Navigation Bar */}

      <nav className={`navbar ${isSticky ? "navbar-sticky" : ""}`}>
      <button className="menu-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
  &#9776;
</button>
        <div className="container">
        <div className="logo">
  <img src={logo} alt="Dermavision Logo" className="logo-image" />
  <span className="logo-text">Dermavision</span>
</div>
          <ul className={`nav-links ${isMenuOpen ? "active" : ""}`}>
            <li><a href="#about">About</a></li>
            <li><a href="#features">Features</a></li>
            <li><a href="#how-it-works">How It Works</a></li>
            <li><a href="#faq">FAQ</a></li>
            <li><a href="#contact">Contact</a></li>
            <li><Link to="/diy-remedies" style={{ textDecoration: "none", fontSize: "18px", fontWeight: "bold", cursor: "pointer" }}>
  DIY's</Link></li>
  <li><Link to="/forum" style={{ textDecoration: "none", fontSize: "18px", fontWeight: "bold", cursor: "pointer" }}>
  Community</Link></li>
  <li>
            <Link to={auth.currentUser ? "/profile" : "/SignUp"}>
                <FaUserCircle size={30} style={{ cursor: "pointer", color: "black" }} />
            </Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="hero">
        <div className="hero-content">
          <h2>Transforming Skincare, One Recommendation at a Time</h2>
          <p>
            Discover your unique skin profile and unlock tailored recommendations
            for radiant, healthy skin with minimal effort.
          </p>
          <Link to="/imageInput" className="cta-button">Analyze Your Skin Now</Link>
        </div>
      </header>

      {/* About Section */}
      <section id="about" className="about">
        <div className="container">
          <h2>About Us</h2>
          <p>
            At Dermavision, we combine cutting-edge computer vision and machine learning to revolutionize skincare. Our mission is to empower individuals with actionable insights and provide instant, customized solutions for unique skin needs.
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="features">
        <div className="container">
          <h2>Key Features</h2>
          <div className="feature-frame">
            <ul>
              <li>Personalized Skincare Recommendations</li>
              <li>Real-Time Skin Analysis</li>
              <li>Minimal Effort: Upload a selfie and answer 2-3 quick questions</li>
              <li>Skin Health Tracking Over Time</li>
            </ul>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="how-it-works">
        <div className="container">
          <h2>How It Works</h2>
          <div className="steps">
            <div className="step">
              <h3>Step 1</h3>
              <p>Upload a selfie.</p>
            </div>
            <div className="step">
              <h3>Step 2</h3>
              <p>Answer a few quick questions.</p>
            </div>
            <div className="step">
              <h3>Step 3</h3>
              <p>Get personalized skincare product suggestions.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="faq">
        <div className="container">
          <h2>Frequently Asked Questions</h2>
          <div className="faq-item">
            <h3>Is the analysis free?</h3>
            <p>Yes, our basic analysis is completely free.</p>
          </div>
          <div className="faq-item">
            <h3>How accurate are the recommendations?</h3>
            <p>Our system is backed by advanced AI, ensuring high accuracy.</p>
          </div>
          <div className="faq-item">
            <h3>What do I need to get started?</h3>
            <p>Just a selfie and a few minutes of your time.</p>
          </div>
        </div>
      </section>

     {/* Creators Section */}
<section id="creators" className="creators">
  <div className="container">
    <h2>Meet the Creators</h2>
    <div className="creators-list">
      <p>Bhakthi Shetty, Nikita Shetty, Saloni Suvarna - Made with love ❤️</p>
    </div>
  </div>
</section>


      {/* Contact Section */}
      <section id="contact" className="contact">
        <div className="container">
          <h2>Contact Us</h2>
          <p>Questions or feedback? Reach out to our team at <a href="mailto:support@dermavision.com">support@dermavision.com</a></p>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <p>&copy; 2024 Dermavision. Your journey to better skin starts here.</p>
          <div className="social-links">
            <a href="#">Instagram</a>
            <a href="#">Facebook</a>
            <a href="#">Twitter</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Homepage;

