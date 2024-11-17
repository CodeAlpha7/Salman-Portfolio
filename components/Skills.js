//components/skills.js
import React from 'react';
import { motion } from 'framer-motion';

const SkillCategory = ({ category, skills }) => (
  <motion.div 
    className="bg-white p-4 rounded-lg shadow-md"
    whileHover={{ scale: 1.05 }}
    transition={{ type: "spring", stiffness: 300 }}
  >
    <h3 className="text-xl font-semibold mb-2">{category}</h3>
    <div className="flex flex-wrap gap-2">
      {skills.map((skill, index) => (
        <span key={index} className="bg-secondary text-white px-2 py-1 rounded-full text-sm">
          {skill}
        </span>
      ))}
    </div>
  </motion.div>
);

const Skills = () => {
  const skillCategories = [
    { category: "Languages", skills: ["C", "C++", "C#", "Python", "Go", "JavaScript", "HTML", "CSS", "SQL", "Solidity"] },
    { category: "Frameworks", skills: ["React", "Bootstrap", "Nodejs", "Expressjs", "jQuery", "gRPC", "OpenMP", "MPI", "TensorFlow", "PyTorch", "Web3"] },
    { category: "Environments", skills: ["Git", "Docker", "Kubernetes", "Linux", "Bash", "Shell", "Truffle", "Azure", "AWS", "Unity", "Jira", "Confluence", "Agile"] },
    { category: "Development Tools", skills: ["Wireshark", "Splunk", "Autopsy", "Neo4j", "Postman", "REST API", "PostgreSQL", "MongoDB", "AWS S3"] },
  ];

  return (
    <div className="py-16 bg-gradient-to-r from-accent to-primary">
      <h2 className="text-4xl font-bold text-center text-white mb-10">Skills</h2>
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 px-4">
        {skillCategories.map((cat, index) => (
          <SkillCategory key={index} category={cat.category} skills={cat.skills} />
        ))}
      </div>
    </div>
  );
};

export default Skills;