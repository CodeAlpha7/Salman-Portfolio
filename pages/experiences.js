import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

// Reusable Floating Elements
const FloatingElements = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {[...Array(12)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-secondary/15"
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

// Internship Section Component
const InternshipCard = ({ role, company, location, duration, techStack, responsibilities }) => (
  <motion.div
    className="relative group mb-8"
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
  >
    {/* Stacked paper effect */}
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
        p-6 sm:p-8 rounded-xl relative 
        bg-[#F5F5F5]
        shadow-lg hover:shadow-2xl
        border border-secondary/30
        transition-all duration-300
      "
      whileHover={{ 
        scale: 1.02,
        boxShadow: '0 20px 30px rgba(0,0,0,0.2)',
        borderColor: 'rgba(212,175,55,0.6)'
      }}
    >
      <div className="flex flex-col sm:flex-row justify-between mb-4">
        <div>
          <h3 className="text-xl sm:text-2xl font-bold text-primary mb-2">{role}</h3>
          <p className="text-lg text-accent">{company}</p>
          <p className="text-secondary">{location}</p>
        </div>
        <div className="mt-2 sm:mt-0 text-right">
          <p className="text-accent font-medium">{duration}</p>
        </div>
      </div>

      <div className="mb-4">
        <p className="text-sm font-medium text-secondary mb-2">Tech Stack:</p>
        <div className="flex flex-wrap gap-2">
          {techStack.map((tech, index) => (
            <span 
              key={index}
              className="px-3 py-1 bg-secondary/10 text-secondary text-sm rounded-full"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      <ul className="list-disc list-inside space-y-2 text-text">
        {responsibilities.map((resp, index) => (
          <li key={index} className="text-base">{resp}</li>
        ))}
      </ul>
    </motion.div>
  </motion.div>
);

// Research Section Component
const ResearchCard = ({ title, publisher, date, doi, description }) => (
  <motion.div
    className="relative group mb-8"
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
  >
    {/* Stacked paper effect preserved */}
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
        p-6 sm:p-8 rounded-xl relative 
        bg-[#F5F5F5]
        shadow-lg hover:shadow-2xl
        border border-secondary/30
        transition-all duration-300
      "
      whileHover={{ 
        scale: 1.02,
        boxShadow: '0 20px 30px rgba(0,0,0,0.2)',
        borderColor: 'rgba(212,175,55,0.6)'
      }}
    >
      <h3 className="text-xl sm:text-2xl font-bold text-primary mb-2">{title}</h3>
      <div className="flex flex-col sm:flex-row justify-between mb-4">
        <p className="text-lg text-accent">{publisher}</p>
        <div className="mt-2 sm:mt-0">
          <p className="text-secondary">{date}</p>
          <Link 
            href={doi}
            className="text-secondary hover:text-primary transition-colors duration-300"
            target="_blank"
          >
            View Publication →
          </Link>
        </div>
      </div>
      <p className="text-text">{description}</p>
    </motion.div>
  </motion.div>
);

// Leadership Section Component
const LeadershipCard = ({ title, description }) => (
  <motion.div
    className="relative group mb-6"
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
  >
    <motion.div 
      className="
        p-4 sm:p-6 rounded-xl
        bg-[#F5F5F5]
        shadow-md hover:shadow-xl
        border border-secondary/20
        transition-all duration-300
      "
      whileHover={{ 
        scale: 1.02,
        boxShadow: '0 15px 25px rgba(0,0,0,0.1)',
        borderColor: 'rgba(212,175,55,0.4)'
      }}
    >
      <h4 className="text-lg font-semibold text-primary mb-2">{title}</h4>
      <p className="text-text text-sm">{description}</p>
    </motion.div>
  </motion.div>
);

// Co-curricular Section Component
const AchievementCard = ({ title, description }) => (
  <motion.div
    className="relative group mb-6"
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
  >
    <motion.div 
      className="
        p-4 sm:p-6 rounded-xl
        bg-[#F5F5F5]
        shadow-md hover:shadow-xl
        border border-secondary/20
        transition-all duration-300
      "
      whileHover={{ 
        scale: 1.02,
        boxShadow: '0 15px 25px rgba(0,0,0,0.1)',
        borderColor: 'rgba(212,175,55,0.4)'
      }}
    >
      <h4 className="text-lg font-semibold text-primary mb-2">{title}</h4>
      <p className="text-text text-sm">{description}</p>
    </motion.div>
  </motion.div>
);

const Experiences = () => {
  const internships = [
    {
      role: "Software Engineer Intern",
      company: "Vieaura LLC",
      location: "Alpharetta, GA, United States",
      duration: "Jun 2024 - Aug 2024",
      techStack: ["Unity", "Python", "Gen-AI", "Mixed Reality", "Vector DB", "Neo4j", "LLMs"],
      responsibilities: [
        "Lead Developer for a Gen-AI Mixed Reality (AR/XR) Unity-based app to streamline manufacturing processes.",
        "Optimized manufacturing workflows reducing training time by 37%, training costs by 40% and boosting worker efficiency by 25% helping save up to $15 million per facility from rework and scrap reduction (est.).",
        "Engineered a custom API, Unity App and RAG model leveraging Neo4j Knowledge Graphs, Vector Embeddings, Indexing and Gemini 1.5 Pro LLM model with Zero upfront cost within 3 months."
      ]
    },
    {
      role: "Blockchain Researcher Intern",
      company: "Cypherock",
      location: "Singapore",
      duration: "Oct 2022 - Apr 2023",
      techStack: ["Blockchain", "Security", "Technical Writing", "Market Research"],
      responsibilities: [
        "Collaborated directly with CEO to drive startup growth initiatives, contributing to successful $1 million funding.",
        "Conducted comprehensive security analysis of hardware crypto wallets, developing and implementing strategic vulnerability mitigation solutions.",
        "Developed high-impact technical content strategy, boosting page visits by 460% and user engagement by 2000%"
      ]
    },
    {
      role: "MITACS Globalink Research Intern",
      company: "University of Victoria",
      location: "British Columbia, Canada",
      duration: "May 2022 - Aug 2022",
      techStack: ["Blockchain", "Research", "Technical Writing", "Networking"],
      responsibilities: [
        "Engineered a novel blockchain scalability framework achieving an average of 40% improvement in throughput.",
        "Conducted global outreach to survey needs of 10+ blockchain startup CEOs worldwide through 1-on-1 meetings.",
        "Delivered technical presentations at premier Canadian networking labs to 50+ industry researchers and CEOs"
      ]
    }
  ];

  const research = [
    {
      title: "RARE: Resource allocation using GBDT Distilled Deep RL for 5G Network Slicing",
      publisher: "Bachelor's Thesis/Master's Research",
      date: "2023",
      doi: "#",
      description: "Novel approach combining Gradient Boosted Decision Trees with Deep Reinforcement Learning for optimizing resource allocation in 5G network slicing. Achieved significant improvements in network efficiency and resource utilization."
    },
    {
      title: "Modeling Distributed and Configurable Hierarchical Blockchains for Large-Scale Internet of Things",
      publisher: "Journal of Grid Computing, Springer Nature B.V",
      date: "2022",
      doi: "10.1007/s10723-023-09698-3",
      description: "As IoT networks become larger with billions of heterogeneous devices, scalability and efficient data routing become an issue, especially in the context of existing blockchain models. Managing network traffic, latency as well as facilitating high throughput is essential for the fluid functioning of real-time systems. This paper aims to deal with such existing issues by discussing newer hierarchical blockchain models over existing SDN and fog-based networking frameworks for large-scale IoT applications."
    },
    {
      title: "Applying SDN-based Ambient Int. Techniques for Cognitive and Emotional Awareness in IoT",
      publisher: "International Journal of Communication Systems, Wiley",
      date: "2022",
      doi: "10.1002/dac.5649",
      description: "Despite extensive incorporation of personal digital assistants and smart home systems, AI is not yet capable of accurately interpreting and responding to human emotions. This paper incorporates HCI in a step towards complete automation by giving simple AI emotional understanding which is simple yet powerful."
    }
  ];

  const leadership = [
    {
      title: "Graduate Teaching Assistant",
      description: "Led programming labs and mentored 50+ students in advanced computer science courses"
    },
    {
      title: "U-17 Mens Soccer National School Team Captain",
      description: "Captain of the Men's U-17 School Soccer team that won the National Championship held in Dammam, Saudi Arabia."
    },
    {
      title: "Student Representative & Head Prefect",
      description: "High School Student Council Positions of Power and Responsibility."
    },
    {
      title: "Cultural Exchange Representative",
      description: "Volunteered for International Cultural Exchange between fellow university students from all over the world with mixed ethnicity and cultural backgrounds while expanding my perspective of different traditions. Represented India to bridge cultural differences and promote cross cultural understanding among peers."
    }
  ];

  const achievements = [
    {
      title: "Soccer Player and Captain",
      description: "Represented High School 4 times across the country in U-15, U-17 and U-19 levels having captained the U-17 team."
    },
    {
      title: "U-17 Regional Athletics Representative",
      description: "Competed in Long Jump, Javelin and 4x200 meter relay at regional level."
    },
    {
      title: "National Quiz Competition",
      description: "School Representative (among 4) for National Quiz Competition. Finished 6th in the country."
    },
    {
      title: "National Science Expo Gold Medalist",
      description: "Won gold medal in 2017. Represented High School twice in 2017 and 2018."
    }
  ];

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <FloatingElements />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        {/* Internships Section */}
        <section className="mb-16 sm:mb-32">
          <motion.h2 
            className="text-4xl sm:text-5xl font-bold text-center mb-12 sm:mb-16"
            style={{ fontFamily: 'Kalam, cursive' }}
            initial={{ y: -50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-primary">Professional Experience</span>
          </motion.h2>
          <div className="space-y-8">
            {internships.map((internship, index) => (
              <InternshipCard key={index} {...internship} />
            ))}
          </div>
        </section>

        {/* Research Section */}
        <section className="mb-16 sm:mb-32">
          <motion.h2 
            className="text-4xl sm:text-5xl font-bold text-center mb-12 sm:mb-16"
            style={{ fontFamily: 'Kalam, cursive' }}
            initial={{ y: -50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-primary">Research Publications</span>
          </motion.h2>
          <div className="space-y-8">
            {research.map((paper, index) => (
              <ResearchCard key={index} {...paper} />
            ))}
            </div>
        </section>

        {/* Leadership Section */}
        <section className="mb-16 sm:mb-32">
          <motion.h2 
            className="text-4xl sm:text-5xl font-bold text-center mb-12 sm:mb-16"
            style={{ fontFamily: 'Kalam, cursive' }}
            initial={{ y: -50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-primary">Positions of Responsibility</span>
          </motion.h2>
          
          <motion.p 
            className="text-center text-accent/70 italic mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            "I have always been a natural leader in various walks throughout life"
          </motion.p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {leadership.map((position, index) => (
              <LeadershipCard key={index} {...position} />
            ))}
          </div>
        </section>

        {/* Co-curricular Section */}
        <section className="mb-16 sm:mb-32">
          <motion.h2 
            className="text-4xl sm:text-5xl font-bold text-center mb-12 sm:mb-16"
            style={{ fontFamily: 'Kalam, cursive' }}
            initial={{ y: -50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-primary">Co-curricular Representation</span>
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {achievements.map((achievement, index) => (
              <AchievementCard key={index} {...achievement} />
            ))}
          </div>
        </section>
      </div>

      {/* Background Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(30deg, #D4AF37 12%, transparent 12.5%, transparent 87%, #D4AF37 87.5%, #D4AF37),
            linear-gradient(150deg, #D4AF37 12%, transparent 12.5%, transparent 87%, #D4AF37 87.5%, #D4AF37),
            linear-gradient(30deg, #D4AF37 12%, transparent 12.5%, transparent 87%, #D4AF37 87.5%, #D4AF37),
            linear-gradient(150deg, #D4AF37 12%, transparent 12.5%, transparent 87%, #D4AF37 87.5%, #D4AF37),
            linear-gradient(60deg, #D4AF37 25%, transparent 25.5%, transparent 75%, #D4AF37 75%, #D4AF37),
            linear-gradient(60deg, #D4AF37 25%, transparent 25.5%, transparent 75%, #D4AF37 75%, #D4AF37)
          `,
          backgroundSize: '80px 140px',
          backgroundPosition: '0 0, 0 0, 40px 70px, 40px 70px, 0 0, 40px 70px'
        }}
      />

      {/* Decorative Bottom Border */}
      <motion.div
        className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-secondary/30 to-transparent"
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5 }}
      />
    </div>
  );
};

export default Experiences;
