import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/axios';
import { toast } from 'react-toastify';
import Banner from '../components/Banner';

function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/login', form);
      localStorage.setItem('token', res.data.token);
      toast.success('Login successful!');
      navigate('/');
    } catch (err) {
      const msg = err.response?.data?.message || 'Login failed';
      toast.error(msg);
    }
  };

  return (
    <>
      <Banner text="Welcome Back!" />
      <div className="lg:absolute top-20 right-48 max-w-md mx-auto p-4 flex flex-col bg-gray-100 rounded shadow">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="email"
            type="email"
            placeholder="Email"
            className="w-full p-2 outline-none rounded bg-white"
            onChange={handleChange}
            required
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            className="w-full p-2 outline-none rounded bg-white"
            onChange={handleChange}
            required
          />
          <button type="submit" className="w-full bg-myblue text-white p-2 rounded hover:bg-hoverblue">
            Login
          </button>
        </form>
      </div>
    </>
  );
}

export default Login;
