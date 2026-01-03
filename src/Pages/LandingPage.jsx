import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { 
  ArrowRight, Check, ChevronDown, Code, BarChart3, Bot, 
  Layers, Zap, MessageSquare, Shield, User, Menu, X, Globe,
  Star, Play, ArrowUp, Rocket, PieChart, Calendar, 
  Mail, Phone, MapPin, Linkedin, Twitter, Github,
  ExternalLink, Send, Loader2, Building2, Briefcase, TrendingUp, CheckCircle2,
  Target 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import logo from "../Images/Logo/logo.png";

// ============================================
// 🎨 PARALLAX COMPONENTS (Keep outside - unchanged)
// ============================================

const FloatingShape = ({
  size = 200,
  color = "#17C3B2",
  blur = 80,
  speed = 0.4,
  top,
  left,
  right,
  bottom,
  shape = "circle",
  className = ""
}) => {
  const { scrollYProgress } = useScroll();
  
  const y = useTransform(scrollYProgress, [0, 1], [0, -200 * speed]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360 * speed]);
  
  const springY = useSpring(y, { stiffness: 100, damping: 30 });
  const springRotate = useSpring(rotate, { stiffness: 100, damping: 30 });

  const shapeStyles = {
    circle: "rounded-full",
    square: "rounded-3xl",
    blob: "rounded-[40%_60%_70%_30%/40%_50%_60%_50%]"
  };

  return (
    <motion.div
      style={{
        y: springY,
        rotate: springRotate,
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

const GradientOrb = ({
  colors = ["#17C3B2", "#0D2342"],
  size = 400,
  blur = 100,
  speed = 0.5,
  top,
  left,
  right,
  bottom,
  className = ""
}) => {
  const { scrollYProgress } = useScroll();
  
  const y = useTransform(scrollYProgress, [0, 1], [0, -300 * speed]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.2, 1]);
  
  const springY = useSpring(y, { stiffness: 50, damping: 20 });
  const springScale = useSpring(scale, { stiffness: 50, damping: 20 });

  return (
    <motion.div
      style={{
        y: springY,
        scale: springScale,
        width: size,
        height: size,
        background: `radial-gradient(circle, ${colors[0]} 0%, ${colors[1]} 50%, transparent 70%)`,
        filter: `blur(${blur}px)`,
        top,
        left,
        right,
        bottom,
      }}
      className={`absolute rounded-full opacity-40 pointer-events-none ${className}`}
    />
  );
};

const ParallaxDots = ({ 
  dotColor = "#17C3B2",
  dotSize = 2,
  gap = 30,
  speed = 0.2,
  className = ""
}) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 100 * speed]);

  return (
    <motion.div
      ref={ref}
      style={{ y }}
      className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}
    >
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `radial-gradient(${dotColor} ${dotSize}px, transparent ${dotSize}px)`,
          backgroundSize: `${gap}px ${gap}px`,
        }}
      />
    </motion.div>
  );
};

const ParallaxElement = ({ 
  children, 
  speed = 0.5,
  className = ""
}) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100 * speed, -100 * speed]);
  const springY = useSpring(y, { stiffness: 100, damping: 30 });

  return (
    <motion.div
      ref={ref}
      style={{ y: springY }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const GradientMesh = ({ className = "" }) => {
  const { scrollYProgress } = useScroll();
  
  const rotate1 = useTransform(scrollYProgress, [0, 1], [0, 45]);
  const rotate2 = useTransform(scrollYProgress, [0, 1], [45, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.1, 1]);

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      <motion.div
        style={{ rotate: rotate1, scale }}
        className="absolute -top-1/2 -left-1/2 w-full h-full"
      >
        <div 
          className="w-full h-full opacity-30"
          style={{
            background: 'conic-gradient(from 0deg at 50% 50%, #17C3B2 0deg, transparent 60deg, #0D2342 120deg, transparent 180deg, #C9A14A 240deg, transparent 300deg, #17C3B2 360deg)',
            filter: 'blur(100px)',
          }}
        />
      </motion.div>
      <motion.div
        style={{ rotate: rotate2, scale }}
        className="absolute -bottom-1/2 -right-1/2 w-full h-full"
      >
        <div 
          className="w-full h-full opacity-20"
          style={{
            background: 'conic-gradient(from 180deg at 50% 50%, #0D2342 0deg, transparent 60deg, #17C3B2 120deg, transparent 180deg, #C9A14A 240deg, transparent 300deg, #0D2342 360deg)',
            filter: 'blur(120px)',
          }}
        />
      </motion.div>
    </div>
  );
};

const FloatingParticles = ({ count = 20, className = "" }) => {
  const { scrollYProgress } = useScroll();
  const baseY = useTransform(scrollYProgress, [0, 1], [0, -200]);

  const particles = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        size: Math.random() * 6 + 2,
        x: Math.random() * 100,
        y: Math.random() * 100,
        speed: Math.random() * 0.5 + 0.2,
        delay: Math.random() * 2,
      })),
    [count]
  );

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          style={{
            y: baseY,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
            transform: `translateY(${particle.speed * 40}px)`,
          }}
          animate={{
            opacity: [0.2, 0.6, 0.2],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 3 + particle.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute rounded-full bg-[#17C3B2]"
        />
      ))}
    </div>
  );
};

const WaveDivider = ({ 
  color = "#0D2342", 
  flip = false,
  className = ""
}) => {
  const { scrollYProgress } = useScroll();
  const x = useTransform(scrollYProgress, [0, 1], [0, -50]);

  return (
    <div className={`absolute left-0 right-0 overflow-hidden ${flip ? 'top-0 rotate-180' : 'bottom-0'} ${className}`}>
      <motion.svg
        style={{ x }}
        viewBox="0 0 1440 120"
        className="w-[200%] h-20"
        preserveAspectRatio="none"
      >
        <path
          fill={color}
          d="M0,64 C480,150 960,-20 1440,64 C1920,150 2400,-20 2880,64 L2880,120 L0,120 Z"
        />
      </motion.svg>
    </div>
  );
};

// ============================================
// 🧩 UI COMPONENTS (Keep outside - unchanged)
// ============================================

const AnimatedCounter = ({ end, duration = 2000, suffix = '' }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let startTime;
    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  }, [isVisible, end, duration]);

  return <div ref={ref}>{count}{suffix}</div>;
};

const Button = ({ 
  children, 
  variant = 'primary', 
  className = '', 
  onClick,
  loading = false,
  icon,
  size = 'default'
}) => {
  const baseStyle = "rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const sizes = {
    sm: "px-4 py-2 text-sm",
    default: "px-5 py-2.5 text-sm",
    lg: "px-6 py-3 text-base"
  };

  const variants = {
    primary: "bg-[#17C3B2] text-white hover:bg-[#14A697] shadow-sm shadow-[#17C3B2]/20",
    secondary: "bg-[#0D2342] text-white hover:bg-[#0A1B32] shadow-sm",
    outline: "border border-[#0D2342]/20 text-[#0D2342] hover:border-[#0D2342] hover:bg-[#0D2342]/5 bg-white",
    text: "text-[#17C3B2] hover:text-[#0D2342] hover:bg-[#17C3B2]/10",
    ghost: "text-[#0D2342]/70 hover:text-[#0D2342] hover:bg-[#0D2342]/5",
    white: "bg-white text-[#0D2342] hover:bg-gray-50 shadow-sm"
  };

  return (
    <motion.button 
      onClick={onClick} 
      disabled={loading}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`${baseStyle} ${sizes[size]} ${variants[variant]} ${className}`}
    >
      {loading ? (
        <Loader2 className="animate-spin" size={18} />
      ) : (
        <>
          {icon && <span>{icon}</span>}
          {children}
        </>
      )}
    </motion.button>
  );
};

const Card = ({ 
  children, 
  className = '',
  hover = true,
  padding = true
}) => (
  <motion.div 
    whileHover={hover ? { y: -4, transition: { duration: 0.2 } } : {}}
    className={`
      bg-white border border-slate-200 rounded-xl
      ${hover ? 'hover:shadow-xl hover:shadow-[#0D2342]/5 hover:border-[#17C3B2]/30 transition-all duration-200' : 'shadow-sm'}
      ${padding ? 'p-6' : ''}
      ${className}
    `}
  >
    {children}
  </motion.div>
);

const FeatureCard = ({ 
  icon: Icon, 
  title, 
  description,
  accentTeal = false,
  delay = 0
}) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [50, 0, 0, -50]);

  return (
    <motion.div 
      ref={ref}
      style={{ opacity, y }}
      transition={{ delay: delay * 0.1 }}
      className={`
        group bg-white p-6 rounded-xl border border-slate-200 
        hover:border-[#17C3B2]/50 hover:shadow-lg transition-all duration-300
      `}
    >
      <motion.div 
        whileHover={{ rotate: [0, -10, 10, 0], transition: { duration: 0.5 } }}
        className={`
          w-12 h-12 rounded-lg flex items-center justify-center mb-4 transition-colors duration-200
          ${accentTeal 
            ? 'bg-[#17C3B2]/10 text-[#17C3B2] group-hover:bg-[#17C3B2] group-hover:text-white' 
            : 'bg-[#0D2342]/5 text-[#0D2342] group-hover:bg-[#0D2342] group-hover:text-white'
          }
        `}
      >
        <Icon size={24} />
      </motion.div>
      <h3 className="text-lg font-semibold text-[#0D2342] mb-2">{title}</h3>
      <p className="text-slate-500 text-sm leading-relaxed">{description}</p>
    </motion.div>
  );
};

