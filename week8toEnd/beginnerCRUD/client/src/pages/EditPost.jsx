import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../api/axios';
import { toast } from 'react-toastify';
import Banner from '../components/Banner';

function EditPost() {
  const { id } = useParams();
  const [form, setForm] = useState({ author: '', title: '', description: '' });
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the existing post
    API.get(`/posts/${id}`)
      .then(res => {
        setForm({ author: res.data.author, title: res.data.title, description: res.data.description });
      })
      .catch(() => {
        toast.error('Failed to load post');
      });
  }, [id]);

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.put(`/posts/${id}`, form);
      toast.success('Post updated!');
      navigate(`/post/${id}`);
    } catch (err) {
      toast.error('Update failed');
    }
  };

  return (
    <>
      <Banner text="Edit your thoughts!" />
      <div className="absolute top-20 right-48 max-w-md mx-auto p-4 flex flex-col bg-gray-100 rounded shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Edit Post</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="author"
            value={form.author}
            onChange={handleChange}
            className="w-full p-2 bg-white rounded outline-none"
            required
          />
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            className="w-full p-2 bg-white rounded outline-none"
            required
          />
          <textarea
            name="content"
            value={form.description}
            onChange={handleChange}
            rows="8"
            className="w-full p-2 bg-white rounded outline-none resize-none"
            required
          ></textarea>
          <button type="submit" className="w-full cursor-pointer bg-myblue hover:bg-myblue/80 text-white p-2 rounded">
            Update
          </button>
        </form>
      </div>
    </>
  );
}

export default EditPost;
