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

const PageTransition = ({ children }) => {
  const router = useRouter();
  const [isChangingPage, setIsChangingPage] = useState(false);
  const [displayMessage, setDisplayMessage] = useState('');
  const [loadingTimeout, setLoadingTimeout] = useState(null);
  const [loadStartTime, setLoadStartTime] = useState(null);

  useEffect(() => {
    const handleStart = () => {
      setIsChangingPage(true);
      setLoadStartTime(Date.now());
      
      // Only set message timeout if loading takes more than 2 seconds
      const timeout = setTimeout(() => {
        const randomMessage = wittyMessages[Math.floor(Math.random() * wittyMessages.length)];
        setDisplayMessage(randomMessage);
      }, 2000);
      
      setLoadingTimeout(timeout);
    };

    const handleComplete = () => {
      // Clear any pending timers
      if (loadingTimeout) {
        clearTimeout(loadingTimeout);
      }
      
      const loadDuration = Date.now() - (loadStartTime || Date.now());
      
      // For super fast loads, exit immediately
      if (loadDuration < 500) {
        setIsChangingPage(false);
        setDisplayMessage('');
      } else {
        // For longer loads, give a brief moment to see the completion
        setTimeout(() => {
          setIsChangingPage(false);
          setDisplayMessage('');
        }, 400);
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
  }, [router, loadingTimeout, loadStartTime]);

  return (
    <>
      {children}
      
      <AnimatePresence>
        {isChangingPage && (
          <motion.div
            className="fixed inset-0 z-50 bg-background flex flex-col items-center justify-center"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '-100%' }}
            transition={{ 
              duration: 0.3, // Faster animation
              ease: "easeInOut"
            }}
          >
            {displayMessage && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-lg sm:text-xl text-primary text-center px-4 max-w-lg"
              >
                <span>{displayMessage}</span>
              </motion.div>
            )}
            
            <motion.div
              className="w-48 h-0.5 bg-secondary mt-4" // Thinner line
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: displayMessage ? 3 : 1 }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default PageTransition;