import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './Pages/LandingPage'; // Assuming you saved your code as LandingPage.tsx
import SignIn from './Pages/SignIn'; // Placeholder components for the routes defined in your Navbar
import SignUp from './Pages/SignUp';
import ForgotPassword from './Pages/ForgotPassword';
import WebDevelopmentPage from './Services/WebDevelopmentPage';
import AppDevelopmentPage from './Services/AppDevelopmentPage';
import Preloader from './components/Preloader';
import DigitalMarketingPage from './Services/DigitalMarketingPage';
import GraphicDesignPage from './Services/GraphicDesignPage';
// Placeholder components for the routes defined in your Navbar

function App() {
  return (
    <Router>
        
      <Routes>
      
        <Route path="/" element={<LandingPage />} />
        
        {/* These routes handle the navigation clicks in your Landing Page */}

        <Route path="/login" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/services/web-development" element={<WebDevelopmentPage />} />
        <Route path="/services/app-development" element={<AppDevelopmentPage />} />
        <Route path="/services/graphic-design" element={<GraphicDesignPage />} />
        <Route path="/services/digital-marketing" element={<DigitalMarketingPage />} />
       </Routes>
     
    </Router>
  );
}

export default App;