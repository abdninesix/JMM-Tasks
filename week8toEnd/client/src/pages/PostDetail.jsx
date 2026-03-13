import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import API from '../api/axios';
import { toast } from 'react-toastify';
import Banner from '../components/Banner';
import { format } from 'timeago.js';

function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [userId, setUserId] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await API.get(`/posts/${id}`);
        setPost(res.data);
      } catch (err) {
        toast.error('Failed to load post');
      }
    };

    const decodeToken = () => {
      const token = localStorage.getItem('token');
      if (!token) return;
      const payload = JSON.parse(atob(token.split('.')[1]));
      setUserId(payload.id);
    };

    fetchPost();
    decodeToken();
  }, [id]);

  const handleDelete = async () => {
    try {
      await API.delete(`/posts/${id}`);
      toast.success('Post deleted!');
      navigate('/');
    } catch (err) {
      toast.error('Failed to delete post');
    }
  };

  if (!post) return (
    <>
      <Banner />
      <div className="text-center mt-10">Loading...</div>
    </>
  );

  return (
    <>
      <Banner text="Post details" />
      <div className="mt-10 mb-10 p-4 bg-gray-100 rounded-lg shadow">
        <div className='lg:hidden rounded-md overflow-hidden shadow-md'><img src="/cover.png" alt="cover" className='object-cover' /></div>
        <h1 className="text-4xl lg:text-6xl mb-4 text-gray-600 font-semibold">{post.title}</h1>
        <p className="text-sm text-gray-600 mb-4">Posted <b>{format(post.createdAt)}</b> by <b>{post.userId?.username}</b></p>
        <div className='flex gap-2'>
          <p className="lg:w-1/2 text-gray-800 whitespace-pre-line">{post.content}</p>
          <div className='hidden lg:block w-1/2 rounded-md overflow-hidden shadow-md'><img src="/cover.png" alt="cover" className='object-cover' /></div>
        </div>

        {userId === post.userId?._id && (
          <div className="flex justify-end gap-2 text-sm mt-6">
            <Link
              to={`/edit/${post._id}`}
              className="text-myblue hover:underline"
            >
              Edit
            </Link>
            <button
              onClick={handleDelete}
              className="cursor-pointer text-red-500 hover:underline"
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default PostDetail;
