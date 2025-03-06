import React from "react";
import { VerticalTimeline, VerticalTimelineElement } from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";

const experiences = [
  { id: 1, backgroundStyle: ['#730D28', '#F2A516'], imgPath: '/logos/archkey-logo.png', date: "2023 - present", title: "Software Developer", company: "Archkey Solutions", responsibilities: ['C\#', 'ASP.NET Core', 'TypeScript', 'React', 'Angular', 'SQL', 'Docker', 'Kubernetes', 'Jenkins'] },
  { id: 2, backgroundStyle: ['#025939', '#F2C335'], imgPath: '/logos/gmu-logo.png', date: "2022 - 2024", title: "Master's in Computer Science", company: "George Mason University", responsibilities: ["Operating Systems", "Software Design and Architecture", "Software Design Patterns", "Data Mining", "Machine Learning", "Artificial Intelligence", "MapReduce", "Natural Language Processing",] },
  { id: 3, backgroundStyle: ['#54BF50', '#F2F2F2'], imgPath: '/logos/ncr-lg.png', date: "2020 - 2022", title: "Software Engineer", company: "NCR Voyix", responsibilities: ["C#", "Java", 'Spring', 'ASP.NET core MVC', 'Entity Core', 'ReactJS', 'TypeScript', 'AngularJS', 'MySQL', 'AWS', 'Jenkins', 'Docker', 'Kubernetes',] },
  { id: 4, backgroundStyle: ['#0F5AF2', '#F2F2F2'], imgPath: '/logos/gvpcoe_logo.png', date: "2016 - 2020", title: "Bachelor's in Computer Science Engineering", company: "GVP College of Engineering", responsibilities: ['C', 'Java', 'HTML/CSS', 'JavaScript', 'Python', 'Software Engineering', "Data Structures and Algorithms", 'Computer Networks'] },
];

const Timeline = () => {
  return (
    <div id="timeline">
      <h2 className="text-center text-amber-50 text-3xl font-bold mb-1">Education and Professional Excperiences<span style={{ color: "#63D471" }}>.</span></h2>
      <p className="text-center text-amber-50 text-l mb-5">A continuous pursuit of excellence through learning and experience</p>
      <VerticalTimeline>
        {experiences.map((exp) => (
          <VerticalTimelineElement
            className="vertical-timeline-element--work mt-5 duration-300 hover:scale-105"
            contentStyle={{ background: `linear-gradient(45deg, ${exp.backgroundStyle[0]}, ${exp.backgroundStyle[1]})`, boxShadow: '0px 0px 15px rgba(0, 255, 102, 0.3)' }}
            contentArrowStyle={{ borderRight: `7px solid  ${exp.backgroundStyle[1]}` }}
            iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
            icon=<img className="rounded-4xl" src={exp.imgPath}></img>
          >
            <h3 className="vertical-timeline-element-title text-2xl">{exp.title}</h3>
            <h4 className="vertical-timeline-element-subtitle text-xl">{exp.company}</h4>
            <div className="bottom-0 mt-5">
              {exp.responsibilities && exp.responsibilities.map((item, index) => (
                <span className="inline-block px-3 py-1 text-sm text-white bg-black/50 rounded-full bottom-0 mb-0.5 mr-0.5">
                  {item}
                </span>
              )
              )}
            </div>
            <h2 className="vertical-timeline-element-date" style={{ color: 'white', opacity: 100 }}>{exp.date}</h2>
          </VerticalTimelineElement>
        ))}
      </VerticalTimeline>
    </div>
  );
};

export default Timeline;
