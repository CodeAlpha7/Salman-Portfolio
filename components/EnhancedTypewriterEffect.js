// components/EnhancedTypewriterEffect.js
import React, { useState, useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';

const EnhancedTypewriterEffect = ({ text, onComplete, cursorColor = "#D4AF37", textGradient = true, typingSpeed = 80 }) => {
  const [displayText, setDisplayText] = useState('');
  const [isTypingDone, setIsTypingDone] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const controls = useAnimation();
  const letterControls = useAnimation();
  const typingRef = useRef(null);
  
  // Sound effect for typing (optional)
  const playTypeSound = () => {
    // Uncomment this if you want to add sound effects
    /*
    const audio = new Audio('/sound/typing.mp3');
    audio.volume = 0.05;
    audio.play().catch(e => console.log('Audio play failed: browser policy', e));
    */
  };

  useEffect(() => {
    let timerId;
    const typeText = async () => {
      // Reset state at the start
      setDisplayText('');
      setIsTypingDone(false);
      setIsDeleting(false);

      // Type each character with a slight randomization to timing
      for (let i = 0; i <= text.length; i++) {
        await new Promise(resolve => {
          const randomDelay = typingSpeed + (Math.random() * 40) - 20; // Add some variance
          timerId = setTimeout(() => {
            setDisplayText(text.slice(0, i));
            // Play sound for some keypresses (not every one)
            if (Math.random() > 0.7) playTypeSound();
            resolve();
          }, randomDelay);
        });
      }
      
      // Small delay before completing
      await new Promise(resolve => setTimeout(resolve, 800));
      setIsTypingDone(true);
    };

    typeText();
    
    return () => {
      clearTimeout(timerId);
    };
  }, [text, typingSpeed]);

  useEffect(() => {
    if (isTypingDone) {
      controls.start({
        scale: [1, 1.05, 1],
        filter: ['brightness(100%)', 'brightness(130%)', 'brightness(100%)'],
        transition: { duration: 0.7 }
      }).then(() => {
        // Small delay before calling onComplete
        setTimeout(() => {
          if (onComplete) onComplete();
        }, 300);
      });
      
      // Animate each letter
      letterControls.start({ 
        y: [0, -2, 0],
        transition: { 
          duration: 0.3,
          repeat: 2,
          repeatType: "reverse",
          ease: "easeInOut"
        }
      });
    }
  }, [isTypingDone, controls, letterControls, onComplete]);

  // Creates a masked/animated highlight effect on random letters
  const animateRandomLetters = () => {
    if (!displayText) return displayText;
    
    return displayText.split('').map((char, idx) => (
      <motion.span 
        key={idx}
        initial={false}
        animate={Math.random() > 0.7 ? { opacity: [1, 0.7, 1] } : {}}
        transition={{ 
          duration: 0.8 + Math.random() * 1.5, 
          repeat: Infinity,
          repeatType: "reverse"
        }}
        style={{ display: 'inline-block' }}
      >
        {char}
      </motion.span>
    ));
  };

  return (
    <div className="inline-block whitespace-nowrap">
      <motion.span 
        ref={typingRef}
        className={`font-['Source_Code_Pro'] font-normal ${textGradient ? 'bg-clip-text text-transparent bg-gradient-to-r from-secondary via-accent to-primary' : ''}`}
        animate={controls}
      >
        {animateRandomLetters()}
      </motion.span>
      <motion.span
        className="inline-block w-2 h-16 ml-1"
        style={{ backgroundColor: cursorColor }}
        animate={{ 
          opacity: [1, 0],
          height: isTypingDone ? [16, 20, 16] : 16
        }}
        transition={{ 
          opacity: { duration: 0.8, repeat: Infinity, repeatType: "reverse" },
          height: { duration: 0.3, repeat: isTypingDone ? 3 : 0 }
        }}
      />
    </div>
  );
};

export default EnhancedTypewriterEffect;