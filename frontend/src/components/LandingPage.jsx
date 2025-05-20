import React from 'react';
import { Link } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../assets/logo.png';
import aboutUs from '../assets/About us.jpg';
import Goal1 from '../assets/Goal1.jpeg';
import Goal2 from '../assets/Goal2.jpeg';
import Goal3 from '../assets/Goal3.jpeg';
import '../styles/LandingPage.css';

const LandingPage = () => (
  <div>
    {/* Navigation Bar */}
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <img
            src={logo}
            alt="LegacyEase Logo"
            width="130"
            height="60"
            className="d-inline-block align-text-top"
          />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <ScrollLink className="nav-link" to="about" smooth duration={500}>About Us</ScrollLink>
            </li>
            <li className="nav-item">
              <ScrollLink className="nav-link" to="goals" smooth duration={500}>Goals</ScrollLink>
            </li>
            <li className="nav-item">
              <ScrollLink className="nav-link" to="mission" smooth duration={500}>Mission</ScrollLink>
            </li>
            <li className="nav-item">
              <ScrollLink className="nav-link" to="contact" smooth duration={500}>Contact</ScrollLink>
            </li>
            <li className="nav-item">
              <Link className="btn btn-outline-light me-2 px-4 py-2 landing-btn-hover" to="/login">Login</Link>
            </li>
            <li className="nav-item">
              <Link className="btn btn-success px-4 py-2 landing-btn-hover" to="/register">Register</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    {/* Hero Section */}
    <header className="landing-hero-section text-white text-center d-flex align-items-center justify-content-center">
      <div className="container py-5 position-relative">
        <div className="hero-overlay"></div>
        <h1 className="display-3 fw-bold mb-3">YOUR WISHES MADE SIMPLE</h1>
        <p className="lead mb-4 fs-4">Giving life to your legacy with care, trust, and quality work.</p>
        <div className="d-flex justify-content-center gap-3">
          <Link to="/register" className="btn btn-lg btn-light fw-bold px-5 landing-btn-hover">Get Started</Link>
          <Link to="/login" className="btn btn-lg btn-outline-light fw-bold px-5 landing-btn-hover">Login</Link>
        </div>
      </div>
    </header>

    {/* About Us Section */}
    <section id="about" className="container my-5 py-4">
      <div className="row align-items-center">
        <div className="col-md-6 mb-4 mb-md-0">
          <img src={aboutUs} alt="About Us" className="img-fluid rounded shadow landing-img-hover" />
        </div>
        <div className="col-md-6">
          <h2 className="text-primary fw-bold mb-3">👨‍👩‍👧‍👦 ABOUT US</h2>
          <p>
            Established October 2024, LegacyEase is your gateway to peaceful estate management. We provide a platform where we talk about you with you to give life to your legacy. Our services ensure that your family legacy is protected and preserved for generations to come.
          </p>
          <p>
            We believe that clear and effective communication is essential in any relationship. During the times when our services are required, communication is necessary to give those involved the right support and comfort they need.
          </p>
          <p>
            Our core pillars are <strong>Care, Communication, Trust, and Quality Work</strong>, which define everything we do.
          </p>
        </div>
      </div>
    </section>

    {/* Goals and Objectives Section */}
    <section id="goals" className="bg-light py-5">
      <div className="container">
        <h2 className="text-center text-primary fw-bold mb-4">🎯 GOALS AND OBJECTIVES</h2>
        <div className="row text-center">
          <div className="col-md-4 mb-4">
            <img src={Goal1} alt="Goal 1" className="img-fluid rounded-circle mb-3 landing-img-hover" width="150" />
            <h4>Objective 1</h4>
            <p>To provide a seamless and stress-free estate management experience for our clients and their families.</p>
          </div>
          <div className="col-md-4 mb-4">
            <img src={Goal2} alt="Goal 2" className="img-fluid rounded-circle mb-3 landing-img-hover" width="150" />
            <h4>Objective 2</h4>
            <p>To deliver personalized services tailored to the unique needs of each client with efficiency and care.</p>
          </div>
          <div className="col-md-4 mb-4">
            <img src={Goal3} alt="Goal 3" className="img-fluid rounded-circle mb-3 landing-img-hover" width="150" />
            <h4>Objective 3</h4>
            <p>To empower individuals to protect their assets and secure their family’s future with ease and accessibility.</p>
          </div>
        </div>
      </div>
    </section>

    {/* Mission, Vision, and Values Section */}
    <section id="mission" className="container my-5 py-4">
      <h2 className="text-center text-primary fw-bold mb-4">🌟 MISSION, VISION, AND VALUES</h2>
      <div className="row text-center">
        <div className="col-md-4 mb-3">
          <h4>Mission</h4>
          <p>To simplify estate planning and management, ensuring peace of mind for our clients and their loved ones.</p>
        </div>
        <div className="col-md-4 mb-3">
          <h4>Vision</h4>
          <p>To be the most trusted and innovative estate management service provider, setting the standard for excellence in the industry.</p>
        </div>
        <div className="col-md-4 mb-3">
          <h4>Values</h4>
          <p>We are guided by our core values: Care, Communication, Trust, and Quality Work, which define our commitment to our clients.</p>
        </div>
      </div>
    </section>

    {/* Contact Information Section */}
    <section id="contact" className="bg-light py-5 text-center">
      <h2 className="text-primary fw-bold mb-4">📞 CONTACT US</h2>
      <p><strong>Address:</strong> P O Box 402173, Gaborone, Botswana</p>
      <p><strong>Email:</strong> <a href="mailto:legacyease@gmail.com">legacyease@gmail.com</a></p>
      <p><strong>Cell:</strong> +267 71565927</p>
      <div className="mt-4 d-flex justify-content-center gap-3 flex-wrap">
        <a href="mailto:legacyease@gmail.com" className="btn btn-primary px-4 py-2 landing-btn-hover">Email Us</a>
        <a href="tel:+26771565927" className="btn btn-success px-4 py-2 landing-btn-hover">Call Us</a>
      </div>
    </section>

    {/* Footer */}
    <footer className="bg-primary text-white text-center py-3">
      <p className="mb-0">&copy; {new Date().getFullYear()} LegacyEase. All rights reserved.</p>
    </footer>
  </div>
);

export default LandingPage;