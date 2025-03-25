// pages/_app.js
import '../styles/globals.css'
import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout'
import EnhancedPageTransition from '../components/EnhancedPageTransition';
import VignetteOverlay from '../components/VignetteOverlay';

function MyApp({ Component, pageProps }) {
  const [showNavbar, setShowNavbar] = useState(true);
  const [mounted, setMounted] = useState(false);
  
  // Only run client-side
  useEffect(() => {
    setMounted(true);
  }, []);

  // Pass the setShowNavbar function to components that need to control navbar visibility
  const updatedPageProps = {
    ...pageProps,
    setShowNavbar: setShowNavbar
  };
  
  if (!mounted) {
    // Return a minimal layout for initial server render
    return null;
  }

  return (
    <>
      <EnhancedPageTransition>
        <Layout showNavbar={showNavbar}>
          {/* Subtle vignette effect for the entire site - reduced intensity for regular pages */}
          <VignetteOverlay intensity={0.2} pulsate={true} isIntro={false} />
          
          <Component {...updatedPageProps} />
        </Layout>
      </EnhancedPageTransition>
    </>
  );
}

export default MyApp;