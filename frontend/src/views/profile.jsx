import React, { useEffect, useState } from "react";
import { auth, db } from "../firebaseconfiguration";
import { useNavigate } from "react-router-dom";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import "./profile.css";

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState({
    firstName:"",
    fullName: "",
    email: "",
    phone: "",
    address: "",
    gender: "",
  });

  const [editing, setEditing] = useState(false);
  const [newData, setNewData] = useState({
    phone: "",
    address: "",
    gender: "",
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);

        if (!currentUser.emailVerified) {
          alert("⚠ Please verify your email before accessing the profile.");
          navigate("/signup");
        } else {
          fetchUserData(currentUser.uid, currentUser.email);
        }
      } else {
        navigate("/signup");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const fetchUserData = async (userId, userEmail) => {
    try {
      const userDocRef = doc(db, "users", userId);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const data = userDoc.data();
        setUserData({
          firstName:data.firstName,
          fullName: `${data.firstName || "Not provided"} ${data.lastName || ""}`.trim(),
          email: userEmail,
          phone: data.phone || "Not provided",
          address: data.address || "Not provided",
          gender: data.gender || "Not specified",
        });
      } else {
        await setDoc(userDocRef, { firstName: "User", email: userEmail });
        setUserData({ fullName: "User", email: userEmail, phone: "Not provided", address: "Not provided", gender: "Not specified" });
      }
    } catch (error) {
      console.error("🔥 Firestore Fetch Error:", error);
    }
  };

  const handleUpdate = async () => {
    try {
      const userDocRef = doc(db, "users", user.uid);
      const updatedFields = {};
  
      Object.keys(newData).forEach((key) => {
        if (newData[key].trim()) {
          updatedFields[key] = newData[key];
        }
      });
  
      if (Object.keys(updatedFields).length > 0) {
        await updateDoc(userDocRef, updatedFields);
        setUserData((prev) => ({ ...prev, ...updatedFields }));
      }
  
      setEditing(false);
      setNewData({ phone: "", address: "", gender: "" });
  
      // ✅ Navigate to homepage after successful update
      navigate("/");
  
    } catch (error) {
      console.error("❌ Error updating profile:", error);
    }
  };
  

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/signup");
    } catch (error) {
      console.error("❌ Logout failed:", error.message);
    }
  };

  return (
    <div className="profile-page">
    <div className="profile-container">
      <h2>Welcome to DermaVision, {userData.firstName}!</h2>

      <p><strong>Full Name:</strong> {userData.fullName}</p>
      <p><strong>Email:</strong> {userData.email}</p>
      <p><strong>Phone:</strong> {userData.phone}</p>
      <p><strong>Address:</strong> {userData.address}</p>
      <p><strong>Gender:</strong> {userData.gender}</p>

      {editing ? (
        <div className="edit-section">
          <h3>Edit Profile</h3>
          <label>Phone:</label>
          <input
            type="text"
            placeholder="Enter phone number"
            value={newData.phone}
            onChange={(e) => setNewData({ ...newData, phone: e.target.value })}
          />

          <label>Address:</label>
          <input
            type="text"
            placeholder="Enter address"
            value={newData.address}
            onChange={(e) => setNewData({ ...newData, address: e.target.value })}
          />

          <label>Gender:</label>
          <select
            value={newData.gender}
            onChange={(e) => setNewData({ ...newData, gender: e.target.value })}
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>



          
          <div className="disease-detection-section">
  <h3>Skin Disease Detection</h3>
  
  <input
  type="file"
  accept="image/*"
  onChange={async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://localhost:8000/predict/", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Server error");

      const data = await response.json();
      console.log("Prediction response:", data);

      if (data.disease || data.prediction) {
        alert(`🧬 Detected Skin Disease: ${data.disease || data.prediction}`);
      } else {
        alert("⚠ No disease detected.");
      }

    } catch (error) {
      console.error("Detection failed:", error);
      alert("❌ Something went wrong. Please try again.");
    }
  }}
/>
</div>


          <div className="button-group">
            <button className="save-button" onClick={handleUpdate}>Save</button>
            <button className="cancel-button" onClick={() => setEditing(false)}>Cancel</button>
          </div>
        </div>
      ) : (
        <button className="edit-profile-button" onClick={() => setEditing(true)}>Edit Profile</button>
      )}



      {/* Logout button now at the bottom */}
      <button className="logout-button" onClick={handleLogout}>Logout</button>
    </div>
    </div>
  );
};

export default Profile;









