//components/Layout.js
import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Analytics } from '@vercel/analytics/next';

const NavLink = ({ href, children, onClick }) => (
  <li>
    <Link 
      href={href} 
      className="text-text hover:text-secondary transition-colors duration-300"
      onClick={onClick}
    >
      {children}
    </Link>
  </li>
);

export default function Layout({ children, showNavbar = true }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <div className="min-h-screen bg-background text-text">
      <Head>
        <title>Salman&apos;s Portfolio</title>
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
            className="bg-background text-text p-4 md:p-6 sticky top-0 z-[60] backdrop-filter backdrop-blur-lg bg-opacity-20"
          >
            <div className="max-w-7xl mx-auto flex justify-between items-center">
              <Link href="/" className="font-heading text-2xl md:text-3xl font-bold">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-secondary via-accent to-primary">
                  Salman Azeez Syed
                </span>
              </Link>

              {/* Desktop Navigation */}
              <nav className="hidden md:block">
                <ul className="flex space-x-8">
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
                className="md:hidden p-2 text-text hover:text-secondary"
              >
                <svg 
                  className="w-6 h-6" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  {isMobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>

            {/* Mobile Navigation */}
            <AnimatePresence>
              {isMobileMenuOpen && (
                <motion.nav
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="md:hidden"
                >
                  <ul className="flex flex-col space-y-4 mt-4 p-4 bg-background/90 backdrop-blur-lg rounded-lg">
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

      <main className="flex-grow">
        {children}
        <Analytics />
      </main>

      <footer className="bg-background text-text p-4 md:p-6 mt-12">
        <div className="max-w-7xl mx-auto text-center text-sm md:text-base">
          <p>© {new Date().getFullYear()} Salman Azeez Syed. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
