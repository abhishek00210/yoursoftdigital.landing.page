import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowRight, Check, ChevronDown, Globe, Layers, 
  Zap, Shield, Star, Play, Rocket, CheckCircle2, 
  Monitor, Smartphone, Target,
  ArrowUp, MessageSquare, Phone, Mail, ExternalLink,
  Palette, ShoppingCart, Search,
  BarChart3, RefreshCw, Headphones, ThumbsUp,
  Menu, X, ChevronRight, MapPin, Linkedin, Twitter, Github,
  TrendingUp, Loader2, Share2, MousePointerClick, PenTool,
  Megaphone, LineChart, Eye, Heart, Hash, Video,
  FileText, BookOpen, DollarSign,
  PieChart, Activity, Percent, Link2,
  Instagram, Facebook, Youtube, Send, Sparkles,
  Award, Clock, Users
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
// 📈 DIGITAL MARKETING PAGE
// ============================================

export default function DigitalMarketingPage() {
  const navigate = useNavigate();
  const [activeService, setActiveService] = useState(0);
  const [activeFaq, setActiveFaq] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Services Data
  const services = [
    {
      id: 'seo',
      title: 'Search Engine Optimization',
      shortTitle: 'SEO',
      icon: Search,
      color: '#4285F4',
      description: 'Search Engine Optimization (SEO) is an integral aspect of Yoursoft Digital\'s strategy, ensuring websites rank higher and attract organic traffic.',
      fullDescription: 'We help Small & Medium sized businesses across lower-mainland Vancouver, reach top ranking in Search engines. Our comprehensive SEO strategy includes technical optimization, content strategy, link building, and local SEO.',
      features: ['Technical SEO Audit', 'Keyword Research & Strategy', 'On-Page Optimization', 'Link Building', 'Local SEO', 'SEO Analytics & Reporting'],
      benefits: ['Increase organic traffic by up to 300%', 'Improve search engine rankings', 'Build long-term online visibility', 'Higher quality leads at lower cost']
    },
    {
      id: 'smo',
      title: 'Social Media Optimization',
      shortTitle: 'SMO',
      icon: Share2,
      color: '#E1306C',
      description: 'Social Media Optimization (SMO) plays a pivotal role at Yoursoft Digital in enhancing their clients\' brand presence and engagement.',
      fullDescription: 'Our SMO services focus on optimizing your social media profiles and content to increase visibility, engagement, and brand awareness.',
      features: ['Profile Optimization', 'Content Strategy', 'Community Management', 'Hashtag Strategy', 'Influencer Outreach', 'Social Listening'],
      benefits: ['Increase brand awareness', 'Build engaged community', 'Drive website traffic', 'Improve customer loyalty']
    },
    {
      id: 'paid',
      title: 'Paid Marketing',
      shortTitle: 'PPC',
      icon: MousePointerClick,
      color: '#FBBC05',
      description: 'Yoursoft Digital seeking to amplify its client\'s online presence and attract a broader clientele, implementing strategic paid marketing campaigns.',
      fullDescription: 'Our paid marketing services deliver immediate results through strategic ad placements across Google, Facebook, Instagram, LinkedIn, and more.',
      features: ['Google Ads Management', 'Facebook & Instagram Ads', 'LinkedIn Advertising', 'Retargeting Campaigns', 'Shopping Ads', 'Display Advertising'],
      benefits: ['Immediate visibility and traffic', 'Precise audience targeting', 'Measurable ROI', 'Scalable campaigns']
    },
    {
      id: 'content',
      title: 'Content Marketing',
      shortTitle: 'Content',
      icon: FileText,
      color: '#34A853',
      description: 'At Yoursoft Digital, content marketing serves as the backbone of our outreach and client engagement.',
      fullDescription: 'Leveraging compelling storytelling and valuable insights, we create content that educates, entertains, and converts.',
      features: ['Blog Writing & Management', 'Video Content Creation', 'Infographic Design', 'Email Marketing', 'E-books & Whitepapers', 'Case Studies'],
      benefits: ['Establish thought leadership', 'Improve SEO rankings', 'Generate quality leads', 'Build brand trust']
    },
    {
      id: 'email',
      title: 'Email Marketing',
      shortTitle: 'Email',
      icon: Send,
      color: '#EA4335',
      description: 'Strategic email marketing campaigns that nurture leads and drive conversions with personalized messaging.',
      fullDescription: 'Our email marketing services help you build lasting relationships with your audience through personalized, automated campaigns.',
      features: ['Email Campaign Strategy', 'Automation Workflows', 'Newsletter Management', 'A/B Testing', 'List Segmentation', 'Performance Analytics'],
      benefits: ['Highest ROI marketing channel', 'Direct customer communication', 'Automated nurturing', 'Measurable results']
    },
    {
      id: 'analytics',
      title: 'Analytics & Reporting',
      shortTitle: 'Analytics',
      icon: BarChart3,
      color: '#9333EA',
      description: 'Data-driven insights and comprehensive reporting to track performance and optimize marketing strategies.',
      fullDescription: 'We believe in making data-driven decisions. Our analytics services provide comprehensive insights into your marketing performance.',
      features: ['Google Analytics Setup', 'Custom Dashboard Creation', 'Conversion Tracking', 'ROI Analysis', 'Competitor Analysis', 'Monthly Performance Reports'],
      benefits: ['Data-driven decisions', 'Clear ROI visibility', 'Identify growth opportunities', 'Optimize marketing spend']
    }
  ];

  // Process Steps
  const processSteps = [
    { step: '01', title: 'Discovery & Audit', description: 'We analyze your current digital presence, competitors, and target audience.', icon: Search },
    { step: '02', title: 'Strategy Development', description: 'Create a customized marketing strategy aligned with your business goals.', icon: Target },
    { step: '03', title: 'Implementation', description: 'Execute campaigns across all relevant digital channels.', icon: Rocket },
    { step: '04', title: 'Monitor & Optimize', description: 'Continuously track performance and optimize for better results.', icon: LineChart },
    { step: '05', title: 'Report & Scale', description: 'Provide detailed reports and scale successful strategies.', icon: TrendingUp },
    { step: '06', title: 'Ongoing Support', description: 'Continuous support and strategy refinement for sustained growth.', icon: RefreshCw }
  ];

  // Stats
  const stats = [
    { value: 500, suffix: '+', label: 'Campaigns Launched' },
    { value: 150, suffix: '%', label: 'Average ROI Increase' },
    { value: 10, suffix: 'M+', label: 'Leads Generated' },
    { value: 98, suffix: '%', label: 'Client Retention' },
  ];

  // Channels
  const channels = [
    { name: 'Google', icon: Search, color: '#4285F4' },
    { name: 'Facebook', icon: Facebook, color: '#1877F2' },
    { name: 'Instagram', icon: Instagram, color: '#E1306C' },
    { name: 'LinkedIn', icon: Linkedin, color: '#0A66C2' },
    { name: 'YouTube', icon: Youtube, color: '#FF0000' },
    { name: 'Twitter', icon: Twitter, color: '#1DA1F2' },
  ];

  // FAQs
  const faqs = [
    { question: 'How long does it take to see results from digital marketing?', answer: 'Results vary by channel. Paid advertising can show results within days, while SEO typically takes 3-6 months for significant improvements.' },
    { question: 'What is the minimum budget for digital marketing?', answer: 'We work with budgets of all sizes. For paid advertising, we recommend starting with at least $1,000-2,000/month.' },
    { question: 'How do you measure the success of marketing campaigns?', answer: 'We track KPIs specific to your goals including website traffic, conversion rates, lead generation, cost per acquisition, and ROI.' },
    { question: 'Do you work with businesses in specific industries?', answer: 'We work with businesses across all industries including e-commerce, healthcare, finance, real estate, technology, and professional services.' },
    { question: 'Can you help with both B2B and B2C marketing?', answer: 'Absolutely! We have extensive experience in both B2B and B2C marketing with strategies tailored to each.' }
  ];

  // Why Choose Us
  const whyChooseUs = [
    { icon: Target, title: 'Data-Driven Strategy', description: 'Every decision is backed by data and analytics for maximum impact.' },
    { icon: TrendingUp, title: 'Proven Results', description: 'Track record of delivering measurable growth for our clients.' },
    { icon: Users, title: 'Dedicated Team', description: 'A team of specialists assigned to your account for personalized service.' },
    { icon: RefreshCw, title: 'Agile Approach', description: 'Quick to adapt strategies based on performance and market changes.' },
    { icon: Award, title: 'Certified Experts', description: 'Google, Facebook, and HubSpot certified marketing professionals.' },
    { icon: Headphones, title: '24/7 Support', description: 'Always available to answer questions and provide updates.' }
  ];

  return (
    <div className="font-sans text-[#0D2342] bg-white antialiased">
      
      <Navbar isScrolled={isScrolled} />

      {/* ============================================ */}
      {/* HERO SECTION */}
      {/* ============================================ */}
      <section className="relative min-h-screen flex items-center pt-24 pb-20 overflow-hidden bg-gradient-to-br from-[#0D2342] via-[#0D2342] to-[#17C3B2]/20">
        <FloatingShape size={400} color="#17C3B2" blur={150} top="10%" right="-10%" shape="circle" />
        <FloatingShape size={300} color="#C9A14A" blur={120} bottom="10%" left="-5%" shape="blob" />
        <FloatingShape size={200} color="#17C3B2" blur={80} top="50%" left="20%" shape="square" />
        
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: `radial-gradient(#17C3B2 1px, transparent 1px)`, backgroundSize: '30px 30px' }} />

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="flex items-center gap-2 text-slate-400 text-sm mb-6">
                <Link to="/" className="hover:text-[#17C3B2] transition-colors">Home</Link>
                <ChevronRight size={14} />
                <Link to="/services" className="hover:text-[#17C3B2] transition-colors">Services</Link>
                <ChevronRight size={14} />
                <span className="text-[#17C3B2]">Digital Marketing</span>
              </motion.div>

              <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#17C3B2]/20 border border-[#17C3B2]/30 rounded-full text-[#17C3B2] text-sm font-medium mb-6"
              >
                <Megaphone size={16} />
                Digital Marketing Services
              </motion.span>
              
              <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6"
              >
                We Manage Your
                <motion.span initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 }} className="block text-[#17C3B2]">
                  Digital Marketing
                </motion.span>
              </motion.h1>
              
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }} className="text-lg text-slate-300 mb-8 leading-relaxed max-w-xl">
                At Yoursoft Digital, our approach encompasses a diverse range of strategies aimed at maximizing online presence, driving traffic, and generating leads for our clients.
              </motion.p>
              
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} className="flex flex-col sm:flex-row gap-4 mb-10">
                <Button size="lg" variant="primary" onClick={() => navigate('/contact')}>
                  Get Free Marketing Audit <ArrowRight size={18} />
                </Button>
                <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10">
                  <Play size={18} className="text-[#17C3B2]" /> View Case Studies
                </Button>
              </motion.div>
              
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }} className="flex flex-wrap items-center gap-6 text-sm text-slate-400">
                <div className="flex items-center gap-2"><CheckCircle2 size={16} className="text-[#17C3B2]" /><span>500+ Campaigns Launched</span></div>
                <div className="flex items-center gap-2"><TrendingUp size={16} className="text-[#17C3B2]" /><span>150% Average ROI</span></div>
              </motion.div>
            </motion.div>
            
            {/* Right Content - Marketing Dashboard */}
            <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.3 }} className="relative hidden lg:block">
              <div className="relative">
                <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="bg-white rounded-2xl shadow-2xl p-6 relative z-10"
                >
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="font-bold text-[#0D2342]">Marketing Dashboard</h3>
                      <p className="text-xs text-slate-500">Real-time analytics</p>
                    </div>
                    <div className="flex gap-2">
                      {['bg-red-400', 'bg-yellow-400', 'bg-green-400'].map((color, i) => (
                        <div key={i} className={`w-3 h-3 rounded-full ${color}`} />
                      ))}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    {[
                      { label: 'Website Traffic', value: '+127%', icon: TrendingUp, color: 'text-green-500' },
                      { label: 'Conversions', value: '2,847', icon: Target, color: 'text-blue-500' },
                      { label: 'ROI', value: '340%', icon: DollarSign, color: 'text-[#17C3B2]' },
                      { label: 'Engagement', value: '+89%', icon: Heart, color: 'text-pink-500' },
                    ].map((stat, i) => (
                      <motion.div key={i} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1.2 + i * 0.1 }} className="bg-slate-50 rounded-xl p-4"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <stat.icon size={18} className={stat.color} />
                          <span className={`text-xs font-bold ${stat.color}`}>{stat.value}</span>
                        </div>
                        <p className="text-xs text-slate-600">{stat.label}</p>
                      </motion.div>
                    ))}
                  </div>
                  
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6 }}
                    className="bg-gradient-to-r from-[#17C3B2]/10 to-[#0D2342]/10 rounded-xl p-4"
                  >
                    <div className="flex items-end justify-between h-24 gap-2">
                      {[40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 100].map((height, i) => (
                        <motion.div key={i} initial={{ height: 0 }} animate={{ height: `${height}%` }}
                          transition={{ delay: 1.8 + i * 0.05, duration: 0.5 }}
                          className="flex-1 bg-gradient-to-t from-[#17C3B2] to-[#17C3B2]/50 rounded-t"
                        />
                      ))}
                    </div>
                  </motion.div>
                </motion.div>

                <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 2 }}
                  className="absolute -left-8 top-10 bg-white rounded-xl shadow-xl p-4 z-20"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                      <TrendingUp size={20} className="text-green-500" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#0D2342]">+127% Traffic</div>
                      <div className="text-xs text-slate-500">This month</div>
                    </div>
                  </div>
                </motion.div>

                <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 2.2 }}
                  className="absolute -right-4 bottom-20 bg-white rounded-xl shadow-xl p-4 z-20"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#17C3B2]/10 flex items-center justify-center">
                      <Star size={20} className="text-[#C9A14A] fill-[#C9A14A]" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#0D2342]">#1 Ranking</div>
                      <div className="text-xs text-slate-500">Google Search</div>
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
      {/* INTRO SECTION */}
      {/* ============================================ */}
      <Section gray>
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#17C3B2]/10 border border-[#17C3B2]/20 rounded-full text-[#17C3B2] text-xs font-bold uppercase tracking-wider mb-4">
              Our Approach
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#0D2342] mb-6">
              We Manage Your <span className="text-[#17C3B2]">Digital Marketing</span>
            </h2>
            <p className="text-slate-500 text-lg leading-relaxed mb-6">
              Our comprehensive digital marketing strategies are agile, adaptable, and focused on achieving measurable results for our clients, ensuring a strong online presence and sustainable growth in the digital landscape.
            </p>
            
            <div className="grid grid-cols-2 gap-4">
              {['Data-Driven Strategies', 'ROI Focused', 'Transparent Reporting', 'Dedicated Support'].map((item, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="flex items-center gap-2"
                >
                  <CheckCircle2 size={18} className="text-[#17C3B2]" />
                  <span className="text-sm font-medium text-[#0D2342]">{item}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
          
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: Search, label: 'SEO', value: '+300%', desc: 'Organic Traffic' },
                { icon: MousePointerClick, label: 'PPC', value: '5.2x', desc: 'ROAS Average' },
                { icon: Share2, label: 'Social', value: '+180%', desc: 'Engagement' },
                { icon: FileText, label: 'Content', value: '10M+', desc: 'Views Generated' },
              ].map((item, i) => (
                <motion.div key={i} whileHover={{ y: -5 }} className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100">
                  <div className="w-12 h-12 rounded-xl bg-[#17C3B2]/10 flex items-center justify-center mb-4">
                    <item.icon size={24} className="text-[#17C3B2]" />
                  </div>
                  <div className="text-xs text-slate-500 mb-1">{item.label}</div>
                  <div className="text-2xl font-bold text-[#0D2342] mb-1">{item.value}</div>
                  <div className="text-xs text-slate-400">{item.desc}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </Section>

      {/* ============================================ */}
      {/* SERVICES CARDS */}
      {/* ============================================ */}
      <Section>
        <SectionHeader 
          badge="Our Services"
          title="Comprehensive Digital Marketing Services"
          subtitle="From SEO to paid advertising, we offer a full suite of digital marketing services to grow your business."
        />

        <div className="grid lg:grid-cols-2 gap-8">
          {services.slice(0, 4).map((service, index) => (
            <motion.div key={service.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full group relative overflow-hidden">
                <div className="flex items-start gap-6">
                  <motion.div whileHover={{ rotate: [0, -10, 10, 0] }} transition={{ duration: 0.5 }}
                    className="w-16 h-16 rounded-xl flex-shrink-0 flex items-center justify-center"
                    style={{ backgroundColor: `${service.color}15` }}
                  >
                    <service.icon size={32} style={{ color: service.color }} />
                  </motion.div>
                  
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-[#0D2342] mb-2 group-hover:text-[#17C3B2] transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-slate-500 mb-4 leading-relaxed">{service.description}</p>
                    
                    <Button variant="ghost" className="p-0 text-[#17C3B2] hover:text-[#0D2342]"
                      onClick={() => setActiveService(services.findIndex(s => s.id === service.id))}
                    >
                      Read More <ArrowRight size={16} />
                    </Button>
                  </div>
                </div>
                
                <div className="absolute top-0 right-0 w-24 h-24 rounded-bl-full opacity-5" style={{ backgroundColor: service.color }} />
              </Card>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* ============================================ */}
      {/* DETAILED SERVICE SECTION */}
      {/* ============================================ */}
      <Section gray>
        <SectionHeader badge="Deep Dive" title="Marketing Excellence" subtitle="Explore our specialized digital marketing services in detail." />

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
                  <Button variant="primary" onClick={() => navigate('/contact')}>Get Started <ArrowRight size={16} /></Button>
                  <Button variant="outline">View Case Studies <ExternalLink size={16} /></Button>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </Section>

      {/* ============================================ */}
      {/* SEO HIGHLIGHT SECTION */}
      {/* ============================================ */}
      <Section dark>
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-[#17C3B2]/20 flex items-center justify-center">
                <img src={logo} alt="Yoursoft Digital" className="h-8 w-auto brightness-0 invert" />
              </div>
              <span className="text-white font-medium">Yoursoft Digital</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Search Engine Optimization <span className="text-[#17C3B2]">(SEO)</span>
            </h2>
            <p className="text-slate-300 text-lg leading-relaxed mb-8">
              We help Small & Medium sized businesses across lower-mainland Vancouver, reach top ranking in Search engines. Our proven SEO strategies have helped hundreds of businesses increase their organic visibility.
            </p>
            
            <div className="grid grid-cols-2 gap-6 mb-8">
              {[
                { value: '#1', label: 'Page Rankings' },
                { value: '300%', label: 'Traffic Increase' },
                { value: '50+', label: 'Keywords Ranked' },
                { value: '24/7', label: 'Monitoring' },
              ].map((stat, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4"
                >
                  <div className="text-2xl font-bold text-[#17C3B2] mb-1">{stat.value}</div>
                  <div className="text-sm text-slate-400">{stat.label}</div>
                </motion.div>
              ))}
            </div>
            
            <Button variant="primary" size="lg" onClick={() => navigate('/contact')}>
              Explore Now <ArrowRight size={18} />
            </Button>
          </motion.div>
          
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
              <h4 className="text-white font-bold mb-6">SEO Performance</h4>
              
              <div className="space-y-4">
                {[
                  { label: 'Keyword Rankings', value: 85 },
                  { label: 'Organic Traffic', value: 92 },
                  { label: 'Domain Authority', value: 78 },
                  { label: 'Page Speed', value: 95 },
                ].map((item, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-slate-300">{item.label}</span>
                      <span className="text-[#17C3B2] font-medium">{item.value}%</span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <motion.div initial={{ width: 0 }} whileInView={{ width: `${item.value}%` }}
                        viewport={{ once: true }} transition={{ duration: 1, delay: i * 0.2 }}
                        className="h-full bg-gradient-to-r from-[#17C3B2] to-[#C9A14A] rounded-full"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </Section>

      {/* ============================================ */}
      {/* CHANNELS SECTION */}
      {/* ============================================ */}
      <Section>
        <SectionHeader badge="Channels" title="Marketing Channels We Master" subtitle="We leverage all major digital channels to maximize your reach and impact." />

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {channels.map((channel, index) => (
            <motion.div key={index} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }} transition={{ delay: index * 0.05 }}
              whileHover={{ y: -8, scale: 1.05 }}
              className="bg-white border border-slate-200 rounded-2xl p-6 text-center hover:shadow-xl hover:border-[#17C3B2]/30 transition-all cursor-pointer group"
            >
              <motion.div whileHover={{ rotate: [0, -10, 10, 0] }}
                className="w-14 h-14 mx-auto rounded-xl flex items-center justify-center mb-3 transition-colors"
                style={{ backgroundColor: `${channel.color}15` }}
              >
                <channel.icon size={28} style={{ color: channel.color }} />
              </motion.div>
              <h4 className="font-medium text-[#0D2342] text-sm group-hover:text-[#17C3B2] transition-colors">{channel.name}</h4>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* ============================================ */}
      {/* PROCESS SECTION */}
      {/* ============================================ */}
      <Section gray>
        <SectionHeader badge="Our Process" title="How We Drive Results" subtitle="A proven methodology that ensures quality, transparency, and measurable outcomes." />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {processSteps.map((step, index) => (
            <motion.div key={index} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: index * 0.1 }} className="relative"
            >
              <Card className="h-full group">
                                <div className="absolute -top-4 -left-2 text-6xl font-black text-[#17C3B2]/10">
                  {step.step}
                </div>
                
                <div className="relative z-10">
                  <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.5 }}
                    className="w-14 h-14 rounded-xl bg-[#17C3B2]/10 flex items-center justify-center mb-6 group-hover:bg-[#17C3B2] transition-colors"
                  >
                    <step.icon size={24} className="text-[#17C3B2] group-hover:text-white transition-colors" />
                  </motion.div>
                  
                  <h3 className="text-xl font-bold text-[#0D2342] mb-3 group-hover:text-[#17C3B2] transition-colors">
                    {step.title}
                  </h3>
                  
                  <p className="text-slate-500 leading-relaxed">{step.description}</p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* ============================================ */}
      {/* WHY CHOOSE US SECTION */}
      {/* ============================================ */}
      <Section>
        <SectionHeader badge="Why Choose Us" title="The Yoursoft Digital Advantage" subtitle="What sets us apart from other digital marketing agencies." />

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
      {/* TECHNOLOGIES/TOOLS SECTION */}
      {/* ============================================ */}
      <Section gray>
        <SectionHeader badge="Tools & Platforms" title="Industry-Leading Marketing Tools" subtitle="We use the best tools in the industry to deliver exceptional results." />

        <div className="relative overflow-hidden">
          <motion.div animate={{ x: [0, -1920] }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="flex gap-8 items-center"
          >
            {[
              'Google Analytics', 'Google Ads', 'Facebook Ads', 'SEMrush', 'Ahrefs',
              'HubSpot', 'Mailchimp', 'Hootsuite', 'Canva', 'WordPress',
              'Shopify', 'Salesforce', 'Moz', 'Buffer', 'Sprout Social',
              'Google Analytics', 'Google Ads', 'Facebook Ads', 'SEMrush', 'Ahrefs',
            ].map((tool, i) => (
              <div key={i} className="flex-shrink-0 px-8 py-4 bg-white rounded-xl shadow-sm border border-slate-200 font-medium text-[#0D2342]">
                {tool}
              </div>
            ))}
          </motion.div>
        </div>
      </Section>

      {/* ============================================ */}
      {/* FAQ SECTION */}
      {/* ============================================ */}
      <Section>
        <SectionHeader badge="FAQ" title="Frequently Asked Questions" subtitle="Get answers to common questions about our digital marketing services." />

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
          <p className="text-slate-500 mb-4">Still have questions?</p>
          <Button variant="outline" onClick={() => navigate('/contact')}>
            <MessageSquare size={16} /> Contact Our Team
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
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-[#17C3B2]/20 border border-[#17C3B2]/30 rounded-full text-[#17C3B2] text-sm font-medium mb-6">
              <Rocket size={16} />
              Ready to Grow Your Business?
            </span>
            
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Let's Skyrocket Your
              <span className="text-[#17C3B2]"> Digital Presence </span>
              Together
            </h2>
            
            <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
              Get a free marketing audit and discover opportunities to grow your business online.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button size="lg" variant="primary" onClick={() => navigate('/contact')}>
                Get Free Marketing Audit <ArrowRight size={18} />
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
                <span>No Long-Term Contracts</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-[#17C3B2]" />
                <span>Results Guaranteed</span>
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