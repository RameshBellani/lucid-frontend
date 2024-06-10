import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Home.css'

const Home = () => {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        const fetchBlogs = async () => {
            const response = await axios.get('https://lucid-backend-jwm6.onrender.com/api/blogs');
            setBlogs(response.data);
        };
        fetchBlogs();
    }, []);

    return (
        <div className="container">
            <h1>All Blogs</h1>
            <div className="row">
                {blogs.map(blog => (
                    <div className="col-md-4" key={blog._id}>
                        <div className="card mb-4">
                            <div className="card-body">
                                <h5 className="card-title">{blog.title}</h5>
                                <p className="card-text">{blog.content.substring(0, 100)}...</p>
                                <Link to={`/blogs/${blog._id}`} className="btn btn-primary">Read More</Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;
