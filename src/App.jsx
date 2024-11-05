import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from './auth/authSlice';
import axios from 'axios';
import './App.css';

import Topbar from './component/topbar/Topbar';
import Sidebar from './component/sidebar/Sidebar';
import UserList from './Pages/UserList/UserList';
import ImageList from './Pages/ImageList/ImageList';
import UploadForm from './Pages/UploadImage/Uploadform';
import Dashboard from './Pages/dashbord/Dashboard';
import Login from './Pages/auth-sec/Login';
import Register from './Pages/auth-sec/Register';

function App() {
  const dispatch = useDispatch();
  const [activeModule, setActiveModule] = useState('Login');
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const handleToggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    dispatch(logoutUser());
    setActiveModule('');
  };

  const renderModule = () => {
    switch (activeModule) {
      case 'Home':
        return <Dashboard />;
      case 'Users':
        return <UserList />;
      case 'Add Image':
        return <UploadForm />;
      case 'Watch Image':
        return <ImageList />;
      case 'Logout':
        handleLogout();
        return <Navigate to="/login" replace />;
      default:
        return <Login />;
    }
  };

  useEffect(() => {
    const checkUserSession = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error("No token found, user may not be authenticated.");
        dispatch(logoutUser());
        return;
      }

      try {
        const userId = user?.userId || user?.user?.userId;
        if (!userId) {
          console.error("User ID is not defined.");
          dispatch(logoutUser());
          return;
        }

        const response = await axios.get(
          `https://visible-gain-dashboard.onrender.com/auth/verify/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          }
        );

        console.log('User session is valid:', response.data);
      } catch (error) {
        console.error('Session check failed:', error.response ? error.response.data : error.message);
        dispatch(logoutUser());
      }
    };

    if (isAuthenticated && user) {
      checkUserSession();
    }
  }, [dispatch, isAuthenticated, user]);

  return (
    <BrowserRouter>
      {isAuthenticated ? (
        <>
          <Topbar onToggleSidebar={handleToggleSidebar} />
          <div className="main-container">
            {isSidebarVisible && <Sidebar setActiveModule={setActiveModule} />}
            <div className={`content ${isSidebarVisible ? 'with-sidebar' : 'full-width'}`}>
              {renderModule()}
            </div>
          </div>
        </>
      ) : (
        <Routes>
          <Route path="/login" element={<Login setActiveModule={setActiveModule} />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      )}
    </BrowserRouter>
  );
}

export default App;
