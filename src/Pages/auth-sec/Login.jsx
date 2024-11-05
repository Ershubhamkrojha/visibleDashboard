import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../auth/authSlice.js';
import { Link, useNavigate } from 'react-router-dom';
import './auth.css';

const Login = ({ setActiveModule }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [localError, setLocalError] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, isAuthenticated } = useSelector((state) => state.auth);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError('');
    
    // Dispatch login action
    const response = await dispatch(loginUser({ email, password }));
    if (response.payload && response.payload.token) {
      setActiveModule('Home'); // Set active module for navigation
    } else {
      setLocalError('Login failed. Please try again.');
    }
  };

  // Monitor isAuthenticated for successful login
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/home'); // Redirect to Home after login success
    }
  }, [isAuthenticated, navigate]);

  // Display error messages from Redux store
  useEffect(() => {
    if (error) {
      setLocalError(error);
    }
  }, [error]);

  return (
    <div className='reg-parent'>
      <div className="register-container">
        <h2 className="register-title">Login</h2>
        <form className="register-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Email: </label>
            <input 
              type="email" 
              className="form-input"
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </div>
          <div className="form-group">
            <label className="form-label">Password: </label>
            <input 
              type="password" 
              className="form-input"
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
          </div>
          <div className="link-sec">
            <p>Don't have an account? <Link to="/register" style={{ color: "#de3063" }}>Register</Link></p>
          </div>
          <div className="form-group">
            <button type="submit" className="submit-button" disabled={loading || isAuthenticated}>
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </div>
        </form>

        {localError && <span className="error-message">{localError}</span>}
      </div>
    </div>
  );
};

export default Login;
