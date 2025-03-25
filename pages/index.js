// pages/index.js
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import EnhancedIntro from '../components/EnhancedIntro';

const MotionBox = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ y: 50, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ duration: 1.6, delay }}
    className="w-full"
  >
    {children}
  </motion.div>
);

const GlowingButton = ({ children, href, className }) => (
  <motion.a
    href={href}
    className={`relative inline-block px-4 sm:px-8 py-2 sm:py-3 rounded-full font-medium text-sm sm:text-base shadow-lg overflow-hidden ${className}`}
    whileHover={{ 
      scale: 1.05, 
      boxShadow: "0 0 15px rgba(212,175,55,0.5)",
    }}
    whileTap={{ scale: 0.95 }}
  >
    {/* Pulsing glow effect */}
    <motion.div
      className="absolute inset-0"
      animate={{
        background: [
          "radial-gradient(circle at center, rgba(212,175,55,0.3) 0%, rgba(212,175,55,0) 70%)",
          "radial-gradient(circle at center, rgba(212,175,55,0.3) 100%, rgba(212,175,55,0) 100%)",
        ],
      }}
      transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
    />
    
    {/* Subtle moving particles inside the button */}
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-white/30"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            x: [0, Math.random() * 20 - 10],
            y: [0, Math.random() * 20 - 10],
            opacity: [0.5, 0],
          }}
          transition={{
            duration: 1 + Math.random(),
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      ))}
    </div>
    
    <span className="relative z-10 whitespace-nowrap">{children}</span>
  </motion.a>
);

// Floating particles animation for background
const FloatingParticles = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {[...Array(30)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-1 h-1 rounded-full bg-secondary/20"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
        }}
        animate={{
          y: [0, Math.random() * 100 - 50],
          x: [0, Math.random() * 100 - 50],
          scale: [1, Math.random() + 0.5],
          opacity: [0.7, 0],
        }}
        transition={{
          duration: 3 + Math.random() * 5,
          repeat: Infinity,
          repeatType: "reverse",
          delay: Math.random() * 2,
        }}
      />
    ))}
  </div>
);

export default function Home({ setShowNavbar }) {
  const [showIntro, setShowIntro] = useState(true);
  const [mainContentVisible, setMainContentVisible] = useState(false);

  useEffect(() => {
    // Check if user has been here before
    const hasVisitedBefore = localStorage.getItem('hasVisitedBefore');
    if (hasVisitedBefore) {
      // Skip intro for returning visitors
      setShowIntro(false);
      setMainContentVisible(true);
      setShowNavbar(true);
    }
  }, [setShowNavbar]);

  const handleIntroComplete = () => {
    setShowIntro(false);
    setMainContentVisible(true);
  };

  return (
    <>
      {/* 3D Intro Animation */}
      <AnimatePresence mode="wait">
        {showIntro && (
          <EnhancedIntro 
            onComplete={handleIntroComplete} 
            setShowNavbar={setShowNavbar}
          />
        )}
      </AnimatePresence>
      
      {/* Main Content */}
      <AnimatePresence>
        {mainContentVisible && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="min-h-screen bg-background text-text overflow-hidden relative flex flex-col justify-center items-center px-4 sm:px-6"
          >
            {/* Enhanced background effects */}
            <FloatingParticles />
            
            <motion.div
              className="absolute inset-0 z-0"
              animate={{
                background: [
                  "radial-gradient(circle at top left, rgba(212,175,55,0.1) 0%, rgba(212,175,55,0) 50%)",
                  "radial-gradient(circle at bottom right, rgba(132,132,132,0.1) 0%, rgba(132,132,132,0) 50%)",
                ],
              }}
              transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
            />

            <div className="w-full max-w-4xl lg:max-w-6xl mx-auto py-8 relative z-5 space-y-12 sm:space-y-20">
              <motion.h1 
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-2 text-center px-4"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-secondary via-accent to-primary">
                  Salman Azeez Syed
                </span>
              </motion.h1>

              <MotionBox>
                <motion.div 
                  className="h-1 w-32 sm:w-64 bg-secondary mx-auto"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 1.5, delay: 0.5 }}
                />
              </MotionBox>

              <MotionBox delay={0.2}>
                <h2 className="text-xl sm:text-2xl md:text-3xl mb-8 sm:mb-12 text-accent font-light text-center px-4">
                  {["Developer", "Innovator", "Researcher"].map((title, index) => (
                    <motion.span
                      key={title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 1, delay: index * 0.5 + 1 }}
                      className="inline-block"
                    >
                      {title}
                      {index < 2 && (
                        <span className="mx-2 sm:mx-4 md:mx-8 text-secondary">|</span>
                      )}
                    </motion.span>
                  ))}
                </h2>
              </MotionBox>

              <MotionBox delay={0.4}>
                <p className="text-base sm:text-lg mb-8 sm:mb-16 max-w-2xl mx-auto text-center leading-relaxed px-4">
                  Master&apos;s student at Georgia Institute of Technology with a passion for
                  innovative software solutions and cloud technologies.
                </p>
              </MotionBox>

              <MotionBox delay={0.6}>
                <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-8 mb-8 sm:mb-16 px-4">
                  <GlowingButton href="/Salman_Azeez_Syed_Resume.pdf" className="bg-secondary text-primary w-full sm:w-auto">
                    View Resume
                  </GlowingButton>
                  <GlowingButton href="#contact" className="bg-primary text-secondary w-full sm:w-auto">
                    Contact Me
                  </GlowingButton>
                </div>
              </MotionBox>

              <MotionBox delay={0.8}>
                <div className="flex justify-center space-x-8 sm:space-x-12">
                  {[
                    { icon: FaGithub, href: "https://github.com/codealpha7" },
                    { icon: FaLinkedin, href: "https://linkedin.com/in/salman-azeez-syed" },
                    { icon: FaEnvelope, href: "mailto:azeezsalman1@gmail.com" }
                  ].map((item, index) => (
                    <motion.a
                      key={index}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent hover:text-secondary transition-colors duration-300"
                      whileHover={{ 
                        scale: 1.2, 
                        rotate: 3,
                        filter: "drop-shadow(0 0 8px rgba(212,175,55,0.5))" 
                      }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <item.icon className="text-2xl sm:text-4xl" />
                    </motion.a>
                  ))}
                </div>
              </MotionBox>
            </div>

            <motion.div
              className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-secondary to-accent"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 2, delay: 1 }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}