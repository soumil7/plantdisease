import React, { useState } from "react";
import axios from "axios";
import './ChimneyDetection.css';

const ChimneyDetection = () => {
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [imagePreview, setImagePreview] = useState(""); // State for image preview
  const [predictions, setPredictions] = useState([]);
  const [error, setError] = useState("");

  // Handle image upload and preview
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImageFile(file);
      setImageUrl(""); // Clear URL if image file is uploaded
      const previewUrl = URL.createObjectURL(file); // Create a preview URL for the image
      setImagePreview(previewUrl); // Set the preview URL to display
    }
  };

  // Handle URL input
  const handleUrlChange = (event) => {
    const url = event.target.value;
    setImageUrl(url);
    setImageFile(null); // Clear file if URL is used
    setImagePreview(url); // Display the image URL as preview
  };

  // Convert image to base64 for sending to API
  const loadImageBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  // Handle the detection process
  const handleDetection = async () => {
    try {
      let imageData;

      if (imageFile) {
        // Convert local image to base64
        imageData = await loadImageBase64(imageFile);
      } else if (imageUrl) {
        // If using URL, send it directly to the API
        imageData = imageUrl;
      } else {
        setError("Please upload an image or provide a URL.");
        return;
      }

      const response = await axios({
        method: "POST",
        url: "https://detect.roboflow.com/chimney-hdgkj/1",
        params: {
          api_key: "WbyjmmmeHP32nko1xPIs",
        },
        data: imageFile ? imageData : { image: imageUrl },
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      setPredictions(response.data.predictions); // Set predictions data
      setError(""); // Clear error
    } catch (error) {
      console.error("Error:", error.message);
      setError("Error in processing the image. Try again.");
    }
  };

  return (
    <div className="chimney-detection-container">
      <h2>Chimney Detection</h2>

      {/* Image Upload */}
      <label>Upload Image: </label>
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      <br />

      {/* URL Input */}
      <label>Or Paste Image URL: </label>
      <input
        type="text"
        value={imageUrl}
        onChange={handleUrlChange}
        placeholder="Paste image URL here"
      />
      <br />

      {/* Image Preview */}
      {imagePreview && (
        <div className="image-preview">
          <h3>Image Preview:</h3>
          <img src={imagePreview} alt="Selected" width="400" />
        </div>
      )}

      {/* Detect Button */}
      <button className="class-button" onClick={handleDetection}>
        Detect Chimney
      </button>

      {/* Display Error */}
      {error && <p>{error}</p>}

      {/* Display Predictions in Table */}
      {predictions.length > 0 && (
        <div>
          <h3>Prediction Result:</h3>
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
              {predictions.map((prediction, index) => (
                <tr key={index}>
                  <td>{prediction.class}</td>
                  <td>{(prediction.confidence * 100).toFixed(2)}%</td> {/* Convert confidence to percentage */}
                  <td>{prediction.x}</td>
                  <td>{prediction.y}</td>
                  <td>{prediction.width}</td>
                  <td>{prediction.height}</td>
                  <td>{prediction.detection_id}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ChimneyDetection;
