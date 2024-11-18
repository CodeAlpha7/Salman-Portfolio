// components/TypewriterEffect.js
import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';

const TypewriterEffect = ({ text, onComplete }) => {
  const [displayText, setDisplayText] = useState('');
  const [isTypingDone, setIsTypingDone] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    const typeText = async () => {
      // Reset state at the start
      setDisplayText('');
      setIsTypingDone(false);

      // Type each character with a consistent delay
      for (let i = 0; i <= text.length; i++) {
        await new Promise(resolve => {
          setTimeout(() => {
            setDisplayText(text.slice(0, i));
            resolve();
          }, 110); // Keep timing consistent
        });
      }
      
      // Small delay before completing
      await new Promise(resolve => setTimeout(resolve, 500));
      setIsTypingDone(true);
    };

    typeText();
  }, [text]);

  useEffect(() => {
    if (isTypingDone) {
      controls.start({
        scale: [1, 1.1, 1],
        filter: ['brightness(100%)', 'brightness(200%)', 'brightness(100%)'],
        transition: { duration: 0.5 }
      }).then(() => {
        // Small delay before calling onComplete
        setTimeout(() => onComplete(), 300);
      });
    }
  }, [isTypingDone, controls, onComplete]);

  return (
    <div className="whitespace-nowrap">
      <motion.span 
        className="font-['Source_Code_Pro'] font-normal bg-clip-text text-transparent bg-gradient-to-r from-secondary via-accent to-primary"
        animate={controls}
      >
        {displayText}
      </motion.span>
      <motion.span
        animate={{ opacity: [0, 1] }}
        transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
        className="inline-block w-2 h-16 ml-1 bg-secondary"
      />
    </div>
  );
};

export default TypewriterEffect;