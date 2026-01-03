import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowRight, Check, ChevronDown, Code, Globe, Layers, 
  Zap, Shield, Star, Play, Rocket, CheckCircle2, 
  Monitor, Smartphone, Server, Database, Layout, 
  FileCode, Settings, Users, Clock, Award, Target,
  ArrowUp, MessageSquare, Phone, Mail, ExternalLink,
  Cpu, GitBranch, Palette, ShoppingCart, Search,
  BarChart3, Lock, RefreshCw, Headphones, ThumbsUp,
  Menu, X, ChevronRight, MapPin, Linkedin, Twitter, Github,
  TrendingUp, Loader2, TabletSmartphone, Blocks,
  Sparkles, Gauge, TestTube, CloudUpload, Wrench,
  CircleDot, Repeat, Bot, Watch, Tv, Car, Gamepad2
} from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import logo from "../Images/Logo/logo.png";

// ============================================
// 🎨 SHARED COMPONENTS
// ============================================

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
        
        <div className="hidden lg:flex items-center gap-8">
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

        <button 
          className={`lg:hidden p-2 rounded-lg transition-colors ${
            isScrolled ? 'text-[#0D2342] hover:bg-slate-100' : 'text-white hover:bg-white/10'
          }`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isMobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="lg:hidden bg-white border-t border-slate-100 shadow-lg max-h-[80vh] overflow-y-auto"
        >
          <div className="px-6 py-4 space-y-1">
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
      <FloatingShape size={300} color="#17C3B2" blur={150} top="-20%" right="-10%" shape="circle" />
      <FloatingShape size={200} color="#C9A14A" blur={100} bottom="10%" left="-5%" shape="blob" />
      
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
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
// 📱 APP DEVELOPMENT PAGE
// ============================================

export default function AppDevelopmentPage() {
  const navigate = useNavigate();
  const [activeService, setActiveService] = useState(0);
  const [activeFaq, setActiveFaq] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);

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
      id: 'ios',
      title: 'iPhone App Development',
      icon: Smartphone,
      color: '#000000',
      description: 'iPhone development stands as a testament to our commitment to innovation at Yoursoft Digital.',
      fullDescription: 'With a keen focus on creating seamless and immersive iOS experiences, our team leverages cutting-edge technologies to craft bespoke applications tailored exclusively for the iPhone ecosystem. We harness the power of Swift and Objective-C programming languages, along with Apple\'s robust frameworks, to build scalable, high-performance applications.',
      features: [
        'Native iOS Development',
        'Swift & Objective-C',
        'App Store Optimization',
        'Apple Watch Integration',
        'ARKit & Core ML',
        'In-App Purchases'
      ],
      technologies: ['Swift', 'SwiftUI', 'UIKit', 'Core Data', 'ARKit', 'CloudKit']
    },
    {
      id: 'android',
      title: 'Android App Development',
      icon: TabletSmartphone,
      color: '#3DDC84',
      description: 'Our expertise extends beyond web-based solutions to encompass cutting-edge Android development.',
      fullDescription: 'Leveraging the power of Java and Kotlin, our adept team crafts versatile, high-performing, and user-centric Android applications. We specialize in creating intuitive user interfaces, seamless navigation, and robust functionalities that align with your brand\'s vision.',
      features: [
        'Native Android Development',
        'Kotlin & Java',
        'Material Design 3',
        'Google Play Optimization',
        'Firebase Integration',
        'Wear OS Apps'
      ],
      technologies: ['Kotlin', 'Java', 'Jetpack Compose', 'Room', 'Firebase', 'Retrofit']
    },
    {
      id: 'hybrid',
      title: 'Hybrid App Development',
      icon: Blocks,
      color: '#61DAFB',
      description: 'Hybrid app development stands as a versatile approach in the realm of mobile application creation.',
      fullDescription: 'Blending the best of both native and web applications, hybrid apps are designed to function across multiple platforms while utilizing a single codebase. This methodology allows developers to craft applications that offer a seamless user experience.',
      features: [
        'Cross-Platform Development',
        'Single Codebase',
        'React Native & Flutter',
        'Cost-Effective Solution',
        'Faster Time-to-Market',
        'Native-Like Performance'
      ],
      technologies: ['React Native', 'Flutter', 'Ionic', 'Expo', 'Dart', 'TypeScript']
    },
    {
      id: 'pwa',
      title: 'Progressive Web Apps',
      icon: Globe,
      color: '#5A0FC8',
      description: 'Progressive Web Apps bridge the gap between web and mobile experiences.',
      fullDescription: 'PWAs offer the best of both worlds - the reach of the web with the experience of a native app. They work offline, send push notifications, and can be installed on home screens without app store deployment.',
      features: [
        'Offline Functionality',
        'Push Notifications',
        'App-Like Experience',
        'No App Store Required',
        'Automatic Updates',
        'SEO Friendly'
      ],
      technologies: ['Service Workers', 'Web App Manifest', 'Workbox', 'IndexedDB', 'Cache API', 'PWA Builder']
    },
    {
      id: 'enterprise',
      title: 'Enterprise Mobile Solutions',
      icon: Shield,
      color: '#0D2342',
      description: 'Secure, scalable enterprise mobile solutions designed for business transformation.',
      fullDescription: 'We develop enterprise-grade mobile applications that streamline business processes, enhance productivity, and enable digital transformation. Our solutions include employee apps, field service applications, and custom CRM integrations.',
      features: [
        'Enterprise Security',
        'MDM Integration',
        'Custom Workflows',
        'Analytics Dashboard',
        'API Integration',
        'Compliance Ready'
      ],
      technologies: ['SAP Integration', 'Microsoft Azure', 'Okta', 'MobileIron', 'Salesforce', 'Custom APIs']
    },
    {
      id: 'maintenance',
      title: 'App Maintenance & Support',
      icon: Wrench,
      color: '#C9A14A',
      description: 'Comprehensive app maintenance and support to keep your applications running smoothly.',
      fullDescription: 'Our maintenance services ensure your mobile applications remain up-to-date, secure, and performant. We provide regular updates, bug fixes, performance optimization, and security patches.',
      features: [
        'Regular Updates',
        'Bug Fixes',
        'Performance Monitoring',
        'Security Patches',
        'Feature Enhancements',
        '24/7 Support'
      ],
      technologies: ['Crashlytics', 'Firebase Analytics', 'AppDynamics', 'New Relic', 'Sentry', 'TestFlight']
    }
  ];

  // Process Steps
  const processSteps = [
    {
      step: '01',
      title: 'Discovery & Strategy',
      description: 'We analyze your business goals, target audience, and market to define the perfect app strategy.',
      icon: Target
    },
    {
      step: '02',
      title: 'UI/UX Design',
      description: 'Our designers create intuitive, engaging interfaces that users love to interact with.',
      icon: Palette
    },
    {
      step: '03',
      title: 'Development',
      description: 'Expert developers bring your app to life using the latest technologies and best practices.',
      icon: Code
    },
    {
      step: '04',
      title: 'Quality Assurance',
      description: 'Rigorous testing across devices ensures your app performs flawlessly everywhere.',
      icon: TestTube
    },
    {
      step: '05',
      title: 'App Store Launch',
      description: 'We handle the submission process for App Store and Google Play with ASO optimization.',
      icon: CloudUpload
    },
    {
      step: '06',
      title: 'Support & Updates',
      description: 'Ongoing maintenance and updates keep your app secure, fresh, and competitive.',
      icon: RefreshCw
    }
  ];

  // Platforms
  const platforms = [
    { name: 'iPhone', icon: Smartphone },
    { name: 'iPad', icon: TabletSmartphone },
    { name: 'Android Phone', icon: Smartphone },
    { name: 'Android Tablet', icon: TabletSmartphone },
    { name: 'Apple Watch', icon: Watch },
    { name: 'Apple TV', icon: Tv },
    { name: 'Android TV', icon: Tv },
    { name: 'Automotive', icon: Car },
  ];

  // Stats
  const stats = [
    { value: 200, suffix: '+', label: 'Apps Launched' },
    { value: 50, suffix: 'M+', label: 'App Downloads' },
    { value: 4.8, suffix: '★', label: 'Average Rating' },
    { value: 99, suffix: '%', label: 'Client Satisfaction' },
  ];

  // FAQs
  const faqs = [
    {
      question: 'How long does it take to develop a mobile app?',
      answer: 'Development timelines vary based on complexity. A simple app takes 2-3 months, while complex apps can take 4-9 months. We provide detailed timelines during the discovery phase based on your specific requirements.'
    },
    {
      question: 'Should I build a native app or a hybrid app?',
      answer: 'It depends on your requirements. Native apps offer the best performance and user experience but require separate codebases. Hybrid apps are more cost-effective and faster to develop. We help you choose the best approach based on your goals, budget, and timeline.'
    },
    {
      question: 'How much does app development cost?',
      answer: 'App development costs vary widely based on complexity, features, and platforms. Simple apps start around $25,000, while complex enterprise apps can exceed $150,000. We provide detailed quotes after understanding your requirements.'
    },
    {
      question: 'Do you help with app store submission?',
      answer: 'Yes! We handle the entire submission process for both App Store and Google Play, including app store optimization (ASO) to maximize visibility and downloads.'
    },
    {
      question: 'What happens after the app is launched?',
      answer: 'We offer comprehensive post-launch support including bug fixes, performance monitoring, security updates, and feature enhancements. We also provide analytics insights to help you understand user behavior and improve your app.'
    },
    {
      question: 'Can you update or fix an existing app?',
      answer: 'Absolutely! We regularly work with clients to update, optimize, or completely rebuild existing applications. Whether you need bug fixes, new features, or a complete redesign, we can help.'
    }
  ];

  // Why Choose Us
  const whyChooseUs = [
    {
      icon: Sparkles,
      title: 'User-Centric Design',
      description: 'Beautiful, intuitive interfaces that users love and keep coming back to.'
    },
    {
      icon: Gauge,
      title: 'High Performance',
      description: 'Lightning-fast apps optimized for smooth performance on all devices.'
    },
    {
      icon: Shield,
      title: 'Enterprise Security',
      description: 'Bank-level security measures to protect user data and business assets.'
    },
    {
      icon: Repeat,
      title: 'Agile Development',
      description: 'Flexible, iterative approach with regular updates and transparent communication.'
    },
    {
      icon: Award,
      title: 'Award-Winning Team',
      description: 'Experienced developers with a track record of successful app launches.'
    },
    {
      icon: Headphones,
      title: 'Dedicated Support',
      description: 'Round-the-clock support from our Canadian team whenever you need help.'
    }
  ];

  // App Categories
  const appCategories = [
    { name: 'E-Commerce', icon: ShoppingCart },
    { name: 'Social Media', icon: MessageSquare },
    { name: 'Healthcare', icon: Shield },
    { name: 'Finance', icon: BarChart3 },
    { name: 'Education', icon: Award },
    { name: 'Gaming', icon: Gamepad2 },
    { name: 'Travel', icon: MapPin },
    { name: 'AI & ML', icon: Bot },
  ];

  return (
    <div className="font-sans text-[#0D2342] bg-white antialiased">
      
      {/* NAVBAR */}
      <Navbar isScrolled={isScrolled} />

      {/* ============================================ */}
      {/* HERO SECTION */}
      {/* ============================================ */}
      <section className="relative min-h-screen flex items-center pt-24 pb-20 overflow-hidden bg-gradient-to-br from-[#0D2342] via-[#0D2342] to-[#17C3B2]/20">
        <FloatingShape size={400} color="#17C3B2" blur={150} top="10%" right="-10%" shape="circle" />
        <FloatingShape size={300} color="#C9A14A" blur={120} bottom="10%" left="-5%" shape="blob" />
        <FloatingShape size={200} color="#17C3B2" blur={80} top="50%" left="20%" shape="square" />
        
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
                <span className="text-[#17C3B2]">App Development</span>
              </motion.div>

              <motion.span 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#17C3B2]/20 border border-[#17C3B2]/30 rounded-full text-[#17C3B2] text-sm font-medium mb-6"
              >
                <Smartphone size={16} />
                App Development Services
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
                  App Development
                </motion.span>
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="text-lg text-slate-300 mb-8 leading-relaxed max-w-xl"
              >
                At YourSoft Digital, our approach to managing app development services is rooted in innovation and tailored solutions. We collaborate closely with clients, leveraging our agile methodologies to translate ideas into intuitive and impactful mobile applications.
              </motion.p>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="flex flex-col sm:flex-row gap-4 mb-10"
              >
                <Button size="lg" variant="primary" onClick={() => navigate('/contact')}>
                  Start Your App Project
                  <ArrowRight size={18} />
                </Button>
                <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10">
                  <Play size={18} className="text-[#17C3B2]" />
                  View Our Apps
                </Button>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
                className="flex flex-wrap items-center gap-6 text-sm text-slate-400"
              >
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-[#17C3B2]" />
                  <span>200+ Apps Launched</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star size={16} className="text-[#17C3B2] fill-[#17C3B2]" />
                  <span>4.8★ Average Rating</span>
                </div>
              </motion.div>
            </motion.div>
            
            {/* Right Content - Phone Mockup */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative hidden lg:flex justify-center items-center"
            >
              <div className="relative">
                <motion.div 
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="relative z-10"
                >
                  <div className="w-[280px] h-[560px] bg-[#1a1a2e] rounded-[50px] p-3 shadow-2xl border-4 border-[#2a2a4e]">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-[#1a1a2e] rounded-b-3xl z-20" />
                    
                    <div className="w-full h-full bg-gradient-to-b from-[#17C3B2] to-[#0D2342] rounded-[40px] overflow-hidden relative">
                      <div className="flex justify-between items-center px-6 pt-4 text-white text-xs">
                        <span>9:41</span>
                        <div className="flex gap-1">
                          <div className="w-4 h-2 border border-white rounded-sm">
                            <div className="w-3/4 h-full bg-white rounded-sm" />
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-6 pt-8">
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 1.2 }}
                          className="text-white text-2xl font-bold mb-2"
                        >
                          Welcome Back 👋
                        </motion.div>
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 1.4 }}
                          className="text-white/70 text-sm mb-8"
                        >
                          Your app is ready
                        </motion.div>
                        
                        {[1, 2, 3].map((_, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 1.6 + i * 0.2 }}
                            className="bg-white/10 backdrop-blur-sm rounded-xl p-4 mb-3 flex items-center gap-3"
                          >
                            <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center">
                              {i === 0 && <Zap size={20} className="text-[#C9A14A]" />}
                              {i === 1 && <Shield size={20} className="text-green-400" />}
                              {i === 2 && <BarChart3 size={20} className="text-blue-400" />}
                            </div>
                            <div className="flex-1">
                              <div className="text-white text-sm font-medium">
                                {i === 0 && 'Fast Performance'}
                                {i === 1 && 'Secure & Safe'}
                                {i === 2 && 'Analytics'}
                              </div>
                              <div className="text-white/50 text-xs">
                                {i === 0 && '99.9% uptime'}
                                {i === 1 && 'End-to-end encrypted'}
                                {i === 2 && 'Real-time insights'}
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                      
                      <div className="absolute bottom-6 left-6 right-6 bg-white/10 backdrop-blur-md rounded-2xl p-4 flex justify-around">
                        {[CircleDot, Search, Settings, Users].map((Icon, i) => (
                          <motion.div
                            key={i}
                            whileHover={{ scale: 1.2 }}
                            className={`p-2 rounded-xl ${i === 0 ? 'bg-white/20' : ''}`}
                          >
                            <Icon size={20} className="text-white" />
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 2 }}
                  className="absolute -left-16 top-20 bg-white rounded-xl shadow-2xl p-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                      <CheckCircle2 size={20} className="text-green-500" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#0D2342]">App Launched!</div>
                      <div className="text-xs text-slate-500">App Store & Play Store</div>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 2.2 }}
                  className="absolute -right-12 bottom-32 bg-white rounded-xl shadow-2xl p-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#17C3B2]/10 flex items-center justify-center">
                      <Star size={20} className="text-[#C9A14A] fill-[#C9A14A]" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#0D2342]">4.8 Rating</div>
                      <div className="text-xs text-slate-500">10K+ Reviews</div>
                    </div>
                  </div>
                </motion.div>

                <div className="absolute inset-0 bg-gradient-to-r from-[#17C3B2]/20 to-[#C9A14A]/20 blur-3xl -z-10" />
              </div>
            </motion.div>
          </div>
        </div>

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
                {typeof stat.value === 'number' && stat.value < 10 ? (
                  <>{stat.value}{stat.suffix}</>
                ) : (
                  <AnimatedCounter end={typeof stat.value === 'number' ? stat.value : 0} suffix={stat.suffix} />
                )}
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
          title="Comprehensive App Development Services"
          subtitle="From iOS to Android, native to hybrid – we build mobile applications that users love and businesses rely on."
        />

        <div className="grid lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
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
                  style={{ backgroundColor: `${service.color}15` }}
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
          subtitle="Explore our specialized app development services and technologies."
        />

        <div className="grid lg:grid-cols-12 gap-8">
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
                    style={{ backgroundColor: activeService === index ? undefined : `${service.color}15` }}
                  >
                    <service.icon 
                      size={20} 
                      style={{ color: activeService === index ? '#17C3B2' : service.color }} 
                    />
                  </div>
                  <span className="font-medium text-sm">{service.title}</span>
                  {activeService === index && (
                    <ChevronRight size={16} className="ml-auto" />
                  )}
                </motion.button>
              ))}
            </div>
          </div>

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
                  style={{ backgroundColor: `${services[activeService].color}15` }}
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
                    View App Portfolio
                                        <ExternalLink size={16} />
                  </Button>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </Section>

      {/* ============================================ */}
      {/* PLATFORMS SECTION */}
      {/* ============================================ */}
      <Section gray>
        <SectionHeader 
          badge="Platforms"
          title="We Work Across All Platforms"
          subtitle="From smartphones to smartwatches, we build apps that run everywhere your users are."
        />

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
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
                className="w-12 h-12 mx-auto rounded-xl bg-[#0D2342]/5 flex items-center justify-center mb-3 group-hover:bg-[#17C3B2] transition-colors"
              >
                <platform.icon size={24} className="text-[#0D2342] group-hover:text-white transition-colors" />
              </motion.div>
              <h4 className="font-medium text-[#0D2342] text-xs group-hover:text-[#17C3B2] transition-colors">
                {platform.name}
              </h4>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* ============================================ */}
      {/* APP CATEGORIES SECTION */}
      {/* ============================================ */}
      <Section>
        <SectionHeader 
          badge="Industries"
          title="Apps for Every Industry"
          subtitle="We have experience building successful apps across various industries and use cases."
        />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {appCategories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group cursor-pointer"
            >
              <Card className="text-center h-full">
                <motion.div 
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-[#17C3B2]/10 to-[#0D2342]/10 flex items-center justify-center mb-4 group-hover:from-[#17C3B2] group-hover:to-[#17C3B2] transition-all"
                >
                  <category.icon size={28} className="text-[#17C3B2] group-hover:text-white transition-colors" />
                </motion.div>
                <h4 className="font-bold text-[#0D2342] group-hover:text-[#17C3B2] transition-colors">
                  {category.name}
                </h4>
              </Card>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* ============================================ */}
      {/* PROCESS SECTION */}
      {/* ============================================ */}
      <Section dark>
        <SectionHeader 
          badge="Our Process"
          title="How We Build Your App"
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

              {index < processSteps.length - 1 && index % 3 !== 2 && (
                <div className="hidden lg:block absolute top-1/2 -right-3 w-6 border-t-2 border-dashed border-[#17C3B2]/30" />
              )}
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
          subtitle="What sets us apart from other app development agencies."
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
          subtitle="We stay ahead of the curve with cutting-edge mobile technologies."
        />

        <div className="relative overflow-hidden">
          <motion.div 
            animate={{ x: [0, -1920] }}
            transition={{ 
              duration: 30, 
              repeat: Infinity, 
              ease: "linear" 
            }}
            className="flex gap-8 items-center"
          >
            {[
              'Swift', 'Kotlin', 'React Native', 'Flutter', 'Java', 
              'Objective-C', 'Dart', 'TypeScript', 'Firebase', 'AWS',
              'SwiftUI', 'Jetpack Compose', 'Expo', 'Redux', 'GraphQL',
              'Swift', 'Kotlin', 'React Native', 'Flutter', 'Java', 
              'Objective-C', 'Dart', 'TypeScript', 'Firebase', 'AWS',
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
      </Section>

      {/* ============================================ */}
      {/* FAQ SECTION */}
      {/* ============================================ */}
      <Section>
        <SectionHeader 
          badge="FAQ"
          title="Frequently Asked Questions"
          subtitle="Get answers to common questions about our app development services."
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
              Ready to Launch Your App?
            </span>
            
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Let's Build Your
              <span className="text-[#17C3B2]"> Dream App </span>
              Together
            </h2>
            
            <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
              Get a free consultation and project estimate. Our team is ready to turn your app idea into reality.
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