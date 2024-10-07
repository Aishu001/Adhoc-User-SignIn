import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Home() {
  const [userData, setUserData] = useState([]); // Default state as an empty array
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 

  const homeStyle = {
    backgroundImage: 'url(welcome.jpeg)', 
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh', 
    justifyContent: 'center',
    color: '#fff', 
    textAlign: 'center',
    fontSize: '60px',
    fontWeight: 'bold',
    flexDirection: 'column'
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/user/get');
        console.log('API Response:', response.data);  // Debug the API response
        setUserData(response.data.users); // Set the array of users
        setLoading(false); 
      } catch (err) {
        setError('Failed to fetch user data');
        setLoading(false); 
      }
    };

    fetchUserData();
  }, []); 

  return (
    <>
      <div style={homeStyle}>
        <h1>Welcome to Our Website</h1>
        {loading && <p>Loading user data...</p>}
        {error && <p>{error}</p>}
        {userData.length > 0 ? ( // If there is user data
          <div>
            {userData.map((user, index) => (
              <div key={index}>
                <p>Name: {user.fullName || 'N/A'}</p>
                <p>Email: {user.email || 'N/A'}</p>
                <p>Phone: {user.phoneNumber || 'N/A'}</p>
                <p>Date of Birth: {new Date(user.dateOfBirth).toLocaleDateString() || 'N/A'}</p>
                <hr />
              </div>
            ))}
          </div>
        ) : (
          <p>No users found</p> // In case no users are returned
        )}
      </div>
    </>
  );
}

export default Home;
