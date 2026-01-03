import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Mail, Lock, Eye, EyeOff, ArrowRight, Loader2, 
  Layers, Check, AlertCircle, Github, Chrome
} from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import logo from "../Images/Logo/logo.png";

// Floating Shape Component
const FloatingShape = ({ size, color, blur, top, left, right, bottom, shape = "circle" }) => {
  const shapeStyles = {
    circle: "rounded-full",
    square: "rounded-3xl",
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

// Input Component
const Input = ({ 
  label, 
  type = "text", 
  placeholder, 
  icon: Icon, 
  value, 
  onChange, 
  error,
  showPasswordToggle = false,
  showPassword,
  onTogglePassword
}) => {
  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-medium text-[#0D2342]">
        {label}
      </label>
      <div className="relative">
        {Icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
            <Icon size={18} />
          </div>
        )}
        <input
          type={showPasswordToggle ? (showPassword ? "text" : "password") : type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`
            w-full px-4 py-3 rounded-lg border bg-white text-[#0D2342] text-sm
            placeholder-slate-400 transition-all duration-200
            focus:outline-none focus:ring-2 focus:ring-[#17C3B2] focus:border-transparent
            ${Icon ? 'pl-10' : ''}
            ${showPasswordToggle ? 'pr-10' : ''}
            ${error ? 'border-red-400 ring-2 ring-red-100' : 'border-slate-200 hover:border-slate-300'}
          `}
        />
        {showPasswordToggle && (
          <button
            type="button"
            onClick={onTogglePassword}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#0D2342] transition-colors"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>
      {error && (
        <motion.p 
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-red-500 text-xs flex items-center gap-1"
        >
          <AlertCircle size={12} />
          {error}
        </motion.p>
      )}
    </div>
  );
};

// Button Component
const Button = ({ 
  children, 
  variant = 'primary', 
  className = '', 
  onClick,
  loading = false,
  disabled = false,
  type = "button"
}) => {
  const variants = {
    primary: "bg-[#17C3B2] text-white hover:bg-[#14A697] shadow-lg shadow-[#17C3B2]/25",
    secondary: "bg-[#0D2342] text-white hover:bg-[#0A1B32] shadow-lg shadow-[#0D2342]/25",
    outline: "border-2 border-slate-200 text-[#0D2342] hover:border-[#17C3B2] hover:bg-[#17C3B2]/5",
    social: "border border-slate-200 text-[#0D2342] hover:bg-slate-50 hover:border-slate-300"
  };

  return (
    <motion.button 
      type={type}
      onClick={onClick} 
      disabled={loading || disabled}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      className={`
        w-full px-6 py-3 rounded-lg font-medium transition-all duration-200 
        flex items-center justify-center gap-2 
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variants[variant]} ${className}
      `}
    >
      {loading ? (
        <Loader2 className="animate-spin" size={20} />
      ) : (
        children
      )}
    </motion.button>
  );
};

// Divider Component
const Divider = ({ text }) => (
  <div className="relative my-6">
    <div className="absolute inset-0 flex items-center">
      <div className="w-full border-t border-slate-200" />
    </div>
    <div className="relative flex justify-center text-sm">
      <span className="px-4 bg-white text-slate-500">{text}</span>
    </div>
  </div>
);

// Main SignIn Component
export default function SignIn() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setLoading(false);
    // Navigate to dashboard or home
    navigate('/dashboard');
  };

  const handleChange = (field) => (e) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
    // Clear error when user types
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
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
    <div className="min-h-screen flex">
      {/* Left Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white relative">
        <motion.div 
          className="w-full max-w-md"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Logo */}
          <motion.div 
            variants={itemVariants}
            className="mb-8"
          >
            <Link to="/" className="inline-flex items-center gap-2 group">
              <img 
                src={logo} 
                alt="Yoursoft Digital" 
                className="h-12 w-auto object-contain" 
              />
            </Link>
          </motion.div>

          {/* Header */}
          <motion.div variants={itemVariants} className="mb-8">
            <h1 className="text-3xl font-bold text-[#0D2342] mb-2">
              Welcome back
            </h1>
            <p className="text-slate-500">
              Enter your credentials to access your account
            </p>
          </motion.div>

          {/* Social Login */}
          <motion.div variants={itemVariants} className="grid grid-cols-2 gap-3 mb-6">
            <Button variant="social">
              <Chrome size={18} />
              Google
            </Button>
            <Button variant="social">
              <Github size={18} />
              GitHub
            </Button>
          </motion.div>

          <Divider text="or continue with email" />

          {/* Form */}
          <motion.form variants={itemVariants} onSubmit={handleSubmit} className="space-y-5">
            <Input
              label="Email Address"
              type="email"
              placeholder="name@company.com"
              icon={Mail}
              value={formData.email}
              onChange={handleChange('email')}
              error={errors.email}
            />

            <Input
              label="Password"
              placeholder="••••••••"
              icon={Lock}
              value={formData.password}
              onChange={handleChange('password')}
              error={errors.password}
              showPasswordToggle
              showPassword={showPassword}
              onTogglePassword={() => setShowPassword(!showPassword)}
            />

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer group">
                <motion.div
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setRememberMe(!rememberMe)}
                  className={`
                    w-5 h-5 rounded border-2 flex items-center justify-center transition-all
                    ${rememberMe 
                      ? 'bg-[#17C3B2] border-[#17C3B2]' 
                      : 'border-slate-300 group-hover:border-[#17C3B2]'
                    }
                  `}
                >
                  {rememberMe && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 500 }}
                    >
                      <Check size={12} className="text-white" />
                    </motion.div>
                  )}
                </motion.div>
                <span className="text-sm text-slate-600">Remember me</span>
              </label>
              
              <Link 
                to="/forgot-password" 
                className="text-sm text-[#17C3B2] hover:text-[#0D2342] font-medium transition-colors"
              >
                Forgot password?
              </Link>
            </div>

            {/* Submit Button */}
            <Button type="submit" variant="primary" loading={loading}>
              Sign In
              <ArrowRight size={18} />
            </Button>
          </motion.form>

          {/* Sign Up Link */}
          <motion.p 
            variants={itemVariants}
            className="mt-8 text-center text-slate-500"
          >
            Don't have an account?{' '}
            <Link 
              to="/signup" 
              className="text-[#17C3B2] hover:text-[#0D2342] font-semibold transition-colors"
            >
              Sign up free
            </Link>
          </motion.p>

          {/* Footer */}
          <motion.p 
            variants={itemVariants}
            className="mt-8 text-center text-xs text-slate-400"
          >
            By signing in, you agree to our{' '}
            <Link to="/terms" className="underline hover:text-[#0D2342]">Terms</Link>
            {' '}and{' '}
            <Link to="/privacy" className="underline hover:text-[#0D2342]">Privacy Policy</Link>
          </motion.p>
        </motion.div>
      </div>

      {/* Right Side - Decorative */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#0D2342] relative overflow-hidden items-center justify-center">
        {/* Background Shapes */}
        <FloatingShape size={300} color="#17C3B2" blur={100} top="10%" right="10%" shape="circle" />
        <FloatingShape size={200} color="#C9A14A" blur={80} bottom="20%" left="10%" shape="blob" />
        <FloatingShape size={150} color="#17C3B2" blur={60} top="50%" left="30%" shape="square" />

        {/* Content */}
        <div className="relative z-10 text-center px-12 max-w-lg">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <motion.div 
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="w-20 h-20 mx-auto mb-8 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20"
            >
              <Layers size={40} className="text-[#17C3B2]" />
            </motion.div>
            
            <h2 className="text-3xl font-bold text-white mb-4">
              Manage Everything in One Place
            </h2>
            <p className="text-slate-300 mb-8">
              Access your CRM, AI chatbot, analytics, and more from a single powerful dashboard.
            </p>

            {/* Features */}
            <div className="space-y-4">
              {[
                'Real-time analytics & insights',
                'AI-powered automation',
                'Secure Canadian data hosting'
              ].map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + i * 0.1 }}
                  className="flex items-center gap-3 text-left"
                >
                  <div className="w-6 h-6 rounded-full bg-[#17C3B2] flex items-center justify-center flex-shrink-0">
                    <Check size={14} className="text-white" />
                  </div>
                  <span className="text-slate-300">{feature}</span>
                </motion.div>
              ))}
            </div>

            {/* Testimonial */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="mt-12 p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10"
            >
              <p className="text-slate-300 italic mb-4">
                "Yoursoft has transformed how we manage our business. The CRM is intuitive and the AI chatbot saves us hours every day."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#17C3B2] flex items-center justify-center text-white font-bold">
                  S
                </div>
                <div className="text-left">
                  <div className="text-white font-medium">Sarah Thompson</div>
                  <div className="text-slate-400 text-sm">CEO, TechStart Vancouver</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0D2342] to-transparent" />
      </div>
    </div>
  );
}