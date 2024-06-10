import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './BlogPost.css'; // Import the CSS file

const BlogPost = () => {
    const { id } = useParams();
    const [blog, setBlog] = useState({});
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');

    useEffect(() => {
        const fetchBlog = async () => {
            const response = await axios.get(`/api/blogs/${id}`);
            setBlog(response.data);
            setComments(response.data.comments);
        };
        fetchBlog();
    }, [id]);

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        const response = await axios.post(`https://lucid-backend-jwm6.onrender.com/api/blogs/${id}/comments`, { comment: newComment });
        setComments([...comments, response.data]);
        setNewComment('');
    };

    return (
        <div className="container">
            <h1>{blog.title}</h1>
            <p>{blog.content}</p>
            <div className="comments-container">
                <h3>Comments</h3>
                {comments.map((comment, index) => (
                    <div className="comment" key={index}>
                        <p><strong>{comment.author.username}:</strong> {comment.text}</p>
                    </div>
                ))}
                <form className="comment-form" onSubmit={handleCommentSubmit}>
                    <div className="mb-3">
                        <textarea className="form-control" value={newComment} onChange={(e) => setNewComment(e.target.value)} required></textarea>
                    </div>
                    <button type="submit" className="btn btn-primary">Add Comment</button>
                </form>
            </div>
        </div>
    );
};

export default BlogPost;
