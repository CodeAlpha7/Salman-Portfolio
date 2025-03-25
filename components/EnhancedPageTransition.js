// components/EnhancedPageTransition.js
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';

const wittyMessages = [
  "This page is taking its sweet time. Like me deciding what to watch on Netflix after scrolling for 45 minutes.",
  "Code compiling slower than my grandma's dial-up connection. And she still uses AOL.",
  "Loading... or as we call it in developer terms: 'unexpected meditation time'.",
  "The server hamsters need new running wheels. Budget cuts, you know how it is.",
  "Plot twist: The page is ready but practicing its dramatic entrance. Jazz hands incoming.",
  "If this loading time were currency, you'd be broke waiting for it.",
  "The database is currently in therapy working through its commitment issues.",
  "Loading pixels one by one. Manually. With tweezers. Please hold.",
  "If patience is a virtue, congratulations! You're practically a saint by now.",
  "Remember those '90s dial-up sounds? I'm making them right now, you just can't hear me."
];

const EnhancedPageTransition = ({ children }) => {
  const router = useRouter();
  const [isChangingPage, setIsChangingPage] = useState(false);
  const [displayMessage, setDisplayMessage] = useState('');
  const [loadingTimeout, setLoadingTimeout] = useState(null);
  const [loadStartTime, setLoadStartTime] = useState(null);
  const [progress, setProgress] = useState(0);
  const [minimumTimeElapsed, setMinimumTimeElapsed] = useState(false);
  const [pageLoaded, setPageLoaded] = useState(false);
  
  // Minimum time the transition should be visible (in ms)
  const MINIMUM_DISPLAY_TIME = 800;

  useEffect(() => {
    // Progress bar animation
    let progressInterval;
    
    if (isChangingPage && !pageLoaded) {
      progressInterval = setInterval(() => {
        setProgress(prevProgress => {
          // Slow motion effect as it gets closer to completion
          let increment;
          if (prevProgress < 60) {
            // Fast at the beginning
            increment = 7;
          } else if (prevProgress < 80) {
            // Slowing down
            increment = 2;
          } else if (prevProgress < 90) {
            // Very slow at the end
            increment = 0.3;
          } else {
            // Barely moving
            increment = 0.1;
          }
          return Math.min(prevProgress + increment, 95);
        });
      }, 100);
    }
    
    if (pageLoaded && isChangingPage) {
      // When the page is actually loaded, jump to 100% with a brief delay
      // to create a dramatic pause before completion
      setTimeout(() => {
        setProgress(100);
      }, 300);
    }
    
    return () => {
      if (progressInterval) clearInterval(progressInterval);
    };
  }, [isChangingPage, pageLoaded]);

  useEffect(() => {
    const handleStart = () => {
      setIsChangingPage(true);
      setPageLoaded(false);
      setProgress(0);
      setLoadStartTime(Date.now());
      setMinimumTimeElapsed(false);
      
      // Start minimum time timer
      setTimeout(() => {
        setMinimumTimeElapsed(true);
      }, MINIMUM_DISPLAY_TIME);
      
      // Only set message timeout if loading takes more than 300ms
      const timeout = setTimeout(() => {
        const randomMessage = wittyMessages[Math.floor(Math.random() * wittyMessages.length)];
        setDisplayMessage(randomMessage);
      }, 300);
      
      setLoadingTimeout(timeout);
    };

    const handleComplete = () => {
      // Clear any pending timers
      if (loadingTimeout) {
        clearTimeout(loadingTimeout);
      }
      
      setPageLoaded(true);
      
      // Check if minimum time has elapsed
      const currentTime = Date.now();
      const loadDuration = currentTime - (loadStartTime || currentTime);
      
      if (loadDuration >= MINIMUM_DISPLAY_TIME || minimumTimeElapsed) {
        // For super fast loads that met minimum time, exit with fade
        setTimeout(() => {
          setIsChangingPage(false);
          setDisplayMessage('');
        }, 400);
      } else {
        // If minimum time hasn't elapsed, wait until it does
        const remainingTime = MINIMUM_DISPLAY_TIME - loadDuration;
        setTimeout(() => {
          setIsChangingPage(false);
          setDisplayMessage('');
        }, remainingTime + 400);
      }
    };

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
      
      if (loadingTimeout) {
        clearTimeout(loadingTimeout);
      }
    };
  }, [router, loadingTimeout, loadStartTime, minimumTimeElapsed]);

  return (
    <>
      {children}
      
      <AnimatePresence>
        {isChangingPage && (
          <motion.div
            className="fixed inset-0 z-50 bg-background flex flex-col items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.5 } }}
            transition={{ duration: 0.3 }}
          >
            {/* Vignette effect */}
            <div className="absolute inset-0 bg-black opacity-10 pointer-events-none" 
                style={{ 
                    boxShadow: "inset 0 0 100px rgba(0,0,0,0.5)",
                    background: "radial-gradient(circle, transparent 50%, rgba(0,0,0,0.15) 150%)"
                }} 
            />
            
            {/* Particles effect - rounder, more contrasty, and speed based on progress */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {[...Array(15)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full shadow-glow"
                  style={{
                    width: '3px',
                    height: '3px',
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    background: `rgba(80, 80, 80, ${(Math.random() * 0.3) + 0.5})`, // More contrasty grays
                    boxShadow: `0 0 6px 1px rgba(212, 175, 55, 0.4)` // Subtle gold glow
                  }}
                  animate={{
                    y: [0, (Math.random() * 100) - 50],
                    x: [0, (Math.random() * 100) - 50],
                    opacity: [0.9, 0],
                    scale: [1, 0.7],
                  }}
                  transition={{
                    // Speed depends on progress - fast at beginning, slow at end
                    duration: progress < 80 ? 1 + Math.random() : 5 + Math.random() * 4,
                    ease: progress < 80 ? "easeOut" : "easeInOut",
                    repeat: Infinity,
                    repeatType: "loop",
                  }}
                />
              ))}
            </div>
            
            {displayMessage && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-accent text-center px-4 max-w-xl mb-10 font-medium"
                style={{ fontSize: "1.25rem" }}
              >
                <span>{displayMessage}</span>
              </motion.div>
            )}
            
            <div className="w-64 h-1.5 bg-gray-200/30 rounded-full overflow-hidden my-6">
              <motion.div 
                className="h-full bg-gradient-to-r from-gray-500 via-accent to-primary"
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ 
                  duration: progress === 100 ? 0.8 : 0.3,
                  ease: progress === 100 ? "easeOut" : "linear"
                }}
                style={{
                  boxShadow: '0 0 8px rgba(212, 175, 55, 0.5)'
                }}
              />
            </div>
            
            <motion.div
              className="mt-4 text-accent font-medium"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              style={{ fontSize: "1rem" }}
            >
              {progress === 100 ? "Ready!" : "Loading..."}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default EnhancedPageTransition;