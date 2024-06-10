import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './Profile.css'; // Import the CSS file

const Profile = () => {
    const { id } = useParams();
    const [user, setUser] = useState({});
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        const fetchUser = async () => {
            const response = await axios.get(`http://localhost:5000/api/users/${id}`);
            setUser(response.data);
        };
        fetchUser();
    }, [id]);

    useEffect(() => {
        const fetchUserBlogs = async () => {
            const response = await axios.get(`https://lucid-backend-jwm6.onrender.com/api/users/${id}/blogs`);
            setBlogs(response.data);
        };
        fetchUserBlogs();
    }, [id]);

    return (
        <div className="container">
            <h1>{user.username}</h1>
            <img src={user.profilePicture} alt={`${user.username} profile`} className="img-thumbnail" />
            <h2>Blogs by {user.username}</h2>
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

export default Profile;
