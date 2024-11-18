import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

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

const TimelineConnector = () => (
  <motion.div
    className="absolute left-1/2 -translate-x-1/2 w-px h-24 -mt-12 mb-12 bg-gradient-to-b from-secondary/30 to-transparent"
    initial={{ scaleY: 0 }}
    animate={{ scaleY: 1 }}
    transition={{ duration: 1 }}
  />
);

const CourseGrid = ({ courses }) => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    {courses.map((column, idx) => (
      <div key={idx} className="space-y-3">
        {column.map((course, index) => (
          <motion.div
            key={index}
            className="p-3 rounded-lg bg-white/50 backdrop-blur-sm
                     shadow-sm
                     text-primary/90 font-medium
                     transition-all duration-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.05 }}
          >
            {course}
          </motion.div>
        ))}
      </div>
    ))}
  </div>
);

const EducationCard = ({ university, degree, specialization, location, graduationDate, courses, isExpanded, onToggle }) => {
  return (
    <motion.div 
      className="mb-20 relative group" // Added margin-bottom to prevent overlap
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      {/* Lighter stacked paper effect */}
      <motion.div 
        className="absolute -bottom-2 left-1 right-1 h-full bg-[#C2C2C2] rounded-xl"
        style={{ transform: 'rotate(1deg)' }}
      />
      <motion.div 
        className="absolute -bottom-1 left-0.5 right-0.5 h-full bg-[#A3A3A3] rounded-xl"
        style={{ transform: 'rotate(-0.5deg)' }}
      />

      <motion.div 
        className="
          p-8 rounded-xl relative 
          bg-[#F5F5F5]
          shadow-[0_20px_40px_rgba(0,0,0,0.6)]
          border border-secondary/10
          transition-all duration-300
          flex flex-col
          min-h-[180px]  // Reduced minimum height
          w-full
        "
        onClick={onToggle}
        whileHover={{ 
          scale: 1.03,
          boxShadow: '0 20px 40px rgba(0,0,0,0.6)',
          borderColor: 'rgba(212,175,55,0.6)'
        }}
      >
        {/* Header content with proper spacing */}
        <div className="flex justify-between items-start mb-4"> {/* Reduced margin */}
          <div className="flex-grow">
            <h3 
              className="text-2xl font-bold mb-4"
              style={{
                background: 'linear-gradient(to right, #D4AF37, #966F33)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              {university}
            </h3>
            <div className="space-y-2"> {/* Better spacing for degree info */}
              <p className="text-lg font-semibold text-[#333333]">{degree}</p>
              <p className="italic text-[#333333]/80 text-sm">{specialization}</p>
            </div>
          </div>
          <div className="text-right ml-4"> {/* Added margin-left for separation */}
            <p className="text-secondary font-medium">{location}</p>
            <p className="text-accent/90 text-sm">{graduationDate}</p>
          </div>
        </div>

        {/* Courses Section - Expandable */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5 }}
              className="mt-6 border-t border-secondary/60 pt-6" // Added border for separation
            >
              <h4 className="font-semibold text-lg text-center mb-6 text-secondary">
                Key Courses
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {courses.map((column, idx) => (
                  <div key={idx} className="space-y-2">
                    {column.map((course, index) => (
                      <div
                        key={index}
                        className="p-3 rounded-lg bg-white
                                 text-[#333333] font-medium text-sm
                                 transition-colors duration-300
                                 hover:bg-white/80
                                 border border-secondary/30"
                      >
                        {course}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Expand/Collapse Indicator */}
        <motion.div 
          className="absolute -bottom-3 left-1/2 transform -translate-x-1/2
                     bg-secondary/90 text-white px-4 py-1 rounded-full text-sm
                     opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          animate={{ y: isExpanded ? 10 : 0 }}
        >
          {isExpanded ? 'Click to collapse' : 'Click to view courses'}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

const Education = () => {
  const [expandedCard, setExpandedCard] = useState(null);
  
  const gradCourses = [
    ['Advanced Operating Systems', 'Systems for Machine Learning', 'Distributed Computing', 'Advanced Internet Computing Systems'],
    ['Real-time Systems', 'Cost Benefit Analysis for Policy', 'Blockchain & Cryptocurrencies', 'Graduate Algorithms'],
    ['Software Analysis & Testing', 'Principles of UI Software', 'Intermediate Japanese', 'High Performance Computing Architecture']
  ];

  const undergradCourses = [
    ['Computer Programming', 'Digital Logic Design', 'Discrete Structures', 'Mathematics 1 & 2', 'Data Structures & Algorithms', 'Machine Learning', 'Artificial Intelligence'],
    ['Probability & Stochastic Processes', 'Database Management System', 'Computer System Organization', 'Computer Graphics', 'Optimization Principles & Techniques', 'Deep & Reinforcement Networks', 'Cloud Computing'],
    ['Business Models & Entrepreneurship', 'Analog and Digital Communication', 'Operating Systems', 'Design & Analysis of Algorithms', 'Software Engineering', 'Computer Networks', 'Distributed Systems']
  ];

  return (
    <div className="py-32 bg-background relative overflow-hidden">
      {/* Floating elements */}
      <FloatingElements />

      <motion.h2 
        className="text-5xl font-bold text-center mb-28" // Increased margin bottom
        style={{ fontFamily: 'Kalam, cursive' }}
        initial={{ y: -50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <span className="text-primary">Education</span>
      </motion.h2>

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <EducationCard 
          university="Georgia Institute of Technology"
          degree="Master of Science (MS) in Computer Science"
          specialization="Specialization: Computing Systems"
          location="Atlanta, GA, USA"
          graduationDate="Expected: May 2025"
          courses={gradCourses}
          isExpanded={expandedCard === "gt"}
          onToggle={() => setExpandedCard(expandedCard === "gt" ? null : "gt")}
        />
        
        {/* Timeline connector */}
        <TimelineConnector />
        
        <EducationCard 
          university="Netaji Subhas University of Technology"
          degree="Bachelor of Technology (B.Tech) in Information Technology"
          specialization="Specialization: Network Computing and Security"
          location="New Delhi, India"
          graduationDate="May 2023"
          courses={undergradCourses}
          isExpanded={expandedCard === "nsut"}
          onToggle={() => setExpandedCard(expandedCard === "nsut" ? null : "nsut")}
        />
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

export default Education;