const Section = ({ 
  children, 
  className = "", 
  id = "",
  dark = false,
  gray = false,
  teal = false,
  parallax = false
}) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <section 
      ref={ref}
      id={id} 
      className={`
        py-16 md:py-24 px-6 relative overflow-hidden
        ${dark ? 'bg-[#0D2342] text-white' : ''}
        ${gray ? 'bg-slate-50' : ''}
        ${teal ? 'bg-[#17C3B2] text-white' : ''}
        ${!dark && !gray && !teal ? 'bg-white' : ''}
        ${className}
      `}
    >
      {parallax && (
        <motion.div 
          style={{ y: backgroundY }}
          className="absolute inset-0 pointer-events-none"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/5 to-transparent" />
        </motion.div>
      )}
      <div className="max-w-6xl mx-auto relative z-10">
        {children}
      </div>
    </section>
  );
};

const SectionHeader = ({ 
  badge,
  title, 
  subtitle,
  centered = true,
  light = false,
  tealBadge = false
}) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 0.5], [30, 0]);

  return (
    <motion.div 
      ref={ref}
      style={{ opacity, y }}
      className={`mb-12 ${centered ? 'text-center max-w-2xl mx-auto' : ''}`}
    >
      {badge && (
        <motion.span 
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className={`
            inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium mb-4
            ${light 
              ? 'bg-white/10 text-[#C9A14A] border border-[#C9A14A]/30' 
              : tealBadge 
                ? 'bg-[#17C3B2]/10 text-[#17C3B2] border border-[#17C3B2]/20'
                : 'bg-[#0D2342]/5 text-[#0D2342]'
            }
          `}
        >
          {badge}
        </motion.span>
      )}
      <h2 className={`text-3xl md:text-4xl font-semibold mb-4 leading-tight ${light ? 'text-white' : 'text-[#0D2342]'}`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`text-base md:text-lg ${light ? 'text-white/80' : 'text-slate-500'}`}>
          {subtitle}
        </p>
      )}
    </motion.div>
  );
};

const TestimonialCard = ({ quote, author, role, company, rating = 5 }) => (
  <Card className="h-full flex flex-col hover:border-[#C9A14A]/30">
    <div className="flex gap-0.5 mb-4">
      {[...Array(rating)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1 }}
        >
          <Star size={16} className="fill-[#C9A14A] text-[#C9A14A]" />
        </motion.div>
      ))}
    </div>
    <p className="text-slate-600 mb-6 flex-1 leading-relaxed">"{quote}"</p>
    <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
      <div className="w-10 h-10 rounded-full bg-[#0D2342] flex items-center justify-center text-white font-medium text-sm">
        {author.charAt(0)}
      </div>
      <div>
        <div className="font-medium text-[#0D2342] text-sm">{author}</div>
        <div className="text-xs text-slate-500">{role}, {company}</div>
      </div>
    </div>
  </Card>
);

const PricingCard = ({ 
  name, 
  price, 
  period = '/month',
  description, 
  features, 
  popular = false,
  cta = 'Get Started',
  delay = 0
}) => (
  <motion.div 
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: delay * 0.1, duration: 0.5 }}
    whileHover={{ y: -8 }}
    className={`
      relative p-6 rounded-xl transition-all duration-200
      ${popular 
        ? 'bg-[#0D2342] text-white shadow-xl ring-4 ring-[#0D2342]/10' 
        : 'bg-white border border-slate-200 hover:border-[#17C3B2] hover:shadow-lg'
      }
    `}
  >
    {popular && (
      <motion.span 
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, type: "spring" }}
        className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-[#C9A14A] text-[#0D2342] text-xs font-bold uppercase tracking-wider rounded-full"
      >
        Most Popular
      </motion.span>
    )}
    
    <h3 className={`text-lg font-semibold mb-1 ${popular ? 'text-white' : 'text-[#0D2342]'}`}>{name}</h3>
    <p className={`text-sm mb-4 ${popular ? 'text-[#17C3B2]' : 'text-slate-500'}`}>{description}</p>
    
    <div className="mb-6">
      <span className={`text-4xl font-semibold ${popular ? 'text-white' : 'text-[#0D2342]'}`}>{price}</span>
      <span className={`text-sm ${popular ? 'text-white/60' : 'text-slate-500'}`}>{period}</span>
    </div>
    
    <ul className="space-y-3 mb-6">
      {features.map((feature, i) => (
        <motion.li 
          key={i} 
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 * i }}
          className="flex items-start gap-2 text-sm"
        >
          <Check size={16} className={`mt-0.5 flex-shrink-0 ${popular ? 'text-[#17C3B2]' : 'text-[#17C3B2]'}`} />
          <span className={popular ? 'text-white/90' : 'text-slate-600'}>{feature}</span>
        </motion.li>
      ))}
    </ul>
    
    <Button 
      variant={popular ? 'white' : 'outline'} 
      className="w-full"
    >
      {cta}
    </Button>
  </motion.div>
);

const FAQItem = ({ question, answer, isOpen, onToggle }) => (
  <motion.div 
    className="border-b border-slate-100 last:border-0"
    initial={false}
  >
    <button 
      onClick={onToggle}
      className="w-full py-5 flex items-center justify-between text-left group"
    >
      <span className="font-medium text-[#0D2342] group-hover:text-[#17C3B2] transition-colors pr-4">
        {question}
      </span>
      <motion.div 
        animate={{ rotate: isOpen ? 180 : 0 }}
        transition={{ duration: 0.2 }}
        className={`
          w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200
          ${isOpen ? 'bg-[#17C3B2] text-white' : 'bg-slate-100 text-slate-500'}
        `}
      >
        <ChevronDown size={16} />
      </motion.div>
    </button>
    <motion.div 
      initial={false}
      animate={{ 
        height: isOpen ? 'auto' : 0,
        opacity: isOpen ? 1 : 0
      }}
      transition={{ duration: 0.3 }}
      className="overflow-hidden"
    >
      <p className="text-slate-500 text-sm leading-relaxed pb-5">{answer}</p>
    </motion.div>
  </motion.div>
);

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
      className="fixed bottom-6 right-6 z-50 w-10 h-10 rounded-lg bg-[#17C3B2] text-white shadow-lg flex items-center justify-center hover:bg-[#0D2342] transition-colors"
    >
      <ArrowUp size={18} />
    </motion.button>
  );
};

