import { useRef } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import "../App.css";
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import Logout from "./Logout";

function Navbar() {
    const navRef = useRef();
    const token = localStorage.getItem('token');
    const storedEmail = localStorage.getItem('email');

    const showNavbar = () => {
        navRef.current.classList.toggle("responsive_nav");
        if (typeof document !== 'undefined') {
            document.body.classList.toggle("nav-open");
        }
    };
    return (
        <Router>
            <header id="navbar">
                <div>
                    <h3>SPORT<span id="text-orange">NER</span></h3>
                </div>
                <nav id='links' ref={navRef}>
                    <div className="links">
                        <a href="/">Accueil</a>
                        <a href="/#">évenements</a>
                        <a href="/#">Sports</a>
                        {token && storedEmail ? <a href="/account">Mon profil</a> : <a href="/login">Connexion</a>}
                        {token && storedEmail ? <Logout/> : null }
                    </div>
                    <button
                        className="nav-btn nav-close-btn"
                        onClick={showNavbar}
                    >
                        <FaTimes />
                    </button>
                </nav>
                <button className="nav-btn" onClick={showNavbar}>
                    <FaBars />
                </button>
            </header>
        </Router>

    );
}

export default Navbar;
