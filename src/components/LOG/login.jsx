import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  

  const navigate = useNavigate();
  const handleLogin = (e) => {
    e.preventDefault();
    userLogin();
  };

 const api = "https://irradiated-silicon-antler.glitch.me/user"

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const userLogin = async () => {

      const response = await axios.get(api);
      const users = response.data;
      const user = users.find(u => u.email === formData.email && u.password === formData.password);

      if (user) {
        localStorage.setItem('currentUser2', JSON.stringify(user));
        toast.success('Giriş uğurlu oldu!');
        navigate("/");
      } else {
        const emailExists = users.some(u => u.email === formData.email);
        const nameExists = users.some(u => u.name === formData.name);

        if (!nameExists) {
          toast.error('Yanlış ad!');
        } else if (!emailExists) {
          toast.error('Yanlış email!');
        } else {
          toast.error('Yanlış parol!');
        }
      }
 
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-custom-light text-black">
      <ToastContainer />
      <div className="p-8 rounded-lg shadow-ld w-full max-w-md">
        <div className="text-center mb-6">
          <img src={logo} alt="Simplenote Logo" className="mx-auto mb-4" />
          <h2 className="text-2xl font-bold">Log In</h2>
        </div>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full p-2 rounded bg-custom-light text-gray-950 border border-gray-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full p-2 rounded bg-custom-light text-gray-950 border border-gray-500"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block mb-2">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full p-2 rounded bg-custom-light text-gray-950 border border-gray-500"
              required
            />
          </div>
          <button type="submit" className="w-full text-white bg-blue-600 p-2 rounded text-lg hover:bg-blue-700">
            Log In
          </button>
        </form>
        <p className="mt-4 text-center">
          Don't have an account? <Link to="/register" className="text-blue-500 hover:underline">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
