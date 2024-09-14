import React, { useState } from "react";
import axios from "axios";
import "./CrackDetection.css";

const CrackDetection = () => {
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [predictions, setPredictions] = useState([]);
  const [error, setError] = useState("");
  const [markedImage, setMarkedImage] = useState(""); // For displaying the image with bounding boxes

  // Handle image upload and preview
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImageFile(file);
      setImageUrl("");
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  // Handle URL input
  const handleUrlChange = (event) => {
    const url = event.target.value;
    setImageUrl(url);
    setImageFile(null);
    setImagePreview(url);
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

  // Handle detection process
  const handleDetection = async () => {
    try {
      let imageData;

      if (imageFile) {
        imageData = await loadImageBase64(imageFile);
      } else if (imageUrl) {
        imageData = imageUrl;
      } else {
        setError("Please upload an image or provide a URL.");
        return;
      }

      const response = await axios({
        method: "POST",
        url: "https://detect.roboflow.com/crack-detection-2yvpp/4",
        params: {
          api_key: "WbyjmmmeHP32nko1xPIs",
        },
        data: imageFile ? imageData : { image: imageUrl },
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      const predictionResults = response.data.predictions;
      setPredictions(predictionResults);

      // Draw bounding boxes on the image and generate a new image
      if (imagePreview && predictionResults.length > 0) {
        drawBoundingBoxes(predictionResults);
      }

      setError(""); // Clear error
    } catch (error) {
      console.error("Error:", error.message);
      setError("Error in processing the image. Try again.");
    }
  };

  // Draw bounding boxes on the image using Canvas
  const drawBoundingBoxes = (predictions) => {
    const img = new Image();
    img.src = imagePreview;
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);

      predictions.forEach((prediction) => {
        const { x, y, width, height, class: className } = prediction;

        // Draw bounding box
        ctx.strokeStyle = "#FF0000";
        ctx.lineWidth = 3;
        ctx.strokeRect(x - width / 2, y - height / 2, width, height);

        // Add label
        ctx.fillStyle = "#FF0000";
        ctx.font = "18px Arial";
        ctx.fillText(className, x - width / 2, y - height / 2 - 5);
      });

      const markedImageUrl = canvas.toDataURL();
      setMarkedImage(markedImageUrl); // Set the marked image URL
    };
  };

  return (
    <div className="crack-detection-container">
      <h2>Crack Detection</h2>

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
        Detect Crack
      </button>

      {/* Display Error */}
      {error && <p>{error}</p>}

      {/* Display Marked Image */}
      {markedImage && (
        <div className="marked-image">
          <h3>Detected Image with Crack Marked:</h3>
          <img src={markedImage} alt="Marked Crack" width="400" />
        </div>
      )}

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
              </tr>
            </thead>
            <tbody>
              {predictions.map((prediction, index) => (
                <tr key={index}>
                  <td>{prediction.class}</td>
                  <td>{(prediction.confidence * 100).toFixed(2)}%</td>
                  <td>{prediction.x}</td>
                  <td>{prediction.y}</td>
                  <td>{prediction.width}</td>
                  <td>{prediction.height}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CrackDetection;