const AnnouncementBanner = ({ onClose }) => (
  <motion.div 
    initial={{ y: -50, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    exit={{ y: -50, opacity: 0 }}
    className="bg-[#0D2342] text-white py-2.5 px-6 relative overflow-hidden"
  >
    <motion.div 
      animate={{ x: ['-100%', '100%'] }}
      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
      className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12"
    />
    
    <div className="max-w-6xl mx-auto flex items-center justify-center gap-3 text-sm relative z-10">
      <span className="text-[#17C3B2]">✨</span>
      <span>New: <span className="text-[#C9A14A] font-medium">AI Chatbot 2.0</span> is here with advanced features</span>
      <button className="underline font-medium hover:text-[#17C3B2] transition-colors">Learn more →</button>
      <button onClick={onClose} className="ml-4 hover:opacity-70 transition-opacity text-white/50 hover:text-white">
        <X size={14} />
      </button>
    </div>
  </motion.div>
);

// ============================================
// 🧭 NAVBAR (MOVED OUTSIDE - Key Fix!)
// ============================================

const navItems = [
  { label: 'Services', href: '/ServicesPage', isRoute: true },
  { label: 'CRM', href: '/crm', isRoute: true },
  { label: 'AI Chatbot', href: '#chatbot', isRoute: false },
  { label: 'Pricing', href: '#pricing', isRoute: false },
];

const Navbar = ({ 
  isScrolled, 
  showBanner, 
  setShowBanner, 
  isMobileMenuOpen, 
  setIsMobileMenuOpen,
  navigate,
  handleNavClick 
}) => {
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
      {showBanner && !isScrolled && <AnnouncementBanner onClose={() => setShowBanner(false)} />}
      
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <motion.div 
          className="flex items-center gap-2 cursor-pointer group"
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
          {navItems.map((item, i) => (
            <motion.a 
              key={item.label} 
              href={item.href}
              onClick={(e) => handleNavClick(e, item)}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -2 }}
              className="text-sm font-medium text-slate-600 hover:text-[#17C3B2] transition-colors"
            >
              {item.label}
            </motion.a>
          ))}
          
          <div className="relative group">
            <button className="text-sm font-medium text-slate-600 hover:text-[#17C3B2] flex items-center gap-1 transition-colors">
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
          <Button variant="ghost" size="sm" onClick={() => navigate('/login')}>
            Sign In
          </Button>
          <Button variant="primary" size="sm" onClick={() => navigate('/signup')}>
            Get Started
            <ArrowRight size={14} />
          </Button>
        </div>

        <button 
          className="lg:hidden p-2 hover:bg-slate-100 rounded-lg transition-colors text-[#0D2342]" 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {isMobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="lg:hidden bg-white border-t border-slate-100 shadow-lg"
        >
          <div className="px-6 py-4 space-y-1">
            {navItems.map(item => (
              <a 
                key={item.label} 
                href={item.href}
                onClick={(e) => handleNavClick(e, item)}
                className="block py-2.5 text-slate-600 hover:text-[#17C3B2] text-sm font-medium"
              >
                {item.label}
              </a>
            ))}
            <div className="pt-4 space-y-2 border-t border-slate-100 mt-4">
              <Button variant="outline" className="w-full" size="sm" onClick={() => navigate('/login')}>
                Sign In
              </Button>
              <Button variant="primary" className="w-full" size="sm" onClick={() => navigate('/signup')}>
                Get Started
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

// ============================================
// 🦸 HERO SECTION (MOVED OUTSIDE - Key Fix!)
// ============================================

const Hero = ({ navigate }) => {
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -300]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  return (
    <div className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden bg-slate-50/50">
      {/* Parallax Background Elements */}
      <motion.div style={{ y: y1 }} className="absolute top-20 right-10">
        <FloatingShape 
          size={300} 
          color="#17C3B2" 
          blur={100} 
          speed={0.3}
          shape="circle"
        />
      </motion.div>
      
      <motion.div style={{ y: y2 }} className="absolute bottom-20 left-10">
        <FloatingShape 
          size={250} 
          color="#0D2342" 
          blur={80} 
          speed={0.5}
          shape="blob"
        />
      </motion.div>
      
      <motion.div style={{ y: y3 }} className="absolute top-1/3 left-1/4">
        <FloatingShape 
          size={150} 
          color="#C9A14A" 
          blur={60} 
          speed={0.7}
          shape="square"
        />
      </motion.div>

      <GradientMesh />
      <FloatingParticles count={15} />
      <ParallaxDots dotColor="#0D2342" dotSize={1} gap={40} speed={0.1} />

      <motion.div 
        style={{ opacity }}
        className="max-w-6xl mx-auto px-6 relative z-10"
      >
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left Content - ✅ KEY FIX: Using whileInView with once: true */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 bg-white border border-[#17C3B2]/20 rounded-full shadow-sm mb-6"
            >
              <div className="flex -space-x-1.5">
                {[...Array(3)].map((_, i) => (
                  <motion.div 
                    key={i}
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                    className="w-6 h-6 rounded-full border-2 border-white bg-[#0D2342] flex items-center justify-center text-[10px] font-medium text-white"
                  >
                    {['S', 'M', 'A'][i]}
                  </motion.div>
                ))}
              </div>
              <span className="text-xs text-[#0D2342] font-medium">
                Trusted by <span className="font-bold text-[#17C3B2]">500+</span> companies
              </span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-4xl sm:text-5xl font-bold text-[#0D2342] leading-[1.15] mb-5"
            >
              Build. Manage. Automate.
              <motion.span 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="block mt-2 text-[#17C3B2]"
              >
                All in One Platform
              </motion.span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="text-lg text-slate-500 mb-8 max-w-md leading-relaxed"
            >
              The complete ecosystem for Canadian businesses. Custom development, powerful CRM, and 24/7 AI automation.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7 }}
              className="flex flex-col sm:flex-row gap-3 mb-8"
            >
              <Button size="lg" variant="primary" onClick={() => navigate('/signup')}>
                Start Free Trial
                <ArrowRight size={16} />
              </Button>
              <Button variant="outline" size="lg">
                <Play size={16} className="text-[#17C3B2]" />
                Watch Demo
              </Button>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8 }}
              className="flex flex-wrap items-center gap-6 text-sm text-slate-500"
            >
              <div className="flex items-center gap-1.5">
                <CheckCircle2 size={16} className="text-[#17C3B2]" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Shield size={16} className="text-[#17C3B2]" />
                <span>PIPEDA Compliant</span>
              </div>
            </motion.div>
          </motion.div>
          
          {/* Right Content - Dashboard Preview */}
          <motion.div 
            initial={{ opacity: 0, x: 50, rotateY: -10 }}
            whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            <ParallaxElement speed={0.2}>
              <motion.div 
                whileHover={{ y: -5, transition: { duration: 0.3 } }}
                className="bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden"
              >
                <div className="bg-[#0D2342] px-4 py-2.5 flex items-center gap-2 border-b border-[#0D2342]">
                  <div className="flex gap-1.5">
                    <motion.div 
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="w-2.5 h-2.5 rounded-full bg-[#17C3B2]" 
                    />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#C9A14A]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-slate-400" />
                  </div>
                  <div className="flex-1 mx-2">
                    <div className="bg-[#0D2342]/50 rounded px-3 py-1 text-white/50 text-xs border border-white/10 max-w-[200px] flex items-center gap-2">
                      <Shield size={10} /> app.yoursoftdigital.ca
                    </div>
                  </div>
                </div>
                
                <div className="p-5 bg-slate-50">
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    {[
                      { label: 'Revenue', value: '$48.5K', change: '+12%' },
                      { label: 'Leads', value: '2,847', change: '+8%' },
                      { label: 'Conversion', value: '24%', change: '+4%' },
                    ].map((stat, i) => (
                      <motion.div 
                        key={i} 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 + i * 0.1 }}
                        whileHover={{ scale: 1.02 }}
                        className="bg-white rounded-lg p-3 border border-slate-100 shadow-sm"
                      >
                        <div className="text-slate-400 text-xs mb-1">{stat.label}</div>
                        <div className="text-[#0D2342] text-lg font-bold">{stat.value}</div>
                        <div className="text-[#17C3B2] text-xs font-medium">{stat.change}</div>
                      </motion.div>
                    ))}
                  </div>
                  
                  <motion.div 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.8 }}
                    className="bg-white rounded-lg p-4 border border-slate-100 mb-4 shadow-sm"
                  >
                    <div className="text-sm font-medium text-[#0D2342] mb-3">Revenue Overview</div>
                    <div className="h-24 flex items-end gap-1">
                      {[35, 45, 30, 60, 45, 55, 70, 50, 65, 55, 80, 70].map((h, i) => (
                        <motion.div 
                          key={i} 
                          initial={{ height: 0 }}
                          whileInView={{ height: `${h}%` }}
                          viewport={{ once: true }}
                          transition={{ delay: 1 + i * 0.05, duration: 0.5 }}
                          whileHover={{ backgroundColor: "#17C3B2" }}
                          className="flex-1 bg-[#0D2342] rounded-t-sm cursor-pointer transition-colors" 
                        />
                      ))}
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 1.2 }}
                    className="bg-white rounded-lg p-4 border border-slate-100 shadow-sm"
                  >
                    <div className="text-sm font-medium text-[#0D2342] mb-3">Recent Activity</div>
                    <div className="space-y-2">
                      {[
                        { name: 'New lead from Toronto', time: '2m ago' },
                        { name: 'Invoice #1234 paid', time: '15m ago' },
                      ].map((item, i) => (
                        <motion.div 
                          key={i} 
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 1.3 + i * 0.1 }}
                          className="flex items-center justify-between text-sm"
                        >
                          <div className="flex items-center gap-2">
                            <motion.div 
                              animate={{ scale: [1, 1.3, 1] }}
                              transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
                              className="w-2 h-2 rounded-full bg-[#17C3B2]" 
                            />
                            <span className="text-slate-600">{item.name}</span>
                          </div>
                          <span className="text-slate-400 text-xs">{item.time}</span>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </ParallaxElement>
            
            {/* Floating Cards */}
            <ParallaxElement speed={0.4} className="absolute -bottom-4 -right-4">
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 1.4 }}
                whileHover={{ scale: 1.05 }}
                className="bg-[#0D2342] text-white rounded-lg shadow-xl shadow-[#0D2342]/20 border border-[#0D2342] p-3"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                    <TrendingUp size={20} className="text-[#17C3B2]" />
                  </div>
                  <div>
                    <div className="text-xl font-bold">+127%</div>
                    <div className="text-xs text-[#17C3B2]">Growth Rate</div>
                  </div>
                </div>
              </motion.div>
            </ParallaxElement>
            
            <ParallaxElement speed={0.6} className="absolute -bottom-4 -left-4">
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 1.5 }}
                whileHover={{ scale: 1.05 }}
                className="bg-white rounded-lg shadow-xl border border-slate-100 p-3"
              >
                <div className="flex items-center gap-3">
                  <motion.div 
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    className="w-10 h-10 rounded-lg bg-[#17C3B2]/10 flex items-center justify-center"
                  >
                    <Bot size={20} className="text-[#17C3B2]" />
                  </motion.div>
                  <div>
                    <div className="text-sm font-bold text-[#0D2342]">AI Active</div>
                    <div className="text-xs text-green-600 flex items-center gap-1">
                      <motion.span 
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="w-1.5 h-1.5 rounded-full bg-green-500" 
                      /> Online
                    </div>
                  </div>
                </div>
              </motion.div>
            </ParallaxElement>
          </motion.div>
        </div>
        
        {/* Trusted By */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-16 pt-10 border-t border-slate-200/60"
        >
          <p className="text-center text-xs text-slate-400 mb-6 uppercase tracking-wider font-semibold">
            Trusted by leading Canadian companies
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8">
            {['Shopify', 'RBC', 'TD Bank', 'Air Canada', 'Lululemon'].map((brand, i) => (
              <motion.span 
                key={brand}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 0.4 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 + i * 0.1 }}
                whileHover={{ opacity: 1, scale: 1.1, color: "#0D2342" }}
                className="text-lg font-bold text-slate-400 cursor-pointer transition-colors"
              >
                {brand}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </motion.div>
      
      <WaveDivider color="#0D2342" />
    </div>
  );
};

// ============================================
// 📊 ALL OTHER SECTIONS (MOVED OUTSIDE)
// ============================================

