import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createPhotoSession, clearSuccessMessage } from '../../redux/photoSessionSlice.js';
import './Uploadform.css';

const UploadForm = () => {
    const dispatch = useDispatch();
    const { status, error, successMessage } = useSelector((state) => state.photoSession);

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);
    const [imageName, setImageName] = useState('');

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setImageName(file.name);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('image', image);

        const response = await dispatch(createPhotoSession(formData));
        if (response.meta.requestStatus === 'fulfilled') {
            // Clear form fields after successful upload
            setTitle('');
            setDescription('');
            setImage(null);
            setImageName('');
        }
    };

    useEffect(() => {
        if (status === 'succeeded' || status === 'failed') {
            const timer = setTimeout(() => {
                dispatch(clearSuccessMessage());
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [status, dispatch]);

    return (
        <div className="upload-form">
            <div className="form-section">
                <h2>Upload Form</h2>
                {status === 'loading' && <p className="loading">Uploading...</p>}
                {status === 'succeeded' && successMessage && <p className="success">{successMessage}</p>}
                {status === 'failed' && error && <p className="error">{error}</p>}
                
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="title">Title:</label>
                        <input
                            type="text"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="description">Description:</label>
                        <textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="image">Upload Image:</label>
                        <input
                            type="file"
                            id="image"
                            accept="image/*"
                            onChange={handleImageChange}
                            required
                        />
                    </div>
                    <button type="submit" disabled={status === 'loading'}>Submit</button>
                </form>
            </div>

            <div className="preview-section">
                {image && (
                    <div className="image-preview">
                        <h3>Image Preview:</h3>
                        <img src={URL.createObjectURL(image)} alt={imageName} className="preview-image" />
                        <p>{imageName}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UploadForm;
