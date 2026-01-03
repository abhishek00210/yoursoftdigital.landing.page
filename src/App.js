import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './Pages/LandingPage'; // Assuming you saved your code as LandingPage.tsx

// Placeholder components for the routes defined in your Navbar
const Login = () => <div className="p-20 text-center">Login Page</div>;
const Signup = () => <div className="p-20 text-center">Signup Page</div>;
const CRM = () => <div className="p-20 text-center">CRM Dashboard</div>;
const ServicesPage = () => <div className="p-20 text-center">Services Page</div>;

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        
        {/* These routes handle the navigation clicks in your Landing Page */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/crm" element={<CRM />} />
        <Route path="/ServicesPage" element={<ServicesPage />} />
      </Routes>
    </Router>
  );
}

export default App;