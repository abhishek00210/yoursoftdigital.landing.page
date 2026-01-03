import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

// ============================================
// 🎨 PARALLAX COMPONENTS
// ============================================

// 1. Parallax Section Wrapper
export const ParallaxSection = ({ 
  children, 
  className = "",
  speed = 0.5, // 0 = no movement, 1 = full scroll speed
  direction = "up" // "up", "down", "left", "right"
}) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const getTransform = () => {
    const distance = 100 * speed;
    switch (direction) {
      case "up":
        return useTransform(scrollYProgress, [0, 1], [distance, -distance]);
      case "down":
        return useTransform(scrollYProgress, [0, 1], [-distance, distance]);
      case "left":
        return useTransform(scrollYProgress, [0, 1], [distance, -distance]);
      case "right":
        return useTransform(scrollYProgress, [0, 1], [-distance, distance]);
      default:
        return useTransform(scrollYProgress, [0, 1], [distance, -distance]);
    }
  };

  const y = direction === "up" || direction === "down" ? getTransform() : 0;
  const x = direction === "left" || direction === "right" ? getTransform() : 0;

  return (
    <motion.div
      ref={ref}
      style={{ y, x }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// 2. Parallax Background Layer
export const ParallaxBackground = ({ 
  children, 
  className = "",
  speed = 0.3,
  opacity = true
}) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", `${speed * 100}%`]);
  const opacityValue = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return (
    <motion.div
      ref={ref}
      style={{ 
        y,
        opacity: opacity ? opacityValue : 1
      }}
      className={`absolute inset-0 pointer-events-none ${className}`}
    >
      {children}
    </motion.div>
  );
};

// 3. Floating Parallax Shape
export const FloatingShape = ({
  className = "",
  size = 200,
  color = "#17C3B2",
  blur = 80,
  speed = 0.4,
  top,
  left,
  right,
  bottom,
  shape = "circle" // "circle", "square", "blob"
}) => {
  const ref = useRef(null);
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
      ref={ref}
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

// 4. Parallax Dots/Grid Pattern
export const ParallaxDots = ({ 
  className = "",
  dotColor = "#17C3B2",
  dotSize = 2,
  gap = 30,
  speed = 0.2
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

// 5. Parallax Gradient Orb
export const GradientOrb = ({
  colors = ["#17C3B2", "#0D2342"],
  size = 400,
  blur = 100,
  speed = 0.5,
  position = { top: "20%", left: "10%" }
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
        ...position,
      }}
      className="absolute rounded-full opacity-40 pointer-events-none"
    />
  );
};

// 6. Mouse Parallax Container
export const MouseParallax = ({ children, className = "", intensity = 0.02 }) => {
  const ref = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) * intensity;
      const y = (e.clientY - rect.top - rect.height / 2) * intensity;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [intensity]);

  const springX = useSpring(mousePosition.x, { stiffness: 150, damping: 15 });
  const springY = useSpring(mousePosition.y, { stiffness: 150, damping: 15 });

  return (
    <motion.div
      ref={ref}
      style={{ x: springX, y: springY }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// 7. Layered Parallax Background
export const LayeredParallax = ({ layers, className = "" }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      {layers.map((layer, index) => {
        const y = useTransform(
          scrollYProgress,
          [0, 1],
          ["0%", `${layer.speed * 100}%`]
        );

        return (
          <motion.div
            key={index}
            style={{ y, zIndex: layer.zIndex || index }}
            className={`absolute inset-0 ${layer.className || ""}`}
          >
            {layer.content}
          </motion.div>
        );
      })}
    </div>
  );
};

// Need to add this import at the top
import { useState, useEffect } from 'react';