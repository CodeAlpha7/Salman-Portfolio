//about.js
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Head from 'next/head';

import Education from '../components/education';
import Skills from '../components/Skills';
import Certifications from '../components/certifications';
import Hobbies from '../components/hobbies';

const events = [
  {
    year: 2019,
    title: "Start of Bachelor's Degree",
    description: "Embarked on a new journey in tech",
    bullets: [
      "Bachelor of Technology (B. Tech) in Information Technology in India's top 10 CS universities (NSUT) - awarded DASA CIWG Scholarship.",
      "Extensive research focus in Distributed Systems, Blockchain and Machine learning authoring 7 research articles.",
      "Completed 3 internships, published 4 research papers, presented at 1 local conference."
    ]
  },
  {
    year: 2022,
    title: "First Research Internship",
    description: "MITACS Globalink Visiting Research Scholar at the University of Victoria",
    bullets: [
      "A Canadian govt-sponsored program at the dawn of the pandemic under Dr. Jianping Pan of PANLAB at UVic.",
      "Proposed a novel quantitative WAN-based blockchain framework by interviewing several blockchain startup CEOs worldwide.",
      "Presented findings at prominent Canadian and Chinese networking labs to 50+ postdocs and industry researchers."
    ]
  },
  {
    year: 2023,
    title: "First Startup Experience",
    description: "First step into the industry handling a variety of technical tasks",
    bullets: [
      " Played a pivotal role under the CEO at Cypherock, contributing to substantial startup growth and securing $1 million in funding.",
      "Identified and addressed vulnerabilities in hardware crypto wallets, architecting strategic solutions for threat mitigation.",
      "Authored SEO-optimized technical articles boosting page visits by 460% and average visit duration by 2000%"
    ]
  },
  {
    year: 2023,
    title: "Started Master's Degree",
    description: "The American Dream",
    bullets: [
      "A deeper dive into Computer Science at Georgia Tech with a specialization in Computing Systems.",
      "A more broadened perspective with teaching experience and coursework in economics, business and languages",
    ]
  },
  {
    year: 2024,
    title: "Summer Internship at a tech startup",
    description: "Start of a professional career as a Software Engineer",
    bullets: [
      "Lead Developer for a Gen-AI based Mixed Reality (AR/XR) OpenXR app to streamline manufacturing processes.",
      "Built a custom RAG model leveraging Neo4j, FastEmbed Vector Embeddings, FAISS/Pinecone Indexing and Gemini 1.5 Pro LLM model with zero upfront cost.",
      "Optimized manufacturing workflows reducing training time by 37%, training costs by 40% and boosting worker efficiency by 25%",
      "Mentoring High School and College freshmen interns in learning Software Development & Research practices"
    ]
  },
];

// Bezier curve pattern for carousel
const curvePatterns = [
  // Curve 1: Intricate wave with sharp dips and rises
  "M0,250 C100,150 300,50 500,250 C700,450 900,50 1100,250 C1300,450 1500,50 1700,250 C1900,450 2100,50 2300,250",

  // Curve 2: Multi-layered arcs with asymmetry
  "M0,250 C200,100 400,300 600,250 S1000,100 1200,250 S1600,400 1800,250 C2000,100 2200,300 2400,250",

  // Curve 3: Complex serpentines with layered depths
  "M0,250 C150,400 300,100 450,250 S600,400 750,250 S1050,50 1200,250 C1350,450 1500,100 1650,250 C1800,400 1950,100 2100,250",

  // Curve 4: Dynamic flow with deep valleys and steep peaks
  "M0,350 C200,50 400,450 600,250 C800,50 1000,450 1200,250 C1400,50 1600,450 1800,250 C2000,50 2200,450 2400,250",

  // Curve 5: Alternating loops and waves
  "M0,250 C100,100 200,400 300,250 S500,100 600,250 C700,400 800,100 900,250 S1100,400 1200,250 C1300,100 1400,400 1500,250 S1700,100 1800,250 C1900,400 2000,100 2100,250 S2300,400 2400,250"
];