const StatsCounter = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <Section className="!py-16 relative overflow-hidden" dark>
      <motion.div style={{ y }} className="absolute inset-0">
        <FloatingShape 
          size={200} 
          color="#17C3B2" 
          blur={80} 
          top="20%" 
          left="10%" 
          shape="circle"
        />
        <FloatingShape 
          size={150} 
          color="#C9A14A" 
          blur={60} 
          top="60%" 
          right="15%" 
          shape="blob"
        />
      </motion.div>

      <ParallaxDots dotColor="#17C3B2" dotSize={1} gap={50} speed={0.15} />

      <div ref={ref} className="grid grid-cols-2 md:grid-cols-4 gap-8 relative z-10">
        {[
          { value: 500, suffix: '+', label: 'Happy Clients' },
          { value: 98, suffix: '%', label: 'Client Retention' },
          { value: 50, suffix: 'M+', label: 'Messages Handled' },
          { value: 24, suffix: '/7', label: 'Support Available' },
        ].map((stat, i) => (
          <motion.div 
            key={i} 
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
          >
            <motion.div 
              className="text-4xl md:text-5xl font-bold text-white mb-2"
              whileHover={{ scale: 1.1, color: "#17C3B2" }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <AnimatedCounter end={stat.value} suffix={stat.suffix} />
            </motion.div>
            <div className="text-[#17C3B2] font-medium text-sm tracking-wide uppercase">{stat.label}</div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
};

const Audience = () => (
  <Section gray className="relative overflow-hidden">
    <GradientOrb 
      colors={["#17C3B2", "transparent"]} 
      size={300} 
      blur={120} 
      top="-10%" 
      right="-5%" 
      speed={0.3}
    />
    <GradientOrb 
      colors={["#0D2342", "transparent"]} 
      size={250} 
      blur={100} 
      bottom="-10%" 
      left="-5%" 
      speed={0.4}
    />

    <SectionHeader 
      badge="Who We Help"
      title="Built for Growth-Focused Teams"
      subtitle="From startups to enterprises, we help Canadian businesses scale efficiently."
      tealBadge
    />
    
    <motion.div 
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.1
          }
        }
      }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {[
        { icon: Rocket, title: "Startups", text: "Launch fast with MVP development and growth tools.", teal: true },
        { icon: Briefcase, title: "Agencies", text: "Manage clients, projects & invoices seamlessly.", teal: false },
        { icon: Building2, title: "Enterprises", text: "Scalable custom software ecosystems.", teal: true },
        { icon: Code, title: "SaaS Founders", text: "Accelerate product-market fit with AI.", teal: false },
      ].map((item, idx) => (
        <motion.div
          key={idx}
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0 }
          }}
        >
          <FeatureCard 
            icon={item.icon} 
            title={item.title} 
            description={item.text}
            accentTeal={item.teal}
            delay={idx * 50}
          />
        </motion.div>
      ))}
    </motion.div>
  </Section>
);

