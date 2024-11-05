import React, { useState, useEffect } from 'react';
import './FormModel.css';

const FormModal = ({ isOpen, onClose, image, onSubmit, status, error, successMessage }) => {
  const [previewImage, setPreviewImage] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showMessage, setShowMessage] = useState('');

  useEffect(() => {
    // Update the state when the image prop changes
    if (image) {
      setPreviewImage(image.image);
      setTitle(image.title || '');
      setDescription(image.description || '');
    } else {
      // Reset state if no image is provided
      setPreviewImage('');
      setTitle('');
      setDescription('');
    }
  }, [image]);

  useEffect(() => {
    // Handle submission status messages
    if (status === 'succeeded' || status === 'failed') {
      setIsLoading(false); // Stop loading
      setShowMessage(status === 'succeeded' ? successMessage : error);
      const timer = setTimeout(() => {
        setShowMessage('');
      }, 3000); // Clear message after 3 seconds

      return () => clearTimeout(timer); // Cleanup timer on unmount
    }
  }, [status, successMessage, error]);

  if (!isOpen) return null;

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true); // Start loading
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('image', event.target.imageUpload.files[0]);

    onSubmit(formData); // Pass FormData to the submit handler
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result); // Set the preview image
      };
      reader.readAsDataURL(file); // Convert the image to a base64 string
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h2 className="modal-header">Edit Image Data</h2>
        {isLoading && <p className="loading-message">Uploading...</p>}
        {showMessage && (
          <p className={status === 'succeeded' ? 'success' : 'error'}>
            {showMessage}
          </p>
        )}
        <form onSubmit={handleSubmit} className="modal-form">
          <div className="modal-image-preview">
            {previewImage && <img src={previewImage} alt="Preview" className="new-image-preview" />}
          </div>
          <div className="modal-form-group">
            <label htmlFor="imageUpload" className="modal-label">Upload New Image</label>
            <input
              type="file"
              id="imageUpload"
              className="modal-file-input"
              onChange={handleImageUpload}
              accept="image/*"
              required // Make this required if necessary
            />
          </div>
          <div className="modal-form-group">
            <label htmlFor="title" className="modal-label">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="modal-input"
              required
            />
          </div>
          <div className="modal-form-group">
            <label htmlFor="description" className="modal-label">Description</label>
            <textarea
              id="description"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="modal-textarea"
              required
            />
          </div>
          <button type="submit" className="modal-submit-button">Save Changes</button>
          <button type="button" className="modal-close-button" onClick={onClose}>Close</button>
        </form>
      </div>
    </div>
  );
};

export default React.memo(FormModal);
