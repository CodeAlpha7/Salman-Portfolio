import React from 'react';
import { motion } from 'framer-motion';

const CourseList = ({ courses }) => (
  <div className="grid grid-cols-3 gap-4">
    {courses.map((column, idx) => (
      <ul key={idx} className="list-disc list-inside">
        {column.map((course, index) => (
          <li key={index}>{course}</li>
        ))}
      </ul>
    ))}
  </div>
);

const EducationCard = ({ university, degree, specialization, location, graduationDate, courses }) => (
  <motion.div 
    className="bg-white text-primary p-6 rounded-lg shadow-lg mb-8"
    initial={{ y: 50, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ duration: 0.5 }}
  >
    <div className="flex justify-between mb-4">
      <div>
        <h3 className="text-2xl font-semibold">{university}</h3>
        <p className="text-xl">{degree}</p>
        <p className="italic">{specialization}</p>
      </div>
      <div className="text-right">
        <p>{location}</p>
        <p>{graduationDate}</p>
      </div>
    </div>
    <div>
      <h4 className="font-semibold text-center mb-2">Key Courses:</h4>
      <CourseList courses={courses} />
    </div>
  </motion.div>
);

const Education = () => {
  const gradCourses = [
    ['Advanced Operating Systems', 'Systems for Machine Learning', 'Distributed Computing', 'Cloud Infrastructure'],
    ['Deep Learning', 'Computer Architecture', 'Algorithms/Data Structures', 'Cryptography'],
    ['Database Management', 'Networking', 'Course 11', 'Course 12']
  ];

  const undergradCourses = [
    ['Placeholder 1', 'Placeholder 2', 'Placeholder 3', 'Placeholder 4', 'Placeholder 5'],
    ['Placeholder 6', 'Placeholder 7', 'Placeholder 8', 'Placeholder 9', 'Placeholder 10'],
    ['Placeholder 11', 'Placeholder 12', 'Placeholder 13', 'Placeholder 14', 'Placeholder 15']
  ];

  return (
    <div className="py-16 bg-gradient-to-r from-primary to-secondary text-white">
      <h2 className="text-4xl font-bold text-center mb-10">Education</h2>
      <div className="max-w-4xl mx-auto">
        <EducationCard 
          university="Georgia Institute of Technology"
          degree="Master of Science (MS) in Computer Science"
          specialization="Specialization: Computing Systems"
          location="Atlanta, GA, USA"
          graduationDate="Expected: May 2025"
          courses={gradCourses}
        />
        <EducationCard 
          university="Netaji Subhas University of Technology"
          degree="Bachelor of Technology (B.Tech) in Information Technology"
          specialization="Specialization: Network Computing and Security"
          location="New Delhi, India"
          graduationDate="May 2023"
          courses={undergradCourses}
        />
      </div>
    </div>
  );
};

export default Education;