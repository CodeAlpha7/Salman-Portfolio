// components/EnhancedIntro.js
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ThreeJSIntro from './ThreeJSIntro';

const EnhancedIntro = ({ onComplete, setShowNavbar }) => {
  const [hasVisited, setHasVisited] = useState(false);

  useEffect(() => {
    // Check if user has visited before
    const visited = localStorage.getItem('hasVisitedBefore');
    setHasVisited(!!visited);
    
    // Hide navbar during intro
    setShowNavbar(false);
    
    // If they've visited before, skip the intro
    if (visited) {
      // Add a small delay to allow for any animations to complete
      setTimeout(() => {
        onComplete();
        setShowNavbar(true);
      }, 100);
    }
    
    return () => {
      // Restore navbar when component unmounts
      setShowNavbar(true);
    };
  }, [setShowNavbar, onComplete, hasVisited]);

  const handleThreeJSComplete = () => {
    // Elegant fade out effect
    const fadeOut = document.createElement('div');
    fadeOut.style.position = 'fixed';
    fadeOut.style.inset = '0';
    fadeOut.style.backgroundColor = 'white';
    fadeOut.style.zIndex = '100';
    fadeOut.style.opacity = '0';
    fadeOut.style.transition = 'opacity 1.2s ease-in-out';
    document.body.appendChild(fadeOut);
    
    // First fade to white
    setTimeout(() => {
      fadeOut.style.opacity = '1';
      
      // Then back to normal, to reveal home page
      setTimeout(() => {
        // Mark as visited
        localStorage.setItem('hasVisitedBefore', 'true');
        
        // Show the main content
        onComplete();
        
        // Show navbar
        setShowNavbar(true);
        
        // Remove the fade element after transition
        setTimeout(() => {
          fadeOut.style.opacity = '0';
          setTimeout(() => {
            document.body.removeChild(fadeOut);
          }, 1000);
        }, 300);
      }, 800);
    }, 200);
  };

  // Skip intro entirely if user has visited before
  if (hasVisited) {
    return null;
  }

  return (
    <motion.div 
      className="fixed inset-0 z-50 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <ThreeJSIntro onComplete={handleThreeJSComplete} />
    </motion.div>
  );
};

export default EnhancedIntro;