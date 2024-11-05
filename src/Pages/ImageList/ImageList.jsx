import { useState, useEffect, useMemo } from 'react';
import { FaEye, FaTrash, FaEdit } from 'react-icons/fa';
import './ImageList.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPhotoSessions, updatePhotoSession, deletePhotoSession } from '../../redux/photoSessionSlice';
import Modal from './Modal';
import FormModal from '../editform/FormModal';
import React from 'react';

const ImageList = () => {
  const dispatch = useDispatch();
  const { sessions, fetchStatus: status, fetchError: error } = useSelector((state) => state.photoSession);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const totalPages = Math.ceil(sessions.length / itemsPerPage);
  const currentImages = useMemo(() => {
    const indexOfLastImage = currentPage * itemsPerPage;
    const indexOfFirstImage = indexOfLastImage - itemsPerPage;
    return sessions.slice(indexOfFirstImage, indexOfLastImage);
  }, [sessions, currentPage, itemsPerPage]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    dispatch(fetchPhotoSessions());
  }, [dispatch]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
console.log(selectedImage)
  const openModal = (image) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  const openEditForm = (image) => {
    setSelectedImage(image);
    setIsFormOpen(true);
  };

  const closeFormModal = () => {
    setIsFormOpen(false);
    setSelectedImage(null);
  };

  const handleFormSubmit = async (updatedData) => {
    try {
      await dispatch(updatePhotoSession({ id: selectedImage.sessionId, updateData: updatedData }));
      alert('Image updated successfully');
      await dispatch(fetchPhotoSessions());
    } catch (error) {
      console.error("Error updating session:", error);
      alert('Failed to update image. Please try again.');
    } finally {
      closeFormModal();
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this image?')) {
      try {
        await dispatch(deletePhotoSession(id));
        alert('Image deleted successfully');
      } catch (error) {
        alert('Failed to delete image. Please try again.');
      }
    }
  };

  if (status === 'loading') {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  if (sessions.length === 0) {
    return <div>No images available.</div>;
  }

  return (
    <div className="image-list">
      <table className="table-data">
        <thead className="t-head">
          <tr>
            <th>Image</th>
            <th>Title</th>
            <th className="responsive-data">Upload Date</th>
            <th className="responsive-data">Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentImages.map((image) => {
            // const imageUrl = `https://visible-gain-dashboard.onrender.com${image.image}`;
      // console.log(imageUrl)
            return (
              <tr key={image.sessionId}>
                <td>
                  <img
                    src={image.image}
                    // alt={image.title}
                    className="image-thumbnail"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'path/to/placeholder/image.jpg'; // Placeholder path
                    }}
                  />
                </td>
                <td>{image.title}</td>
                <td className="responsive-data">{new Date(image.createdAt).toLocaleDateString()}</td>
                <td className="tabledesc responsive-data">{image.description}</td>
                <td>
                  <button
                    className="icon-button"
                    onClick={() => openModal(image)}
                    aria-label={`View details of ${image.title}`}>
                    <FaEye />
                  </button>
                  <button
                    className="icon-button"
                    onClick={() => openEditForm(image)}
                    aria-label={`Edit ${image.title}`}>
                    <FaEdit />
                  </button>
                  <button
                    className="icon-button"
                    onClick={() => handleDelete(image.sessionId)}
                    aria-label={`Delete ${image.title}`}>
                    <FaTrash />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="pagination">
        <button onClick={() => handlePageChange(1)} disabled={currentPage === 1} aria-label="First page">
          &lt;&lt;
        </button>
        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} aria-label="Previous page">
          &lt;
        </button>

        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={currentPage === index + 1 ? 'active' : ''}
            aria-label={`Page ${index + 1}`}>
            {index + 1}
          </button>
        ))}

        <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} aria-label="Next page">
          &gt;
        </button>
        <button onClick={() => handlePageChange(totalPages)} disabled={currentPage === totalPages} aria-label="Last page">
          &gt;&gt;
        </button>
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal} image={selectedImage} />
      <FormModal isOpen={isFormOpen} onClose={closeFormModal} image={selectedImage} onSubmit={handleFormSubmit} />
    </div>
  );
};

export default React.memo(ImageList);
