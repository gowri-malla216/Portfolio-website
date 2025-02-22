import React, { useState, useEffect, useCallback } from "react"
import { ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import LettersAndChars from "../utils/letters-and-chars";
import { Typewriter } from "react-simple-typewriter";

const Home = () => {

    const fullName = " Venkata Muthyala Gowri Malla"
    const prefferedName = " Gowri Malla"
    const proffesionalSummary = "I am a results-driven Software Engineer with expertise in building scalable, high-performance applications using Java, C#, Python, and cloud technologies. With a strong foundation in data structures, algorithms, and full-stack development, I excel at solving complex problems and optimizing systems for efficiency. My passion for innovation and ability to deliver impactful solutions make me a valuable asset to any team."
    const [scrolling, setScrolling] = useState(100);
    useEffect(() => {
        const handleScroll = () => {
            setScrolling(Math.max(0, (500 - window.scrollY) / 5));
        }
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleMouseEnter = (e, finalText) => {
        const name = (e.target).querySelector("#name")
        if (name) shuffleCharaters(name, finalText)
    }

    const handleMouseLeave = (e, initialText) => {
        const name = (e.target).querySelector("#name")
        if (name) shuffleCharaters(name, initialText)
    }

    const shuffleCharaters = (target, finalValue) => {
        if (!target) return

        let count = 0

        const interval = setInterval(() => {
            target.innerHTML = finalValue
                .split("")
                .map((char, index) => {
                    if (index < count) {
                        return finalValue[index]
                    }
                    if (char !== " ") {
                        return LettersAndChars[
                            Math.floor(Math.random() * LettersAndChars.length)
                        ]
                    }

                    return char
                })
                .join("")

            if (count >= finalValue.length) clearInterval(interval)

            count++


        }, 25)
    }

    return (
        <>
            <div className="bg-home">
                <div
                    className="items-center h-screen justify-center"

                >
                    <div
                        className="flex flex-col top-0 bottom-0 left-0 right-0 absolute items-center justify-center text-white"
                        onMouseEnter={(e) => handleMouseEnter(e, fullName)}
                        onMouseLeave={(e) => handleMouseLeave(e, prefferedName)}
                    >
                        <h1 className="text-5xl font-bold">
                            Hello, I'm
                            <span id="name"> Gowri Malla!</span>
                        </h1>
                        <div className="mt-4 h-32">
                            <p className="text-lg text-gray-300 max-w-xl text-justify">
                                <Typewriter
                                    words={[proffesionalSummary]} // Text to type
                                    cursor
                                    cursorStyle=<span style={{ color: "#63D471" }}>_</span>
                                    typeSpeed={15} // Speed of typing
                                    delaySpeed={2000} // Delay before restarting
                                />
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <motion.div
                className="absolute bottom-25 left-1/2 transform -translate-x-1/2 text-white flex flex-col items-center cursor-pointer"
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
            >
                <ChevronDown size={30} className="rounded-2xl" style={{
                    background: 'linear-gradient(135deg, #233329, #63D471)',
                    opacity: `${scrolling}%`
                }} />
            </motion.div>
        </>
    );
};

export default Home;
