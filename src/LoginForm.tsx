import { useState } from 'react';
import { Mail, Lock } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [user, setUser] = useState(null); 
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); 

    try {
      
      const response = await axios.get(
        `http://localhost:2025/user/checkuserlogin?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`
      );

      if (response.data) {


        localStorage.setItem('user', JSON.stringify(response.data));

        console.log("Login successful:", response.data);

        
        setUser(response.data); 
        
        navigate('/dashboard', { state: { user: response.data } });
        
        setEmail('');
        setPassword('');
      } else {
        setError('Invalid email or password');
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
      console.error('Error during login:', error);
    }
  };

  return (
    <div className="relative z-10 w-full max-w-md">
      <div className="backdrop-blur-lg bg-black/30 p-8 rounded-2xl shadow-2xl border border-red-500/20">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
          <p className="text-red-300">Sign in to continue</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-red-400" />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full pl-10 pr-3 py-2.5 bg-black/50 border border-red-500/30 text-white rounded-lg 
                         focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent
                         placeholder-gray-400 transition-all duration-300"
                placeholder="Email address"
                required
              />
            </div>

            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-red-400" />
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full pl-10 pr-3 py-2.5 bg-black/50 border border-red-500/30 text-white rounded-lg 
                         focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent
                         placeholder-gray-400 transition-all duration-300"
                placeholder="Password"
                required
              />
            </div>
          </div>

          {error && <p className="text-red-500 text-center">{error}</p>}

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center text-gray-300">
              <input type="checkbox" className="mr-2 rounded border-red-500/30 bg-black/50" />
              Remember me
            </label>
            <a href="#" className="text-red-400 hover:text-red-300 transition-colors">
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 bg-gradient-to-r from-red-600 to-red-500 text-white rounded-lg
                     hover:from-red-500 hover:to-red-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2
                     focus:ring-offset-black transition-all duration-300 transform hover:scale-[1.02]"
          >
            Sign in
          </button>

          <p className="text-center text-gray-400">
            Don't have an account?{' '}
            <Link to="/form" className="text-red-400 hover:text-red-300 transition-colors">
              Sign up
            </Link>
          </p>
        </form>

        {/* Display the logged-in user's name if available */}
        {user && (
          <div className="mt-4 text-center text-white">
            <p>Welcome, {user.name}!</p> {/* Assuming user object has a name property */}
          </div>
        )}
      </div>
    </div>
  );
}
