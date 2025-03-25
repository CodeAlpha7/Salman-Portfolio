import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';

// Preserved Floating elements component
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

const useMousePosition = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window);
  }, []);

  const handleMove = (e) => {
    if (isTouchDevice) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setPosition({ x, y });
  };

  return { position, handleMove, isTouchDevice };
};

const SkillCategory = ({ category, skills, index }) => {
  const { position, handleMove, isTouchDevice } = useMousePosition();
  
  return (
    <motion.div 
      className="relative group"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      {/* Preserved stacked paper effect */}
      <motion.div 
        className="absolute -bottom-2 left-1 right-1 h-full bg-[#1F1F1F] rounded-xl"
        style={{ transform: 'rotate(1deg)' }}
      />
      <motion.div 
        className="absolute -bottom-1 left-0.5 right-0.5 h-full bg-[#242424] rounded-xl"
        style={{ transform: 'rotate(-0.5deg)' }}
      />

      <motion.div 
        className={`
          p-4 sm:p-6 rounded-xl relative
          bg-[#2B2B2B]
          shadow-[0_10px_30px_rgba(0,0,0,0.5)]
          border border-secondary/30
          transition-all duration-300
        `}
        onMouseMove={handleMove}
        style={{
          transform: !isTouchDevice 
            ? `perspective(1000px) rotateX(${position.y * 8}deg) rotateY(${position.x * 8}deg)`
            : 'none',
          transition: 'transform 0.1s ease'
        }}
        whileHover={{ 
          scale: 1.03,
          boxShadow: '0 20px 30px rgba(0,0,0,0.4)',
          borderColor: 'rgba(212,175,55,0.6)'
        }}
      >
        <div className="flex items-center mb-4 sm:mb-6">
          <h3 
            className="text-xl sm:text-2xl font-bold"
            style={{
              background: 'linear-gradient(to right, #D4AF37, #966F33)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            {category}
          </h3>
          <motion.div 
            className="ml-4 h-px flex-grow bg-gradient-to-r from-secondary/50 to-transparent"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.5 }}
          />
        </div>

        <div className="flex flex-wrap gap-2 sm:gap-3">
          {skills.map((skill) => (
            <motion.span 
              key={skill}
              className="
                px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg
                bg-black/20
                border border-secondary/30
                text-white/90
                text-xs sm:text-sm font-medium
                transition-all duration-300
                hover:border-secondary/50
                whitespace-nowrap
              "
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {skill}
            </motion.span>
          ))}
        </div>

        {/* Preserved background pattern */}
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
};

const Skills = () => {
  const skillCategories = [
    { 
      category: "Languages",
      skills: ["C", "C++", "C#", "Python", "JavaScript", "HTML", "CSS", "SQL", "Solidity"]
    },
    {
      category: "Frameworks",
      skills: ["React", "Bootstrap", "Nodejs", "Expressjs", "jQuery", "gRPC", "OpenMP/MPI", "TensorFlow", "PyTorch", "Web3", "Flask", "Django", "Next.js", "Tailwind.js"]
    },
    {
      category: "Environments",
      skills: ["Git", "GitHub", "Docker", "Kubernetes", "Linux/Unix", "Bash", "Shell", "Truffle", "Azure", "AWS", "Unity", "Jira", "Confluence"]
    },
    {
      category: "Development Tools",
      skills: ["Wireshark", "Splunk", "Autopsy", "Neo4j", "Postman", "REST API", "PostgreSQL", "MongoDB", "AWS S3", "DynamoDB", "MySQL", "Redis", "HTTPS/SSL"]
    }
  ];

  return (
    <div className="py-16 sm:py-32 bg-background relative overflow-hidden">
      {/* Floating elements */}
      <FloatingElements />

      <motion.h2 
        className="text-4xl sm:text-5xl font-bold text-center mb-16 sm:mb-32"
        style={{ fontFamily: 'Kalam, cursive' }}
        initial={{ y: -50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <span className="text-primary">Skills</span>
      </motion.h2>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 px-4 sm:px-6 relative z-10">
        {skillCategories.map((cat, index) => (
          <SkillCategory key={cat.category} {...cat} index={index} />
        ))}
      </div>

      {/* Preserved background pattern */}
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

export default Skills;