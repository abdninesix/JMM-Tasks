import React from 'react';
import Banner from '../components/Banner';

const About = () => {
  return (
    <>
      <Banner text="About This Project" />
      <div className='flex flex-col-reverse md:flex-row'>
        <div className="max-w-2xl rounded mt-4 space-y-4 text-gray-700">
          <p>
            This project is part of a learning journey focused on building full-stack web applications. In Week 1, the primary goal was to design and implement a RESTful API for a simple blogging platform.
          </p>
          <p>
            The backend was developed with a focus on REST architecture principles and included full CRUD functionality—allowing users to create, read, update, and delete blog posts. User authentication was implemented using JSON Web Tokens (JWT) to secure endpoints and ensure proper access control.
          </p>
          <p>
            The application integrates a database to persist user accounts, blog posts, and timestamps. Technologies used include Express.js for the server, along with MongoDB or a relational database for data storage.
          </p>
          <p>
            This phase laid the groundwork for understanding API design, server-side development, and database integration—key building blocks for any scalable web application.
          </p>
        </div>

        <div className='mt-4 md:w-1/2 flex items-center justify-center'><img src="/skillify.png" alt="cover" className='object-cover' /></div>
      </div>
    </>
  );
};

export default About;

