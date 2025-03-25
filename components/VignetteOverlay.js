// components/VignetteOverlay.js
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const VignetteOverlay = ({ intensity = 0.2, pulsate = true, isIntro = false }) => {
  // Reduce intensity for regular pages
  const actualIntensity = isIntro ? intensity : intensity * 0.5;
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  
  // Update window size on mount and resize
  useEffect(() => {
    const updateWindowSize = () => {
      setWindowSize({ 
        width: window.innerWidth, 
        height: window.innerHeight 
      });
    };
    
    // Initial size
    updateWindowSize();
    
    // Add event listener
    window.addEventListener('resize', updateWindowSize);
    
    // Cleanup
    return () => window.removeEventListener('resize', updateWindowSize);
  }, []);
  
  // Track mouse movement for dynamic vignette
  useEffect(() => {
    const handleMouseMove = (e) => {
      // Get mouse position as percentage of window
      const x = e.clientX / windowSize.width;
      const y = e.clientY / windowSize.height;
      
      setMousePosition({ x, y });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [windowSize]);
  
  // Calculate vignette styles based on mouse position
  const getVignetteStyle = () => {
    if (windowSize.width === 0) return {}; // Prevent initial render issues
    
    // Base vignette style
    const style = {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      pointerEvents: 'none',
      zIndex: 10,
      boxShadow: `inset 0 0 ${100 + actualIntensity * 100}px rgba(0,0,0,${actualIntensity})`,
    };
    
    // Add dynamic radial gradient based on mouse position
    if (pulsate) {
      const gradientX = mousePosition.x * 100;
      const gradientY = mousePosition.y * 100;
      
      style.background = `radial-gradient(
        circle at ${gradientX}% ${gradientY}%, 
        transparent 40%, 
        rgba(0,0,0,${actualIntensity * 0.5}) 150%
      )`;
    }
    
    return style;
  };
  
  return (
    <motion.div 
      style={getVignetteStyle()}
      animate={pulsate ? {
        boxShadow: [
          `inset 0 0 ${100 + actualIntensity * 100}px rgba(0,0,0,${actualIntensity})`,
          `inset 0 0 ${100 + actualIntensity * 120}px rgba(0,0,0,${actualIntensity * 1.2})`,
          `inset 0 0 ${100 + actualIntensity * 100}px rgba(0,0,0,${actualIntensity})`
        ]
      } : {}}
      transition={pulsate ? { 
        duration: 4, 
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut"
      } : {}}
    />
  );
};

export default VignetteOverlay;