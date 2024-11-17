//components/hobbies.js
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const HobbyCard = ({ hobby, icon, description, details, onClick }) => (
  <motion.div 
    className="bg-white p-4 rounded-lg shadow-lg text-center cursor-pointer"
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
  >
    <div className="text-3xl mb-2">{icon}</div>
    <h3 className="text-lg font-semibold mb-1">{hobby}</h3>
    <p className="text-sm text-gray-600">{description}</p>
  </motion.div>
);

const ExpandedCard = ({ hobby, icon, description, details, onClose }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.8 }}
    transition={{ duration: 0.3 }}
    className="fixed inset-0 flex items-center justify-center z-50"
    onClick={onClose}
  >
    <div className="absolute inset-0 bg-black opacity-50 backdrop-blur-md" />
    <div 
      className="bg-white p-8 rounded-lg shadow-2xl max-w-2xl w-full m-4 relative z-10"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="text-5xl mb-4">{icon}</div>
      <h2 className="text-3xl font-bold mb-2">{hobby}</h2>
      <p className="text-xl mb-4">{description}</p>
      <p className="text-gray-700 mb-6">{details}</p>
      <button 
        className="bg-primary text-white px-4 py-2 rounded-full hover:bg-opacity-80 transition-colors"
        onClick={onClose}
      >
        Close
      </button>
    </div>
  </motion.div>
);

const Hobbies = () => {
  const [expandedHobby, setExpandedHobby] = useState(null);

  const hobbies = [
    { 
      hobby: "Soccer", 
      icon: "⚽", 
      description: "I play and watch soccer regularly",
      details: "I used to play soccer 'professionally' in High School having represented my school 3 times and captained the school's U-17 National Squad that won the event held in Jubail, Saudi Arabia. My favourite team is Liverpool, who I have been supporting and watching every week since 2011. "
    },
    { 
      hobby: "Software Projects", 
      icon: "📚",
      description: "I love building unique software experiences",
      details: "My passion for reading extends beyond textbooks. I regularly dive into tech blogs to stay updated with the latest industry trends. I also enjoy exploring scientific literature, particularly in the fields of AI and quantum computing. This habit has broadened my perspective and often inspires new ideas for my projects."
    },
    { 
      hobby: "Traveling", 
      icon: "📷", 
      description: "My dream is to travel the world",
      details: "I love learning new languages and cultures through events, experiences and world travel."
    },
    { 
      hobby: "Video Games", 
      icon: "♟️", 
      description: "I paid for an expensive GPU, I will use it to its limit",
      details: "People buy gaming laptops to play high-end games, but I am playing high-end games because I bought a gaming laptop. We're not the same. But, we do share our love for video games. My childhood was centered around very basic games like FIFA, WWE and Uncharted given limited gaming time, but now that I'm an adult with no one to stop me from playing games, I've decided to explore the world of gaming much deeper from competitive E-sports like Valorant and compelling story-based games like the Metal Gear Series to 'why am I playing this' type RPG games like Elden Ring."
    },
  ];

  return (
    <div className="py-16 bg-gradient-to-r from-primary to-accent">
      <h2 className="text-4xl font-bold text-center text-white mb-10">Hobbies & Interests</h2>
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 px-4">
        {hobbies.map((hobby, index) => (
          <HobbyCard 
            key={index} 
            {...hobby} 
            onClick={() => setExpandedHobby(hobby)} 
          />
        ))}
      </div>
      <AnimatePresence>
        {expandedHobby && (
          <ExpandedCard 
            {...expandedHobby} 
            onClose={() => setExpandedHobby(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Hobbies;