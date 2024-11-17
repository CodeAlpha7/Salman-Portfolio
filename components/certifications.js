//components/certifications.js
import React from 'react';
import { motion } from 'framer-motion';

const CertCard = ({ title, issuer, date }) => (
  <motion.div 
    className="bg-white p-4 rounded-lg shadow-md flex flex-col justify-between h-full"
    whileHover={{ y: -5 }}
    transition={{ type: "spring", stiffness: 300 }}
  >
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <div>
      <p className="text-gray-600">{issuer}</p>
      <p className="text-sm text-gray-500">{date}</p>
    </div>
  </motion.div>
);

const Certifications = () => {
  const certs = [
    { title: "AWS Solutions Architect", issuer: "Amazon Web Services", date: "2023" },
    { title: "Placeholder Certification 1", issuer: "Issuing Organization", date: "2024" },
    { title: "Placeholder Certification 2", issuer: "Issuing Organization", date: "2024" },
    { title: "Placeholder Certification 3", issuer: "Issuing Organization", date: "2024" },
    { title: "Placeholder Certification 4", issuer: "Issuing Organization", date: "2024" },
    { title: "Placeholder Certification 5", issuer: "Issuing Organization", date: "2024" },
  ];

  return (
    <div className="py-16 bg-gradient-to-r from-secondary to-accent">
      <h2 className="text-4xl font-bold text-center text-white mb-10">Certifications & Courses</h2>
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
        {certs.map((cert, index) => (
          <CertCard key={index} {...cert} />
        ))}
      </div>
    </div>
  );
};

export default Certifications;