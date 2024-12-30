/* import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import '../components/Profile.css';

const Profile = () => {
  const [user, setUser] = useState(null);  // Store user data
  const [loading, setLoading] = useState(true);  // Loading state
  const [error, setError] = useState(null);  // Error state
  const navigate = useNavigate();  // For navigation

  useEffect(() => {
    // Fetch the user's profile data after the component mounts
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');  // Get token from localStorage

      if (!token) {
        // If there is no token, redirect to login
        navigate('/login');
        return;
      }

      try {
        // Send GET request with Authorization header to fetch user data
        const response = await axios.get('http://localhost:5000/api/profile', {
          headers: {
            Authorization: `Bearer ${token}`,  // Include JWT token in Authorization header
          },
        });
        setUser(response.data);  // Set the user data from response
        setLoading(false);  // Set loading state to false
      } catch (error) {
        setError('Failed to fetch user profile');
        setLoading(false);  // Set loading state to false
      }
    };

    fetchProfile();
  }, [navigate]);  // Re-run effect if `navigate` changes (though unlikely)

  // If still loading, show a loading message
  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  // If there is an error, show an error message
  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="profile-container">
      <h2>User Profile</h2>
      {user ? (
        <div className="profile-content">
          <p><strong>Username :</strong> {user.username}</p>
          <p><strong>Email :</strong> {user.email}</p>
        </div>
      ) : (
        <p>No user data available.</p>
      )}
    </div>
  );
};

export default Profile;
 */




import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import '../components/Profile.css';

const Profile = () => {
  const [user, setUser] = useState(null); // Store user data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [file, setFile] = useState(null); // File input
  const [photoPreview, setPhotoPreview] = useState(null); // Preview of the uploaded photo
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      try {
        const response = await axios.get('https://node-auth-q7wx.onrender.com/api/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch user profile');
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFile(file);
    setPhotoPreview(URL.createObjectURL(file)); // Set a local preview of the uploaded image
  };

  const handlePhotoUpload = async () => {
    if (!file) return;

    const token = localStorage.getItem('token');
    const formData = new FormData();
    formData.append('photo', file);

    try {
      const response = await axios.post(
        'https://node-auth-q7wx.onrender.com/api/profile/photo',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      setUser({ ...user, photo: response.data.photo }); // Update the user photo in state
      setPhotoPreview(null);
      setFile(null);
    } catch (error) {
      console.error('Photo upload failed', error);
      setError('Failed to upload photo');
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="profile-container">
      <h2>User Profile</h2>
      <div className="profile-photo-container">
        <img
          src={photoPreview || user.photo || '/default-profile.png'} // Use photoPreview, user photo, or default
          alt="User Profile"
          className="profile-photo"
        />
        <label className="edit-photo-label">
          Edit Photo
          <input type="file" onChange={handleFileChange} />
        </label>
        {photoPreview && (
          <button className="upload-button" onClick={handlePhotoUpload}>
            Upload
          </button>
        )}
      </div>
      <div className="profile-content">
        <p>
          <strong>Username :</strong> {user.username}
        </p>
        <p>
          <strong>Email :</strong> {user.email}
        </p>
      </div>
    </div>
  );
};

export default Profile;
