import React from "react";
import { motion } from "framer-motion";
import "../styles/skills-styles.css"; // Keep existing styles

const programmingSkills = [
  { name: "C#", logo: "/logos/CSharp.svg" },
  { name: "Java", logo: "/logos/Java.svg" },
  { name: "Python", logo: "/logos/Python.svg" },
  { name: "C++", logo: "/logos/CPP.svg" },
  { name: "JavaScript", logo: "/logos/JavaScript.svg" },
  { name: "TypeScript", logo: "/logos/TypeScript.svg" }
];
const databases = [
  { name: "MySQL", logo: "/logos/MySQL.svg" },
  { name: "PostgreSQL", logo: "/logos/PostgresSQL.svg" },
  { name: "MongoDB", logo: "/logos/MongoDB.svg" },
  { name: "Oracle", logo: "/logos/Oracle.svg" },
];

const cloudPlatforms = [
  { name: "AWS", logo: "/logos/AWS.svg" },
  { name: "GCP", logo: "/logos/Google Cloud.svg" },
  { name: "Azure", logo: "/logos/Azure.svg" },
  { name: "Terraform", logo: "/logos/Terraform.svg" },
  { name: "Git", logo: "/logos/Git.svg" },
  { name: "GitHub", logo: "/logos/GitHub.svg" },
  { name: "Docker", logo: "/logos/Docker.svg" },
  { name: "Kubernetes", logo: "/logos/Kubernetes.svg" },
  { name: "Jenkins", logo: "/logos/Jenkins.svg" },
  { name: "Firebase", logo: "/logos/Firebase.svg" },
];

const webSkills = [
  { name: "HTML5", logo: "/logos/HTML5.svg" },
  { name: "CSS3", logo: "/logos/CSS3.svg" },
  { name: "Tailwind CSS", logo: "/logos/Tailwind CSS.svg" },
  { name: "React", logo: "/logos/React.svg" },
];

const framewroks = [
  { name: ".NET", logo: "/logos/NET.svg" },
  { name: ".NET Core", logo: "/logos/NETcore.svg" },
  { name: "Spring", logo: "/logos/Spring.svg" },
  { name: "Angular", logo: "/logos/Angular.svg" },
  { name: "Vite.js", logo: "/logos/Vite.js.svg" },
  { name: "Node.js", logo: "/logos/Node.js.svg" },
]

const editors = [
  { name: "Visual Studio", logo: "/logos/Visual Studio.svg" },
  { name: "Eclipse IDE", logo: "/logos/Eclipse.svg" },
  { name: "IntelliJ Idea", logo: "/logos/IntelliJ.svg" },
  { name: "PyCharm", logo: "/logos/PyCharm.svg" },
  { name: "Jupyter", logo: "/logos/Jupyter.svg" },
  { name: "VS Code", logo: "/logos/VS Code.svg" },
]



const Skills = () => {
  return (
    <>
      <h2 className="text-center text-amber-50 text-4xl font-bold mb-1">Skills<span style={{ color: "#63D471" }}>.</span></h2>
      <p className="text-center text-amber-50 text-l mb-5">A blend of technical expertise and problem-solving abilities that power my work.</p>
      <div className="text-center lg:pt-5">
        <h1 className="mb-5 lg:mb-5 text-2xl font-bold text-amber-50">Programming Languages</h1>
      </div>
      <Tiles skills={programmingSkills}></Tiles>
      <div className="text-center lg:pt-5">
        <h1 className="mb-5 lg:mb-5 text-2xl font-bold text-amber-50">Web Technologies & Libraries</h1>
      </div>
      <Tiles skills={webSkills}></Tiles>
      <div className="text-center lg:pt-5">
        <h1 className="mb-5 lg:mb-5 text-2xl font-bold text-amber-50">Framewroks</h1>
      </div>
      <Tiles skills={framewroks}></Tiles>
      <div className="text-center lg:pt-5">
        <h1 className="mb-5 lg:mb-5 text-2xl font-bold text-amber-50">Databases</h1>
      </div>
      <Tiles skills={databases}></Tiles>
      <div className="text-center lg:pt-5">
        <h1 className="mb-5 lg:mb-5 text-2xl font-bold text-amber-50">Cloud Platforms & DevOps tools</h1>
      </div>
      <Tiles skills={cloudPlatforms}></Tiles>
      <div className="text-center lg:pt-5">
        <h1 className="mb-5 lg:mb-5 text-2xl font-bold text-amber-50">Code Editors</h1>
      </div>
      <Tiles skills={editors}></Tiles>
    </>
  );
};

const Tiles = ({ skills }) => {
  return (
    <div>
      <motion.div
        className="skills-container"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: {
            opacity: 1,
            y: 0,
            transition: { staggerChildren: 0.2 } // Delays each tile slightly
          }
        }}
      >
        {skills.map((skill, index) => (
          <motion.div
            key={index}
            className="skill-card"
            variants={{
              hidden: { opacity: 0, scale: 0.8 },
              visible: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 200 } }
            }}
            whileHover={{ scale: 1.1 }}
          >
            <motion.div
              className="skill-inner"
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <div className="skill-front">
                <img src={skill.logo} alt={skill.name} className="skill-logo" />
              </div>
              <div className="skill-back">
                <h3>{skill.name}</h3>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </div>

  );
}

export default Skills;
