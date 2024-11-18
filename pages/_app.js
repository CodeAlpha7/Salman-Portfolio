//_app.js
import '../styles/globals.css'
import Layout from '../components/Layout'
import React, { useState, useEffect } from 'react';

function MyApp({ Component, pageProps }) {
  const [showNavbar, setShowNavbar] = useState(true);

  return (
    <Layout showNavbar={showNavbar}>
      <Component {...pageProps} setShowNavbar={setShowNavbar} />
    </Layout>
  )
}

export default MyApp