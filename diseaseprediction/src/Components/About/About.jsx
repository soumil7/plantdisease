import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about-container">
      <h2>About Our Application</h2>
      <p>Welcome to our AI-powered prediction system that aims to help users detect plant diseases and chimney issues using advanced image processing and machine learning models. Our application offers two main features:</p>

      {/* Plant Disease Prediction Section */}
      <section className="about-section">
        <h3>Plant Disease Prediction</h3>
        <p>Our Plant Disease Prediction tool allows farmers and agricultural enthusiasts to upload images of plants to detect diseases and pests. The tool provides real-time feedback on the possible disease affecting the plant, helping users to take timely action.</p>
        <p>When an image of a diseased plant is uploaded, the system analyzes the image and provides details such as:</p>
        <ul>
          <li><strong>Class</strong>: The type of disease detected (e.g., Corn rust leaf).</li>
          <li><strong>Confidence</strong>: The probability that the disease is present, expressed as a percentage.</li>
          <li><strong>Class ID</strong>: The unique identifier for the detected disease type.</li>
          <li><strong>Detection ID</strong>: The unique identifier for the specific detection event.</li>
          <li><strong>Coordinates (x, y)</strong>: The position of the detected disease within the image.</li>
          <li><strong>Width and Height</strong>: The size of the detection box enclosing the affected area.</li>
        </ul>
        <p><strong>Example Output:</strong></p>
        <table>
          <thead>
            <tr>
              <th>Class</th>
              <th>Confidence</th>
              <th>Class ID</th>
              <th>Detection ID</th>
              <th>Coordinates (x, y)</th>
              <th>Width</th>
              <th>Height</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Corn rust leaf</td>
              <td>55.14%</td>
              <td>9</td>
              <td>d7d8d8f9-ea64-40fe-954f-991c28a9e1a5</td>
              <td>(1601.5, 765)</td>
              <td>2911</td>
              <td>1530</td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* Chimney Detection Section */}
      <section className="about-section">
        <h3>Chimney Detection</h3>
        <p>Our Chimney Detection tool helps identify issues in industrial chimneys, such as cracks or structural damages. Users can upload an image of the chimney, and our system will provide detailed predictions about potential problems, enabling timely maintenance and repairs.</p>
        <p>For each detection, the system provides the following information:</p>
        <ul>
          <li><strong>Class</strong>: The object or issue detected (e.g., chimney).</li>
          <li><strong>Confidence</strong>: The probability that the detection is accurate, expressed as a percentage.</li>
          <li><strong>Coordinates (x, y)</strong>: The location of the detection within the image.</li>
          <li><strong>Width and Height</strong>: The dimensions of the detection box enclosing the chimney or affected area.</li>
          <li><strong>Detection ID</strong>: A unique identifier for the detection event.</li>
        </ul>
        <p><strong>Example Output:</strong></p>
        <table>
          <thead>
            <tr>
              <th>Class</th>
              <th>Confidence</th>
              <th>X</th>
              <th>Y</th>
              <th>Width</th>
              <th>Height</th>
              <th>Detection ID</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Chimney</td>
              <td>49.76%</td>
              <td>288.5</td>
              <td>346</td>
              <td>135</td>
              <td>572</td>
              <td>88020cc0-8656-48e5-a863-96a139582311</td>
            </tr>
          </tbody>
        </table>
      </section>

      <p>We aim to make it easier for both the agricultural and industrial sectors to detect issues early and prevent costly damage. We are constantly improving our models to deliver more accurate and reliable results.</p>
    </div>
  );
};

export default About;
