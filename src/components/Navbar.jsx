import React, { useState, useEffect } from "react";
import { Link } from "react-scroll";
import "../styles/nav-styles.css"
import "/gm.png"
import { Menu, X } from "lucide-react";


const Navbar = () => {
    const [scrolling, setScrolling] = useState(0);
    const sections = ["Home", "Skills", "Education & Work", "Projects", "Achievements", "Contact"];
    const [activeSection, setActiveSection] = useState("Home");
    const [progress, setProgress] = useState({})
    const [isOpen, setIsOpen] = useState(false);

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    const handleCloseMenu = () => {
        setIsOpen(false);
    };

    useEffect(() => {
        const handleScroll = () => {
            setScrolling(Math.max(0, window.scrollY - 500));
            const newProgress = {};
            sections.forEach((section) => {
                const sectionElement = document.getElementById(section.toLowerCase());
                if (sectionElement) {
                    const rect = sectionElement.getBoundingClientRect();
                    const sectionHeight = sectionElement.offsetHeight;

                    const scrollProgress = Math.min(100, Math.max(0, (window.innerHeight - rect.top) / sectionHeight * 100));

                    newProgress[section] = scrollProgress;

                    if (rect.top <= window.innerHeight && rect.bottom >= 0) {
                        setActiveSection(section);
                    }
                }
            });
            setProgress(newProgress);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav
            className="fixed flex-row top-0 w-full px-6 py-4 transition-all z-50 duration-300 backdrop-blur-lg"
            style={{
                opacity: `${Math.min(100, scrolling / 3)}%`
            }}
        >

            <h1 className="float-left py-2 md:ml-2 font-bold text-xl preferred-name-color w-50">Gowri Malla</h1>

            {/* Mobile Menu Button */}
            <button className="md:hidden float-right py-2" onClick={handleToggle}>
                {isOpen ? <X size={28} color="#63D471" /> : <Menu size={28} color="#63D471" />}
            </button>

            <ul className={`md:flex justify-center absolute md:relative md:space-x-6 bg-transparent text-lg text-white`}>
                {/* > */}
                {sections.map((section) => (
                    <li key={section} className={`relative cursor-pointer hover:scale-110 md:bg-transparent ${isOpen ? "menu-items-show" : "menu-items-hide"} md:flex-row text-center`}>
                        <Link
                            to={section.toLowerCase()}
                            smooth={true}
                            duration={500}
                            className={`px-4 py-2 rounded-md transition ${activeSection === section ? "activate-section" : "disabled-section"
                                }`}
                            onClick={handleCloseMenu}
                        >
                            {section}
                        </Link>
                        <div
                            className="absolute bottom-0 left-0 h-1 progress-line transition-all"
                            style={{
                                width: `${progress[section] || 0}%`
                            }}
                        ></div>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Navbar;
