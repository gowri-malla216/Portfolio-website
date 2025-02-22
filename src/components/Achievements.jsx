import "../styles/achievements-styles.css";
import React from "react";
import { motion } from "framer-motion";
import { useState } from "react";

// Achievement Data with Categories, Icons & Badges
const achievements = [
  {
    id: 1,
    title: "MultiCloud DevOps & AI Challenge",
    description: "Developed CloudMart, an e-commerce app using MultiCloud, DevOps, AI, and CI/CD best practices.",
    date: " Feb 2025",
    category: "Hackathons & Challenges",
    link: "https://www.linkedin.com/in/gowrimalla/details/certifications/"
  },
  {
    id: 2,
    title: "LeetCode 50 Days Badge 2024",
    description: "Ranked in the top 6.9% of LeetCoders for solving problems consistently for 50+ days.",
    date: "Nov 2024",
    category: "Problem Solving",
    link: "https://leetcode.com/u/gowri_malla/"
  },
  {
    id: 3,
    title: "Foundational C# Certification - Microsoft",
    description: "Earned a foundational-level certification in C# from Microsoft, demonstrating expertise in fundamentals of C# programming.",
    date: "Jul 2024",
    category: "Programming Certifications",
    link: "https://freecodecamp.org/certification/fccb3560eea-9dfa-44ec-98f3-685ffd9b1a10/foundational-c-sharp-with-microsoft"
  },
  {
    id: 4,
    title: "AT&T Technology Academy",
    description: "Gained training in network troubleshooting, 5G strategy, cloud computing, leadership, career development and obtained a credly badge.",
    date: "Jul 2024",
    category: "Professional Development",
    link: "https://www.credly.com/badges/505a79d9-e1e7-4e03-b67f-2f5d6280e7dd/"
  },
  {
    id: 5,
    title: "Deep Learning Foundations - NLP with TensorFlow",
    description: "Completed a foundational deep learning course focused on NLP using TensorFlow.",
    date: "Feb 2024",
    category: "AI & Machine Learning",
    link: "https://www.linkedin.com/learning/certificates/4711339afccc8d076345c42f1c8ab32b6d5d05d80680a2d232ad11160d036f08?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_certifications_details%3B1jTWtkRGRl2i3PjYLkNC4A%3D%3D"
  },
  {
    id: 6,
    title: "Problem Solving (Basic) - HackerRank",
    description: "Earned a problem-solving certificate from HackerRank.",
    date: "Sep 2020",
    category: "Programming Certifications",
    link: "https://www.hackerrank.com/certificates/0392ff8149d3"
  },
  {
    id: 7,
    title: "Solved 200+ Problems on LeetCode",
    description: "Practiced and solved over 200 DSA problems on LeetCode.",
    date: "2023-present",
    category: "Problem Solving",
    link: "https://leetcode.com/u/gowri_malla/"
  },
  {
    id: 8,
    title: "Infosys Certified Software Programmer",
    description: "Earned certification from Infosys upon successfully clearing the InfyTQ exam, demonstrating expertise in Python programming and SQL database management.",
    date: "Jun 2019",
    category: "Programming Certifications",
    link: "https://www.linkedin.com/in/gowrimalla/details/certifications/"
  },
  {
    id: 9,
    title: "5-Star Problem Solving - HackerRank",
    description: "Achieved a 5-star rating in Problem Solving on HackerRank.",
    date: "2018-present",
    category: "Problem Solving",
    link: "https://www.hackerrank.com/profile/gowri_malla"
  }
];

const categories = ["All", ...new Set(achievements.map((item) => item.category))];

const AchievementsFeed = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredAchievements = selectedCategory === "All"
    ? achievements
    : achievements.filter((item) => item.category === selectedCategory);

  return (
    <div className="feed-container">
      <h2 className="text-center text-amber-50 text-4xl font-bold mb-1">Achievements<span style={{ color: "#63D471" }}>.</span></h2>
      <p className="text-center text-amber-50 text-l mb-5">Milestones that define my dedication, expertise, and contributions to the field.</p>

      <div className="category-buttons mb-3">
        {categories.map((category, index) => (
          <button
            key={index}
            className={`category-btn ${selectedCategory === category ? "active" : ""}`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <motion.div
        key={selectedCategory} // Forces animation on category change
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {filteredAchievements.map((item, index) => (
          <motion.a
            key={item.id}
            className="feed-card duration-300 hover:scale-105"
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            viewport={{ once: true, amount: 0.2 }}
          >
            <h3 className="text-xl font-bold">
              {item.title}
            </h3>
            <p className="text-gray-300">{item.description}</p>
            <div className="feed-footer">
              <span className="text-gray-400">{item.date}</span>
            </div>
          </motion.a>
        ))}
      </motion.div>
    </div>
  );
};

export default AchievementsFeed;
