import React from "react";
import {Link} from "react-router-dom";
import './App.css'
import {
  BrowserRouter as Router,
  Routes as Switch,
  Route,
  useHistory  
} from "react-router-dom";


import './views/Homepage.css';
import Homepage from './views/homepage';
import SignUp from './views/signup';
import Login from './views/login';
import Profile from './views/profile';
import DIYRemedies from './views/DIYremedies';
import ImageInput from "./views/imageInput";
import Recommendations from './views/Recommendations'
import Form from "./views/Form";
import Chatbot from './views/chatbot';
import Community from './views/forum';
import MakeupEffect from './views/Components/ArMakeup';
import SkincareEffect from './views/Components/ArSkincare';


// MUI
import CssBaseline from '@mui/material/CssBaseline';
import { CgCommunity } from "react-icons/cg";

function App() {
  return (
    <>
      <CssBaseline />
      <Router>
      
        <Switch>
          <Route path="/" element={<Homepage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/diy-remedies" element={<DIYRemedies/>} />
          <Route path="/forum" element={<Community />} />
          <Route path="/imageInput" element={<ImageInput />} />
          <Route path="/form" element={<Form />} />
          <Route path="/recs" element={<Recommendations />} />
          <Route path="/chatbot" element={<Chatbot />} />
          <Route path="/ArMakeup" element={<MakeupEffect />} />
          <Route path="/ArSkincare" element={<SkincareEffect />} />
        </Switch>
        {/* 📌 This ensures the chatbot is visible on every page */}
        <Chatbot />

      </Router>
    </>

  );
}

export default App;

