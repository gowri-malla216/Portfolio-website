import React, { useState } from "react";
import "../styles/contact-styles.css"
import { AiFillLinkedin } from "react-icons/ai";
import { AiTwotoneMail } from "react-icons/ai";
import { FaLocationDot } from "react-icons/fa6";
import { AiFillGithub } from "react-icons/ai";
import { SiLeetcode } from "react-icons/si";
import { FaHackerrank } from "react-icons/fa6";
import { AiFillProfile } from "react-icons/ai";
import ServiceParams from "../utils/email-service-params";
import emailjs from "@emailjs/browser";

const Contact = () => {
    const [formData, setFormData] = useState({
        from_name: "",
        reply_to: "",
        message: "",
    });
    const [errors, setErrors] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState("");

    const validateForm = () => {
        let newErrors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!formData.from_name.trim()) {
            newErrors.from_name = "Name is required";
        }

        if (!emailRegex.test(formData.reply_to)) {
            newErrors.reply_to = "Invalid email format";
        }

        if (formData.message.length < 10 || formData.message.length > 50000) {
            newErrors.message = "Message should be between 10 and 50,000 characters";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        emailjs
            .send(
                ServiceParams.SERVICE_ID,
                ServiceParams.TEMPLATE_ID,
                formData,
                ServiceParams.PUBLIC_KEY,
            )
            .then(
                () => {
                    setModalMessage("Message sent successfully!");
                    setIsModalOpen(true);
                    setFormData({ from_name: "", reply_to: "", message: "" });
                },
                (error) => {
                    setModalMessage("Failed to send message. Please try again.");
                    setIsModalOpen(true);
                    console.error(error);
                }
            );
    };
    return (

        <div id="contact" className='contact-section'>
            <h2 className="text-center text-amber-50 text-4xl font-bold mb-40 -mt-7">Get in touch<span style={{ color: "#63D471" }}>.</span></h2>
            <div className="contact-container">
                {/* Left Side - Contact Info with Vertical Line */}
                <div className="contact-info">
                    <div className="vertical-line"></div> {/* Vertical Line */}
                    <div className="contact-details py-3">
                        <h2 className=" text-amber-50 text-2xl font-bold">Contact <span className="highlight">Me.</span></h2>
                        <br />
                        <div className="flex flex-row">
                            <a className="text-4xl mr-2" href="mailto:gowri.malla123@gmail.com" target="_blank"><AiTwotoneMail /></a>
                            <a className="text-4xl mr-2" href="https://www.linkedin.com/in/gowrimalla/" target="_blank"><AiFillLinkedin /></a>
                            <a className="text-4xl mr-2" href="https://github.com/gowri-malla216/" target="_blank"><AiFillGithub /></a>
                            <a className="text-4xl mr-2" href="https://leetcode.com/u/gowri_malla/" target="_blank"><SiLeetcode /></a>
                            <a className="text-4xl mr-2" href="https://www.hackerrank.com/profile/gowri_malla" target="_blank"><FaHackerrank /></a>
                        </div>
                        <br />
                        <div >
                            <a className="flex flex-row text-4xl" href="https://drive.google.com/file/d/1aG5-LU6xKFkvyhMm4UnVNIPYvsZH_DrB/view?usp=sharing" target="_blank">
                                <AiFillProfile />
                                <h2 className=" text-amber-50 text-xl ml-2 font-bold"> My Resume</h2>
                            </a>
                        </div>
                        <br />
                        <div>
                            <a className="flex flex-row text-4xl" href="https://maps.app.goo.gl/gfSyogpdiuNDgKby9" target="_blank">
                                <FaLocationDot />
                                <h2 className="flex-row text-amber-50 text-xl font-bold"> Fairfax, VA 22031, USA</h2>
                            </a>
                        </div>
                    </div>
                </div>

                {/* Right Side - Contact Form with Corner Borders */}
                <div className="contact-form" onSubmit={handleSubmit}>
                    <div className="corner-border top-left -m-5"></div>
                    <div className="corner-border top-right -m-5"></div>
                    <form>
                        <label>Your Name</label>
                        <input type="text" name="from_name" placeholder="Please share your name" value={formData.from_name} onChange={handleChange} required />
                        {errors.from_name && <p className="error">{errors.from_name}</p>}

                        <label>Your Email</label>
                        <input type="email" name="reply_to" placeholder="Where can I reach you?" value={formData.reply_to} onChange={handleChange} required />
                        {errors.reply_to && <p className="error">{errors.reply_to}</p>}
                        <label>Your Message</label>
                        <textarea name="message" placeholder="I look forward to hearing your thougts..." value={formData.message} onChange={handleChange} required></textarea>

                        {errors.message && <p className="error">{errors.message}</p>}
                        <button type="submit">Let's Connect</button>
                    </form>
                    <div className="corner-border bottom-left -m-5"></div>
                    <div className="corner-border bottom-right -m-5"></div>
                </div>
            </div>
            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal">
                        <div className="modal-content">
                            <p>{modalMessage}</p>
                            <button onClick={() => setIsModalOpen(false)}>OK</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Contact;
