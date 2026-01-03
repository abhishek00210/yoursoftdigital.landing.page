import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Mail, ArrowRight, Loader2, ArrowLeft, 
  CheckCircle2, Layers
} from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import logo from "../Images/Logo/logo.png";

// Floating Shape Component
const FloatingShape = ({ size, color, blur, top, left, right, bottom, shape = "circle" }) => {
  const shapeStyles = {
    circle: "rounded-full",
    blob: "rounded-[40%_60%_70%_30%/40%_50%_60%_50%]"
  };

  return (
    <motion.div
      animate={{
        y: [0, -20, 0],
        rotate: [0, 5, -5, 0],
      }}
      transition={{
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      style={{
        width: size,
        height: size,
        backgroundColor: color,
        filter: `blur(${blur}px)`,
        top,
        left,
        right,
        bottom,
      }}
      className={`absolute opacity-30 pointer-events-none ${shapeStyles[shape]}`}
    />
  );
};

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email) {
      setError('Email is required');
      return;
    }
    
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email');
      return;
    }
    
    setLoading(true);
    setError('');
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setLoading(false);
    setSubmitted(true);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 relative overflow-hidden px-4">
      {/* Background Shapes */}
      <FloatingShape size={300} color="#17C3B2" blur={120} top="10%" left="10%" shape="circle" />
      <FloatingShape size={250} color="#0D2342" blur={100} bottom="10%" right="10%" shape="blob" />

      <motion.div 
        className="w-full max-w-md"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div 
          variants={itemVariants}
          className="bg-white rounded-2xl shadow-xl p-8 border border-slate-100"
        >
          {!submitted ? (
            <>
              {/* Logo */}
              <motion.div variants={itemVariants} className="text-center mb-8">
                <Link to="/" className="inline-flex items-center gap-2">
                  <img 
                    src={logo} 
                    alt="Yoursoft Digital" 
                    className="h-12 w-auto object-contain mx-auto" 
                  />
                </Link>
              </motion.div>

              {/* Header */}
              <motion.div variants={itemVariants} className="text-center mb-8">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-[#17C3B2]/10 flex items-center justify-center">
                  <Mail size={32} className="text-[#17C3B2]" />
                </div>
                <h1 className="text-2xl font-bold text-[#0D2342] mb-2">
                  Forgot Password?
                </h1>
                <p className="text-slate-500">
                  No worries! Enter your email and we'll send you reset instructions.
                </p>
              </motion.div>

              {/* Form */}
              <motion.form variants={itemVariants} onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-1.5">
                  <label className="block text-sm font-medium text-[#0D2342]">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                      <Mail size={18} />
                    </div>
                    <input
                      type="email"
                      placeholder="name@company.com"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setError('');
                      }}
                      className={`
                        w-full px-4 py-3 pl-10 rounded-lg border bg-white text-[#0D2342] text-sm
                        placeholder-slate-400 transition-all duration-200
                        focus:outline-none focus:ring-2 focus:ring-[#17C3B2] focus:border-transparent
                        ${error ? 'border-red-400 ring-2 ring-red-100' : 'border-slate-200 hover:border-slate-300'}
                      `}
                    />
                  </div>
                  {error && (
                    <motion.p 
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-500 text-xs"
                    >
                      {error}
                    </motion.p>
                  )}
                </div>

                <motion.button 
                  type="submit"
                  disabled={loading}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full px-6 py-3 rounded-lg font-medium bg-[#17C3B2] text-white hover:bg-[#14A697] transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 shadow-lg shadow-[#17C3B2]/25"
                >
                  {loading ? (
                    <Loader2 className="animate-spin" size={20} />
                  ) : (
                    <>
                      Send Reset Link
                      <ArrowRight size={18} />
                    </>
                  )}
                </motion.button>
              </motion.form>

              {/* Back to Login */}
              <motion.div variants={itemVariants} className="mt-6 text-center">
                <Link 
                  to="/login" 
                  className="inline-flex items-center gap-2 text-slate-500 hover:text-[#0D2342] transition-colors text-sm"
                >
                  <ArrowLeft size={16} />
                  Back to Sign In
                </Link>
              </motion.div>
            </>
          ) : (
            /* Success State */
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-8"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                className="w-20 h-20 mx-auto mb-6 rounded-full bg-[#17C3B2]/10 flex items-center justify-center"
              >
                <CheckCircle2 size={40} className="text-[#17C3B2]" />
              </motion.div>
              
              <h2 className="text-2xl font-bold text-[#0D2342] mb-2">
                Check Your Email
              </h2>
              <p className="text-slate-500 mb-6">
                We've sent a password reset link to
                <br />
                <span className="font-medium text-[#0D2342]">{email}</span>
              </p>
              
              <p className="text-sm text-slate-400 mb-6">
                Didn't receive the email? Check your spam folder or{' '}
                <button 
                  onClick={() => setSubmitted(false)}
                  className="text-[#17C3B2] hover:underline font-medium"
                >
                  try again
                </button>
              </p>

              <motion.button 
                onClick={() => navigate('/login')}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full px-6 py-3 rounded-lg font-medium bg-[#0D2342] text-white hover:bg-[#0A1B32] transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-[#0D2342]/25"
              >
                Back to Sign In
                <ArrowRight size={18} />
              </motion.button>
            </motion.div>
          )}
        </motion.div>

        {/* Footer */}
        <motion.p 
          variants={itemVariants}
          className="mt-8 text-center text-sm text-slate-400"
        >
          Need help?{' '}
          <Link to="/contact" className="text-[#17C3B2] hover:underline">
            Contact Support
          </Link>
        </motion.p>
      </motion.div>
    </div>
  );
}