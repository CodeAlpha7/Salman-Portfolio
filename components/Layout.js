import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

const NavLink = ({ href, children }) => (
  <li>
    <Link href={href} className="text-text hover:text-secondary transition-colors duration-300">
      {children}
    </Link>
  </li>
);

export default function Layout({ children, showNavbar = true }) {
  return (
    <div className="min-h-screen bg-background text-text">
      <Head>
        <title>Salman&apos;s Portfolio</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AnimatePresence>
        {showNavbar && (
          <motion.header
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5 }}
            className="bg-background text-text p-6 sticky top-0 z-50 backdrop-filter backdrop-blur-lg bg-opacity-20"
          >
            <div className="max-w-7xl mx-auto flex justify-between items-center">
              <Link href="/" className="font-heading text-3xl font-bold">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-secondary via-accent to-primary">
                  Salman Azeez Syed
                </span>
              </Link>
              <nav className="hidden md:block">
                <ul className="flex space-x-8">
                  <NavLink href="/">Home</NavLink>
                  <NavLink href="/about">About</NavLink>
                  <NavLink href="/experiences">Experiences</NavLink>
                  <NavLink href="/blogs">Blogs</NavLink>
                  <NavLink href="/gallery">Gallery</NavLink>
                </ul>
              </nav>
            </div>
          </motion.header>
        )}
      </AnimatePresence>

      <main className="flex-grow">
        {children}
      </main>

      <footer className="bg-background text-text p-6 mt-12">
        <div className="max-w-7xl mx-auto text-center">
          <p>© {new Date().getFullYear()} Salman Azeez Syed. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}