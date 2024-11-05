import React, { useEffect, useState } from 'react';
import { FaEdit, FaTrash, FaEye } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, deleteUser } from '../../redux/usersSlice';
import './UserList.css';

const UserList = () => {
  const dispatch = useDispatch();
  const { users, status, error } = useSelector((state) => state.users);

  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const totalPages = Math.ceil(users.length / usersPerPage);
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const handlePreview = (user) => {
    setSelectedUser(user);
  };

  const handleClosePreview = () => {
    setSelectedUser(null);
  };

  const handleDelete = (user) => {
    if (window.confirm(`Are you sure you want to delete ${user.username}?`)) {
      dispatch(deleteUser(user.userId));
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  if (status === 'loading') {
    return <div className='loader'>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <div className='user-list-container'>
      <h2 className='user-list-title'>User List</h2>
      <table className='user-list-table'>
        <thead className='user-list-header'>
          <tr>
            <th className='user-list-heading'>Name</th>
            <th className='user-list-heading'>Email</th>
            <th className='user-list-heading'>Actions</th>
          </tr>
        </thead>
        <tbody className='user-list-body'>
          {currentUsers.map((user) => (
            <tr key={user.userId} className='user-list-row'>
              <td className='user-list-data'>{user.username}</td>
              <td className='user-list-data'>{user.email}</td>
              <td className='user-list-actions'>
                <button className='action-button preview-button' onClick={() => handlePreview(user)}>
                  <FaEye />
                </button>
                <button className='action-button delete-button' onClick={() => handleDelete(user)}>
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className='pagination-controls'>
        <button
          className='pagination-button'
          onClick={goToPreviousPage}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className='pagination-info'>
          Page {currentPage} of {totalPages}
        </span>
        <button
          className='pagination-button'
          onClick={goToNextPage}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>

      {selectedUser && (
        <div className='modal'>
          <div className='modal-content'>
            <h3>User Details</h3>
            <p><strong>ID:</strong> {selectedUser.userId}</p>
            <p><strong>Username:</strong> {selectedUser.username}</p>
            <p><strong>Email:</strong> {selectedUser.email}</p>
            <p><strong>Email Verified:</strong> {selectedUser.emailVerified ? 'Yes' : 'No'}</p>
            <p><strong>Created At:</strong> {new Date(selectedUser.createdAt).toLocaleString()}</p>
            <p><strong>Updated At:</strong> {new Date(selectedUser.updatedAt).toLocaleString()}</p>
            <button className='close-button' onClick={handleClosePreview}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserList;
