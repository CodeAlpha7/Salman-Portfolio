//index.js
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import TypewriterEffect from '../components/TypewriterEffect';

const MotionBox = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ y: 50, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ duration: 1.6, delay }}
  >
    {children}
  </motion.div>
);

const GlowingButton = ({ children, href, className }) => (
  <motion.a
    href={href}
    className={`relative inline-block px-8 py-3 rounded-full font-medium text-base shadow-lg overflow-hidden ${className}`}
    whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(212,175,55,0.5)" }}
    whileTap={{ scale: 0.95 }}
  >
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
    <span className="relative z-10">{children}</span>
  </motion.a>
);

export default function Home({ setShowNavbar }) {
  const [isTyping, setIsTyping] = useState(null);
  
  useEffect(() => {
    setIsTyping(!localStorage.getItem('hasVisitedHome'));
  }, []);

  useEffect(() => {
    if (isTyping !== null) {
      setShowNavbar(!isTyping);
    }
  }, [isTyping, setShowNavbar]);

  if (isTyping === null) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background text-text overflow-hidden relative flex flex-col justify-center items-center">
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
      
      <div className="w-full max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-5 space-y-20">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-2 text-center">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-secondary via-accent to-primary">
            {isTyping ? (
              <TypewriterEffect 
                text="Welcome to Salman's Portfolio!" 
                onComplete={() => {
                  localStorage.setItem('hasVisitedHome', 'true');
                  setIsTyping(false);
                }}
              />
            ) : (
              <motion.span>
                Salman Azeez Syed
              </motion.span>
            )}
          </span>
        </h1>

    <AnimatePresence>
      {!isTyping && (
      <>
        <MotionBox>
          <motion.div 
            className="h-1 w-64 bg-secondary mx-auto"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.5, delay: 0.5 }}
          />
        </MotionBox>
                
                <MotionBox delay={0.2}>
                  <h2 className="text-2xl md:text-3xl mb-12 text-accent font-light text-center">
                    {["Developer", "Innovator", "Researcher"].map((title, index) => (
                      <motion.span
                        key={title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: index * 0.5 + 1 }}
                        className="inline-block mr-2 mb-2"
                      >
                        {title}
                        {index < 2 && <span className="mx-8 text-secondary">|</span>}
                      </motion.span>
                    ))}
                  </h2>
                </MotionBox>
                
                <MotionBox delay={0.4}>
                  <p className="text-lg mb-16 max-w-2xl mx-auto text-center leading-relaxed">
                    Master&apos;s student at Georgia Institute of Technology with a passion for
                    innovative software solutions and cloud technologies.
                  </p>
                </MotionBox>
                
                <MotionBox delay={0.6}>
                  <div className="flex flex-wrap justify-center gap-8 mb-16">
                    <GlowingButton href="/Salman_Azeez_Syed_Resume.pdf" className="bg-secondary text-primary">
                      View Resume
                    </GlowingButton>
                    <GlowingButton href="#contact" className="bg-primary text-secondary">
                      Contact Me
                    </GlowingButton>
                  </div>
                </MotionBox>
                
                <MotionBox delay={0.8}>
                  <div className="flex justify-center space-x-12">
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
                        whileHover={{ scale: 1.2, rotate: 5 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <item.icon className="text-4xl" />
                      </motion.a>
                    ))}
                  </div>
                </MotionBox>
              </>
            )}
          </AnimatePresence>
        </div>
        
        <motion.div
        className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-secondary to-accent"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 2, delay: 1 }}
      />
    </div>
    // </Layout>
  );
}