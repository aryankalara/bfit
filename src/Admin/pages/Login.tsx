import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Login() {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Reset the error message on every submission

    try {
      // Sending login request to the backend with username and password as params
      const response = await axios.get('http://localhost:2025/admin/login', {
        params: {
          username: credentials.username,
          password: credentials.password,
        },
      });

      if (response.status === 200) {
        // On successful login, store the admin token in localStorage
        localStorage.setItem('adminToken', response.data.token);
        navigate('/admin'); // Redirect to the admin dashboard
      } else {
        // If response is not 200, set the error message
        setError('Invalid credentials, please try again.');
      }
    } catch (err) {
      // Handle any errors that occur during the request
      setError('An error occurred during login. Please try again later.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-500 to-black flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Admin Login</h1>
            <p className="text-gray-600 mt-2">Welcome back! Please login to continue.</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="text-red-500 text-center mb-4">{error}</div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Username"
                className="input-field pl-10"
                value={credentials.username}
                onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                required
              />
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="password"
                placeholder="Password"
                className="input-field pl-10"
                value={credentials.password}
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                required
              />
            </div>

            <button type="submit" className="btn-primary w-full">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
