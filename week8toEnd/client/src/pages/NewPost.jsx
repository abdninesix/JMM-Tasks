import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/axios';
import { toast } from 'react-toastify';
import Banner from '../components/Banner';

function NewPost() {
  const [form, setForm] = useState({ title: '', content: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/posts', form);
      toast.success('Post created!');
      navigate('/');
    } catch (err) {
      const msg = err.response?.data?.message || 'Post creation failed';
      toast.error(msg);
    }
  };

  return (
    <>
      <Banner text="Enlighten us!" />
      <div className="lg:absolute top-20 right-48 max-w-md mx-auto p-4 flex flex-col bg-gray-100 rounded shadow">
        <h2 className="text-2xl font-bold mb-4">Create New Post</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="title"
            placeholder="Post Title"
            className="w-full p-2 bg-white rounded outline-none"
            onChange={handleChange}
            required
          />
          <textarea
            name="content"
            rows="10"
            placeholder="Post Content"
            className="w-full p-2 rounded bg-white outline-none resize-none"
            onChange={handleChange}
            required
          ></textarea>
          <button type="submit" className="w-full bg-myblue cursor-pointer text-white p-2 rounded">
            Publish
          </button>
        </form>
      </div>
    </>
  );
}

export default NewPost;
