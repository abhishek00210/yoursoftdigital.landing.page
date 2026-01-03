import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { 
  Mail, Lock, Eye, EyeOff, ArrowRight, Loader2, User,
  Layers, Check, AlertCircle, Github, Chrome, Building2,
  Sparkles, Shield, Zap
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

// Password Strength Indicator
const PasswordStrength = ({ password }) => {
  const strength = useMemo(() => {
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    return score;
  }, [password]);

  const getStrengthText = () => {
    if (strength === 0) return '';
    if (strength <= 2) return 'Weak';
    if (strength <= 3) return 'Fair';
    if (strength <= 4) return 'Good';
    return 'Strong';
  };

  const getStrengthColor = () => {
    if (strength <= 2) return 'bg-red-400';
    if (strength <= 3) return 'bg-yellow-400';
    if (strength <= 4) return 'bg-[#17C3B2]';
    return 'bg-green-500';
  };

  if (!password) return null;

  return (
    <div className="mt-2">
      <div className="flex gap-1 mb-1">
        {[1, 2, 3, 4, 5].map((level) => (
          <motion.div
            key={level}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            className={`h-1 flex-1 rounded-full transition-colors ${
              level <= strength ? getStrengthColor() : 'bg-slate-200'
            }`}
          />
        ))}
      </div>
      <p className={`text-xs ${
        strength <= 2 ? 'text-red-500' : 
        strength <= 3 ? 'text-yellow-600' : 
        'text-green-600'
      }`}>
        {getStrengthText()}
      </p>
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

// Main SignUp Component
export default function SignUp() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    company: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  const validateStep1 = () => {
    const newErrors = {};
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = 'Name must be at least 2 characters';
    }
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors = {};
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (!agreeToTerms) {
      newErrors.terms = 'You must agree to the terms';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (step === 1 && validateStep1()) {
      setStep(2);
    }
  };

  const handleBack = () => {
    setStep(1);
    setErrors({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateStep2()) return;
    
    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setLoading(false);
    // Navigate to dashboard or onboarding
    navigate('/dashboard');
  };

  const handleChange = (field) => (e) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
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
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      x: direction < 0 ? 100 : -100,
      opacity: 0
    })
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Decorative */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#0D2342] relative overflow-hidden items-center justify-center">
        {/* Background Shapes */}
        <FloatingShape size={300} color="#17C3B2" blur={100} top="10%" left="10%" shape="circle" />
        <FloatingShape size={200} color="#C9A14A" blur={80} bottom="10%" right="10%" shape="blob" />
        <FloatingShape size={150} color="#17C3B2" blur={60} top="60%" left="40%" shape="square" />

        {/* Content */}
        <div className="relative z-10 text-center px-12 max-w-lg">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <motion.div 
              animate={{ 
                scale: [1, 1.05, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ duration: 4, repeat: Infinity }}
              className="w-20 h-20 mx-auto mb-8 rounded-2xl bg-gradient-to-br from-[#17C3B2] to-[#0D2342] flex items-center justify-center border border-white/20 shadow-2xl shadow-[#17C3B2]/20"
            >
              <Sparkles size={40} className="text-white" />
            </motion.div>
            
            <h2 className="text-3xl font-bold text-white mb-4">
              Start Your Free Trial
            </h2>
            <p className="text-slate-300 mb-8">
              Join 500+ Canadian companies already using Yoursoft to grow their business.
            </p>

            {/* Benefits */}
            <div className="grid grid-cols-1 gap-4 text-left">
              {[
                { icon: Zap, title: '14-Day Free Trial', desc: 'Full access to all features' },
                { icon: Shield, title: 'No Credit Card', desc: 'Start without any payment' },
                { icon: Layers, title: 'Cancel Anytime', desc: 'No long-term commitments' }
              ].map((benefit, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  className="flex items-start gap-4 p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#17C3B2]/20 flex items-center justify-center flex-shrink-0">
                    <benefit.icon size={20} className="text-[#17C3B2]" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">{benefit.title}</h4>
                    <p className="text-slate-400 text-sm">{benefit.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="mt-10 grid grid-cols-3 gap-4"
            >
              {[
                { value: '500+', label: 'Companies' },
                { value: '98%', label: 'Satisfaction' },
                { value: '24/7', label: 'Support' }
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-2xl font-bold text-[#17C3B2]">{stat.value}</div>
                  <div className="text-slate-400 text-sm">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Decorative gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0D2342] to-transparent" />
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white relative overflow-hidden">
        {/* Background decoration for mobile */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#17C3B2]/5 rounded-full blur-3xl lg:hidden" />
        
        <motion.div 
          className="w-full max-w-md relative z-10"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Logo */}
          <motion.div 
            variants={itemVariants}
            className="mb-6"
          >
            <Link to="/" className="inline-flex items-center gap-2 group">
              <img 
                src={logo} 
                alt="Yoursoft Digital" 
                className="h-12 w-auto object-contain" 
              />
            </Link>
          </motion.div>

          {/* Progress Indicator */}
          <motion.div variants={itemVariants} className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm text-slate-500">Step {step} of 2</span>
            </div>
            <div className="flex gap-2">
              <div className={`h-1 flex-1 rounded-full transition-colors ${step >= 1 ? 'bg-[#17C3B2]' : 'bg-slate-200'}`} />
              <div className={`h-1 flex-1 rounded-full transition-colors ${step >= 2 ? 'bg-[#17C3B2]' : 'bg-slate-200'}`} />
            </div>
          </motion.div>

          {/* Header */}
          <motion.div variants={itemVariants} className="mb-6">
            <h1 className="text-3xl font-bold text-[#0D2342] mb-2">
              {step === 1 ? 'Create your account' : 'Secure your account'}
            </h1>
            <p className="text-slate-500">
              {step === 1 
                ? 'Start your 14-day free trial. No credit card required.' 
                : 'Choose a strong password to protect your account.'
              }
            </p>
          </motion.div>

          {step === 1 && (
            <>
              {/* Social Login */}
              <motion.div variants={itemVariants} className="grid grid-cols-2 gap-3 mb-4">
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
            </>
          )}

          {/* Form */}
          <form onSubmit={step === 2 ? handleSubmit : (e) => { e.preventDefault(); handleNext(); }}>
            {step === 1 ? (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-4"
              >
                <Input
                  label="Full Name"
                  placeholder="John Doe"
                  icon={User}
                  value={formData.fullName}
                  onChange={handleChange('fullName')}
                  error={errors.fullName}
                />

                <Input
                  label="Work Email"
                  type="email"
                  placeholder="name@company.com"
                  icon={Mail}
                  value={formData.email}
                  onChange={handleChange('email')}
                  error={errors.email}
                />

                <Input
                  label="Company Name (Optional)"
                  placeholder="Acme Inc."
                  icon={Building2}
                  value={formData.company}
                  onChange={handleChange('company')}
                />

                <Button type="submit" variant="primary" className="mt-6">
                  Continue
                  <ArrowRight size={18} />
                </Button>
              </motion.div>
            ) : (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <div>
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
                  <PasswordStrength password={formData.password} />
                </div>

                <Input
                  label="Confirm Password"
                  placeholder="••••••••"
                  icon={Lock}
                  value={formData.confirmPassword}
                  onChange={handleChange('confirmPassword')}
                  error={errors.confirmPassword}
                  showPasswordToggle
                  showPassword={showConfirmPassword}
                  onTogglePassword={() => setShowConfirmPassword(!showConfirmPassword)}
                />

                {/* Password Requirements */}
                <div className="p-4 bg-slate-50 rounded-lg">
                  <p className="text-sm font-medium text-[#0D2342] mb-2">Password must contain:</p>
                  <ul className="space-y-1">
                    {[
                      { check: formData.password.length >= 8, text: 'At least 8 characters' },
                      { check: /[A-Z]/.test(formData.password), text: 'One uppercase letter' },
                      { check: /[a-z]/.test(formData.password), text: 'One lowercase letter' },
                      { check: /[0-9]/.test(formData.password), text: 'One number' },
                    ].map((req, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm">
                        <div className={`w-4 h-4 rounded-full flex items-center justify-center ${
                          req.check ? 'bg-[#17C3B2]' : 'bg-slate-200'
                        }`}>
                          {req.check && <Check size={10} className="text-white" />}
                        </div>
                        <span className={req.check ? 'text-[#0D2342]' : 'text-slate-400'}>
                          {req.text}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Terms Checkbox */}
                <div className="space-y-1">
                  <label className="flex items-start gap-3 cursor-pointer group">
                    <motion.div
                      whileTap={{ scale: 0.9 }}
                      onClick={() => {
                        setAgreeToTerms(!agreeToTerms);
                        if (errors.terms) setErrors(prev => ({ ...prev, terms: '' }));
                      }}
                      className={`
                        w-5 h-5 mt-0.5 rounded border-2 flex items-center justify-center transition-all flex-shrink-0
                        ${agreeToTerms 
                          ? 'bg-[#17C3B2] border-[#17C3B2]' 
                          : errors.terms 
                            ? 'border-red-400' 
                            : 'border-slate-300 group-hover:border-[#17C3B2]'
                        }
                      `}
                    >
                      {agreeToTerms && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 500 }}
                        >
                          <Check size={12} className="text-white" />
                        </motion.div>
                      )}
                    </motion.div>
                    <span className="text-sm text-slate-600">
                      I agree to the{' '}
                      <Link to="/terms" className="text-[#17C3B2] hover:underline">Terms of Service</Link>
                      {' '}and{' '}
                      <Link to="/privacy" className="text-[#17C3B2] hover:underline">Privacy Policy</Link>
                    </span>
                  </label>
                  {errors.terms && (
                    <motion.p 
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-500 text-xs flex items-center gap-1 ml-8"
                    >
                      <AlertCircle size={12} />
                      {errors.terms}
                    </motion.p>
                  )}
                </div>

                {/* Buttons */}
                <div className="flex gap-3 mt-6">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={handleBack}
                    className="flex-1"
                  >
                    Back
                  </Button>
                  <Button 
                    type="submit" 
                    variant="primary" 
                    loading={loading}
                    className="flex-[2]"
                  >
                    Create Account
                    <ArrowRight size={18} />
                  </Button>
                </div>
              </motion.div>
            )}
          </form>

          {/* Sign In Link */}
          <motion.p 
            variants={itemVariants}
            className="mt-8 text-center text-slate-500"
          >
            Already have an account?{' '}
            <Link 
              to="/login" 
              className="text-[#17C3B2] hover:text-[#0D2342] font-semibold transition-colors"
            >
              Sign in
            </Link>
          </motion.p>

          {/* Trust Badges */}
          <motion.div 
            variants={itemVariants}
            className="mt-8 flex items-center justify-center gap-6 text-slate-400"
          >
            <div className="flex items-center gap-1.5 text-xs">
              <Shield size={14} />
              <span>256-bit SSL</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs">
              <span>🇨🇦</span>
              <span>Canadian Hosted</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}