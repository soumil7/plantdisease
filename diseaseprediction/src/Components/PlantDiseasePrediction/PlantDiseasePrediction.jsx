import React, { useState } from 'react';
import './PlantDiseasePrediction.css'
import axios from 'axios';

const PlantDiseasePrediction = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [imagePreviewUrl, setImagePreviewUrl] = useState('');
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState(null);

  // Convert image to base64 for sending to API
  const loadImageBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  // Handle file input
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setImagePreviewUrl(URL.createObjectURL(file)); // Display image preview
      try {
        const imageBase64 = await loadImageBase64(file);
        sendImageToApi(imageBase64);
      } catch (error) {
        console.log(error);
        setError('Error loading image');
      }
    }
  };

  // Handle URL input
  const handleUrlChange = (e) => {
    setImageUrl(e.target.value);
  };

  const handleUrlSubmit = () => {
    if (imageUrl) {
      setImagePreviewUrl(imageUrl); // Display image preview from URL
      sendImageToApi(imageUrl);
    }
  };

  // Send image or URL to RoboFlow API
  const sendImageToApi = (imageData) => {
    setError(null);
    axios({
      method: 'POST',
      url: 'https://detect.roboflow.com/plant-disease-detection-v2-2nclk/1',
      params: {
        api_key: 'WbyjmmmeHP32nko1xPIs'
      },
      data: imageData,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
      .then((response) => {
        console.log(response.data);
        setPrediction(response.data);
      })
      .catch((error) => {
        console.log(error);
        setError('Error predicting plant disease');
      });
  };

  return (
    <div className="plant-disease-prediction-container">
      <h2>Plant Disease Prediction</h2>
      
      {/* Image Upload Section */}
      <label>Upload Image:</label>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <br />
      
      {/* URL Input Section */}
      <label>Or Paste Image URL:</label>
      <input
          type="text"
          value={imageUrl}
          onChange={handleUrlChange}
          placeholder="Paste image URL"
      />
      <button onClick={handleUrlSubmit}>Predict from URL</button>
      <br />

      {/* Display Image Preview */}
      {imagePreviewUrl && (
        <div className="image-preview">
          <h3>Uploaded Image Preview:</h3>
          <img src={imagePreviewUrl} alt="Preview" style={{ width: '300px', height: 'auto' }} />
        </div>
      )}

      {/* Display Prediction */}
      {prediction && (
        <div>
          <h3>Prediction Result:</h3>

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
              {prediction.predictions && prediction.predictions.length > 0 ? (
                prediction.predictions.map((item, index) => (
                  <tr key={index}>
                    <td>{item.class}</td>
                    <td>{(item.confidence * 100).toFixed(2)}%</td>
                    <td>{item.class_id}</td>
                    <td>{item.detection_id}</td>
                    <td>{`(${item.x}, ${item.y})`}</td>
                    <td>{item.width}</td>
                    <td>{item.height}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7">No predictions found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Display Error */}
      {error && <p>{error}</p>}
    </div>
  );
};

export default PlantDiseasePrediction;
