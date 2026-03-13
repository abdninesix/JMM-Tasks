import { useEffect, useState } from 'react';
import API from '../api/axios';
import { Link } from 'react-router-dom';
import Banner from '../components/Banner';
import { format } from 'timeago.js';


function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    API.get('/posts')
      .then(res => setPosts(res.data.reverse()))
      .catch(err => console.error('Failed to fetch posts:', err));
  }, []);

  return (
    <div className="space-y-4">
      <Banner text="Latest Posts" />
      <div className='flex flex-wrap gap-6'>
        {posts.length === 0 ? (
          <p>No posts yet.</p>
        ) : (
          posts.map(post => (
            <div key={post.id} className="w-full md:w-72 p-3 flex flex-col bg-gray-100 hover:bg-gray-200 rounded-lg shadow duration-200">
              <div className='w-full mb-2 rounded-md overflow-hidden bg-white flex items-center justify-center'><img src="/cover.png" alt="cover" className='object-cover' /></div>
              <h1 className="text-lg cursor-pointer font-semibold">{post.title}</h1>
              <p className="text-xs text-gray-500">Posted {format(post.createdAt)} by {post.author}</p>
              <p className="mt-2 text-sm text-gray-700">{post.description.slice(0, 70)}...</p>
              <Link to={`/post/${post.id}`} className="text-sm font-medium text-myblue hover:underline mt-auto ml-auto">Read more</Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Home;
