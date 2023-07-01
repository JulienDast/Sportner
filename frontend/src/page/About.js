import React from 'react';
import '../styles/About.css';
import Contact from '../components/Contact';

const About = () => {
    return (
        <div className="about-cards">
            <div className="about-title"><h1>Bienvenue sur Sport<span id='text-orange'>ner</span>, notre site dédié à la recherche de partenaires sportifs !</h1></div>
            <div className="about-description">
                <p>Chez Sport<span id='text-orange'>ner</span>, nous sommes une communauté de sportifs <span id='text-orange'>passionnés.</span></p>
                <p>Nous savons combien il peut parfois être frustrant de <span id='text-orange'>pratiquer</span> son <span id='text-orange'>sport</span> favori seul, et à quel point cela peut influencer sur notre <span id='text-orange'>motivation</span> au quotidien.  </p>
                <p>Notre site vous permet simplement de poster vos prochaines sessions <span id='text-orange'>sportives</span> à la localisation de votre choix, et ainsi de pouvoir faire de votre <span id='text-orange'>session</span> solitaire un moment entre <span id='text-orange'>sportifs passionnés</span>.</p>
            </div>
            <div className="about-img"></div>
            <div className="about-contact"><Contact /></div>
        </div>
    );
};

export default About;
