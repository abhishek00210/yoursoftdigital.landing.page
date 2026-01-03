import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, Check, ChevronDown, Globe, Layers, 
  Zap, Shield, Star, Play, Rocket, CheckCircle2, 
  Monitor, Smartphone, Target,
  ArrowUp, MessageSquare, Phone, Mail, ExternalLink,
  Palette, ShoppingCart, Search,
  BarChart3, RefreshCw, Headphones, ThumbsUp,
  Menu, X, ChevronRight, MapPin, Linkedin, Twitter, Github,
  TrendingUp, Loader2, Share2, MousePointerClick,
  Megaphone, LineChart, Eye, Heart, 
  FileText, DollarSign, Sparkles,
  Award, Clock, Users, PenTool, Image, 
  Figma, Box, Brush, Type, Frame, Crop,
  Printer, Package, BookOpen, Newspaper, Video,
  Camera, Wand2, Shapes, Aperture, Lightbulb,
  Layers3, SwatchBook, Ruler, Grid3X3, CircleDot
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
      animate={{ y: [0, -30, 0], rotate: [0, 5, -5, 0] }}
      transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      style={{ width: size, height: size, backgroundColor: color, filter: `blur(${blur}px)`, top, left, right, bottom }}
      className={`absolute opacity-30 pointer-events-none ${shapeStyles[shape]} ${className}`}
    />
  );
};

const Button = ({ children, variant = 'primary', className = '', onClick, size = 'default', loading = false }) => {
  const sizes = { sm: "px-4 py-2 text-sm", default: "px-6 py-3 text-sm", lg: "px-8 py-4 text-base" };
  const variants = {
    primary: "bg-[#17C3B2] text-white hover:bg-[#14A697] shadow-lg shadow-[#17C3B2]/25",
    secondary: "bg-[#0D2342] text-white hover:bg-[#0A1B32] shadow-lg shadow-[#0D2342]/25",
    outline: "border-2 border-[#0D2342]/20 text-[#0D2342] hover:border-[#17C3B2] hover:bg-[#17C3B2]/5",
    white: "bg-white text-[#0D2342] hover:bg-slate-50 shadow-lg",
    ghost: "text-[#0D2342] hover:bg-[#0D2342]/5"
  };

  return (
    <motion.button onClick={onClick} disabled={loading} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
      className={`rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 ${sizes[size]} ${variants[variant]} ${className}`}
    >
      {loading ? <Loader2 className="animate-spin" size={18} /> : children}
    </motion.button>
  );
};

const Section = ({ children, className = "", id = "", dark = false, gray = false }) => (
  <section id={id} className={`py-20 md:py-28 px-6 relative overflow-hidden ${dark ? 'bg-[#0D2342] text-white' : ''} ${gray ? 'bg-slate-50' : ''} ${!dark && !gray ? 'bg-white' : ''} ${className}`}>
    <div className="max-w-6xl mx-auto relative z-10">{children}</div>
  </section>
);

