//components/certifications.js
import React from 'react';
import { motion } from 'framer-motion';

// Reuse floating elements from other sections
const FloatingElements = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {[...Array(12)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-3 h-3 rounded-full bg-secondary/15"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
        }}
        animate={{
          y: [0, 70, 0],
          x: [0, 50, 0],
          scale: [1, 1.5, 1],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          delay: i * 1.5,
          ease: "easeInOut"
        }}
      />
    ))}
  </div>
);

const CertCard = ({ title, issuer, date, logo, credentialUrl, index }) => (
    <motion.div 
      className="relative group"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      {/* Lighter stacked paper effect */}
      <motion.div 
        className="absolute -bottom-2 left-1 right-1 h-full bg-[#C2C2C2] rounded-xl"
        style={{ transform: 'rotate(1deg)' }}
      />
      <motion.div 
        className="absolute -bottom-1 left-0.5 right-0.5 h-full bg-[#A3A3A3 ] rounded-xl"
        style={{ transform: 'rotate(-0.5deg)' }}
      />
  
      <motion.div 
        className="
          p-8 rounded-xl relative
          bg-[#F5F5F5]
          shadow-[0_10px_30px_rgba(0,0,0,0.5)]
          border border-secondary/30
          backdrop-filter backdrop-blur-sm
          transition-all duration-300
          flex flex-col justify-between
          min-h-[300px]
          w-full
        "
        whileHover={{ 
          scale: 1.03,
          rotateZ: 0, 
          boxShadow: '0 20px 30px rgba(0,0,0,0.4)',
          borderColor: 'rgba(212,175,55,0.6)'
        }}
      >
        <div>
          <motion.h3 
            className="text-2xl font-bold mb-3"
            style={{
              background: 'linear-gradient(to right, #D4AF37, #966F33)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            {title}
          </motion.h3>
          
          <motion.div 
            className="h-px w-full bg-gradient-to-r from-secondary/50 to-transparent mb-4"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.5 }}
          />
  
          <div className="mb-4">
            <img 
              src={logo} 
              alt={`${issuer} logo`} 
              className="h-11 w-auto object-contain"
            />
          </div>
        </div>
        
        <div className="space-y-4">
          {/* More contrasting issuer text */}
          <p className="text-[#333333] font-semibold text-lg">{issuer}</p>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <span className="w-2 h-2 rounded-full bg-secondary/60 mr-2" />
              <p className="text-accent">Issued: {date}</p>
            </div>
            
            {/* Verify button with In Progress state */}
{date === "In Progress" ? (
  <span
    className="
      px-4 py-2 rounded-lg
      bg-green-300/20
      border border-green-400/40
      text-green-500
      text-sm font-medium
      flex items-center gap-2
      cursor-not-allowed
    "
  >
    In Progress
  </span>
) : (
  <motion.a
    href={credentialUrl}
    target="_blank"
    rel="noopener noreferrer"
    className="
      px-4 py-2 rounded-lg
      bg-secondary/60 hover:bg-secondary/80
      border border-secondary/80 hover:border-secondary/100
      text-white
      text-sm font-medium
      transition-all duration-300
      flex items-center gap-2
      shadow-sm hover:shadow-md
    "
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.90 }}
  >
    Verify
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
    </svg>
  </motion.a>
)}
          </div>
        </div>
  
        {/* Background pattern */}
        <div 
          className="absolute inset-0 opacity-5 pointer-events-none rounded-xl overflow-hidden"
          style={{
            backgroundImage: `
              radial-gradient(circle at 50px 50px, #D4AF37 1px, transparent 1px),
              radial-gradient(circle at 100px 100px, #D4AF37 1px, transparent 1px)
            `,
            backgroundSize: '100px 100px',
          }}
        />
      </motion.div>
    </motion.div>
  );

  const Certifications = () => {
    const certs = [
      { 
        title: "AWS Solutions Architect Associate",
        issuer: "Amazon Web Services",
        date: "In Progress",
        logo: "/aws-logo-trp.png", 
      },
      { 
        title: "Network Function Virtualization",
        issuer: "Georgia Institute of Technology",
        date: "May 2021",
        logo: "/gt-logo-trp.png",
        credentialUrl: "https://www.coursera.org/account/accomplishments/verify/JN38T6JM8N77"
      },
      { 
        title: "Software Defined Networking",
        issuer: "Coursera",
        date: "Apr 2021",
        logo: "coursera-logo-trp.png",
        credentialUrl: "https://coursera.org/verify/UXDBXNKFAEYG"
      },
      { 
        title: "Developing and Deploying an Internet of Things",
        issuer: "Amazon Web Services",
        date: "Aug 2021",
        logo: "/aws-logo-trp.png", 
        credentialUrl: "https://coursera.org/share/76c7f67412f7fc8073e89f77bc9f8c87"
      },
      { 
        title: "Intro to CyberSecurity L1",
        issuer: "CyberPeace Foundation",
        date: "Jul 2021",
        logo: "/CyberPeace-Logo.png",
        credentialUrl: "https://block.cyberpeace.org/docs/535d7e2149ab66493f67be7b09feb38093b6f2e725a15a7843451a74c6dcd4f5"
      },
      { 
        title: "Data Structures Specialist",
        issuer: "Coding Ninjas",
        date: "May 2020",
        logo: "/coding-ninjas-logo-trp-better.png",
        credentialUrl: "http://students.codingninjas.com/verify/42f4d8e4972155fb"
      },
      // ... other certs
    ];

  return (
    <div className="py-32 bg-background relative overflow-hidden">
      <FloatingElements />

      <motion.h2 
        className="text-5xl font-bold text-center mb-32"
        style={{ fontFamily: 'Kalam, cursive' }}
        initial={{ y: -50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <span className="text-primary">Certifications & Courses</span>
      </motion.h2>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 px-6 relative z-10">
        {certs.map((cert, index) => (
          <CertCard key={index} {...cert} index={index} />
        ))}
      </div>

      {/* Enhanced background pattern */}
      <div 
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(30deg, #D4AF37 12%, transparent 12.5%, transparent 87%, #D4AF37 87.5%, #D4AF37),
            linear-gradient(150deg, #D4AF37 12%, transparent 12.5%, transparent 87%, #D4AF37 87.5%, #D4AF37),
            linear-gradient(30deg, #D4AF37 12%, transparent 12.5%, transparent 87%, #D4AF37 87.5%, #D4AF37),
            linear-gradient(150deg, #D4AF37 12%, transparent 12.5%, transparent 87%, #D4AF37 87.5%, #D4AF37)
          `,
          backgroundSize: '80px 140px',
          backgroundPosition: '0 0, 0 0, 40px 70px, 40px 70px'
        }}
      />
    </div>
  );
};

export default Certifications;