import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  ArrowRight, Check, ChevronDown, Code, Globe, Layers, 
  Zap, Shield, Star, Play, Rocket, CheckCircle2, 
  Monitor, Smartphone, Server, Database, Layout, 
  FileCode, Settings, Users, Clock, Award, Target,
  ArrowUp, MessageSquare, Phone, Mail, ExternalLink,
  Cpu, GitBranch, Palette, ShoppingCart, Search,
  BarChart3, Lock, RefreshCw, Headphones, ThumbsUp,
  Menu, X, ChevronRight, MapPin, Linkedin, Twitter, Github,
  TrendingUp, Loader2
} from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import logo from "../Images/Logo/logo.png";

// ============================================
// 🎨 SHARED COMPONENTS
// ============================================

// Floating Shape
const FloatingShape = ({ size, color, blur, top, left, right, bottom, shape = "circle", className = "" }) => {
  const shapeStyles = {
    circle: "rounded-full",
    square: "rounded-3xl",
    blob: "rounded-[40%_60%_70%_30%/40%_50%_60%_50%]"
  };

  return (
    <motion.div
      animate={{
        y: [0, -30, 0],
        rotate: [0, 5, -5, 0],
      }}
      transition={{
        duration: 8,
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
      className={`absolute opacity-30 pointer-events-none ${shapeStyles[shape]} ${className}`}
    />
  );
};

// Button Component
const Button = ({ 
  children, 
  variant = 'primary', 
  className = '', 
  onClick,
  size = 'default',
  loading = false
}) => {
  const sizes = {
    sm: "px-4 py-2 text-sm",
    default: "px-6 py-3 text-sm",
    lg: "px-8 py-4 text-base"
  };

  const variants = {
    primary: "bg-[#17C3B2] text-white hover:bg-[#14A697] shadow-lg shadow-[#17C3B2]/25",
    secondary: "bg-[#0D2342] text-white hover:bg-[#0A1B32] shadow-lg shadow-[#0D2342]/25",
    outline: "border-2 border-[#0D2342]/20 text-[#0D2342] hover:border-[#17C3B2] hover:bg-[#17C3B2]/5",
    white: "bg-white text-[#0D2342] hover:bg-slate-50 shadow-lg",
    ghost: "text-[#0D2342] hover:bg-[#0D2342]/5"
  };

  return (
    <motion.button 
      onClick={onClick}
      disabled={loading}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 ${sizes[size]} ${variants[variant]} ${className}`}
    >
      {loading ? <Loader2 className="animate-spin" size={18} /> : children}
    </motion.button>
  );
};

// Section Component
const Section = ({ children, className = "", id = "", dark = false, gray = false }) => (
  <section 
    id={id} 
    className={`
      py-20 md:py-28 px-6 relative overflow-hidden
      ${dark ? 'bg-[#0D2342] text-white' : ''}
      ${gray ? 'bg-slate-50' : ''}
      ${!dark && !gray ? 'bg-white' : ''}
      ${className}
    `}
  >
    <div className="max-w-6xl mx-auto relative z-10">
      {children}
    </div>
  </section>
);

// Section Header
const SectionHeader = ({ badge, title, subtitle, centered = true, light = false }) => (
  <motion.div 
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
    className={`mb-16 ${centered ? 'text-center max-w-3xl mx-auto' : ''}`}
  >
    {badge && (
      <motion.span 
        initial={{ scale: 0.9, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        className={`
          inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold mb-4 uppercase tracking-wider
          ${light 
            ? 'bg-white/10 text-[#17C3B2] border border-[#17C3B2]/30' 
            : 'bg-[#17C3B2]/10 text-[#17C3B2] border border-[#17C3B2]/20'
          }
        `}
      >
        {badge}
      </motion.span>
    )}
    <h2 className={`text-3xl md:text-5xl font-bold mb-6 leading-tight ${light ? 'text-white' : 'text-[#0D2342]'}`}>
      {title}
    </h2>
    {subtitle && (
      <p className={`text-lg md:text-xl leading-relaxed ${light ? 'text-slate-300' : 'text-slate-500'}`}>
        {subtitle}
      </p>
    )}
  </motion.div>
);

// Card Component
const Card = ({ children, className = '', hover = true, padding = true }) => (
  <motion.div 
    whileHover={hover ? { y: -8, transition: { duration: 0.3 } } : {}}
    className={`
      bg-white border border-slate-200 rounded-2xl
      ${hover ? 'hover:shadow-2xl hover:shadow-[#0D2342]/10 hover:border-[#17C3B2]/30 transition-all duration-300' : 'shadow-lg'}
      ${padding ? 'p-8' : ''}
      ${className}
    `}
  >
    {children}
  </motion.div>
);

// Animated Counter
const AnimatedCounter = ({ end, suffix = '' }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let start = 0;
          const duration = 2000;
          const startTime = performance.now();
          
          const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            setCount(Math.floor(progress * end));
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end]);

  return <span ref={ref}>{count}{suffix}</span>;
};

// Back to Top Button
const BackToTop = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShow(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.button 
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      initial={{ opacity: 0, y: 20 }}
      animate={{ 
        opacity: show ? 1 : 0, 
        y: show ? 0 : 20 
      }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-xl bg-[#17C3B2] text-white shadow-lg shadow-[#17C3B2]/30 flex items-center justify-center hover:bg-[#0D2342] transition-colors"
    >
      <ArrowUp size={20} />
    </motion.button>
  );
};

// ============================================
// 🧭 NAVBAR COMPONENT
// ============================================

const navItems = [
  { label: 'CRM', href: '/crm', isRoute: true },
  { label: 'AI Chatbot', href: '/#chatbot', isRoute: false },
  { label: 'Pricing', href: '/#pricing', isRoute: false },
];

const serviceItems = [
  { 
    label: 'Web Development', 
    href: '/services/web-development', 
    icon: Globe,
    description: 'Custom websites & web apps'
  },
  { 
    label: 'App Development', 
    href: '/services/app-development', 
    icon: Smartphone,
    description: 'iOS & Android applications'
  },
  { 
    label: 'Digital Marketing', 
    href: '/services/digital-marketing', 
    icon: TrendingUp,
    description: 'SEO, PPC & social media'
  },
  { 
    label: 'Graphic Design', 
    href: '/services/graphic-design', 
    icon: Palette,
    description: 'Branding & visual identity'
  },
];

const Navbar = ({ isScrolled }) => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

  const handleNavClick = useCallback((e, item) => {
    e.preventDefault();
    if (item.isRoute) {
      navigate(item.href);
    } else {
      // For hash links, navigate to home first if not there
      if (item.href.startsWith('/#')) {
        navigate('/');
        setTimeout(() => {
          const element = document.querySelector(item.href.replace('/', ''));
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      } else {
        const element = document.querySelector(item.href);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
    setIsMobileMenuOpen(false);
  }, [navigate]);

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-100' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <motion.div 
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigate('/')}
          whileHover={{ scale: 1.02 }}
        >
          <img 
            src={logo} 
            alt="Yoursoft Digital" 
            className="h-14 w-auto object-contain" 
          />
        </motion.div>
        
        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-8">
          {/* Services Dropdown */}
          <div 
            className="relative"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <button className={`text-sm font-medium flex items-center gap-1 transition-colors py-2 ${
              isScrolled ? 'text-slate-600 hover:text-[#17C3B2]' : 'text-white/90 hover:text-white'
            }`}>
              Services
              <motion.div
                animate={{ rotate: servicesOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDown size={14} />
              </motion.div>
            </button>
            
            <motion.div 
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ 
                opacity: servicesOpen ? 1 : 0, 
                y: servicesOpen ? 0 : 10,
                scale: servicesOpen ? 1 : 0.95
              }}
              transition={{ duration: 0.2 }}
              className={`absolute top-full left-0 pt-2 ${servicesOpen ? 'visible' : 'invisible'}`}
            >
              <div className="bg-white rounded-xl shadow-xl border border-slate-200 p-2 min-w-[280px]">
                {serviceItems.map((item, index) => (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      navigate(item.href);
                      setServicesOpen(false);
                    }}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-start gap-3 p-3 rounded-lg hover:bg-[#17C3B2]/5 transition-colors group/item"
                  >
                    <div className="w-10 h-10 rounded-lg bg-[#0D2342]/5 flex items-center justify-center group-hover/item:bg-[#17C3B2] group-hover/item:text-white transition-colors flex-shrink-0">
                      <item.icon size={20} className="text-[#0D2342] group-hover/item:text-white" />
                    </div>
                    <div>
                      <div className="font-medium text-[#0D2342] text-sm group-hover/item:text-[#17C3B2] transition-colors">
                        {item.label}
                      </div>
                      <div className="text-xs text-slate-500">
                        {item.description}
                      </div>
                    </div>
                  </motion.a>
                ))}
                
                <div className="border-t border-slate-100 mt-2 pt-2">
                  <a
                    href="/services"
                    onClick={(e) => {
                      e.preventDefault();
                      navigate('/services');
                      setServicesOpen(false);
                    }}
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-[#0D2342]/5 transition-colors text-sm font-medium text-[#0D2342]"
                  >
                    View All Services
                    <ArrowRight size={14} className="text-[#17C3B2]" />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Other Nav Items */}
          {navItems.map((item) => (
            <a 
              key={item.label} 
              href={item.href}
              onClick={(e) => handleNavClick(e, item)}
              className={`text-sm font-medium transition-colors ${
                isScrolled ? 'text-slate-600 hover:text-[#17C3B2]' : 'text-white/90 hover:text-white'
              }`}
            >
              {item.label}
            </a>
          ))}
          
          {/* Resources Dropdown */}
          <div className="relative group">
            <button className={`text-sm font-medium flex items-center gap-1 transition-colors ${
              isScrolled ? 'text-slate-600 hover:text-[#17C3B2]' : 'text-white/90 hover:text-white'
            }`}>
              Resources
              <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-200" />
            </button>
            
            <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
              <div className="bg-white rounded-lg shadow-xl border border-slate-200 py-2 min-w-[160px]">
                {['Blog', 'Documentation', 'Help Center', 'API Reference'].map(item => (
                  <a 
                    key={item} 
                    href="/" 
                    className="block px-4 py-2 text-sm text-slate-600 hover:bg-[#17C3B2]/5 hover:text-[#17C3B2] transition-colors"
                  >
                    {item}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Desktop CTA Buttons */}
        <div className="hidden lg:flex items-center gap-3">
          <Button 
            variant={isScrolled ? "ghost" : "ghost"} 
            size="sm" 
            onClick={() => navigate('/login')}
            className={!isScrolled ? "text-white hover:bg-white/10" : ""}
          >
            Sign In
          </Button>
          <Button variant="primary" size="sm" onClick={() => navigate('/signup')}>
            Get Started
            <ArrowRight size={14} />
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className={`lg:hidden p-2 rounded-lg transition-colors ${
            isScrolled ? 'text-[#0D2342] hover:bg-slate-100' : 'text-white hover:bg-white/10'
          }`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="lg:hidden bg-white border-t border-slate-100 shadow-lg max-h-[80vh] overflow-y-auto"
        >
          <div className="px-6 py-4 space-y-1">
            {/* Mobile Services Accordion */}
            <div className="border-b border-slate-100 pb-2 mb-2">
              <button 
                onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                className="w-full flex items-center justify-between py-3 text-slate-700 text-sm font-semibold"
              >
                <span className="flex items-center gap-2">
                  <Layers size={16} className="text-[#17C3B2]" />
                  Services
                </span>
                <motion.div
                  animate={{ rotate: mobileServicesOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className={`w-6 h-6 rounded-full flex items-center justify-center ${mobileServicesOpen ? 'bg-[#17C3B2] text-white' : 'bg-slate-100'}`}
                >
                  <ChevronDown size={14} />
                </motion.div>
              </button>
              
              <motion.div
                initial={false}
                animate={{ 
                  height: mobileServicesOpen ? 'auto' : 0,
                  opacity: mobileServicesOpen ? 1 : 0
                }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="space-y-1 pb-3">
                  {serviceItems.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      onClick={(e) => {
                        e.preventDefault();
                        navigate(item.href);
                        setIsMobileMenuOpen(false);
                      }}
                      className="flex items-center gap-3 py-3 px-3 rounded-lg hover:bg-slate-50 transition-colors"
                    >
                      <div className="w-10 h-10 rounded-lg bg-[#17C3B2]/10 flex items-center justify-center">
                        <item.icon size={18} className="text-[#17C3B2]" />
                      </div>
                      <div>
                        <div className="font-medium text-[#0D2342] text-sm">{item.label}</div>
                        <div className="text-xs text-slate-500">{item.description}</div>
                      </div>
                    </a>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Other Mobile Nav Items */}
            {navItems.map(item => (
              <a 
                key={item.label} 
                href={item.href}
                onClick={(e) => handleNavClick(e, item)}
                className="flex items-center gap-2 py-3 text-slate-600 hover:text-[#17C3B2] text-sm font-medium"
              >
                {item.label}
              </a>
            ))}
            
            <a 
              href="/resources"
              className="flex items-center gap-2 py-3 text-slate-600 hover:text-[#17C3B2] text-sm font-medium"
            >
              Resources
            </a>
            
            {/* Mobile CTA Buttons */}
            <div className="pt-4 space-y-3 border-t border-slate-100 mt-4">
              <Button 
                variant="outline" 
                className="w-full" 
                size="sm" 
                onClick={() => {
                  navigate('/login');
                  setIsMobileMenuOpen(false);
                }}
              >
                Sign In
              </Button>
              <Button 
                variant="primary" 
                className="w-full" 
                size="sm" 
                onClick={() => {
                  navigate('/signup');
                  setIsMobileMenuOpen(false);
                }}
              >
                Get Started
                <ArrowRight size={14} />
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

// ============================================
// 🦶 FOOTER COMPONENT
// ============================================

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="bg-[#0D2342] pt-20 pb-8 relative overflow-hidden">
      {/* Background Decoration */}
      <FloatingShape size={300} color="#17C3B2" blur={150} top="-20%" right="-10%" shape="circle" />
      <FloatingShape size={200} color="#C9A14A" blur={100} bottom="10%" left="-5%" shape="blob" />
      
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Main Footer Content */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          {/* Brand Column */}
          <div className="col-span-2">
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="flex items-center gap-2 mb-6 cursor-pointer"
              onClick={() => navigate('/')}
            >
              <img 
                src={logo} 
                alt="Yoursoft Digital" 
                className="h-12 w-auto object-contain brightness-0 invert" 
              />
            </motion.div>
            <p className="text-slate-400 text-sm mb-6 max-w-xs leading-relaxed">
              The complete ecosystem for Canadian businesses. Build, manage, and automate with confidence.
            </p>
            <div className="flex gap-3">
              {[
                { icon: Twitter, href: '#' },
                { icon: Linkedin, href: '#' },
                { icon: Github, href: '#' }
              ].map((social, i) => (
                <motion.a 
                  key={i} 
                  href={social.href}
                  whileHover={{ scale: 1.1, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-slate-400 hover:bg-[#17C3B2] hover:text-white transition-all"
                >
                  <social.icon size={18} />
                </motion.a>
              ))}
            </div>
          </div>
          
          {/* Services Column */}
          <div>
            <h4 className="font-bold text-white mb-4 text-sm">Services</h4>
            <ul className="space-y-3">
              {[
                { label: 'Web Development', href: '/services/web-development' },
                { label: 'App Development', href: '/services/app-development' },
                { label: 'Digital Marketing', href: '/services/digital-marketing' },
                { label: 'Graphic Design', href: '/services/graphic-design' }
              ].map((item) => (
                <li key={item.label}>
                  <motion.a 
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      navigate(item.href);
                    }}
                    whileHover={{ x: 5, color: "#17C3B2" }}
                    className="text-slate-400 hover:text-[#17C3B2] transition-colors text-sm inline-block"
                  >
                    {item.label}
                  </motion.a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Company Column */}
          <div>
            <h4 className="font-bold text-white mb-4 text-sm">Company</h4>
            <ul className="space-y-3">
              {['About Us', 'Careers', 'Blog', 'Contact'].map((item) => (
                <li key={item}>
                  <motion.a 
                    href="/" 
                    whileHover={{ x: 5, color: "#17C3B2" }}
                    className="text-slate-400 hover:text-[#17C3B2] transition-colors text-sm inline-block"
                  >
                    {item}
                  </motion.a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Support Column */}
          <div>
            <h4 className="font-bold text-white mb-4 text-sm">Support</h4>
            <ul className="space-y-3">
              {['Help Center', 'Documentation', 'API', 'Status'].map((item) => (
                <li key={item}>
                  <motion.a 
                    href="/" 
                    whileHover={{ x: 5, color: "#17C3B2" }}
                    className="text-slate-400 hover:text-[#17C3B2] transition-colors text-sm inline-block"
                  >
                    {item}
                  </motion.a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* Contact Info */}
        <div className="flex flex-wrap gap-8 py-8 border-t border-white/10 mb-8">
          {[
            { icon: Mail, text: 'hello@yoursoftdigital.ca' },
            { icon: Phone, text: '+1 (416) 555-0123' },
            { icon: MapPin, text: 'Toronto, ON, Canada' }
          ].map((item, i) => (
            <motion.div 
              key={i} 
              whileHover={{ x: 5 }}
              className="flex items-center gap-3 text-slate-400 text-sm cursor-pointer hover:text-white transition-colors"
            >
              <div className="w-8 h-8 rounded-lg bg-[#17C3B2]/20 flex items-center justify-center">
                <item.icon size={14} className="text-[#17C3B2]" />
              </div>
              <span>{item.text}</span>
            </motion.div>
          ))}
        </div>
        
        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8 border-t border-white/10">
          <div className="text-slate-500 text-sm flex items-center gap-2">
            <motion.span
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              🇨🇦
            </motion.span>
            © {new Date().getFullYear()} Yoursoft Digital. Made with ❤️ in Canada.
          </div>
          <div className="flex gap-6 text-sm">
            {['Privacy Policy', 'Terms of Service', 'Cookies'].map(item => (
              <motion.a 
                key={item} 
                href="/"
                whileHover={{ y: -2, color: "#17C3B2" }}
                className="text-slate-500 hover:text-[#17C3B2] transition-colors"
              >
                {item}
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

// ============================================
// 🏠 WEB DEVELOPMENT PAGE
// ============================================

export default function WebDevelopmentPage() {
  const navigate = useNavigate();
  const [activeService, setActiveService] = useState(0);
  const [activeFaq, setActiveFaq] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll for navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Services Data
  const services = [
    {
      id: 'php',
      title: 'PHP Development',
      icon: FileCode,
      color: '#777BB4',
      description: 'PHP Development at Yoursoft Digital forms the backbone of our versatile and dynamic web solutions.',
      fullDescription: 'With PHP, a server-side scripting language, we unlock a world of possibilities, creating robust, scalable, and interactive web applications. Our seasoned developers utilize PHP\'s flexibility to build custom solutions tailored to meet diverse business requirements.',
      features: [
        'Custom PHP Applications',
        'E-commerce Platforms',
        'Content Management Systems',
        'API Development & Integration',
        'Laravel & Symfony Frameworks',
        'Database Optimization'
      ],
      technologies: ['Laravel', 'Symfony', 'CodeIgniter', 'MySQL', 'PostgreSQL']
    },
    {
      id: 'dotnet',
      title: '.NET Development',
      icon: Cpu,
      color: '#512BD4',
      description: '.NET development at Yoursoft Digital forms the backbone of our enterprise-grade web solutions.',
      fullDescription: 'With .NET, we unlock a world of possibilities, creating robust, scalable, and interactive web applications. Our seasoned developers utilize .NET\'s flexibility to build custom solutions tailored to meet diverse business requirements.',
      features: [
        'ASP.NET Core Applications',
        'Enterprise Solutions',
        'Microservices Architecture',
        'Cloud-Native Development',
        'Azure Integration',
        'High-Performance APIs'
      ],
      technologies: ['ASP.NET Core', 'C#', 'Azure', 'SQL Server', 'Entity Framework']
    },
    {
      id: 'wordpress',
      title: 'WordPress Development',
      icon: Layout,
      color: '#21759B',
      description: 'WordPress Development at Yoursoft Digital epitomizes our commitment to creating dynamic digital solutions.',
      fullDescription: 'Leveraging the robust functionalities of WordPress, our expert team crafts versatile websites tailored to meet diverse business needs. With its intuitive content management system, extensive library of themes, and flexible plugins, we build captivating websites.',
      features: [
        'Custom Theme Development',
        'Plugin Development',
        'WooCommerce Solutions',
        'Performance Optimization',
        'Security Hardening',
        'Migration & Maintenance'
      ],
      technologies: ['WordPress', 'WooCommerce', 'Elementor', 'ACF', 'PHP', 'MySQL']
    },
    {
      id: 'react',
      title: 'React JS Development',
      icon: Code,
      color: '#61DAFB',
      description: 'React Development is the cornerstone of our ability to create robust, scalable web applications.',
      fullDescription: 'Leveraging the power of React, we design and develop cutting-edge solutions that redefine user experiences. Our skilled developers harness React\'s modular and component-based architecture to build dynamic single-page applications.',
      features: [
        'Single Page Applications',
        'Progressive Web Apps',
        'Component Libraries',
        'State Management (Redux)',
        'Server-Side Rendering',
        'React Native Integration'
      ],
      technologies: ['React', 'Next.js', 'Redux', 'TypeScript', 'Tailwind CSS', 'GraphQL']
    },
    {
      id: 'angular',
      title: 'Angular Development',
      icon: GitBranch,
      color: '#DD0031',
      description: 'Angular Development enables us to create robust, scalable, and interactive enterprise applications.',
      fullDescription: 'Leveraging the power of Angular, a front-end framework maintained by Google, we design and develop cutting-edge solutions that redefine user experiences with its modular and component-based architecture.',
      features: [
        'Enterprise Applications',
        'Complex SPAs',
        'Real-time Applications',
        'Material Design Integration',
        'RxJS Implementation',
        'Angular Universal (SSR)'
      ],
      technologies: ['Angular', 'TypeScript', 'RxJS', 'NgRx', 'Angular Material', 'Node.js']
    },
    {
      id: 'html',
      title: 'HTML/CSS Development',
      icon: Palette,
      color: '#E34F26',
      description: 'HTML development stands as the cornerstone of our digital craftsmanship.',
      fullDescription: 'HTML serves as the fundamental building block of every website we create. It forms the structural backbone, allowing us to define the layout and organization of content. Our expert developers craft intuitive user experiences using semantic tags.',
      features: [
        'Semantic HTML5 Markup',
        'Responsive Design',
        'CSS3 Animations',
        'Cross-Browser Compatibility',
        'Accessibility (WCAG)',
        'Performance Optimization'
      ],
      technologies: ['HTML5', 'CSS3', 'SASS/SCSS', 'Bootstrap', 'Tailwind CSS', 'Flexbox/Grid']
    }
  ];

  // Process Steps
  const processSteps = [
    {
      step: '01',
      title: 'Discovery & Planning',
      description: 'We begin by understanding your business goals, target audience, and project requirements.',
      icon: Target
    },
    {
      step: '02',
      title: 'Design & Prototype',
      description: 'Our designers create stunning wireframes and prototypes that visualize your website.',
      icon: Palette
    },
    {
      step: '03',
      title: 'Development',
      description: 'Our expert developers bring your vision to life using the latest technologies.',
      icon: Code
    },
    {
      step: '04',
      title: 'Testing & QA',
      description: 'Rigorous testing across devices and browsers ensures your website performs flawlessly.',
      icon: CheckCircle2
    },
    {
      step: '05',
      title: 'Launch & Deploy',
      description: 'We handle the deployment process, ensuring a smooth transition to your live environment.',
      icon: Rocket
    },
    {
      step: '06',
      title: 'Support & Maintenance',
      description: 'Ongoing support to keep your website secure, updated, and performing optimally.',
      icon: Headphones
    }
  ];

  // Platforms
  const platforms = [
    { name: 'Web Applications', icon: Monitor },
    { name: 'Mobile Web', icon: Smartphone },
    { name: 'E-Commerce', icon: ShoppingCart },
    { name: 'CMS Platforms', icon: Layout },
    { name: 'Cloud Solutions', icon: Server },
    { name: 'API Development', icon: Database },
  ];

  // Stats
  const stats = [
    { value: 500, suffix: '+', label: 'Projects Delivered' },
    { value: 98, suffix: '%', label: 'Client Satisfaction' },
    { value: 50, suffix: '+', label: 'Expert Developers' },
    { value: 24, suffix: '/7', label: 'Support Available' },
  ];

  // FAQs
  const faqs = [
    {
      question: 'How long does it take to build a website?',
      answer: 'Project timelines vary based on complexity. A simple website takes 2-4 weeks, while complex web applications can take 2-6 months. We provide detailed timelines during the planning phase.'
    },
    {
      question: 'What technologies do you use for web development?',
      answer: 'We work with a wide range of technologies including React, Angular, Vue.js, PHP, .NET, Node.js, WordPress, and more. We choose the best technology stack based on your specific requirements.'
    },
    {
      question: 'Do you provide ongoing maintenance and support?',
      answer: 'Yes! We offer comprehensive maintenance packages that include security updates, performance optimization, content updates, and 24/7 technical support.'
    },
    {
      question: 'Can you help with an existing website?',
      answer: 'Absolutely! We can help with website redesigns, performance optimization, security audits, feature additions, and migrations to modern platforms.'
    },
    {
      question: 'What is your development process?',
      answer: 'We follow an agile methodology with clear milestones, regular updates, and client feedback loops. This ensures transparency and allows for adjustments throughout the project.'
    }
  ];

  // Why Choose Us
  const whyChooseUs = [
    {
      icon: Award,
      title: 'Expert Team',
      description: '50+ certified developers with expertise across all major platforms and technologies.'
    },
    {
      icon: Clock,
      title: 'On-Time Delivery',
      description: '98% of our projects are delivered on time, every time. We respect your deadlines.'
    },
    {
      icon: Shield,
      title: 'Secure & Scalable',
      description: 'Enterprise-grade security and scalable architecture built into every project.'
    },
    {
      icon: RefreshCw,
      title: 'Agile Approach',
      description: 'Flexible development process with regular updates and iterative improvements.'
    },
    {
      icon: ThumbsUp,
      title: '100% Satisfaction',
      description: 'We\'re not happy until you\'re happy. Unlimited revisions until you\'re satisfied.'
    },
    {
      icon: Headphones,
      title: '24/7 Support',
      description: 'Round-the-clock support from our Canadian team whenever you need assistance.'
    }
  ];

  return (
    <div className="font-sans text-[#0D2342] bg-white antialiased">
      
      {/* ============================================ */}
      {/* NAVBAR */}
      {/* ============================================ */}
      <Navbar isScrolled={isScrolled} />

      {/* ============================================ */}
      {/* HERO SECTION */}
      {/* ============================================ */}
      <section className="relative min-h-screen flex items-center pt-24 pb-20 overflow-hidden bg-gradient-to-br from-[#0D2342] via-[#0D2342] to-[#17C3B2]/20">
        {/* Background Elements */}
        <FloatingShape size={400} color="#17C3B2" blur={150} top="10%" right="-10%" shape="circle" />
        <FloatingShape size={300} color="#C9A14A" blur={120} bottom="10%" left="-5%" shape="blob" />
        <FloatingShape size={200} color="#17C3B2" blur={80} top="50%" left="20%" shape="square" />
        
        {/* Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `radial-gradient(#17C3B2 1px, transparent 1px)`,
            backgroundSize: '30px 30px'
          }}
        />

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Breadcrumb */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex items-center gap-2 text-slate-400 text-sm mb-6"
              >
                <Link to="/" className="hover:text-[#17C3B2] transition-colors">Home</Link>
                <ChevronRight size={14} />
                <Link to="/services" className="hover:text-[#17C3B2] transition-colors">Services</Link>
                <ChevronRight size={14} />
                <span className="text-[#17C3B2]">Web Development</span>
              </motion.div>

              <motion.span 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#17C3B2]/20 border border-[#17C3B2]/30 rounded-full text-[#17C3B2] text-sm font-medium mb-6"
              >
                <Globe size={16} />
                Web Development Services
              </motion.span>
              
              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6"
              >
                We Manage Your
                <motion.span 
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                  className="block text-[#17C3B2]"
                >
                  Web Development
                </motion.span>
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="text-lg text-slate-300 mb-8 leading-relaxed max-w-xl"
              >
                At YourSoft Digital, we pride ourselves on efficiently managing top-notch web development services tailored to each client's unique needs. Our agile approach ensures seamless communication and collaboration throughout the project lifecycle.
              </motion.p>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="flex flex-col sm:flex-row gap-4 mb-10"
              >
                <Button size="lg" variant="primary" onClick={() => navigate('/contact')}>
                  Get Free Consultation
                  <ArrowRight size={18} />
                </Button>
                <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10">
                  <Play size={18} className="text-[#17C3B2]" />
                  Watch Our Work
                </Button>
              </motion.div>
              
              {/* Trust Indicators */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
                className="flex flex-wrap items-center gap-6 text-sm text-slate-400"
              >
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-[#17C3B2]" />
                  <span>500+ Projects Delivered</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield size={16} className="text-[#17C3B2]" />
                  <span>100% Secure Development</span>
                </div>
              </motion.div>
            </motion.div>
            
            {/* Right Content - Code Animation */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative hidden lg:block"
            >
              <div className="relative">
                {/* Main Code Window */}
                <motion.div 
                  whileHover={{ y: -5 }}
                  className="bg-[#1a1a2e] rounded-2xl overflow-hidden shadow-2xl border border-white/10"
                >
                  {/* Window Header */}
                  <div className="bg-[#0f0f1a] px-4 py-3 flex items-center gap-2 border-b border-white/5">
                    <div className="flex gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500" />
                      <div className="w-3 h-3 rounded-full bg-yellow-500" />
                      <div className="w-3 h-3 rounded-full bg-green-500" />
                    </div>
                    <div className="flex-1 text-center text-slate-500 text-xs">
                      index.tsx — YourSoft Digital
                    </div>
                  </div>
                  
                  {/* Code Content */}
                  <div className="p-6 font-mono text-sm overflow-hidden">
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1, duration: 0.5 }}
                    >
                      <span className="text-purple-400">import</span>
                      <span className="text-white"> {'{'} </span>
                      <span className="text-[#17C3B2]">createWebsite</span>
                      <span className="text-white"> {'}'} </span>
                      <span className="text-purple-400">from</span>
                      <span className="text-[#C9A14A]"> 'yoursoft-digital'</span>
                      <span className="text-white">;</span>
                    </motion.div>
                    
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.2, duration: 0.5 }}
                      className="mt-4"
                    >
                      <span className="text-purple-400">const</span>
                      <span className="text-[#17C3B2]"> website</span>
                      <span className="text-white"> = </span>
                      <span className="text-yellow-400">createWebsite</span>
                      <span className="text-white">{'({'}</span>
                    </motion.div>
                    
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.4, duration: 0.5 }}
                      className="ml-4"
                    >
                      <span className="text-slate-500">// Your dream website</span>
                    </motion.div>
                    
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.6, duration: 0.5 }}
                      className="ml-4"
                    >
                      <span className="text-[#17C3B2]">design</span>
                      <span className="text-white">: </span>
                      <span className="text-[#C9A14A]">'stunning'</span>
                      <span className="text-white">,</span>
                    </motion.div>
                    
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.8, duration: 0.5 }}
                      className="ml-4"
                    >
                      <span className="text-[#17C3B2]">performance</span>
                      <span className="text-white">: </span>
                      <span className="text-[#C9A14A]">'blazing-fast'</span>
                      <span className="text-white">,</span>
                    </motion.div>
                    
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 2, duration: 0.5 }}
                      className="ml-4"
                    >
                      <span className="text-[#17C3B2]">responsive</span>
                      <span className="text-white">: </span>
                      <span className="text-purple-400">true</span>
                      <span className="text-white">,</span>
                    </motion.div>
                    
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 2.2, duration: 0.5 }}
                      className="ml-4"
                    >
                      <span className="text-[#17C3B2]">seo</span>
                      <span className="text-white">: </span>
                      <span className="text-[#C9A14A]">'optimized'</span>
                    </motion.div>
                    
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 2.4, duration: 0.5 }}
                    >
                      <span className="text-white">{'});'}</span>
                    </motion.div>
                    
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 2.6, duration: 0.5 }}
                      className="mt-4"
                    >
                      <span className="text-slate-500">// Result: Success! 🚀</span>
                    </motion.div>
                  </div>
                </motion.div>

                {/* Floating Badge */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 2.8 }}
                  className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-2xl p-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-[#17C3B2]/10 flex items-center justify-center">
                      <Rocket size={24} className="text-[#17C3B2]" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-[#0D2342]">Deploy Ready</div>
                      <div className="text-xs text-slate-500">In just 4 weeks</div>
                    </div>
                  </div>
                </motion.div>

                {/* Floating Tech Icons */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 3 }}
                  className="absolute -top-4 -right-4 bg-[#17C3B2] rounded-xl shadow-xl p-3"
                >
                  <Code size={24} className="text-white" />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" className="w-full h-20" preserveAspectRatio="none">
            <path fill="white" d="M0,64 C480,150 960,-20 1440,64 L1440,120 L0,120 Z" />
          </svg>
        </div>
      </section>

      {/* ============================================ */}
      {/* STATS SECTION */}
      {/* ============================================ */}
      <Section className="!py-16 -mt-1">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <div className="text-4xl md:text-5xl font-bold text-[#0D2342] mb-2">
                <AnimatedCounter end={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-slate-500 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* ============================================ */}
      {/* SERVICES OVERVIEW */}
      {/* ============================================ */}
      <Section gray>
        <SectionHeader 
          badge="Our Expertise"
          title="Comprehensive Web Development Services"
          subtitle="From front-end design to back-end architecture, we deliver complete web solutions that drive business growth."
        />

        <div className="grid lg:grid-cols-3 gap-8">
          {services.slice(0, 6).map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full group">
                <motion.div 
                  whileHover={{ rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 0.5 }}
                  className="w-14 h-14 rounded-xl mb-6 flex items-center justify-center transition-colors"
                  style={{ backgroundColor: `${service.color}20` }}
                >
                  <service.icon size={28} style={{ color: service.color }} />
                </motion.div>
                
                <h3 className="text-xl font-bold text-[#0D2342] mb-3 group-hover:text-[#17C3B2] transition-colors">
                  {service.title}
                </h3>
                
                <p className="text-slate-500 mb-6 leading-relaxed">
                  {service.description}
                </p>
                
                <ul className="space-y-2 mb-6">
                  {service.features.slice(0, 4).map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-slate-600">
                      <Check size={14} className="text-[#17C3B2] flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <Button 
                  variant="ghost" 
                  className="p-0 text-[#17C3B2] hover:text-[#0D2342]"
                  onClick={() => setActiveService(index)}
                >
                  Learn More
                  <ArrowRight size={16} />
                </Button>
              </Card>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* ============================================ */}
      {/* DETAILED SERVICE SECTION */}
      {/* ============================================ */}
      <Section>
        <SectionHeader 
          badge="Deep Dive"
          title="Technology Excellence"
          subtitle="Explore our specialized development services and technologies."
        />

        <div className="grid lg:grid-cols-12 gap-8">
          {/* Service Tabs */}
          <div className="lg:col-span-4">
            <div className="sticky top-24 space-y-2">
              {services.map((service, index) => (
                <motion.button
                  key={service.id}
                  onClick={() => setActiveService(index)}
                  whileHover={{ x: 5 }}
                  className={`w-full flex items-center gap-4 p-4 rounded-xl text-left transition-all ${
                    activeService === index 
                      ? 'bg-[#0D2342] text-white shadow-lg' 
                      : 'bg-white border border-slate-200 hover:border-[#17C3B2] hover:shadow-md'
                  }`}
                >
                  <div 
                    className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      activeService === index ? 'bg-white/20' : ''
                    }`}
                    style={{ backgroundColor: activeService === index ? undefined : `${service.color}20` }}
                  >
                    <service.icon 
                      size={20} 
                      style={{ color: activeService === index ? '#17C3B2' : service.color }} 
                    />
                  </div>
                  <span className="font-medium">{service.title}</span>
                  {activeService === index && (
                    <ChevronRight size={16} className="ml-auto" />
                  )}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Service Content */}
          <div className="lg:col-span-8">
            <motion.div
              key={activeService}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card hover={false} className="p-10">
                <div 
                  className="w-16 h-16 rounded-2xl mb-6 flex items-center justify-center"
                  style={{ backgroundColor: `${services[activeService].color}20` }}
                >
                  {React.createElement(services[activeService].icon, {
                    size: 32,
                    style: { color: services[activeService].color }
                  })}
                </div>

                <h3 className="text-3xl font-bold text-[#0D2342] mb-4">
                  {services[activeService].title}
                </h3>

                <p className="text-slate-500 text-lg leading-relaxed mb-8">
                  {services[activeService].fullDescription}
                </p>

                <h4 className="font-bold text-[#0D2342] mb-4">Key Features:</h4>
                <div className="grid md:grid-cols-2 gap-3 mb-8">
                  {services[activeService].features.map((feature, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg"
                    >
                      <CheckCircle2 size={18} className="text-[#17C3B2] flex-shrink-0" />
                      <span className="text-slate-700">{feature}</span>
                    </motion.div>
                  ))}
                </div>

                <h4 className="font-bold text-[#0D2342] mb-4">Technologies We Use:</h4>
                <div className="flex flex-wrap gap-2 mb-8">
                  {services[activeService].technologies.map((tech, i) => (
                                        <motion.span 
                      key={i}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.05 }}
                      className="px-4 py-2 bg-[#0D2342]/5 rounded-lg text-sm font-medium text-[#0D2342]"
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button variant="primary" onClick={() => navigate('/contact')}>
                    Start Your Project
                    <ArrowRight size={16} />
                  </Button>
                  <Button variant="outline">
                    View Portfolio
                    <ExternalLink size={16} />
                  </Button>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </Section>

      {/* ============================================ */}
      {/* PROCESS SECTION */}
      {/* ============================================ */}
      <Section dark>
        <SectionHeader 
          badge="Our Process"
          title="How We Build Your Website"
          subtitle="A proven methodology that ensures quality, transparency, and on-time delivery."
          light
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {processSteps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative"
            >
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 h-full hover:bg-white/10 transition-all group">
                {/* Step Number */}
                <div className="absolute -top-4 -left-2 text-6xl font-black text-[#17C3B2]/20">
                  {step.step}
                </div>
                
                <div className="relative z-10">
                  <motion.div 
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                    className="w-14 h-14 rounded-xl bg-[#17C3B2]/20 flex items-center justify-center mb-6 group-hover:bg-[#17C3B2] transition-colors"
                  >
                    <step.icon size={24} className="text-[#17C3B2] group-hover:text-white transition-colors" />
                  </motion.div>
                  
                  <h3 className="text-xl font-bold text-white mb-3">
                    {step.title}
                  </h3>
                  
                  <p className="text-slate-400 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>

              {/* Connector Line */}
              {index < processSteps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-3 w-6 border-t-2 border-dashed border-[#17C3B2]/30" />
              )}
            </motion.div>
          ))}
        </div>
      </Section>

      {/* ============================================ */}
      {/* PLATFORMS SECTION */}
      {/* ============================================ */}
      <Section gray>
        <SectionHeader 
          badge="Platforms"
          title="Build for Every Platform"
          subtitle="From web apps to mobile-responsive designs, we create solutions that work everywhere."
        />

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {platforms.map((platform, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -8, scale: 1.05 }}
              className="bg-white border border-slate-200 rounded-2xl p-6 text-center hover:shadow-xl hover:border-[#17C3B2]/30 transition-all cursor-pointer group"
            >
              <motion.div 
                whileHover={{ rotate: [0, -10, 10, 0] }}
                className="w-14 h-14 mx-auto rounded-xl bg-[#0D2342]/5 flex items-center justify-center mb-4 group-hover:bg-[#17C3B2] transition-colors"
              >
                <platform.icon size={24} className="text-[#0D2342] group-hover:text-white transition-colors" />
              </motion.div>
              <h4 className="font-medium text-[#0D2342] text-sm group-hover:text-[#17C3B2] transition-colors">
                {platform.name}
              </h4>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* ============================================ */}
      {/* WHY CHOOSE US SECTION */}
      {/* ============================================ */}
      <Section>
        <SectionHeader 
          badge="Why Choose Us"
          title="The Yoursoft Digital Advantage"
          subtitle="What sets us apart from other web development agencies."
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {whyChooseUs.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full text-center group">
                <motion.div 
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-[#17C3B2]/10 to-[#0D2342]/10 flex items-center justify-center mb-6 group-hover:from-[#17C3B2] group-hover:to-[#17C3B2] transition-all"
                >
                  <item.icon size={28} className="text-[#17C3B2] group-hover:text-white transition-colors" />
                </motion.div>
                
                <h3 className="text-xl font-bold text-[#0D2342] mb-3 group-hover:text-[#17C3B2] transition-colors">
                  {item.title}
                </h3>
                
                <p className="text-slate-500 leading-relaxed">
                  {item.description}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* ============================================ */}
      {/* TECHNOLOGIES SHOWCASE */}
      {/* ============================================ */}
      <Section gray>
        <SectionHeader 
          badge="Tech Stack"
          title="Technologies We Master"
          subtitle="We stay ahead of the curve with cutting-edge technologies."
        />

        <div className="relative">
          {/* Scrolling Tech Logos */}
          <div className="flex overflow-hidden">
            <motion.div 
              animate={{ x: [0, -1920] }}
              transition={{ 
                duration: 30, 
                repeat: Infinity, 
                ease: "linear" 
              }}
              className="flex gap-12 items-center"
            >
              {[
                'React', 'Angular', 'Vue.js', 'Next.js', 'Node.js', 
                'PHP', 'Laravel', '.NET', 'Python', 'Django',
                'WordPress', 'Shopify', 'MongoDB', 'PostgreSQL', 'AWS',
                'React', 'Angular', 'Vue.js', 'Next.js', 'Node.js', 
                'PHP', 'Laravel', '.NET', 'Python', 'Django',
              ].map((tech, i) => (
                <div 
                  key={i}
                  className="flex-shrink-0 px-8 py-4 bg-white rounded-xl shadow-sm border border-slate-200 font-medium text-[#0D2342]"
                >
                  {tech}
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </Section>

      {/* ============================================ */}
      {/* FAQ SECTION */}
      {/* ============================================ */}
      <Section>
        <SectionHeader 
          badge="FAQ"
          title="Frequently Asked Questions"
          subtitle="Get answers to common questions about our web development services."
        />

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <motion.div
                className={`border rounded-2xl overflow-hidden transition-all ${
                  activeFaq === index 
                    ? 'border-[#17C3B2] shadow-lg shadow-[#17C3B2]/10' 
                    : 'border-slate-200 hover:border-[#17C3B2]/50'
                }`}
              >
                <button
                  onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                  className="w-full flex items-center justify-between p-6 text-left bg-white hover:bg-slate-50 transition-colors"
                >
                  <span className="font-semibold text-[#0D2342] pr-4">
                    {faq.question}
                  </span>
                  <motion.div
                    animate={{ rotate: activeFaq === index ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                      activeFaq === index ? 'bg-[#17C3B2] text-white' : 'bg-slate-100 text-[#0D2342]'
                    }`}
                  >
                    <ChevronDown size={18} />
                  </motion.div>
                </button>
                
                <motion.div
                  initial={false}
                  animate={{ 
                    height: activeFaq === index ? 'auto' : 0,
                    opacity: activeFaq === index ? 1 : 0
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-6 text-slate-500 leading-relaxed border-t border-slate-100 pt-4">
                    {faq.answer}
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-slate-500 mb-4">Still have questions?</p>
          <Button variant="outline" onClick={() => navigate('/contact')}>
            <MessageSquare size={16} />
            Contact Our Team
          </Button>
        </motion.div>
      </Section>

      {/* ============================================ */}
      {/* CTA SECTION */}
      {/* ============================================ */}
      <Section dark className="!py-24">
        {/* Background Elements */}
        <FloatingShape size={300} color="#17C3B2" blur={150} top="-20%" left="10%" shape="circle" />
        <FloatingShape size={250} color="#C9A14A" blur={100} bottom="-10%" right="5%" shape="blob" />

        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-[#17C3B2]/20 border border-[#17C3B2]/30 rounded-full text-[#17C3B2] text-sm font-medium mb-6">
              <Rocket size={16} />
              Ready to Get Started?
            </span>
            
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Let's Build Something
              <span className="text-[#17C3B2]"> Amazing </span>
              Together
            </h2>
            
            <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
              Get a free consultation and project estimate. Our team is ready to turn your vision into reality.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button size="lg" variant="primary" onClick={() => navigate('/contact')}>
                Get Free Consultation
                <ArrowRight size={18} />
              </Button>
              <Button size="lg" variant="white">
                <Phone size={18} />
                +1 (416) 555-0123
              </Button>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-slate-400">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-[#17C3B2]" />
                <span>Free Consultation</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-[#17C3B2]" />
                <span>No Obligations</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-[#17C3B2]" />
                <span>24hr Response Time</span>
              </div>
            </div>
          </motion.div>
        </div>
      </Section>

      {/* ============================================ */}
      {/* FOOTER */}
      {/* ============================================ */}
      <Footer />

      {/* ============================================ */}
      {/* BACK TO TOP */}
      {/* ============================================ */}
      <BackToTop />
    </div>
  );
}