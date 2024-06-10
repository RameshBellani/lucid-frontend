import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import BlogPost from './pages/Blogpost'; 
import Profile from './pages/Profile';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import CreateBlog from './pages/CreateBlog';
import Cookies from 'js-cookie';

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(true);
    const [user, setUser] = useState(false);

    useEffect(() => {
        const token = Cookies.get('jwt_token');
        if (token) {
            setIsAuthenticated(false);
            setUser(true);
        }
    }, []);

    return (
        <Router>
            <Navbar isAuthenticated={isAuthenticated} user={user} />
            <div className="container mt-4">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/blogs/:id" element={<BlogPost />} />
                    <Route path="/profile/:id" element={<Profile />} />
                    <Route path="/login" element={<Login setAuth={setUser} />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/dashboard" element={<Dashboard user={user} />} />
                    <Route path="/create-blog" element={<CreateBlog />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
