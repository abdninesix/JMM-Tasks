import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/axios';
import { toast } from 'react-toastify';
import Banner from '../components/Banner';

function Register() {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post('/auth/register', form);
      localStorage.setItem('token', res.data.token);
      toast.success('Registered successfully!');
      navigate('/');
    } catch (err) {
      const msg = err.response?.data?.message || 'Registration failed';
      toast.error(msg);
    }
  };

  return (
    <>
      <Banner text="Get onboard!" />
      <div className="lg:absolute top-20 right-48 max-w-md mx-auto p-4 flex flex-col bg-gray-100 rounded shadow">
        <h2 className="text-2xl font-bold mb-4">Register</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="username"
            type="text"
            placeholder="Username"
            className="w-full p-2 outline-none bg-white rounded"
            onChange={handleChange}
            required
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            className="w-full p-2 outline-none bg-white rounded"
            onChange={handleChange}
            required
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            className="w-full p-2 outline-none bg-white rounded"
            onChange={handleChange}
            required
          />
          <button type="submit" className="w-full bg-myblue cursor-pointer text-white p-2 rounded hover:bg-hoverblue">
            Register
          </button>
        </form>
      </div>
    </>
  );
}

export default Register;
