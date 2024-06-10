import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Dashboard.css'; // Import the CSS file

const Dashboard = ({ user }) => {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        const fetchUserBlogs = async () => {
            const response = await axios.get(`http://localhost:5000/api/users/${user._id}/blogs`);
            setBlogs(response.data);
        };
        fetchUserBlogs();
    }, [user._id]);

    const deleteBlog = async (id) => {
        try {
            await axios.delete(`https://lucid-backend-jwm6.onrender.com/api/blogs/${id}`);
            setBlogs(blogs.filter(blog => blog._id !== id));
        } catch (err) {
            console.error(err);
            alert('Error deleting blog');
        }
    };

    return (
        <div className="container">
            <h1>Your Blogs</h1>
            <Link to="/create-blog" className="btn btn-primary mb-3">Create New Blog</Link>
            <div className="row">
                {blogs.map(blog => (
                    <div className="col-md-4" key={blog._id}>
                        <div className="card mb-4">
                            <div className="card-body">
                                <h5 className="card-title">{blog.title}</h5>
                                <p className="card-text">{blog.content.substring(0, 100)}...</p>
                                <Link to={`/blogs/edit/${blog._id}`} className="btn btn-secondary">Edit</Link>
                                <button onClick={() => deleteBlog(blog._id)} className="btn btn-danger ms-2">Delete</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Dashboard;
