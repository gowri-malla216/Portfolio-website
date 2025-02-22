import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Skills from "./components/Skills";
import Home from "./components/Home";
import Projects from "./components/Projects";
import Achievements from "./components/Achievements";
import React, { useState } from "react"
import Timeline from "./components/Timeline";
import Navbar from "./components/Navbar";
import "./App.css"
import Contact from "./components/Contact";

const App = () => {

  return (
    <div className="flex flex-col min-h-screen global-background">
      <main className="flex-grow">
        <Navbar />
        <section id="home" className="section"><Home /></section>
        <section id="skills" className="section"><Skills /></section>
        <section id="education & work" className="section"><Timeline /></section>
        <section id="projects" className="section"><Projects /></section>
        <section id="achievements" className="section"><Achievements /></section>
        <section id="contact" className="section"><Contact /></section>
      </main>
    </div>
  );

};

export default App;


