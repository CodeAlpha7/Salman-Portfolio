import React from 'react';
import { motion } from 'framer-motion';
import Layout from '../components/Layout';

const Gallery = () => {
  return (
    // <Layout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 py-8"
      >
        <h1 className="text-4xl font-bold text-primary mb-6">Photo Gallery</h1>
        <p>This page is under construction. Check back soon!</p>
      </motion.div>
    // </Layout>
  );
};

export default Gallery;