const CoreOfferings = ({ navigate }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <Section id="services" className="relative overflow-hidden">
      <motion.div style={{ y: y1 }} className="absolute top-0 right-0 w-1/2 h-full pointer-events-none">
        <div className="absolute top-20 right-20 w-72 h-72 bg-[#17C3B2]/10 rounded-full blur-3xl" />
      </motion.div>
      <motion.div style={{ y: y2 }} className="absolute bottom-0 left-0 w-1/2 h-full pointer-events-none">
        <div className="absolute bottom-20 left-20 w-64 h-64 bg-[#0D2342]/5 rounded-full blur-3xl" />
      </motion.div>

      <SectionHeader 
        badge="Our Solutions"
        title="Three Pillars of Business Growth"
        subtitle="Everything you need to build, manage, and automate your operations."
      />
      
      <div ref={ref} className="grid grid-cols-1 lg:grid-cols-3 gap-6 relative z-10">
        {/* Card 1 - Development */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Card className="group h-full" padding={false}>
            <div className="p-6">
              <motion.div 
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
                className="w-12 h-12 rounded-lg bg-[#0D2342]/5 text-[#0D2342] flex items-center justify-center mb-4 group-hover:bg-[#0D2342] group-hover:text-white transition-colors"
              >
                <Code size={24} />
              </motion.div>
              
              <h3 className="text-xl font-bold mb-2 text-[#0D2342]">Development Services</h3>
              <p className="text-slate-500 text-sm mb-4">Custom software solutions tailored to your needs.</p>
              
              <ul className="space-y-2 mb-6">
                {['Web Applications', 'Mobile Apps', 'UI/UX Design', 'API Integration'].map((item, i) => (
                  <motion.li 
                    key={i} 
                    className="flex items-center gap-2 text-sm text-slate-600"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Check size={14} className="text-[#17C3B2]" />
                    {item}
                  </motion.li>
                ))}
              </ul>
              
              <Button variant="text" className="p-0">
                Learn More 
                <ArrowRight size={14} />
              </Button>
            </div>
          </Card>
        </motion.div>

        {/* Featured Card - CRM (Center) */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          whileHover={{ y: -8 }}
          className="relative"
        >
          <div className="bg-[#0D2342] p-6 rounded-xl text-white relative shadow-xl shadow-[#0D2342]/20 transform md:-translate-y-2 h-full">
            <motion.span 
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, type: "spring" }}
              className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-[#C9A14A] text-[#0D2342] text-xs font-bold rounded-full"
            >
              ✨ Most Popular
            </motion.span>
            
            <motion.div 
              animate={{ 
                boxShadow: ["0 0 0 0 rgba(23, 195, 178, 0.4)", "0 0 0 10px rgba(23, 195, 178, 0)", "0 0 0 0 rgba(23, 195, 178, 0)"]
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-12 h-12 rounded-lg bg-white/10 text-[#17C3B2] flex items-center justify-center mb-4"
            >
              <BarChart3 size={24} />
            </motion.div>
            
            <h3 className="text-xl font-bold mb-2">CRM Platform</h3>
            <p className="text-slate-300 text-sm mb-4">All-in-one solution for managing your business.</p>
            
            <ul className="space-y-2 mb-6">
              {['Lead Management', 'Project Tracking', 'Invoicing', 'Team Collaboration', 'Analytics'].map((item, i) => (
                <motion.li 
                  key={i} 
                  className="flex items-center gap-2 text-sm text-slate-300"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                >
                  <Check size={14} className="text-[#17C3B2]" />
                  {item}
                </motion.li>
              ))}
            </ul>
            
            <Button variant="primary" className="w-full bg-[#17C3B2] hover:bg-[#15b0a0] text-white" onClick={() => navigate('/crm')}>
              Try CRM Free
              <ArrowRight size={14} />
            </Button>
          </div>
        </motion.div>

        {/* Card 3 - AI */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="group h-full" padding={false}>
            <div className="p-6">
              <motion.div 
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="w-12 h-12 rounded-lg bg-[#17C3B2]/10 text-[#17C3B2] flex items-center justify-center mb-4 group-hover:bg-[#17C3B2] group-hover:text-white transition-colors"
              >
                <Bot size={24} />
              </motion.div>
              
              <h3 className="text-xl font-bold mb-2 text-[#0D2342]">AI Automation</h3>
              <p className="text-slate-500 text-sm mb-4">Intelligent chatbots that work 24/7 for you.</p>
              
              <ul className="space-y-2 mb-6">
                {['24/7 Support', 'Lead Capture', 'Knowledge Base', 'Multi-platform'].map((item, i) => (
                  <motion.li 
                    key={i} 
                    className="flex items-center gap-2 text-sm text-slate-600"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Check size={14} className="text-[#17C3B2]" />
                    {item}
                  </motion.li>
                ))}
              </ul>
              
              <Button variant="text" className="p-0">
                See Demo 
                <ArrowRight size={14} />
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>
    </Section>
  );
};

const ServicesDetail = ({ activeAccordion, setActiveAccordion }) => {
  const services = [
    { id: 0, title: "Website Development", content: "High-performance React & Next.js websites built for conversion.", icon: Globe },
    { id: 1, title: "Digital Marketing", content: "SEO, PPC, and content strategies that drive real traffic.", icon: TrendingUp },
    { id: 2, title: "SEO & Analytics", content: "Data-driven insights to optimize conversions.", icon: PieChart },
    { id: 3, title: "Automation Setup", content: "Workflows that save you 20+ hours a week.", icon: Zap },
  ];

  return (
    <Section gray className="relative overflow-hidden">
      <ParallaxDots dotColor="#0D2342" dotSize={1} gap={35} speed={0.1} />
      
      <div className="grid lg:grid-cols-2 gap-12 items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold mb-4 bg-[#0D2342]/5 text-[#0D2342]">
            Expert Services
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-tight text-[#0D2342]">
            We build the tech so you can focus on growth
          </h2>
          <p className="text-slate-500 mb-6 leading-relaxed">
            Stop juggling freelancers. Our dedicated Canadian team handles everything from code to deployment.
          </p>
          
          <motion.div 
            className="flex flex-wrap gap-2 mb-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              visible: { transition: { staggerChildren: 0.05 } }
            }}
          >
            {['React', 'Next.js', 'Node.js', 'AWS', 'Figma'].map(tech => (
              <motion.span 
                key={tech} 
                variants={{
                  hidden: { opacity: 0, scale: 0.8 },
                  visible: { opacity: 1, scale: 1 }
                }}
                whileHover={{ scale: 1.1, backgroundColor: "#17C3B2", color: "#fff" }}
                className="px-3 py-1.5 bg-white rounded-lg border border-slate-200 text-xs font-bold text-[#0D2342] cursor-pointer transition-colors"
              >
                {tech}
              </motion.span>
            ))}
          </motion.div>
          
          <Button variant="secondary">
            Get a Custom Quote
            <ArrowRight size={14} />
          </Button>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card padding={false} hover={false}>
            {services.map((s) => (
              <motion.div 
                key={s.id} 
                className="border-b border-slate-100 last:border-0"
                whileHover={{ backgroundColor: "rgba(23, 195, 178, 0.02)" }}
              >
                <button 
                  onClick={() => setActiveAccordion(activeAccordion === s.id ? null : s.id)}
                  className="w-full px-5 py-4 flex items-center gap-3 text-left hover:bg-slate-50 transition-colors"
                >
                  <motion.div 
                    animate={{ rotate: activeAccordion === s.id ? 360 : 0 }}
                    transition={{ duration: 0.3 }}
                    className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
                      activeAccordion === s.id ? 'bg-[#0D2342] text-white' : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    <s.icon size={18} />
                  </motion.div>
                  <span className={`flex-1 font-medium text-sm ${activeAccordion === s.id ? 'text-[#0D2342]' : 'text-slate-600'}`}>
                    {s.title}
                  </span>
                  <motion.div
                    animate={{ rotate: activeAccordion === s.id ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown size={16} className="text-slate-400" />
                  </motion.div>
                </button>
                <motion.div 
                  initial={false}
                  animate={{ 
                    height: activeAccordion === s.id ? 'auto' : 0,
                    opacity: activeAccordion === s.id ? 1 : 0
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="px-5 pb-4 pl-[72px] text-slate-500 text-sm">
                    {s.content}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </Card>
        </motion.div>
      </div>
    </Section>
  );
};

const CRMProduct = ({ navigate }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 10]);
  const y2 = useTransform(scrollYProgress, [0, 1], [-50, 50]);

  return (
    <Section>
      <motion.div 
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="bg-[#0D2342] rounded-2xl p-8 md:p-12 overflow-hidden relative"
      >
        <motion.div 
          style={{ y, rotate }}
          className="absolute top-0 right-0 w-64 h-64 bg-[#17C3B2]/20 blur-[80px] rounded-full" 
        />
        <motion.div 
          style={{ y: y2 }}
          className="absolute bottom-0 left-0 w-64 h-64 bg-[#C9A14A]/10 blur-[80px] rounded-full" 
        />
        
        <FloatingParticles count={10} />
        
        <div className="grid lg:grid-cols-2 gap-10 items-center relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <motion.span 
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", delay: 0.3 }}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold mb-4 bg-[#17C3B2] text-white"
            >
              🍁 CRM Platform
            </motion.span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white leading-tight">
              The Operating System for Your Business
            </h2>
            <p className="text-slate-300 mb-6 leading-relaxed">
              Manage clients, invoices, projects, and employees in one unified dashboard.
            </p>
            
            <div className="flex flex-wrap gap-3 mb-8">
              <Button variant="primary">
                Start Free Trial
                <ArrowRight size={14} />
              </Button>
              <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 hover:border-white">
                <Play size={14} />
                Watch Demo
              </Button>
            </div>
            
            <motion.div 
              className="grid grid-cols-2 gap-3"
              variants={{
                visible: { transition: { staggerChildren: 0.1 } }
              }}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {['Client Portal', 'Invoicing', 'Kanban Board', 'Analytics'].map((feat, i) => (
                <motion.div 
                  key={feat} 
                  variants={{
                    hidden: { opacity: 0, x: -20 },
                    visible: { opacity: 1, x: 0 }
                  }}
                  className="flex items-center gap-2 text-sm text-slate-300"
                >
                  <Check size={14} className="text-[#17C3B2]" />
                  {feat}
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 30, rotateY: -15 }}
            whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            whileHover={{ scale: 1.02 }}
            className="bg-[#0A1B32] rounded-xl p-4 border border-[#17C3B2]/20 shadow-2xl"
          >
            <div className="grid grid-cols-3 gap-3 mb-4">
              {[
                { label: 'Revenue', value: '$124.5K' },
                { label: 'Leads', value: '2,847' },
                { label: 'Conversion', value: '24.8%' },
              ].map((stat, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className="bg-[#0D2342] rounded-lg p-3 border border-white/5"
                >
                  <div className="text-slate-400 text-xs mb-1">{stat.label}</div>
                  <div className="text-white font-semibold">{stat.value}</div>
                </motion.div>
              ))}
            </div>
            <div className="bg-[#0D2342] rounded-lg p-4 h-32 flex items-end gap-1 border border-white/5">
              {[40, 55, 35, 70, 45, 80, 60, 90, 50, 75, 65, 85].map((h, i) => (
                <motion.div 
                  key={i} 
                  initial={{ height: 0 }}
                  whileInView={{ height: `${h}%` }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + i * 0.05, duration: 0.5 }}
                  whileHover={{ backgroundColor: "#C9A14A" }}
                  className="flex-1 bg-[#17C3B2] rounded-sm cursor-pointer transition-colors" 
                />
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </Section>
  );
};

const AIChatbot = () => (
  <Section id="chatbot" gray className="relative overflow-hidden">
    <GradientOrb 
      colors={["#17C3B2", "transparent"]} 
      size={400} 
      blur={150} 
      top="10%" 
      right="-10%" 
      speed={0.3}
    />
    
    <SectionHeader 
      badge="AI Automation"
      title="Your 24/7 AI Sales Agent"
      subtitle="Turn visitors into leads while you sleep."
      tealBadge
    />
    
    <div className="grid lg:grid-cols-2 gap-10 items-center relative z-10">
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <Card hover={false}>
          <div className="flex items-center gap-3 pb-4 border-b border-slate-100 mb-4">
            <motion.div 
              animate={{ 
                boxShadow: ["0 0 0 0 rgba(23, 195, 178, 0.4)", "0 0 0 8px rgba(23, 195, 178, 0)", "0 0 0 0 rgba(23, 195, 178, 0)"]
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-10 h-10 rounded-full bg-[#17C3B2] flex items-center justify-center"
            >
              <Bot size={18} className="text-white" />
            </motion.div>
            <div>
              <div className="font-bold text-[#0D2342] text-sm">Yoursoft AI</div>
              <div className="text-xs text-[#17C3B2] flex items-center gap-1">
                <motion.span 
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="w-1.5 h-1.5 bg-[#17C3B2] rounded-full" 
                /> Online
              </div>
            </div>
          </div>
          
          <div className="space-y-3 mb-4">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex gap-2"
            >
              <div className="w-7 h-7 rounded-full bg-[#17C3B2] flex items-center justify-center text-white flex-shrink-0">
                <Bot size={12} />
              </div>
              <div className="bg-slate-100 p-3 rounded-xl rounded-tl-none text-slate-700 text-sm max-w-[240px]">
                Hi! 👋 How can I help you today?
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="flex gap-2 flex-row-reverse"
            >
              <div className="w-7 h-7 rounded-full bg-[#0D2342] flex items-center justify-center text-white flex-shrink-0">
                <User size={12} />
              </div>
              <div className="bg-[#0D2342] p-3 rounded-xl rounded-tr-none text-white text-sm max-w-[240px]">
                I need a CRM for my agency
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="flex gap-2"
            >
              <div className="w-7 h-7 rounded-full bg-[#17C3B2] flex items-center justify-center text-white flex-shrink-0">
                <Bot size={12} />
              </div>
              <motion.div 
                animate={{ scale: [1, 1.02, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="bg-slate-100 p-3 rounded-xl rounded-tl-none text-slate-700 text-sm max-w-[240px]"
              >
                Great choice! Our CRM includes client management, invoicing, and more. Want a demo?
              </motion.div>
            </motion.div>
          </div>
          
          <motion.div 
            className="flex flex-wrap gap-2 mb-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              visible: { transition: { staggerChildren: 0.1 } }
            }}
          >
            {['Yes, show me', 'Pricing?', 'Talk to sales'].map(reply => (
              <motion.button 
                key={reply} 
                variants={{
                  hidden: { opacity: 0, scale: 0.8 },
                  visible: { opacity: 1, scale: 1 }
                }}
                whileHover={{ scale: 1.05, backgroundColor: "#17C3B2", color: "#fff" }}
                whileTap={{ scale: 0.95 }}
                className="px-3 py-1.5 bg-[#17C3B2]/5 text-[#17C3B2] text-xs font-medium rounded-full hover:bg-[#17C3B2] hover:text-white transition-colors border border-[#17C3B2]/20"
              >
                {reply}
              </motion.button>
            ))}
          </motion.div>
          
          <div className="flex gap-2">
            <input 
              type="text" 
              placeholder="Type a message..." 
              className="flex-1 px-4 py-2.5 bg-slate-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#17C3B2]"
            />
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-10 h-10 bg-[#17C3B2] rounded-lg flex items-center justify-center text-white hover:bg-[#0D2342] transition-colors"
            >
              <Send size={16} />
            </motion.button>
          </div>
        </Card>
      </motion.div>
      
      <motion.div 
        className="space-y-5"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          visible: { transition: { staggerChildren: 0.15 } }
        }}
      >
        {[
          { icon: MessageSquare, title: "Instant Responses", desc: "Answer queries 24/7 in English & French.", teal: true },
          { icon: Target, title: "Lead Qualification", desc: "AI captures emails, names, and intent.", teal: false },
          { icon: Zap, title: "Easy Integration", desc: "Works with your website and social media.", teal: true },
          { icon: Shield, title: "Enterprise Security", desc: "SOC 2 compliant with Canadian data hosting.", teal: false },
        ].map((item, i) => (
          <motion.div 
            key={i} 
            variants={{
              hidden: { opacity: 0, x: 30 },
              visible: { opacity: 1, x: 0 }
            }}
            whileHover={{ x: 10 }}
            className="flex gap-4 group cursor-pointer"
          >
            <motion.div 
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
              className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors flex-shrink-0 ${
                item.teal 
                  ? 'bg-[#17C3B2]/10 text-[#17C3B2] group-hover:bg-[#17C3B2] group-hover:text-white'
                  : 'bg-[#0D2342]/5 text-[#0D2342] group-hover:bg-[#0D2342] group-hover:text-white'
              }`}
            >
              <item.icon size={18} />
            </motion.div>
            <div>
              <h4 className="font-bold text-[#0D2342] mb-0.5">{item.title}</h4>
              <p className="text-slate-500 text-sm">{item.desc}</p>
            </div>
          </motion.div>
        ))}
        
        <motion.div 
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 }
          }}
          className="pt-4"
        >
          <Button variant="secondary">
            See AI in Action
            <Play size={14} />
          </Button>
        </motion.div>
      </motion.div>
    </div>
  </Section>
);

const Integrations = () => {
  const logos = {
    Slack: (
      <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8">
        <path d="M5.042 15.123a2.52 2.52 0 0 1-2.52-2.52 2.52 2.52 0 0 1 2.52-2.52h2.52v5.04h-2.52Z" fill="#E01E5A"/>
        <path d="M6.302 10.083a2.52 2.52 0 0 1 2.52-2.52 2.52 2.52 0 0 1 2.52 2.52v6.3a2.52 2.52 0 0 1-2.52 2.52 2.52 2.52 0 0 1-2.52-2.52v-6.3Z" fill="#36C5F0"/>
        <path d="M8.822 5.042a2.52 2.52 0 0 1-2.52-2.52A2.52 2.52 0 0 1 8.822 0a2.52 2.52 0 0 1 2.52 2.522v2.52H8.822Z" fill="#2EB67D"/>
        <path d="M13.862 6.302a2.52 2.52 0 0 1 2.52-2.52 2.52 2.52 0 0 1 2.52 2.52 2.52 2.52 0 0 1-2.52 2.52h-2.52V6.302Z" fill="#ECB22E"/>
      </svg>
    ),
    Zapier: (
      <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8">
        <path d="M3 12h8.571L9.429 21 21 12h-8.571L14.571 3 3 12Z" fill="#FF4F00"/>
      </svg>
    ),
    HubSpot: (
      <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8">
        <path d="M18.164 7.93V5.084a2.198 2.198 0 001.267-1.984 2.21 2.21 0 00-4.422 0c0 .858.496 1.597 1.213 1.962v2.867a5.166 5.166 0 00-2.598 1.108l-6.88-5.352a2.593 2.593 0 00.109-.735A2.553 2.553 0 104.3 5.503a2.553 2.553 0 001.712-.664l6.787 5.28a5.186 5.186 0 00-.787 2.749c0 1.05.316 2.025.854 2.844l-2.085 2.085a1.78 1.78 0 00-.514-.083 1.817 1.817 0 101.817 1.817c0-.18-.034-.35-.083-.514l2.063-2.063a5.186 5.186 0 003.165 1.076c2.872 0 5.202-2.33 5.202-5.201a5.188 5.188 0 00-4.267-5.098zm-.935 7.508a2.411 2.411 0 110-4.822 2.411 2.411 0 010 4.822z" fill="#FF7A59"/>
      </svg>
    ),
    Salesforce: (
      <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8">
        <path d="M10.006 5.415a4.195 4.195 0 013.045-1.306c1.56 0 2.954.85 3.69 2.147a5.13 5.13 0 011.685-.286c2.855 0 5.17 2.34 5.17 5.226 0 2.885-2.315 5.225-5.17 5.225-.339 0-.67-.034-.989-.097a3.96 3.96 0 01-3.544 2.202 3.945 3.945 0 01-1.985-.535 4.765 4.765 0 01-4.164 2.456c-2.381 0-4.386-1.74-4.764-4.022a4.213 4.213 0 01-.784.074C1.186 16.5 0 15.293 0 13.79c0-.99.522-1.858 1.305-2.338A4.03 4.03 0 011 10.172c0-2.19 1.753-3.97 3.917-3.97.59 0 1.147.13 1.648.364a4.91 4.91 0 013.44-1.151z" fill="#00A1E0"/>
      </svg>
    ),
    Google: (
      <svg viewBox="0 0 24 24" className="w-8 h-8">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
      </svg>
    ),
    Shopify: (
      <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8">
        <path d="M15.337 4.141c-.018-.012-.036-.024-.054-.024a.293.293 0 00-.078-.012s-1.608-.114-1.608-.114-.906-.888-.966-.966c-.06-.06-.18-.042-.228-.03l-.408.126c-.24-.696-.666-1.338-1.416-1.338h-.066c-.216-.27-.48-.39-.708-.39-1.746 0-2.58 2.178-2.838 3.288-.69.21-1.182.366-1.236.384-.384.12-.396.132-.444.498-.042.27-1.056 8.13-1.056 8.13L10.368 15l4.608-1.002s-1.578-10.71-1.596-10.824a.294.294 0 00-.043-.033zm-2.334.54c-.384.12-.816.252-1.26.39.246-.924.702-1.374 1.104-1.548.102.234.162.552.156.918v.24z" fill="#95BF47"/>
      </svg>
    ),
    Stripe: (
      <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8">
        <path fillRule="evenodd" clipRule="evenodd" d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.165 0 9.667 0 7.589.654 6.104 1.872 4.56 3.147 3.757 4.992 3.757 7.218c0 4.039 2.467 5.76 6.476 7.219 2.585.92 3.445 1.574 3.445 2.583 0 .98-.84 1.545-2.354 1.545-1.875 0-4.965-.921-6.99-2.109l-.9 5.555C5.175 22.99 8.385 24 11.714 24c2.641 0 4.843-.624 6.328-1.813 1.664-1.305 2.525-3.236 2.525-5.732 0-4.128-2.524-5.851-6.594-7.305h.003z" fill="#635BFF"/>
      </svg>
    ),
    Notion: (
      <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8">
        <path d="M4.459 4.208c.746.606 1.026.56 2.428.466l13.215-.793c.28 0 .047-.28-.046-.326L17.86 1.968c-.42-.326-.98-.7-2.055-.607L3.01 2.295c-.466.046-.56.28-.374.466l1.823 1.447zm.793 3.08v13.904c0 .747.373 1.027 1.214.98l14.523-.84c.84-.046.934-.56.934-1.167V6.354c0-.606-.233-.933-.746-.886l-15.177.887c-.56.047-.748.327-.748.933zm14.337.745c.093.42 0 .84-.42.888l-.7.14v10.264c-.608.327-1.168.514-1.635.514-.748 0-.935-.234-1.495-.933l-4.577-7.186v6.952l1.449.327s0 .84-1.168.84l-3.222.187c-.093-.186 0-.653.327-.746l.84-.233V9.854L7.822 9.62c-.094-.42.14-1.026.793-1.073l3.456-.233 4.764 7.279v-6.44l-1.215-.14c-.093-.514.28-.887.747-.933l3.222-.187zM2.877.466L16.085.113c1.542-.14 1.915.093 2.568.56l3.549 2.475c.42.326.56.42.56.793v16.38c0 1.026-.373 1.635-1.681 1.728L5.5 22.889c-.98.047-1.448-.093-1.962-.746l-2.52-3.268c-.56-.747-.793-1.307-.793-1.96V2.107C.226.98.693.56 2.878.466z" fill="#000"/>
      </svg>
    ),
  };

  const integrations = Object.keys(logos).map(name => ({
    name,
    component: logos[name]
  }));

  return (
    <Section className="relative overflow-hidden">
      <ParallaxDots dotColor="#17C3B2" dotSize={1} gap={45} speed={0.15} />
      
      <SectionHeader 
        badge="Integrations"
        title="Works With Your Favorite Tools"
        subtitle="Seamlessly connect with 100+ apps and services."
      />
      
      <motion.div 
        className="grid grid-cols-4 md:grid-cols-8 gap-4 relative z-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          visible: { transition: { staggerChildren: 0.05 } }
        }}
      >
        {integrations.map((item, i) => (
          <motion.div 
            key={i}
            variants={{
              hidden: { opacity: 0, scale: 0.8, y: 20 },
              visible: { opacity: 1, scale: 1, y: 0 }
            }}
            whileHover={{ 
              scale: 1.1, 
              y: -5,
              boxShadow: "0 10px 30px rgba(13, 35, 66, 0.1)"
            }}
            className="bg-white p-4 rounded-xl border border-slate-200 hover:border-[#17C3B2] transition-all duration-300 text-center group cursor-pointer flex flex-col items-center justify-center gap-3 aspect-square"
          >
            <motion.div 
              whileHover={{ rotate: [0, -10, 10, 0] }}
              transition={{ duration: 0.3 }}
              className="transform group-hover:scale-110 transition-transform duration-300"
            >
              {item.component}
            </motion.div>
            <div className="text-xs font-medium text-slate-500 group-hover:text-[#0D2342] transition-colors">
              {item.name}
            </div>
          </motion.div>
        ))}
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
        className="text-center mt-10"
      >
        <Button variant="outline" size="sm">
          View All Integrations
          <ExternalLink size={14} />
        </Button>
      </motion.div>
    </Section>
  );
};

const Process = () => (
  <Section gray className="relative overflow-hidden">
    <GradientOrb 
      colors={["#0D2342", "transparent"]} 
      size={300} 
      blur={120} 
      top="-15%" 
      left="-10%" 
      speed={0.4}
    />
    
    <SectionHeader 
      badge="Process"
      title="From Idea to Launch in 4 Steps"
      subtitle="Our proven methodology ensures your project exceeds expectations."
      tealBadge
    />
    
    <motion.div 
      className="grid grid-cols-1 md:grid-cols-4 gap-6 relative z-10"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={{
        visible: { transition: { staggerChildren: 0.15 } }
      }}
    >
      {[
        { step: "01", title: "Discovery", desc: "Deep dive into your requirements and goals.", icon: Target, teal: true },
        { step: "02", title: "Strategy", desc: "Design the perfect solution architecture.", icon: Layers, teal: false },
        { step: "03", title: "Build", desc: "Agile development with weekly demos.", icon: Code, teal: true },
        { step: "04", title: "Launch", desc: "Deploy, train, and scale with confidence.", icon: Rocket, teal: false }
      ].map((item, i) => (
        <motion.div
          key={i}
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0 }
          }}
        >
          <Card className="text-center group h-full">
            <motion.div 
              whileHover={{ rotate: 360, scale: 1.1 }}
              transition={{ duration: 0.5 }}
              className={`w-12 h-12 mx-auto rounded-lg flex items-center justify-center mb-4 transition-colors ${
                item.teal 
                  ? 'bg-[#17C3B2]/10 text-[#17C3B2] group-hover:bg-[#17C3B2] group-hover:text-white'
                  : 'bg-[#0D2342]/5 text-[#0D2342] group-hover:bg-[#0D2342] group-hover:text-white'
              }`}
            >
              <item.icon size={22} />
            </motion.div>
            <motion.span 
              whileHover={{ scale: 1.1 }}
              className="inline-block px-2 py-0.5 bg-slate-100 text-slate-500 rounded text-xs font-bold mb-3"
            >
              Step {item.step}
            </motion.span>
            <h3 className="font-bold text-[#0D2342] mb-2">{item.title}</h3>
            <p className="text-slate-500 text-sm">{item.desc}</p>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  </Section>
);

const WhyUs = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <Section dark className="relative overflow-hidden">
      <motion.div style={{ y }} className="absolute inset-0 pointer-events-none">
        <FloatingShape 
          size={300} 
          color="#17C3B2" 
          blur={100} 
          top="10%" 
          right="10%" 
          shape="blob"
        />
        <FloatingShape 
          size={200} 
          color="#C9A14A" 
          blur={80} 
          bottom="20%" 
          left="5%" 
          shape="circle"
        />
      </motion.div>

      <FloatingParticles count={12} />
      
      <div ref={ref} className="grid lg:grid-cols-2 gap-12 items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.span 
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", delay: 0.2 }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold mb-4 bg-[#17C3B2] text-white"
          >
            Why Choose Us
          </motion.span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
            We Don't Just Build Software.
            <motion.span 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="block text-[#17C3B2]"
            >
              We Build Partnerships.
            </motion.span>
          </h2>
          <p className="text-slate-300 mb-8 leading-relaxed">
            Our hybrid approach of Services + SaaS ensures you're never left stuck.
          </p>
          
          <motion.div 
            className="grid grid-cols-2 gap-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              visible: { transition: { staggerChildren: 0.1 } }
            }}
          >
            {[
              { icon: Shield, text: "99.9% Uptime SLA" },
              { icon: Check, text: "Canadian Support" }, 
              { icon: Globe, text: "PIPEDA Compliant" },
              { icon: Zap, text: "Fast Delivery" }
            ].map((item, i) => (
              <motion.div 
                key={i} 
                variants={{
                  hidden: { opacity: 0, x: -20 },
                  visible: { opacity: 1, x: 0 }
                }}
                whileHover={{ x: 10 }}
                className="flex items-center gap-3 text-slate-300 text-sm cursor-pointer"
              >
                <item.icon size={16} className="text-[#C9A14A]" />
                {item.text}
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-2 gap-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            visible: { transition: { staggerChildren: 0.1 } }
          }}
        >
          {[
            { value: "500+", label: "Projects Delivered", highlight: true },
            { value: "98%", label: "Client Satisfaction", highlight: false },
            { value: "50+", label: "Team Members", highlight: false },
            { value: "12+", label: "Years Experience", highlight: true }
          ].map((stat, i) => (
            <motion.div 
              key={i} 
              variants={{
                hidden: { opacity: 0, scale: 0.8 },
                visible: { opacity: 1, scale: 1 }
              }}
              whileHover={{ scale: 1.05, y: -5 }}
              className={`rounded-xl p-6 text-center cursor-pointer transition-shadow ${
                stat.highlight ? 'bg-[#17C3B2] hover:shadow-lg hover:shadow-[#17C3B2]/30' : 'bg-[#0A1B32] border border-white/10 hover:border-white/30'
              }`}
            >
              <motion.div 
                className={`text-3xl font-bold mb-1 ${stat.highlight ? 'text-white' : 'text-white'}`}
                whileHover={{ scale: 1.1 }}
              >
                {stat.value}
              </motion.div>
              <div className={`text-sm ${stat.highlight ? 'text-white/90' : 'text-slate-400'}`}>{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </Section>
  );
};

const Testimonials = () => {
  const testimonials = [
    {
      quote: "Yoursoft transformed our business. The CRM alone saved us 20+ hours per week.",
      author: "Sarah Thompson",
      role: "CEO",
      company: "TechStart Vancouver",
      rating: 5
    },
    {
      quote: "The AI chatbot reduced our support tickets by 40%. Customers love the instant responses.",
      author: "Marc Leblanc",
      role: "Head of Operations",
      company: "GrowthLabs Montreal",
      rating: 5
    },
    {
      quote: "From concept to launch in just 6 weeks. Highly recommended for any Canadian business!",
      author: "Emily Chen",
      role: "Founder",
      company: "DesignHub Toronto",
      rating: 5
    }
  ];

  return (
    <Section gray className="relative overflow-hidden">
      <GradientOrb 
        colors={["#C9A14A", "transparent"]} 
        size={250} 
        blur={100} 
        top="20%" 
        right="-5%" 
        speed={0.3}
      />
      
      <SectionHeader 
        badge="Testimonials"
        title="Loved by 500+ Canadian Companies"
        subtitle="Don't just take our word for it."
        tealBadge
      />
      
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          visible: { transition: { staggerChildren: 0.15 } }
        }}
      >
        {testimonials.map((testimonial, i) => (
          <motion.div
            key={i}
            variants={{
              hidden: { opacity: 0, y: 30, rotateX: -10 },
              visible: { opacity: 1, y: 0, rotateX: 0 }
            }}
            whileHover={{ y: -8 }}
          >
            <TestimonialCard {...testimonial} />
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
};

const Pricing = () => (
  <Section id="pricing" className="relative overflow-hidden">
    <ParallaxDots dotColor="#0D2342" dotSize={1} gap={40} speed={0.1} />
    
    <GradientOrb 
      colors={["#17C3B2", "transparent"]} 
      size={350} 
      blur={130} 
      bottom="-10%" 
      left="-10%" 
      speed={0.35}
    />
    
    <SectionHeader 
      badge="Pricing"
      title="Simple, Transparent Pricing"
      subtitle="No hidden fees. Cancel anytime. All prices in CAD."
    />
    
    <motion.div 
      className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto relative z-10"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={{
        visible: { transition: { staggerChildren: 0.15 } }
      }}
    >
      <motion.div
        variants={{
          hidden: { opacity: 0, x: -30 },
          visible: { opacity: 1, x: 0 }
        }}
      >
        <PricingCard 
          name="Starter"
          price="$59"
          description="Perfect for small teams"
          features={[
            'Up to 500 contacts',
            'Basic CRM features',
            'Email support',
            '1 user included',
          ]}
          cta="Start Free Trial"
          delay={0}
        />
      </motion.div>
      
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 30 },
          visible: { opacity: 1, y: 0 }
        }}
      >
        <PricingCard 
          name="Professional"
          price="$179"
          description="For growing businesses"
          features={[
            'Up to 5,000 contacts',
            'Advanced automation',
            'AI Chatbot (EN + FR)',
            '10 users included',
            'Priority support',
          ]}
          popular={true}
          cta="Start Free Trial"
          delay={1}
        />
      </motion.div>
      
      <motion.div
        variants={{
          hidden: { opacity: 0, x: 30 },
          visible: { opacity: 1, x: 0 }
        }}
      >
        <PricingCard 
          name="Enterprise"
          price="Custom"
          period=""
          description="For large organizations"
          features={[
            'Unlimited contacts',
            'Full platform access',
            'Dedicated manager',
            'Custom development',
          ]}
          cta="Contact Sales"
          delay={2}
        />
      </motion.div>
    </motion.div>
    
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.6 }}
      className="mt-8 text-center"
    >
      <motion.div 
        whileHover={{ scale: 1.05 }}
        className="inline-flex items-center gap-2 px-4 py-2 bg-[#17C3B2]/10 border border-[#17C3B2]/20 rounded-full text-sm text-[#0D2342] font-medium"
      >
        <Shield size={16} className="text-[#17C3B2]" />
        30-day money-back guarantee
      </motion.div>
    </motion.div>
  </Section>
);

// ============================================
// CONTINUING FROM FAQ...
// ============================================

const FAQ = ({ activeFAQ, setActiveFAQ }) => {
  const faqs = [
    {
      question: "How long does it take to get started?",
      answer: "You can sign up and start using our CRM in minutes. For custom projects, we typically deliver MVPs within 4-8 weeks."
    },
    {
      question: "Can I integrate with my existing tools?",
      answer: "Yes! We integrate with 100+ popular tools including Slack, Zapier, HubSpot, Salesforce, and more."
    },
    {
      question: "Is my data stored in Canada?",
      answer: "Yes! We offer Canadian data residency options. Your data is stored in secure Canadian data centers."
    },
    {
      question: "Do you support both English and French?",
      answer: "Yes! Our platform, AI chatbot, and support team are fully bilingual."
    },
    {
      question: "Can I cancel anytime?",
      answer: "Yes, you can cancel your subscription at any time. No long-term contracts or cancellation fees."
    }
  ];

  return (
    <Section gray className="relative overflow-hidden">
      <GradientOrb 
        colors={["#0D2342", "transparent"]} 
        size={280} 
        blur={110} 
        top="10%" 
        left="-8%" 
        speed={0.25}
      />
      
      <SectionHeader 
        badge="FAQ"
        title="Frequently Asked Questions"
        subtitle="Got questions? We've got answers."
        tealBadge
      />
      
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl mx-auto relative z-10"
      >
        <Card hover={false}>
          {faqs.map((faq, i) => (
            <FAQItem 
              key={i}
              question={faq.question}
              answer={faq.answer}
              isOpen={activeFAQ === i}
              onToggle={() => setActiveFAQ(activeFAQ === i ? null : i)}
            />
          ))}
        </Card>
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
        className="mt-8 text-center"
      >
        <p className="text-slate-500 text-sm mb-3">Still have questions?</p>
        <Button variant="outline" size="sm">
          <MessageSquare size={14} />
          Chat with Us
        </Button>
      </motion.div>
    </Section>
  );
};

const Newsletter = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <Section dark className="relative overflow-hidden">
      <motion.div style={{ y }} className="absolute inset-0 pointer-events-none">
        <FloatingShape 
          size={200} 
          color="#17C3B2" 
          blur={80} 
          top="20%" 
          right="15%" 
          shape="circle"
        />
        <FloatingShape 
          size={150} 
          color="#C9A14A" 
          blur={60} 
          bottom="20%" 
          left="10%" 
          shape="blob"
        />
      </motion.div>

      <FloatingParticles count={8} />
      
      <motion.div 
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-lg mx-auto relative z-10"
      >
        <motion.div 
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", delay: 0.2 }}
          whileHover={{ rotate: [0, -10, 10, 0] }}
          className="w-12 h-12 mx-auto mb-4 rounded-xl bg-white/10 flex items-center justify-center"
        >
          <Mail size={24} className="text-[#17C3B2]" />
        </motion.div>
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
          Stay Ahead of the Curve
        </h2>
        <p className="text-slate-300 mb-6 text-sm">
          Get weekly insights on AI, automation, and business growth. Join 10,000+ subscribers.
        </p>
        
        <motion.form 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
        >
          <motion.input 
            whileFocus={{ scale: 1.02 }}
            type="email"
            placeholder="Enter your email"
            className="flex-1 px-4 py-2.5 rounded-lg text-[#0D2342] text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#17C3B2]"
          />
          <Button variant="primary" className="whitespace-nowrap">
            Subscribe
            <ArrowRight size={14} />
          </Button>
        </motion.form>
        
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-slate-400 text-xs mt-4"
        >
          No spam, ever. Unsubscribe anytime. 🇨🇦
        </motion.p>
      </motion.div>
    </Section>
  );
};

const FinalCTA = ({ navigate }) => (
  <Section gray className="relative overflow-hidden">
    <GradientMesh />
    
    <GradientOrb 
      colors={["#17C3B2", "transparent"]} 
      size={400} 
      blur={150} 
      top="50%" 
      left="50%" 
      speed={0.2}
      className="-translate-x-1/2 -translate-y-1/2"
    />
    
    <motion.div 
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="text-center max-w-2xl mx-auto relative z-10"
    >
      <motion.span 
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ type: "spring", delay: 0.2 }}
        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold mb-4 bg-[#0D2342]/5 text-[#0D2342]"
      >
        🍁 Ready to Get Started?
      </motion.span>
      
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
        className="text-3xl md:text-4xl font-bold text-[#0D2342] mb-4 leading-tight"
      >
        Transform Your Business Today
      </motion.h2>
      
      <motion.p 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 }}
        className="text-slate-500 mb-8"
      >
        Join 500+ Canadian companies already using Yoursoft Digital to scale their operations.
      </motion.p>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
        className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-8"
      >
        <Button size="lg" variant="primary" onClick={() => navigate('/signup')}>
          Start Free Trial
          <ArrowRight size={16} />
        </Button>
        <Button variant="outline" size="lg">
          <Calendar size={16} />
          Schedule a Demo
        </Button>
      </motion.div>
      
      <motion.div 
        className="flex flex-wrap justify-center gap-6 text-sm text-slate-500"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          visible: { transition: { staggerChildren: 0.1 } }
        }}
      >
        {[
          { icon: Check, text: "14-day free trial" },
          { icon: Check, text: "No credit card required" },
          { icon: Check, text: "Canadian data hosting" }
        ].map((item, i) => (
          <motion.div 
            key={i}
            variants={{
              hidden: { opacity: 0, y: 10 },
              visible: { opacity: 1, y: 0 }
            }}
            className="flex items-center gap-1.5"
          >
            <item.icon size={14} className="text-[#17C3B2]" />
            {item.text}
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  </Section>
);

const Footer = () => (
  <footer className="bg-[#0D2342] pt-16 pb-8 border-t border-white/5 relative overflow-hidden">
    <FloatingParticles count={6} />
    
    <div className="max-w-6xl mx-auto px-6 relative z-10">
      <motion.div 
        className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          visible: { transition: { staggerChildren: 0.1 } }
        }}
      >
        <motion.div 
          className="col-span-2"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 }
          }}
        >
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 mb-4 cursor-pointer"
          >
            <motion.div 
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
              className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#17C3B2] to-[#0D2342] flex items-center justify-center border border-white/10"
            >
              <Layers size={16} className="text-white" />
            </motion.div>
            <span className="font-bold text-white text-xl">Yoursoft</span>
          </motion.div>
          <p className="text-slate-400 text-sm mb-4 max-w-xs">
            The complete ecosystem for Canadian businesses. Build, manage, and automate with confidence.
          </p>
          <div className="flex gap-3">
            {[Twitter, Linkedin, Github].map((Icon, i) => (
              <motion.a 
                key={i} 
                href="/"
                whileHover={{ scale: 1.15, y: -3 }}
                whileTap={{ scale: 0.95 }}
                className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-slate-400 hover:bg-[#17C3B2] hover:text-white transition-colors"
              >
                <Icon size={16} />
              </motion.a>
            ))}
          </div>
        </motion.div>
        
        {[
          { title: "Product", items: ['CRM Platform', 'AI Chatbot', 'Integrations', 'Pricing'] },
          { title: "Company", items: ['About Us', 'Careers', 'Blog', 'Contact'] },
          { title: "Support", items: ['Help Center', 'Documentation', 'API', 'Status'] }
        ].map((section, sectionIdx) => (
          <motion.div
            key={sectionIdx}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
          >
            <h4 className="font-bold text-white mb-4 text-sm">{section.title}</h4>
            <ul className="space-y-2">
              {section.items.map((item, itemIdx) => (
                <motion.li 
                  key={item}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * itemIdx }}
                >
                  <motion.a 
                    href="/" 
                    whileHover={{ x: 5, color: "#17C3B2" }}
                    className="text-slate-400 hover:text-[#17C3B2] transition-colors text-sm inline-block"
                  >
                    {item}
                  </motion.a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        ))}
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="flex flex-wrap gap-6 py-6 border-t border-white/5 mb-6"
      >
        {[
          { icon: Mail, text: "hello@yoursoftdigital.ca" },
          { icon: Phone, text: "+1 (416) 555-0123" },
          { icon: MapPin, text: "Toronto, ON" }
        ].map((item, i) => (
          <motion.div 
            key={i} 
            whileHover={{ x: 5 }}
            className="flex items-center gap-2 text-slate-400 text-sm cursor-pointer"
          >
            <item.icon size={14} className="text-[#17C3B2]" />
            <span>{item.text}</span>
          </motion.div>
        ))}
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="flex flex-col md:flex-row justify-between items-center gap-4 pt-6 border-t border-white/5"
      >
        <div className="text-slate-500 text-sm flex items-center gap-2">
          <motion.span
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            🇨🇦
          </motion.span>
          © {new Date().getFullYear()} Yoursoft Digital. Made in Canada.
        </div>
        <div className="flex gap-6 text-sm">
          {['Privacy', 'Terms', 'Cookies'].map(item => (
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
      </motion.div>
    </div>
  </footer>
);

// ============================================
// 🏠 MAIN LANDING PAGE COMPONENT
// ============================================

export default function LandingPage() {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeAccordion, setActiveAccordion] = useState(0);
  const [activeFAQ, setActiveFAQ] = useState(0);
  const [showBanner, setShowBanner] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ✅ Memoize the handler to prevent recreation
  const handleNavClick = useCallback((e, item) => {
    e.preventDefault();
    if (item.isRoute) {
      navigate(item.href);
    } else {
      const element = document.querySelector(item.href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsMobileMenuOpen(false);
  }, [navigate]);

  // ============================================
  // 🎬 RENDER
  // ============================================

  return (
    <div className="font-sans text-[#0D2342] bg-white antialiased selection:bg-[#17C3B2] selection:text-white">
      {/* ✅ Navbar receives props instead of relying on parent state closure */}
      <Navbar 
        isScrolled={isScrolled}
        showBanner={showBanner}
        setShowBanner={setShowBanner}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
        navigate={navigate}
        handleNavClick={handleNavClick}
      />

      <main>
        {/* ✅ All sections are now defined OUTSIDE the component */}
        <Hero navigate={navigate} />
        <StatsCounter />
        <Audience />
        <CoreOfferings navigate={navigate} />
        <ServicesDetail 
          activeAccordion={activeAccordion} 
          setActiveAccordion={setActiveAccordion} 
        />
        <CRMProduct navigate={navigate} />
        <AIChatbot />
        <Integrations />
        <Process />
        <WhyUs />
        <Testimonials />
        <Pricing />
        <FAQ 
          activeFAQ={activeFAQ} 
          setActiveFAQ={setActiveFAQ} 
        />
        <Newsletter />
        <FinalCTA navigate={navigate} />
      </main>

      <Footer />
      <BackToTop />
    </div>
  );
}