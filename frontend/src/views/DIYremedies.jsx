import React from "react";
import "./DIYremedies.css"; // Import the CSS file

const skincareRemedies = [
    { title: "Honey & Lemon for Brightening", concern: "Dull skin, Hyperpigmentation", remedy: "Mix 1 tsp honey with lemon juice. Apply for 10 minutes and rinse off with lukewarm water." },
    { title: "Aloe Vera for Hydration", concern: "Dry skin, Sunburn, Irritation", remedy: "Apply fresh aloe vera gel directly to the skin to soothe and hydrate." },
    { title: "Turmeric & Yogurt for Acne", concern: "Acne, Inflammation", remedy: "Mix 1 tsp turmeric powder with 2 tbsp yogurt. Apply for 15 minutes and rinse off." },
    { title: "Green Tea Ice Cubes for Puffiness", concern: "Dark circles, Puffy eyes", remedy: "Freeze brewed green tea into ice cubes and rub them under your eyes to reduce puffiness." },
    { title: "Cucumber Slices for Dark Circles", concern: "Dark circles, Tired eyes", remedy: "Place chilled cucumber slices over your eyes for 10 minutes to refresh the area." },
    { title: "Oatmeal & Honey for Exfoliation", concern: "Dead skin, Rough texture", remedy: "Mix 1 tbsp oatmeal with honey and gently massage onto your skin before rinsing." },
    { title: "Coconut Oil for Makeup Removal", concern: "Sensitive skin, Dry patches", remedy: "Use a small amount of coconut oil to remove makeup gently and hydrate your skin." },
    { title: "Rose Water as a Toner", concern: "Oily skin, Redness", remedy: "Spritz rose water on your face to refresh and tone your skin naturally." },
    { title: "Banana Peel for Acne Marks", concern: "Acne scars, Hyperpigmentation", remedy: "Rub the inside of a banana peel onto your skin and leave it for 10 minutes before washing." },
    { title: "Apple Cider Vinegar for Oil Control", concern: "Oily skin, Acne-prone skin", remedy: "Dilute apple cider vinegar with water and use as a toner (patch test before use)." },
    { title: "Potato Juice for Skin Lightening", concern: "Dark spots, Uneven skin tone", remedy: "Apply fresh potato juice to dark spots and wash off after 15 minutes." },
    { title: "Tomato Pulp for Oil Control", concern: "Oily skin, Large pores", remedy: "Apply fresh tomato pulp to your face for 10 minutes before rinsing." },
    { title: "Gram Flour & Milk for Tan Removal", concern: "Tanned skin, Sunburn", remedy: "Mix gram flour with milk and apply as a face pack for 15 minutes." },
    { title: "Rice Water for Anti-Aging", concern: "Fine lines, Wrinkles", remedy: "Rinse your face with fermented rice water daily for a youthful glow." },
    { title: "Almond Paste for Glowing Skin", concern: "Dull skin, Dehydration", remedy: "Soak almonds overnight, blend into a paste, and apply for 15 minutes." },
    { title: "Papaya Mask for Skin Softening", concern: "Dry skin, Rough texture", remedy: "Mash ripe papaya and apply as a mask for 20 minutes before rinsing." },
    { title: "Orange Peel Powder for Radiance", concern: "Uneven skin tone, Blemishes", remedy: "Mix orange peel powder with yogurt and apply for 15 minutes." },
    { title: "Strawberry Scrub for Dead Skin", concern: "Clogged pores, Rough skin", remedy: "Mash strawberries with sugar and gently exfoliate your face." },
    { title: "Egg White for Tightening Pores", concern: "Large pores, Loose skin", remedy: "Apply egg white on your face, let it dry, and rinse with warm water." },
    { title: "Milk & Honey for Soft Skin", concern: "Dryness, Sensitivity", remedy: "Mix equal parts of milk and honey, apply to skin, and rinse off after 15 minutes." },
  ];

const makeupHacks = [
  { hack: "Blush as Lip Tint & Eyeshadow", usage: "Use powder or cream blush as a natural lip tint and eyeshadow for a monochromatic look." },
  { hack: "Vaseline for Dewy Highlight", usage: "Dab a small amount of Vaseline on cheekbones for a natural dewy glow." },
  { hack: "Mascara as Eyeliner", usage: "Use an eyeliner brush to pick up mascara and apply it as eyeliner." },
  { hack: "Concealer as Eyeshadow Base", usage: "Apply concealer on eyelids before eyeshadow to make colors pop." },
  { hack: "Lipstick as Blush", usage: "Dab lipstick on cheeks and blend for a natural blush effect." },
  { hack: "Foundation + Moisturizer = Tinted Moisturizer", usage: "Mix foundation with moisturizer for a lightweight, natural finish." },
  { hack: "Use a Spoon for Winged Eyeliner", usage: "Place a spoon against your eye to create the perfect winged liner shape." },
  { hack: "Translucent Powder for Long-Lasting Lipstick", usage: "Apply lipstick, place a tissue over lips, and dust translucent powder on top for longevity." },
];

const DIYRemedies = () => {
    return (
      <div className="diy-container">
        <h1>✨ DIY Skincare & Makeup Hacks ✨</h1>
        <p className="intro-text">Discover easy and natural skincare remedies along with makeup hacks to enhance your beauty routine!</p>
  
        <h2 className="section-title">🌿 Skincare Remedies</h2>
        <div className="diy-grid">
          {skincareRemedies.map((remedy, index) => (
            <div key={index} className="diy-card">
              <h3>{remedy.title}</h3>
              <p><strong>For:</strong> {remedy.concern}</p>
              <p>{remedy.remedy}</p>
            </div>
          ))}
        </div>
  
        <h2 className="section-title">💄 Makeup Hacks</h2>
        <div className="diy-grid">
          {makeupHacks.map((hack, index) => (
            <div key={index} className="diy-card hack-card">
              <h3>{hack.hack}</h3>
              <p>{hack.usage}</p>
            </div>
          ))}
        </div>
  
        <div className="credits">
          <h3>📚 Credits</h3>
          <p>All remedies are based on research from dermatology experts, Ayurvedic skincare, and trusted beauty sources like Healthline, WebMD, and Allure.</p>
        </div>
      </div>
    );
  };
  
  export default DIYRemedies;