const AboutMe = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [key, setKey] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % events.length);
    setKey(prevKey => prevKey + 1);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + events.length) % events.length);
    setKey(prevKey => prevKey + 1);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Head> 
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Kalam:wght@300;400;700&display=swap" rel="stylesheet" />
      </Head>
      <div className="relative h-screen overflow-hidden bg-background">
        <h1 className="absolute top-16 left-1/2 transform -translate-x-1/2 text-4xl text-primary z-10" style={{ fontFamily: 'Kalam, cursive' }}>
          My Journey So Far
        </h1>
        
        {/* Artistic squiggly timeline */}
        <svg className="absolute w-full h-full" preserveAspectRatio="none">
          <defs>
            <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" style={{ stopColor: '#D4AF37', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: '#FFA500', stopOpacity: 1 }} />
            </linearGradient>
          </defs>
          <motion.path
            key={key}
            d={curvePatterns[currentIndex]}
            fill="none"
            stroke="url(#goldGradient)"
            strokeWidth="4"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 5, ease: "easeInOut" }}
          />
        </svg>

        {/* Event slides */}
        <AnimatePresence mode='wait'>
          <motion.div
            key={currentIndex}
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -300 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center text-primary">
              <div className="-mt-16">
                <motion.h2 className="text-8xl font-bold mb-4" style={{ fontFamily: 'Kalam, cursive' }} initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20 }}>
                  {String(events[currentIndex].year).split('').map((char, index) => (
                    <motion.span
                      key={index}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.35 }}
                    >
                      {char}
                    </motion.span>
                  ))}
                </motion.h2>
                <h3 className="text-4xl font-semibold mb-2" style={{ fontFamily: 'Kalam, cursive' }}>
                  {events[currentIndex].title}
                </h3>
                <p className="text-xl" style={{ fontFamily: 'Kalam, cursive' }}>
                  {events[currentIndex].description}
                </p>
              </div>
              <ul className="text-left list-disc list-inside space-y-3 mt-20">
                {events[currentIndex].bullets.map((bullet, index) => (
                  <motion.li 
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.5 }}
                    className="text-lg"
                    style={{ fontFamily: 'Kalam, cursive' }}
                  >
                    {bullet}
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation arrows with hover effect */}
        <motion.button 
          className="absolute left-4 top-1/2 transform -translate-y-1/2 text-primary text-5xl p-4 rounded-full"
          onClick={prevSlide}
          whileHover={{ scale: 1.25, backgroundColor: "rgba(255,255,255,0.3)" }}
          whileTap={{ scale: 0.9 }}
        >
          &#8249;
        </motion.button>
        <motion.button 
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-primary text-5xl p-4 rounded-full"
          onClick={nextSlide}
          whileHover={{ scale: 1.25, backgroundColor: "rgba(255,255,255,0.3)" }}
          whileTap={{ scale: 0.9 }}
        >
          &#8250;
        </motion.button>

        {/* Creative progress bar */}
        <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2">
          <svg width="250" height="60" viewBox="0 0 200 60">
            <defs>
              <filter id="glow">
                <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            {events.map((_, index) => (
              <motion.circle
                key={index}
                cx={40 * (index + 1)}
                cy="30"
                r="8"
                fill={index === currentIndex ? "#F2D356" : "#CECECE"}
                filter="url(#glow)"
                initial={{ scale: 0 }}
                animate={{ scale: index === currentIndex ? 0.9 : 0.6 }}
                transition={{ duration: 0.5 }}
              />
            ))}
            {/* <motion.path
              d="M48,30 L160,30"
              stroke="#D4AF37"
              strokeWidth="3"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: (currentIndex + 1) / events.length }}
              transition={{ duration: 0.8 }}
            /> */}
          </svg>
        </div>
      </div>
      <Education />
      <Skills />
      <Certifications />
      <Hobbies />
    </>
  );
};

export default AboutMe;