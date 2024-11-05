import './Modal.css'; // Ensure you have modal styles in this file

const Modal = ({ isOpen, onClose, image }) => {
  console.log(image)
  if (!isOpen || !image) return null; // Ensure image is defined

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose} aria-label="Close modal">
          &times;
        </button>
        <h2>{image.title}</h2>
        <p>Upload date: {new Date(image.createdAt).toLocaleDateString()}</p>
        <img
          src={image.image} // Updated to access the image URL properly
          alt={image.title}
          className="modal-image"
          onError={(e) => {
            e.target.onerror = null; // Prevents infinite fallback loop
            e.target.src = 'path/to/placeholder/image.jpg'; // Placeholder image path
          }}
        />
        <p>{image.description}</p>
      </div>
    </div>
  );
};

export default Modal;