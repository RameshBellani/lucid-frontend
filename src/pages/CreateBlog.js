import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './CreateBlog.css'; 

const CreateBlog = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            
            const token = localStorage.getItem('token');
            if (!token) {
                
                navigate('/login');
                return;
            }

            
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };
            await axios.post('https://lucid-backend-jwm6.onrender.com/api/blogs', { title, content }, config);
            navigate('/dashboard');
        } catch (err) {
            console.error(err);
            alert('Error creating blog');
        }
    };

    return (
        <div className="container">
            <h1>Create New Blog</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label>Title</label>
                    <input type="text" className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label>Content</label>
                    <textarea className="form-control" value={content} onChange={(e) => setContent(e.target.value)} required></textarea>
                </div>
                <button type="submit" className="btn btn-primary">Create</button>
            </form>
        </div>
    );
};

export default CreateBlog;
