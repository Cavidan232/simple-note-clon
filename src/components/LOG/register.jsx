import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.png';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const navigate = useNavigate(); // useNavigate hook'u

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
const api = "https://agate-fishy-catsup.glitch.me/acounts"

  const handleRegister = (e) => {
    e.preventDefault();
    postUser();
  };

  const postUser = async () => {
    try {
      const exUserresponse = await axios.get(api);
      const exEmail = exUserresponse.data.find(u => u.email === formData.email);
      const exName = exUserresponse.data.find(e => e.name === formData.name);

      if (exName) {
        toast.error('Bu ad ilə qeydiyyatdan keçmiş istifadəçi artıq var.');
        return;
      }
      if (exEmail) {
        toast.error('Bu email ilə qeydiyyatdan keçmiş istifadəçi artıq var.');
        return;
      }

      const post = await axios.post(api, {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        fav: [],
        delete: [],
        notes: []
      });

      if (post.status === 201) {
        toast.success('Qeydiyyat uğurlu oldu!');
        navigate("/login"); // useNavigate ile yönlendirme
        setFormData({
          name: '',
          email: '',
          password: '',
        });
      } else {
        toast.error('Qeydiyyat uğursuz oldu. Yenidən cəhd edin.');
      }
    } catch (error) {
      toast.error('Bir xəta baş verdi. Yenidən cəhd edin.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-custom-light text-gray-950">
      <ToastContainer />
      <div className="p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="text-center mb-6">
          <img src={logo} alt="Simplenote Logo" className="mx-auto mb-4" />
          <h2 className="text-2xl font-bold">Sign Up</h2>
        </div>
        <form onSubmit={handleRegister}>
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
          <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded text-lg hover:bg-blue-700">
            Sign Up
          </button>
        </form>
        <p className="mt-4 text-center">
          Already have an account? <Link to="/login" className="text-blue-500 hover:underline">Log In</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
