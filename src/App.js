import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './Pages/LandingPage'; // Assuming you saved your code as LandingPage.tsx
import SignIn from './Pages/SignIn'; // Placeholder components for the routes defined in your Navbar
import SignUp from './Pages/SignUp';
import ForgotPassword from './Pages/ForgotPassword';
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


       </Routes>
    </Router>
  );
}

export default App;