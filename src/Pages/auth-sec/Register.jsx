// import { useState } from 'react';
// import './auth.css';
// import {  useNavigate } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
// import { registerUser } from '../../auth/authSlice.js'; // Change from register to registerUser
// import { useEffect } from 'react';
// import { useSelector } from 'react-redux';

// // Inside your Register component
// const Register = () => {
//   const [formData, setFormData] = useState({
//     username: '',
//     email: '',
//     password: '',
//     confirmPassword: ''
//   });
  
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
  
//   const { error, successMessage } = useSelector((state) => state.auth);

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     // Validate that passwords match
//     if (formData.password !== formData.confirmPassword) {
//       alert('Your password does not match.');
//       return;
//     }

//     try {
//       const { username, email, password } = formData;
//       await dispatch(registerUser({ username, email, password })).unwrap();
      
//       // If registration is successful, redirect
//       setTimeout(() => {
//         navigate('/login');
//       }, 4000);
      
//     } catch (err) {
//       console.error('Registration error:', err);
//     }
//   };

//   // Effect to reset messages on component mount
//   useEffect(() => {
//     if (successMessage) {
//       // Reset success message after 4 seconds
//       const timer = setTimeout(() => {
//         dispatch(resetSuccessMessage()); // Define this action to reset success message
//       }, 4000);
//       return () => clearTimeout(timer);
//     }
//   }, [successMessage, dispatch]);

//   return (
//     <div className='reg-parent'>
//       <div className="register-container">
//         <h2 className="register-title">Register</h2>
//         <form className="register-form" onSubmit={handleSubmit}>
//           {/* Form fields here... */}
//           <div className="form-group">
//             <button type="submit" className="submit-button">Submit</button>
//           </div>
//           {error && <div className="error-msg">{error}</div>}
//           {successMessage && <div className='success-msg'>{successMessage}</div>}
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Register;
// import { useState } from 'react';
// import './auth.css';
// import { Link, useNavigate } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
// import { registerUser } from '../../auth/authSlice'; // Change from register to registerUser

// const Register = () => {
//   const [error, setError] = useState("");
//   const [successMsg, setSuccessMsg] = useState("");
//   const [formData, setFormData] = useState({
//     username: '',
//     email: '',
//     password: '',
//     confirmPassword: ''
//   });

//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Validate that passwords match
//     if (formData.password !== formData.confirmPassword) {
//       alert('Your password does not match.');
//       setFormData({
//         username: '',
//         email: '',
//         password: '',
//         confirmPassword: ''
//       });
//       return; // Stop form submission
//     }

//     try {
//       const { username, email, password } = formData;
//       console.log('Submitting Form Data:', formData);

//       const response = await dispatch(registerUser({ username, email, password })).unwrap();
//       console.log('Response:', response); // Add this line to check the response
      

//       if (response.status === 200) {
//         setSuccessMsg('New user added successfully waiat for admin Aproval. You will now be redirected to the login page.');
//         setFormData({
//           username: '',
//           email: '',
//           password: '',
//           confirmPassword: ''
//         });
//         setTimeout(() => {
//           setSuccessMsg('');
//           navigate("/login");
//         }, 4000);
//       }
//     } catch (err) {
//       setError(err.message || 'Something went wrong. Please try again.');
//       console.error('Registration error:', err);
//     }
//   };

//   return (
//     <div className='reg-parent'>
//       <div className="register-container">
//         <h2 className="register-title">Register</h2>
//         <form className="register-form" onSubmit={handleSubmit}>
//           <div className="form-group">
//             <label className="form-label">Username: </label>
//             <input
//               type="text"
//               name="username"
//               className="form-input"
//               value={formData.username}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <div className="form-group">
//             <label className="form-label">Email: </label>
//             <input
//               type="email"
//               name="email"
//               className="form-input"
//               value={formData.email}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <div className="form-group">
//             <label className="form-label">Password: </label>
//             <input
//               type="password"
//               name="password"
//               className="form-input"
//               value={formData.password}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <div className="form-group">
//             <label className="form-label">Confirm Password: </label>
//             <input
//               type="password"
//               name="confirmPassword"
//               className="form-input"
//               value={formData.confirmPassword}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <div className="link-sec">
//             <p>Already have an account? <Link to="/login" style={{ color: "#de3063" }}>Login</Link></p>
//           </div>
//           <div className="form-group">
//             <button type="submit" className="submit-button">Submit</button>
//           </div>
//           {error && <div className="error-msg">{error}</div>}
//           {successMsg && <div className='success-msg'>{successMsg}</div>}
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Register;

import { useState, useEffect } from 'react';
import './auth.css';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser, resetSuccessMessage } from '../../auth/authSlice';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Access success and error messages from Redux
  const successMsg = useSelector((state) => state.auth.SuccessMsg);
  const errorMsg = useSelector((state) => state.auth.error);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate that passwords match
    if (formData.password !== formData.confirmPassword) {
      alert('Your password does not match.');
      setFormData({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
      });
      return;
    }

    const { username, email, password } = formData;
    dispatch(registerUser({ username, email, password }));
  };

  useEffect(() => {
    if (successMsg) {
      setTimeout(() => {
        dispatch(resetSuccessMessage());
        navigate("/login");
      }, 2000);
    }
  }, [successMsg, dispatch, navigate]);

  return (
    <div className='reg-parent'>
      <div className="register-container">
        <h2 className="register-title">Register</h2>
        <form className="register-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Username: </label>
            <input
              type="text"
              name="username"
              className="form-input"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Email: </label>
            <input
              type="email"
              name="email"
              className="form-input"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Password: </label>
            <input
              type="password"
              name="password"
              className="form-input"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Confirm Password: </label>
            <input
              type="password"
              name="confirmPassword"
              className="form-input"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>
          <div className="link-sec">
            <p>Already have an account? <Link to="/login" style={{ color: "#de3063" }}>Login</Link></p>
          </div>
          <div className="form-group">
            <button type="submit" className="submit-button">Submit</button>
          </div>
          {errorMsg && <div className="error-msg">{errorMsg}</div>}
          {successMsg && <div className='success-msg'>{successMsg}</div>}
        </form>
      </div>
    </div>
  );
};

export default Register;