const SectionHeader = ({ badge, title, subtitle, centered = true, light = false }) => (
  <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
    className={`mb-16 ${centered ? 'text-center max-w-3xl mx-auto' : ''}`}
  >
    {badge && (
      <motion.span initial={{ scale: 0.9, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} viewport={{ once: true }}
        className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold mb-4 uppercase tracking-wider ${light ? 'bg-white/10 text-[#17C3B2] border border-[#17C3B2]/30' : 'bg-[#17C3B2]/10 text-[#17C3B2] border border-[#17C3B2]/20'}`}
      >
        {badge}
      </motion.span>
    )}
    <h2 className={`text-3xl md:text-5xl font-bold mb-6 leading-tight ${light ? 'text-white' : 'text-[#0D2342]'}`}>{title}</h2>
    {subtitle && <p className={`text-lg md:text-xl leading-relaxed ${light ? 'text-slate-300' : 'text-slate-500'}`}>{subtitle}</p>}
  </motion.div>
);

const Card = ({ children, className = '', hover = true, padding = true }) => (
  <motion.div whileHover={hover ? { y: -8, transition: { duration: 0.3 } } : {}}
    className={`bg-white border border-slate-200 rounded-2xl ${hover ? 'hover:shadow-2xl hover:shadow-[#0D2342]/10 hover:border-[#17C3B2]/30 transition-all duration-300' : 'shadow-lg'} ${padding ? 'p-8' : ''} ${className}`}
  >
    {children}
  </motion.div>
);

const AnimatedCounter = ({ end, suffix = '' }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
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
    }, { threshold: 0.1 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end]);

  return <span ref={ref}>{count}{suffix}</span>;
};

const BackToTop = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShow(window.scrollY > 500);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: show ? 1 : 0, y: show ? 0 : 20 }}
      whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
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
  { label: 'Web Development', href: '/services/web-development', icon: Globe, description: 'Custom websites & web apps' },
  { label: 'App Development', href: '/services/app-development', icon: Smartphone, description: 'iOS & Android applications' },
  { label: 'Digital Marketing', href: '/services/digital-marketing', icon: TrendingUp, description: 'SEO, PPC & social media' },
  { label: 'Graphic Design', href: '/services/graphic-design', icon: Palette, description: 'Branding & visual identity' },
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
    } else if (item.href.startsWith('/#')) {
      navigate('/');
      setTimeout(() => {
        const element = document.querySelector(item.href.replace('/', ''));
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
    setIsMobileMenuOpen(false);
  }, [navigate]);

  return (
    <motion.nav initial={{ y: -100 }} animate={{ y: 0 }} transition={{ duration: 0.5 }}
      className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-100' : 'bg-transparent'}`}
    >
      <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
        <motion.div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')} whileHover={{ scale: 1.02 }}>
          <img src={logo} alt="Yoursoft Digital" className="h-14 w-auto object-contain" />
        </motion.div>
        
        <div className="hidden lg:flex items-center gap-8">
          <div className="relative" onMouseEnter={() => setServicesOpen(true)} onMouseLeave={() => setServicesOpen(false)}>
            <button className={`text-sm font-medium flex items-center gap-1 transition-colors py-2 ${isScrolled ? 'text-slate-600 hover:text-[#17C3B2]' : 'text-white/90 hover:text-white'}`}>
              Services
              <motion.div animate={{ rotate: servicesOpen ? 180 : 0 }} transition={{ duration: 0.2 }}><ChevronDown size={14} /></motion.div>
            </button>
            
            <motion.div initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: servicesOpen ? 1 : 0, y: servicesOpen ? 0 : 10, scale: servicesOpen ? 1 : 0.95 }}
              transition={{ duration: 0.2 }} className={`absolute top-full left-0 pt-2 ${servicesOpen ? 'visible' : 'invisible'}`}
            >
              <div className="bg-white rounded-xl shadow-xl border border-slate-200 p-2 min-w-[280px]">
                {serviceItems.map((item, index) => (
                  <motion.a key={item.label} href={item.href}
                    onClick={(e) => { e.preventDefault(); navigate(item.href); setServicesOpen(false); }}
                    initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.05 }}
                    className="flex items-start gap-3 p-3 rounded-lg hover:bg-[#17C3B2]/5 transition-colors group/item"
                  >
                    <div className="w-10 h-10 rounded-lg bg-[#0D2342]/5 flex items-center justify-center group-hover/item:bg-[#17C3B2] transition-colors flex-shrink-0">
                      <item.icon size={20} className="text-[#0D2342] group-hover/item:text-white" />
                    </div>
                    <div>
                      <div className="font-medium text-[#0D2342] text-sm group-hover/item:text-[#17C3B2] transition-colors">{item.label}</div>
                      <div className="text-xs text-slate-500">{item.description}</div>
                    </div>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {navItems.map((item) => (
            <a key={item.label} href={item.href} onClick={(e) => handleNavClick(e, item)}
              className={`text-sm font-medium transition-colors ${isScrolled ? 'text-slate-600 hover:text-[#17C3B2]' : 'text-white/90 hover:text-white'}`}
            >{item.label}</a>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={() => navigate('/login')} className={!isScrolled ? "text-white hover:bg-white/10" : ""}>Sign In</Button>
          <Button variant="primary" size="sm" onClick={() => navigate('/signup')}>Get Started <ArrowRight size={14} /></Button>
        </div>

        <button className={`lg:hidden p-2 rounded-lg transition-colors ${isScrolled ? 'text-[#0D2342] hover:bg-slate-100' : 'text-white hover:bg-white/10'}`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isMobileMenuOpen && (
        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
          className="lg:hidden bg-white border-t border-slate-100 shadow-lg max-h-[80vh] overflow-y-auto"
        >
          <div className="px-6 py-4 space-y-1">
            <div className="border-b border-slate-100 pb-2 mb-2">
              <button onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                className="w-full flex items-center justify-between py-3 text-slate-700 text-sm font-semibold"
              >
                <span className="flex items-center gap-2"><Layers size={16} className="text-[#17C3B2]" />Services</span>
                <motion.div animate={{ rotate: mobileServicesOpen ? 180 : 0 }}
                  className={`w-6 h-6 rounded-full flex items-center justify-center ${mobileServicesOpen ? 'bg-[#17C3B2] text-white' : 'bg-slate-100'}`}
                ><ChevronDown size={14} /></motion.div>
              </button>
              
              <motion.div initial={false} animate={{ height: mobileServicesOpen ? 'auto' : 0, opacity: mobileServicesOpen ? 1 : 0 }} className="overflow-hidden">
                <div className="space-y-1 pb-3">
                  {serviceItems.map((item) => (
                    <a key={item.label} href={item.href}
                      onClick={(e) => { e.preventDefault(); navigate(item.href); setIsMobileMenuOpen(false); }}
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
              <a key={item.label} href={item.href} onClick={(e) => handleNavClick(e, item)}
                className="flex items-center gap-2 py-3 text-slate-600 hover:text-[#17C3B2] text-sm font-medium"
              >{item.label}</a>
            ))}
            
            <div className="pt-4 space-y-3 border-t border-slate-100 mt-4">
              <Button variant="outline" className="w-full" size="sm" onClick={() => { navigate('/login'); setIsMobileMenuOpen(false); }}>Sign In</Button>
              <Button variant="primary" className="w-full" size="sm" onClick={() => { navigate('/signup'); setIsMobileMenuOpen(false); }}>Get Started <ArrowRight size={14} /></Button>
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
            <motion.div whileHover={{ scale: 1.02 }} className="flex items-center gap-2 mb-6 cursor-pointer" onClick={() => navigate('/')}>
              <img src={logo} alt="Yoursoft Digital" className="h-12 w-auto object-contain brightness-0 invert" />
            </motion.div>
            <p className="text-slate-400 text-sm mb-6 max-w-xs leading-relaxed">
              The complete ecosystem for Canadian businesses. Build, manage, and automate with confidence.
            </p>
            <div className="flex gap-3">
              {[Twitter, Linkedin, Github].map((Icon, i) => (
                <motion.a key={i} href="#" whileHover={{ scale: 1.1, y: -3 }}
                  className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-slate-400 hover:bg-[#17C3B2] hover:text-white transition-all"
                ><Icon size={18} /></motion.a>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="font-bold text-white mb-4 text-sm">Services</h4>
            <ul className="space-y-3">
              {serviceItems.map((item) => (
                <li key={item.label}>
                  <motion.a href={item.href} onClick={(e) => { e.preventDefault(); navigate(item.href); }}
                    whileHover={{ x: 5, color: "#17C3B2" }} className="text-slate-400 hover:text-[#17C3B2] transition-colors text-sm inline-block"
                  >{item.label}</motion.a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-white mb-4 text-sm">Company</h4>
            <ul className="space-y-3">
              {['About Us', 'Careers', 'Blog', 'Contact'].map((item) => (
                <li key={item}><motion.a href="/" whileHover={{ x: 5, color: "#17C3B2" }} className="text-slate-400 hover:text-[#17C3B2] transition-colors text-sm inline-block">{item}</motion.a></li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-white mb-4 text-sm">Support</h4>
            <ul className="space-y-3">
              {['Help Center', 'Documentation', 'API', 'Status'].map((item) => (
                <li key={item}><motion.a href="/" whileHover={{ x: 5, color: "#17C3B2" }} className="text-slate-400 hover:text-[#17C3B2] transition-colors text-sm inline-block">{item}</motion.a></li>
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
            <motion.div key={i} whileHover={{ x: 5 }} className="flex items-center gap-3 text-slate-400 text-sm cursor-pointer hover:text-white transition-colors">
              <div className="w-8 h-8 rounded-lg bg-[#17C3B2]/20 flex items-center justify-center"><item.icon size={14} className="text-[#17C3B2]" /></div>
              <span>{item.text}</span>
            </motion.div>
          ))}
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8 border-t border-white/10">
          <div className="text-slate-500 text-sm flex items-center gap-2">
            <motion.span animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 3, repeat: Infinity }}>🇨🇦</motion.span>
            © {new Date().getFullYear()} Yoursoft Digital. Made with ❤️ in Canada.
          </div>
          <div className="flex gap-6 text-sm">
            {['Privacy Policy', 'Terms of Service', 'Cookies'].map(item => (
              <motion.a key={item} href="/" whileHover={{ y: -2, color: "#17C3B2" }} className="text-slate-500 hover:text-[#17C3B2] transition-colors">{item}</motion.a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

// ============================================
// 🎨 GRAPHIC DESIGN PAGE
// ============================================

export default function GraphicDesignPage() {
  const navigate = useNavigate();
  const [activeService, setActiveService] = useState(0);
  const [activeFaq, setActiveFaq] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activePortfolio, setActivePortfolio] = useState('all');

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Services Data
  const services = [
    {
      id: 'branding',
      title: 'Brand Identity Design',
      shortTitle: 'Branding',
      icon: Sparkles,
      color: '#E91E63',
      description: 'Create a powerful brand identity that resonates with your audience and sets you apart from the competition.',
      fullDescription: 'Your brand is more than just a logo – it\'s the complete visual and emotional experience your customers have with your business. We create comprehensive brand identities that tell your story and connect with your target audience on a deeper level.',
      features: ['Logo Design & Variations', 'Brand Guidelines', 'Color Palette Development', 'Typography Selection', 'Brand Voice & Messaging', 'Visual Identity System'],
      benefits: ['Stand out from competitors', 'Build brand recognition', 'Create emotional connections', 'Ensure consistency across all touchpoints']
    },
    {
      id: 'logo',
      title: 'Logo Design',
      shortTitle: 'Logo',
      icon: PenTool,
      color: '#9C27B0',
      description: 'Distinctive, memorable logos that capture your brand essence and leave a lasting impression.',
      fullDescription: 'A great logo is the cornerstone of your brand identity. Our designers craft unique, versatile logos that work across all mediums – from business cards to billboards, websites to merchandise.',
      features: ['Custom Logo Concepts', 'Multiple Revisions', 'Vector Files (AI, EPS, SVG)', 'Color & B/W Versions', 'Favicon & Social Variants', 'Logo Usage Guidelines'],
      benefits: ['Instant brand recognition', 'Professional credibility', 'Versatile across all platforms', 'Timeless design that lasts']
    },
    {
      id: 'print',
      title: 'Print Design',
      shortTitle: 'Print',
      icon: Printer,
      color: '#FF5722',
      description: 'High-quality print materials that make a tangible impact on your audience.',
      fullDescription: 'From business cards to brochures, posters to packaging – we create print materials that look stunning and communicate your message effectively. Our designs are print-ready and optimized for various printing methods.',
      features: ['Business Cards', 'Brochures & Flyers', 'Posters & Banners', 'Catalogs & Magazines', 'Stationery Design', 'Packaging Design'],
      benefits: ['Tangible marketing materials', 'Professional presentation', 'High-quality print output', 'Consistent brand experience']
    },
    {
      id: 'ui',
      title: 'UI/UX Design',
      shortTitle: 'UI/UX',
      icon: Frame,
      color: '#2196F3',
      description: 'User-centered interface designs that are beautiful, intuitive, and drive conversions.',
      fullDescription: 'We design digital experiences that users love. Our UI/UX design process focuses on understanding user needs, creating intuitive interfaces, and optimizing for conversions while maintaining visual appeal.',
      features: ['User Research & Personas', 'Wireframing & Prototyping', 'Visual UI Design', 'Interaction Design', 'Design Systems', 'Usability Testing'],
      benefits: ['Improved user satisfaction', 'Higher conversion rates', 'Reduced development costs', 'Consistent user experience']
    },
    {
      id: 'social',
      title: 'Social Media Graphics',
      shortTitle: 'Social',
      icon: Share2,
      color: '#00BCD4',
      description: 'Eye-catching social media content that stops the scroll and drives engagement.',
      fullDescription: 'Stand out in crowded social feeds with custom-designed graphics that capture attention and communicate your message. We create cohesive visual content for all major platforms.',
      features: ['Post Templates', 'Story & Reel Graphics', 'Cover Images', 'Profile Graphics', 'Ad Creatives', 'Content Calendars'],
      benefits: ['Increased engagement', 'Consistent brand presence', 'Save time with templates', 'Professional social presence']
    },
    {
      id: 'illustration',
      title: 'Custom Illustration',
      shortTitle: 'Illustration',
      icon: Brush,
      color: '#4CAF50',
      description: 'Unique custom illustrations that bring your ideas to life and make your brand unforgettable.',
      fullDescription: 'Custom illustrations add personality and uniqueness to your brand. Whether you need icons, characters, infographics, or full illustrations, our artists create artwork that perfectly matches your brand style.',
      features: ['Custom Icons', 'Character Design', 'Infographics', 'Editorial Illustrations', 'Pattern Design', 'Mascot Design'],
      benefits: ['Unique brand assets', 'Memorable visual identity', 'Versatile applications', 'Differentiate from competitors']
    }
  ];

  // Portfolio Categories
  const portfolioCategories = [
    { id: 'all', label: 'All Work' },
    { id: 'branding', label: 'Branding' },
    { id: 'logo', label: 'Logos' },
    { id: 'print', label: 'Print' },
    { id: 'digital', label: 'Digital' },
  ];

  // Portfolio Items
  const portfolioItems = [
    { id: 1, title: 'TechStart Brand Identity', category: 'branding', color: '#E91E63' },
    { id: 2, title: 'GreenLeaf Logo Design', category: 'logo', color: '#4CAF50' },
    { id: 3, title: 'Urban Coffee Packaging', category: 'print', color: '#795548' },
    { id: 4, title: 'FinanceApp UI Design', category: 'digital', color: '#2196F3' },
    { id: 5, title: 'Wellness Studio Branding', category: 'branding', color: '#9C27B0' },
    { id: 6, title: 'SportX Logo Redesign', category: 'logo', color: '#FF5722' },
    { id: 7, title: 'Restaurant Menu Design', category: 'print', color: '#FFC107' },
    { id: 8, title: 'E-commerce Website UI', category: 'digital', color: '#00BCD4' },
  ];

  // Process Steps
  const processSteps = [
    { step: '01', title: 'Discovery', description: 'We learn about your brand, goals, target audience, and design preferences.', icon: Search },
    { step: '02', title: 'Research', description: 'We analyze your industry, competitors, and design trends for inspiration.', icon: BookOpen },
    { step: '03', title: 'Concept', description: 'Our designers create multiple unique concepts based on our research.', icon: Lightbulb },
    { step: '04', title: 'Design', description: 'We refine the chosen concept into polished, professional designs.', icon: PenTool },
    { step: '05', title: 'Refine', description: 'Based on your feedback, we perfect every detail until you\'re thrilled.', icon: Wand2 },
    { step: '06', title: 'Deliver', description: 'You receive all final files, guidelines, and assets ready for use.', icon: Package }
  ];

  // Stats
  const stats = [
    { value: 1500, suffix: '+', label: 'Designs Created' },
    { value: 300, suffix: '+', label: 'Brands Built' },
    { value: 99, suffix: '%', label: 'Client Satisfaction' },
    { value: 15, suffix: '+', label: 'Design Awards' },
  ];

  // Design Tools
  const designTools = [
    { name: 'Adobe Photoshop', icon: Image },
    { name: 'Adobe Illustrator', icon: PenTool },
    { name: 'Figma', icon: Figma },
    { name: 'Adobe XD', icon: Frame },
    { name: 'After Effects', icon: Video },
    { name: 'InDesign', icon: BookOpen },
  ];

  // FAQs
  const faqs = [
    { question: 'How long does a typical design project take?', answer: 'Project timelines vary based on complexity. A logo design typically takes 1-2 weeks, while a complete brand identity can take 4-6 weeks. We\'ll provide a detailed timeline during our initial consultation.' },
    { question: 'How many revisions are included?', answer: 'Most of our design packages include 3-5 rounds of revisions. We work closely with you to ensure you\'re completely satisfied with the final result.' },
    { question: 'What file formats will I receive?', answer: 'You\'ll receive all necessary file formats including AI, EPS, SVG, PDF, PNG, and JPG. We also provide web-optimized versions and print-ready files as needed.' },
    { question: 'Do you offer rush design services?', answer: 'Yes! We offer expedited design services for urgent projects. Rush fees apply and depend on the project scope and timeline requirements.' },
    { question: 'Can you work with existing brand guidelines?', answer: 'Absolutely! We can work within your existing brand guidelines to create new materials, or help you update and expand your brand identity.' }
  ];

  // Why Choose Us
  const whyChooseUs = [
    { icon: Award, title: 'Award-Winning Designers', description: 'Our team has won multiple design awards and brings years of experience.' },
    { icon: Sparkles, title: 'Unique Creativity', description: 'Every design is custom-crafted to reflect your unique brand personality.' },
    { icon: RefreshCw, title: 'Unlimited Revisions', description: 'We\'re not happy until you\'re thrilled with the final design.' },
    { icon: Clock, title: 'Fast Turnaround', description: 'Quick delivery without compromising on quality or creativity.' },
    { icon: Users, title: 'Collaborative Process', description: 'You\'re involved at every step to ensure the design meets your vision.' },
    { icon: Headphones, title: 'Dedicated Support', description: 'Ongoing support and quick responses throughout your project.' }
  ];

  const filteredPortfolio = activePortfolio === 'all' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === activePortfolio);

  return (
    <div className="font-sans text-[#0D2342] bg-white antialiased">
      
      <Navbar isScrolled={isScrolled} />

      {/* ============================================ */}
      {/* HERO SECTION */}
      {/* ============================================ */}
      <section className="relative min-h-screen flex items-center pt-24 pb-20 overflow-hidden bg-gradient-to-br from-[#0D2342] via-[#0D2342] to-[#17C3B2]/20">
        <FloatingShape size={400} color="#17C3B2" blur={150} top="10%" right="-10%" shape="circle" />
        <FloatingShape size={300} color="#C9A14A" blur={120} bottom="10%" left="-5%" shape="blob" />
        <FloatingShape size={200} color="#E91E63" blur={80} top="50%" left="20%" shape="square" />
        
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: `radial-gradient(#17C3B2 1px, transparent 1px)`, backgroundSize: '30px 30px' }} />

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="flex items-center gap-2 text-slate-400 text-sm mb-6">
                <Link to="/" className="hover:text-[#17C3B2] transition-colors">Home</Link>
                <ChevronRight size={14} />
                <Link to="/services" className="hover:text-[#17C3B2] transition-colors">Services</Link>
                <ChevronRight size={14} />
                <span className="text-[#17C3B2]">Graphic Design</span>
              </motion.div>

              <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#17C3B2]/20 border border-[#17C3B2]/30 rounded-full text-[#17C3B2] text-sm font-medium mb-6"
              >
                <Palette size={16} />
                Graphic Design Services
              </motion.span>
              
              <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6"
              >
                Creative
                <motion.span initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 }} className="block text-[#17C3B2]">
                  Graphic Design
                </motion.span>
              </motion.h1>
              
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }} className="text-lg text-slate-300 mb-8 leading-relaxed max-w-xl">
                Transform your brand with stunning visual designs that captivate your audience and communicate your message. From logos to complete brand identities, we bring your vision to life.
              </motion.p>
              
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} className="flex flex-col sm:flex-row gap-4 mb-10">
                <Button size="lg" variant="primary" onClick={() => navigate('/contact')}>
                  Start Your Project <ArrowRight size={18} />
                </Button>
                <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10">
                  <Play size={18} className="text-[#17C3B2]" /> View Portfolio
                </Button>
              </motion.div>
              
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }} className="flex flex-wrap items-center gap-6 text-sm text-slate-400">
                <div className="flex items-center gap-2"><CheckCircle2 size={16} className="text-[#17C3B2]" /><span>1500+ Designs Created</span></div>
                <div className="flex items-center gap-2"><Award size={16} className="text-[#17C3B2]" /><span>Award-Winning Team</span></div>
              </motion.div>
            </motion.div>
            
            {/* Right Content - Design Canvas Mockup */}
            <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.3 }} className="relative hidden lg:block">
              <div className="relative">
                {/* Main Design Canvas */}
                <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="bg-white rounded-2xl shadow-2xl p-6 relative z-10"
                >
                  {/* Canvas Header */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#17C3B2] to-[#0D2342] flex items-center justify-center">
                        <Palette size={20} className="text-white" />
                      </div>
                      <div>
                        <h3 className="font-bold text-[#0D2342] text-sm">Design Studio</h3>
                        <p className="text-xs text-slate-500">Creating magic...</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {['bg-red-400', 'bg-yellow-400', 'bg-green-400'].map((color, i) => (
                        <div key={i} className={`w-3 h-3 rounded-full ${color}`} />
                      ))}
                    </div>
                  </div>
                  
                  {/* Design Preview Area */}
                  <div className="bg-slate-100 rounded-xl p-8 mb-6 relative overflow-hidden">
                    {/* Animated Shapes */}
                    <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                      className="absolute top-4 right-4 w-16 h-16 border-4 border-[#17C3B2]/30 rounded-full"
                    />
                    <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 3, repeat: Infinity }}
                      className="absolute bottom-4 left-4 w-12 h-12 bg-[#E91E63]/20 rounded-lg"
                    />
                    <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 2, repeat: Infinity }}
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                    >
                      <div className="text-4xl font-black text-[#0D2342]">
                        YOUR<span className="text-[#17C3B2]">SOFT</span>
                      </div>
                      <div className="text-xs text-center text-slate-500 mt-1">DIGITAL</div>
                    </motion.div>
                  </div>
                  
                  {/* Color Palette */}
                  <div className="flex items-center gap-4 mb-6">
                    <span className="text-xs text-slate-500 font-medium">Colors:</span>
                    <div className="flex gap-2">
                      {['#0D2342', '#17C3B2', '#C9A14A', '#E91E63', '#FFFFFF'].map((color, i) => (
                        <motion.div key={i} whileHover={{ scale: 1.2 }}
                          className="w-8 h-8 rounded-lg shadow-sm border border-slate-200 cursor-pointer"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </div>
                  
                  {/* Tools */}
                  <div className="flex items-center justify-between">
                    <div className="flex gap-2">
                      {[PenTool, Type, Shapes, Crop, Wand2].map((Icon, i) => (
                        <motion.div key={i} whileHover={{ scale: 1.1 }}
                          className={`w-10 h-10 rounded-lg flex items-center justify-center cursor-pointer ${i === 0 ? 'bg-[#17C3B2] text-white' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}
                        >
                          <Icon size={18} />
                        </motion.div>
                      ))}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <span>100%</span>
                      <div className="w-20 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                        <div className="w-full h-full bg-[#17C3B2] rounded-full" />
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Floating Elements */}
                <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 2 }}
                  className="absolute -left-8 top-20 bg-white rounded-xl shadow-xl p-4 z-20"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#E91E63]/10 flex items-center justify-center">
                      <Heart size={20} className="text-[#E91E63]" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#0D2342]">Client Approved!</div>
                      <div className="text-xs text-slate-500">Design v3.0</div>
                    </div>
                  </div>
                </motion.div>

                <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 2.2 }}
                  className="absolute -right-4 bottom-24 bg-white rounded-xl shadow-xl p-4 z-20"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#4CAF50]/10 flex items-center justify-center">
                      <CheckCircle2 size={20} className="text-[#4CAF50]" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#0D2342]">Print Ready</div>
                      <div className="text-xs text-slate-500">CMYK 300dpi</div>
                    </div>
                  </div>
                </motion.div>

                {/* Floating Color Swatches */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.4 }}
                  className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex gap-2 bg-white rounded-full shadow-xl px-4 py-3"
                >
                  {[SwatchBook, Layers3, Grid3X3, Aperture].map((Icon, i) => (
                    <motion.div key={i} whileHover={{ scale: 1.2 }}
                      className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center cursor-pointer hover:bg-[#17C3B2] hover:text-white transition-colors"
                    >
                      <Icon size={14} />
                    </motion.div>
                  ))}
                </motion.div>

                <div className="absolute inset-0 bg-gradient-to-r from-[#17C3B2]/20 to-[#E91E63]/20 blur-3xl -z-10" />
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
            <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="text-center"
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
          badge="Our Services"
          title="Comprehensive Design Services"
          subtitle="From brand identity to digital design, we offer a full range of creative services to elevate your brand."
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div key={service.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full group">
                <motion.div whileHover={{ rotate: [0, -10, 10, 0] }} transition={{ duration: 0.5 }}
                  className="w-14 h-14 rounded-xl mb-6 flex items-center justify-center"
                  style={{ backgroundColor: `${service.color}15` }}
                >
                  <service.icon size={28} style={{ color: service.color }} />
                </motion.div>
                
                <h3 className="text-xl font-bold text-[#0D2342] mb-3 group-hover:text-[#17C3B2] transition-colors">
                  {service.title}
                </h3>
                <p className="text-slate-500 mb-6 leading-relaxed">{service.description}</p>
                
                <ul className="space-y-2 mb-6">
                  {service.features.slice(0, 4).map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-slate-600">
                      <Check size={14} className="text-[#17C3B2] flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <Button variant="ghost" className="p-0 text-[#17C3B2] hover:text-[#0D2342]"
                  onClick={() => setActiveService(index)}
                >
                  Learn More <ArrowRight size={16} />
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
        <SectionHeader badge="Deep Dive" title="Design Excellence" subtitle="Explore our specialized design services in detail." />

        <div className="grid lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4">
            <div className="sticky top-24 space-y-2">
              {services.map((service, index) => (
                <motion.button key={service.id} onClick={() => setActiveService(index)} whileHover={{ x: 5 }}
                  className={`w-full flex items-center gap-4 p-4 rounded-xl text-left transition-all ${
                    activeService === index ? 'bg-[#0D2342] text-white shadow-lg' : 'bg-white border border-slate-200 hover:border-[#17C3B2] hover:shadow-md'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${activeService === index ? 'bg-white/20' : ''}`}
                    style={{ backgroundColor: activeService === index ? undefined : `${service.color}15` }}
                  >
                    <service.icon size={20} style={{ color: activeService === index ? '#17C3B2' : service.color }} />
                  </div>
                  <span className="font-medium text-sm">{service.shortTitle}</span>
                  {activeService === index && <ChevronRight size={16} className="ml-auto" />}
                </motion.button>
              ))}
            </div>
          </div>

          <div className="lg:col-span-8">
            <motion.div key={activeService} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
              <Card hover={false} className="p-10">
                <div className="w-16 h-16 rounded-2xl mb-6 flex items-center justify-center" style={{ backgroundColor: `${services[activeService].color}15` }}>
                  {React.createElement(services[activeService].icon, { size: 32, style: { color: services[activeService].color } })}
                </div>

                <h3 className="text-3xl font-bold text-[#0D2342] mb-4">{services[activeService].title}</h3>
                <p className="text-slate-500 text-lg leading-relaxed mb-8">{services[activeService].fullDescription}</p>

                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  <div>
                    <h4 className="font-bold text-[#0D2342] mb-4">What's Included:</h4>
                    <div className="space-y-3">
                      {services[activeService].features.map((feature, i) => (
                        <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.05 }} className="flex items-center gap-3"
                        >
                          <CheckCircle2 size={18} className="text-[#17C3B2] flex-shrink-0" />
                          <span className="text-slate-700">{feature}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-bold text-[#0D2342] mb-4">Key Benefits:</h4>
                    <div className="space-y-3">
                      {services[activeService].benefits.map((benefit, i) => (
                        <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.05 }} className="flex items-center gap-3"
                        >
                          <Sparkles size={18} className="text-[#C9A14A] flex-shrink-0" />
                          <span className="text-slate-700">{benefit}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button variant="primary" onClick={() => navigate('/contact')}>Get a Quote <ArrowRight size={16} /></Button>
                  <Button variant="outline">View Examples <ExternalLink size={16} /></Button>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </Section>

      {/* ============================================ */}
      {/* PORTFOLIO SECTION */}
      {/* ============================================ */}
      <Section gray>
        <SectionHeader badge="Our Work" title="Featured Projects" subtitle="A showcase of our best design work across various industries." />

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {portfolioCategories.map((category) => (
            <motion.button key={category.id} onClick={() => setActivePortfolio(category.id)}
              whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                activePortfolio === category.id 
                  ? 'bg-[#17C3B2] text-white shadow-lg shadow-[#17C3B2]/25' 
                  : 'bg-white border border-slate-200 text-slate-600 hover:border-[#17C3B2]'
              }`}
            >
              {category.label}
            </motion.button>
          ))}
        </div>

        {/* Portfolio Grid */}
        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredPortfolio.map((item) => (
              <motion.div key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
                whileHover={{ y: -10 }}
                className="group cursor-pointer"
              >
                <div className="bg-white rounded-2xl overflow-hidden shadow-lg border border-slate-200 hover:shadow-2xl hover:border-[#17C3B2]/30 transition-all">
                  <div className="aspect-square relative overflow-hidden" style={{ backgroundColor: `${item.color}15` }}>
                    {/* Placeholder Design */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.div whileHover={{ scale: 1.1, rotate: 5 }}
                        className="w-20 h-20 rounded-2xl flex items-center justify-center"
                        style={{ backgroundColor: item.color }}
                      >
                        <Palette size={32} className="text-white" />
                      </motion.div>
                    </div>
                    
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-[#0D2342]/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Button variant="white" size="sm">
                        View Project <ExternalLink size={14} />
                      </Button>
                    </div>
                  </div>
                  <div className="p-4">
                    <h4 className="font-bold text-[#0D2342] group-hover:text-[#17C3B2] transition-colors">{item.title}</h4>
                    <p className="text-sm text-slate-500 capitalize">{item.category}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Button variant="outline" onClick={() => navigate('/portfolio')}>
            View All Projects <ArrowRight size={16} />
          </Button>
        </motion.div>
      </Section>

      {/* ============================================ */}
      {/* PROCESS SECTION */}
      {/* ============================================ */}
      <Section dark>
        <SectionHeader badge="Our Process" title="How We Create Magic" subtitle="A proven design methodology that delivers exceptional results." light />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {processSteps.map((step, index) => (
            <motion.div key={index} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: index * 0.1 }} className="relative"
            >
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 h-full hover:bg-white/10 transition-all group">
                <div className="absolute -top-4 -left-2 text-6xl font-black text-[#17C3B2]/20">
                  {step.step}
                </div>
                
                <div className="relative z-10">
                  <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.5 }}
                    className="w-14 h-14 rounded-xl bg-[#17C3B2]/20 flex items-center justify-center mb-6 group-hover:bg-[#17C3B2] transition-colors"
                  >
                    <step.icon size={24} className="text-[#17C3B2] group-hover:text-white transition-colors" />
                  </motion.div>
                  
                  <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                  <p className="text-slate-400 leading-relaxed">{step.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* ============================================ */}
      {/* DESIGN TOOLS SECTION */}
      {/* ============================================ */}
      <Section>
        <SectionHeader badge="Tools" title="Industry-Leading Design Tools " subtitle="We use the best tools in the industry to deliver exceptional designs." />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {designTools.map((tool, index) => (
            <motion.div key={index} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }} transition={{ delay: index * 0.05 }}
              whileHover={{ y: -8, scale: 1.05 }}
              className="bg-white border border-slate-200 rounded-2xl p-6 text-center hover:shadow-xl hover:border-[#17C3B2]/30 transition-all cursor-pointer group"
            >
              <motion.div whileHover={{ rotate: [0, -10, 10, 0] }}
                className="w-14 h-14 mx-auto rounded-xl bg-[#0D2342]/5 flex items-center justify-center mb-3 group-hover:bg-[#17C3B2] transition-colors"
              >
                <tool.icon size={28} className="text-[#0D2342] group-hover:text-white transition-colors" />
              </motion.div>
              <h4 className="font-medium text-[#0D2342] text-sm group-hover:text-[#17C3B2] transition-colors">{tool.name}</h4>
            </motion.div>
          ))}
        </div>

        {/* Scrolling Tools Banner */}
        <div className="mt-16 relative overflow-hidden">
          <motion.div animate={{ x: [0, -1920] }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="flex gap-8 items-center"
          >
            {[
              'Adobe Creative Suite', 'Figma', 'Sketch', 'InVision', 'Procreate',
              'Affinity Designer', 'Canva Pro', 'Adobe XD', 'Blender', 'Cinema 4D',
              'After Effects', 'Premiere Pro', 'Lightroom', 'Photoshop', 'Illustrator',
              'Adobe Creative Suite', 'Figma', 'Sketch', 'InVision', 'Procreate',
            ].map((tool, i) => (
              <div key={i} className="flex-shrink-0 px-8 py-4 bg-slate-50 rounded-xl font-medium text-[#0D2342]">
                {tool}
              </div>
            ))}
          </motion.div>
        </div>
      </Section>

      {/* ============================================ */}
      {/* WHY CHOOSE US SECTION */}
      {/* ============================================ */}
      <Section gray>
        <SectionHeader badge="Why Choose Us" title="The Yoursoft Digital Difference" subtitle="What makes our design team stand out from the rest." />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {whyChooseUs.map((item, index) => (
            <motion.div key={index} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full text-center group">
                <motion.div whileHover={{ scale: 1.1, rotate: 5 }}
                  className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-[#17C3B2]/10 to-[#0D2342]/10 flex items-center justify-center mb-6 group-hover:from-[#17C3B2] group-hover:to-[#17C3B2] transition-all"
                >
                  <item.icon size={28} className="text-[#17C3B2] group-hover:text-white transition-colors" />
                </motion.div>
                
                <h3 className="text-xl font-bold text-[#0D2342] mb-3 group-hover:text-[#17C3B2] transition-colors">{item.title}</h3>
                <p className="text-slate-500 leading-relaxed">{item.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* ============================================ */}
      {/* PRICING PREVIEW SECTION */}
      {/* ============================================ */}
      <Section>
        <SectionHeader badge="Pricing" title="Transparent Design Pricing" subtitle="Choose the package that fits your needs. Custom quotes available for larger projects." />

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              name: 'Starter',
              price: '499',
              description: 'Perfect for startups and small businesses',
              features: ['Logo Design (3 Concepts)', '2 Revision Rounds', 'Basic Brand Colors', 'PNG & JPG Files', 'Social Media Kit', 'Email Support'],
              popular: false
            },
            {
              name: 'Professional',
              price: '1,499',
              description: 'Complete branding for growing businesses',
              features: ['Logo Design (5 Concepts)', 'Unlimited Revisions', 'Full Brand Guidelines', 'All File Formats', 'Stationery Design', 'Social Media Templates', 'Priority Support', 'Brand Strategy Session'],
              popular: true
            },
            {
              name: 'Enterprise',
              price: 'Custom',
              description: 'Full-service design for large organizations',
              features: ['Complete Brand Identity', 'Unlimited Revisions', 'Comprehensive Guidelines', 'Marketing Collateral', 'Website UI Design', 'Dedicated Designer', '24/7 Support', 'Ongoing Maintenance'],
              popular: false
            }
          ].map((plan, index) => (
            <motion.div key={index} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: index * 0.1 }}
              className={`relative ${plan.popular ? 'lg:-mt-4 lg:mb-4' : ''}`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-[#17C3B2] text-white text-xs font-bold rounded-full">
                  MOST POPULAR
                </div>
              )}
              <Card className={`h-full ${plan.popular ? 'border-[#17C3B2] border-2 shadow-xl shadow-[#17C3B2]/10' : ''}`} hover={false}>
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold text-[#0D2342] mb-2">{plan.name}</h3>
                  <p className="text-slate-500 text-sm mb-4">{plan.description}</p>
                  <div className="flex items-baseline justify-center gap-1">
                    {plan.price !== 'Custom' && <span className="text-slate-400">$</span>}
                    <span className="text-4xl font-bold text-[#0D2342]">{plan.price}</span>
                    {plan.price !== 'Custom' && <span className="text-slate-400">/project</span>}
                  </div>
                </div>
                
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm">
                      <CheckCircle2 size={16} className="text-[#17C3B2] flex-shrink-0" />
                      <span className="text-slate-600">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button variant={plan.popular ? 'primary' : 'outline'} className="w-full" onClick={() => navigate('/contact')}>
                  {plan.price === 'Custom' ? 'Contact Us' : 'Get Started'}
                  <ArrowRight size={16} />
                </Button>
              </Card>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* ============================================ */}
      {/* TESTIMONIALS SECTION */}
      {/* ============================================ */}
      <Section dark>
        <SectionHeader badge="Testimonials" title="What Our Clients Say" subtitle="Don't just take our word for it – hear from businesses we've helped transform." light />

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              name: 'Sarah Mitchell',
              role: 'CEO, TechStart Inc.',
              content: 'Yoursoft Digital transformed our brand completely. The new logo and identity have helped us stand out in a crowded market. Highly recommended!',
              rating: 5
            },
            {
              name: 'Michael Chen',
              role: 'Founder, GreenLeaf Co.',
              content: 'The design team understood our vision perfectly. They delivered beyond our expectations with creative solutions we hadn\'t even considered.',
              rating: 5
            },
            {
              name: 'Emily Rodriguez',
              role: 'Marketing Director, UrbanStyle',
              content: 'Working with Yoursoft was a breeze. Their process is smooth, communication is excellent, and the results speak for themselves.',
              rating: 5
            }
          ].map((testimonial, index) => (
            <motion.div key={index} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: index * 0.1 }}
            >
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 h-full">
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={18} className="text-[#C9A14A] fill-[#C9A14A]" />
                  ))}
                </div>
                
                <p className="text-slate-300 leading-relaxed mb-6">"{testimonial.content}"</p>
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#17C3B2] to-[#0D2342] flex items-center justify-center text-white font-bold">
                                     {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold text-white">{testimonial.name}</div>
                    <div className="text-sm text-slate-400">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* ============================================ */}
      {/* FAQ SECTION */}
      {/* ============================================ */}
      <Section>
        <SectionHeader badge="FAQ" title="Frequently Asked Questions" subtitle="Get answers to common questions about our graphic design services." />

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: index * 0.1 }}
            >
              <motion.div className={`border rounded-2xl overflow-hidden transition-all ${
                activeFaq === index ? 'border-[#17C3B2] shadow-lg shadow-[#17C3B2]/10' : 'border-slate-200 hover:border-[#17C3B2]/50'
              }`}>
                <button onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                  className="w-full flex items-center justify-between p-6 text-left bg-white hover:bg-slate-50 transition-colors"
                >
                  <span className="font-semibold text-[#0D2342] pr-4">{faq.question}</span>
                  <motion.div animate={{ rotate: activeFaq === index ? 180 : 0 }} transition={{ duration: 0.2 }}
                    className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                      activeFaq === index ? 'bg-[#17C3B2] text-white' : 'bg-slate-100 text-[#0D2342]'
                    }`}
                  >
                    <ChevronDown size={18} />
                  </motion.div>
                </button>
                
                <motion.div initial={false}
                  animate={{ height: activeFaq === index ? 'auto' : 0, opacity: activeFaq === index ? 1 : 0 }}
                  transition={{ duration: 0.3 }} className="overflow-hidden"
                >
                  <div className="px-6 pb-6 text-slate-500 leading-relaxed border-t border-slate-100 pt-4">
                    {faq.answer}
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} className="text-center mt-12"
        >
          <p className="text-slate-500 mb-4">Have more questions?</p>
          <Button variant="outline" onClick={() => navigate('/contact')}>
            <MessageSquare size={16} /> Contact Our Team
          </Button>
        </motion.div>
      </Section>

      {/* ============================================ */}
      {/* BEFORE/AFTER SECTION */}
      {/* ============================================ */}
      <Section gray>
        <SectionHeader badge="Transformations" title="Before & After" subtitle="See the dramatic transformations we've achieved for our clients." />

        <div className="grid md:grid-cols-2 gap-8">
          {[
            { client: 'TechStart Inc.', description: 'Complete brand identity redesign' },
            { client: 'GreenLeaf Co.', description: 'Logo modernization & brand refresh' },
          ].map((item, index) => (
            <motion.div key={index} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: index * 0.1 }}
            >
              <Card className="overflow-hidden" padding={false}>
                <div className="grid grid-cols-2">
                  {/* Before */}
                  <div className="bg-slate-200 aspect-video flex flex-col items-center justify-center p-6 relative">
                    <div className="absolute top-4 left-4 px-3 py-1 bg-slate-500 text-white text-xs font-bold rounded-full">
                      BEFORE
                    </div>
                    <div className="w-16 h-16 rounded-xl bg-slate-400 flex items-center justify-center">
                      <Palette size={32} className="text-slate-600" />
                    </div>
                    <span className="text-slate-600 text-sm mt-2">Old Design</span>
                  </div>
                  
                  {/* After */}
                  <div className="bg-gradient-to-br from-[#17C3B2]/10 to-[#0D2342]/10 aspect-video flex flex-col items-center justify-center p-6 relative">
                    <div className="absolute top-4 right-4 px-3 py-1 bg-[#17C3B2] text-white text-xs font-bold rounded-full">
                      AFTER
                    </div>
                    <motion.div whileHover={{ scale: 1.1, rotate: 5 }}
                      className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#17C3B2] to-[#0D2342] flex items-center justify-center"
                    >
                      <Palette size={32} className="text-white" />
                    </motion.div>
                    <span className="text-[#0D2342] text-sm mt-2 font-medium">New Design</span>
                  </div>
                </div>
                
                <div className="p-6">
                  <h4 className="font-bold text-[#0D2342] mb-1">{item.client}</h4>
                  <p className="text-sm text-slate-500">{item.description}</p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* ============================================ */}
      {/* DESIGN PACKAGES COMPARISON */}
      {/* ============================================ */}
      <Section>
        <SectionHeader badge="Compare" title="What's Included" subtitle="A detailed comparison of our design packages." />

        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px]">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-4 px-4 font-bold text-[#0D2342]">Features</th>
                <th className="text-center py-4 px-4 font-bold text-[#0D2342]">Starter</th>
                <th className="text-center py-4 px-4 font-bold text-[#17C3B2] bg-[#17C3B2]/5 rounded-t-xl">Professional</th>
                <th className="text-center py-4 px-4 font-bold text-[#0D2342]">Enterprise</th>
              </tr>
            </thead>
            <tbody>
              {[
                { feature: 'Logo Concepts', starter: '3', professional: '5', enterprise: 'Unlimited' },
                { feature: 'Revisions', starter: '2 Rounds', professional: 'Unlimited', enterprise: 'Unlimited' },
                { feature: 'Brand Guidelines', starter: false, professional: true, enterprise: true },
                { feature: 'Stationery Design', starter: false, professional: true, enterprise: true },
                { feature: 'Social Media Kit', starter: true, professional: true, enterprise: true },
                { feature: 'Marketing Collateral', starter: false, professional: false, enterprise: true },
                { feature: 'Website UI Design', starter: false, professional: false, enterprise: true },
                { feature: 'Dedicated Designer', starter: false, professional: false, enterprise: true },
                { feature: 'Support', starter: 'Email', professional: 'Priority', enterprise: '24/7' },
                { feature: 'Delivery Time', starter: '7 Days', professional: '5 Days', enterprise: 'Custom' },
              ].map((row, index) => (
                <tr key={index} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                  <td className="py-4 px-4 text-slate-600">{row.feature}</td>
                  <td className="text-center py-4 px-4">
                    {typeof row.starter === 'boolean' ? (
                      row.starter ? <CheckCircle2 size={20} className="text-[#17C3B2] mx-auto" /> : <X size={20} className="text-slate-300 mx-auto" />
                    ) : (
                      <span className="text-slate-600">{row.starter}</span>
                    )}
                  </td>
                  <td className="text-center py-4 px-4 bg-[#17C3B2]/5">
                    {typeof row.professional === 'boolean' ? (
                      row.professional ? <CheckCircle2 size={20} className="text-[#17C3B2] mx-auto" /> : <X size={20} className="text-slate-300 mx-auto" />
                    ) : (
                      <span className="text-[#0D2342] font-medium">{row.professional}</span>
                    )}
                  </td>
                  <td className="text-center py-4 px-4">
                    {typeof row.enterprise === 'boolean' ? (
                      row.enterprise ? <CheckCircle2 size={20} className="text-[#17C3B2] mx-auto" /> : <X size={20} className="text-slate-300 mx-auto" />
                    ) : (
                      <span className="text-slate-600">{row.enterprise}</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {/* ============================================ */}
      {/* CTA SECTION */}
      {/* ============================================ */}
      <Section dark className="!py-24">
        <FloatingShape size={300} color="#17C3B2" blur={150} top="-20%" left="10%" shape="circle" />
        <FloatingShape size={250} color="#E91E63" blur={100} bottom="-10%" right="5%" shape="blob" />

        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-[#17C3B2]/20 border border-[#17C3B2]/30 rounded-full text-[#17C3B2] text-sm font-medium mb-6">
              <Sparkles size={16} />
              Ready to Transform Your Brand?
            </span>
            
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Let's Create Something
              <span className="text-[#17C3B2]"> Beautiful </span>
              Together
            </h2>
            
            <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
              Get a free design consultation and discover how we can elevate your brand to new heights.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button size="lg" variant="primary" onClick={() => navigate('/contact')}>
                Start Your Project <ArrowRight size={18} />
              </Button>
              <Button size="lg" variant="white">
                <Phone size={18} /> +1 (416) 555-0123
              </Button>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-slate-400">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-[#17C3B2]" />
                <span>Free Consultation</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-[#17C3B2]" />
                <span>100% Satisfaction Guarantee</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-[#17C3B2]" />
                <span>Quick Turnaround</span>
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