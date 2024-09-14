import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home">
      <section className="hero">
        <div className="content">
          <h1>AI-Powered Detection</h1>
          <p>Empowering Agriculture and Industry with Advanced AI Solutions</p>
          <div className="buttons">
            <Link to="/plantdisease">
              <button className="main-button">Plant Disease Prediction</button>
            </Link>
            <Link to="/chimneydetection">
              <button className="main-button">Chimney Detection</button>
            </Link>
          </div>
        </div>
      </section>

      <section className="features">
        <h2>Our AI Solutions</h2>
        <div className="feature-cards">
          <div className="card">
            <h3>Plant Disease Prediction</h3>
            <p>Leverage AI to detect plant diseases early and efficiently.</p>
            <Link to="/plantdisease">
              <button className="secondary-button">Learn More</button>
            </Link>
          </div>
          <div className="card">
            <h3>Chimney Detection</h3>
            <p>Detect structural issues in chimneys to prevent hazards.</p>
            <Link to="/chimneydetection">
              <button className="secondary-button">Learn More</button>
            </Link>
          </div>
        </div>
      </section>

      <section className="about">
        <h2>About Us</h2>
        <p>We provide AI-driven solutions tailored for both agricultural and industrial use cases, enhancing efficiency and safety.</p>
        <Link to="/about">
          <button className="tertiary-button">Discover More</button>
        </Link>
      </section>
    </div>
  );
};

export default Home;
