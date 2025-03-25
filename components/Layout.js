import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Analytics } from '@vercel/analytics/next';

const NavLink = ({ href, children, onClick }) => (
  <motion.li
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.95 }}
  >
    <Link 
      href={href} 
      className="text-text hover:text-secondary transition-colors duration-300 block px-4 py-2"
      onClick={onClick}
    >
      {children}
    </Link>
  </motion.li>
);

const Layout = ({ children, showNavbar = true }) => {  // Changed to const Layout
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <div className="min-h-screen bg-background text-text">
      <Head>
        <title>Salman's Portfolio</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <AnimatePresence>
        {showNavbar && (
          <motion.header
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5 }}
            className={`
              fixed top-0 left-0 right-0 z-[60]
              px-4 sm:px-6 lg:px-8
              py-3 sm:py-4
              transition-all duration-300
              ${scrolled 
                ? 'bg-background/80 backdrop-blur-lg shadow-lg' 
                : 'bg-transparent'}
            `}
          >
            <div className="max-w-7xl mx-auto flex justify-between items-center">
              <Link href="/" className="flex-shrink-0">
                <motion.span 
                  className="font-heading text-xl sm:text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-secondary via-accent to-primary"
                  whileHover={{ scale: 1.05 }}
                >
                  Salman Azeez Syed
                </motion.span>
              </Link>

              {/* Desktop Navigation */}
              <nav className="hidden md:block">
                <ul className="flex space-x-4 lg:space-x-8">
                  <NavLink href="/">Home</NavLink>
                  <NavLink href="/about">About</NavLink>
                  <NavLink href="/experiences">Experiences</NavLink>
                  <NavLink href="/blogs">Blogs</NavLink>
                  <NavLink href="/gallery">Gallery</NavLink>
                </ul>
              </nav>

              {/* Mobile Menu Button */}
              <button 
                onClick={toggleMobileMenu}
                className="md:hidden p-3 hover:bg-secondary/10 rounded-lg transition-colors"
                aria-label="Toggle menu"
              >
                <motion.svg 
                  className="w-6 h-6" 
                  animate={{ rotate: isMobileMenuOpen ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  {isMobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </motion.svg>
              </button>
            </div>

            {/* Mobile Navigation */}
            <AnimatePresence>
              {isMobileMenuOpen && (
                <motion.nav
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="absolute top-full left-0 right-0 md:hidden"
                >
                  <ul className="flex flex-col space-y-1 mt-2 p-4 bg-background/95 backdrop-blur-lg shadow-lg rounded-b-lg">
                    <NavLink href="/" onClick={toggleMobileMenu}>Home</NavLink>
                    <NavLink href="/about" onClick={toggleMobileMenu}>About</NavLink>
                    <NavLink href="/experiences" onClick={toggleMobileMenu}>Experiences</NavLink>
                    <NavLink href="/blogs" onClick={toggleMobileMenu}>Blogs</NavLink>
                    <NavLink href="/gallery" onClick={toggleMobileMenu}>Gallery</NavLink>
                  </ul>
                </motion.nav>
              )}
            </AnimatePresence>
          </motion.header>
        )}
      </AnimatePresence>

      <main className={`flex-grow ${showNavbar ? 'pt-16 sm:pt-20' : ''}`}>
        {children}
        <Analytics />
      </main>

      <footer className="bg-background text-text px-4 sm:px-6 py-6 sm:py-8 mt-12">
        <div className="max-w-7xl mx-auto text-center text-sm sm:text-base">
          <p>© {new Date().getFullYear()} Salman Azeez Syed. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;  // Make sure Layout is properly exported