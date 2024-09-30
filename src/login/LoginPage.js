import React, { useState } from 'react';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../Logo.png';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import axios from 'axios';

const LoginPage = () => {
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();







    const handleLogin = (e) => {
        e.preventDefault();
        // Handle login logic here
        axios.post("https://localhost:7085/api/auth/authentication", {
            username: username,
            password: password
        })
            .then((response) => {
                if (response.status === 200) {
                    localStorage.setItem('Auth', JSON.stringify(response.data));
                    // console.log(response.data);
                    navigate('/')
                } else {
                    return null;
                }
            })
            .catch((error) => {console.log(error)});
        // console.log('Logging in with', { username, password });
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <div className='Logo-center'>
                    <h1>Welcome To</h1>
                    <img src={logo} alt="Logo" className="logo" />
                    <h2 className='font-logo'>RentEZ</h2>
                </div>

                <form onSubmit={handleLogin}>
                    {/* username Input */}
                    <p style={{
                        display: 'flex',
                        justifyContent: 'start',
                        fontSize: '15px',
                        marginBottom: '-10px',
                        color: 'black'
                    }}>
                        User name:
                    </p>
                    <input
                        type="text"
                        placeholder="username"
                        value={username}
                        onChange={(e) => setUserName(e.target.value)}
                        required
                        className="input"
                    />

                    {/* Password Input */}
                    <p style={{
                        display: 'flex',
                        justifyContent: 'start',
                        fontSize: '15px',
                        marginBottom: '-10px',
                        color: 'black',
                        marginTop: '20px'
                    }}>
                        Password:
                    </p>
                    <div className="password-input-container">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="input"
                            style={{ marginBottom: '20px' }}
                        />
                        <span
                            className="password-toggle-icon"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </span>
                    </div>

                    {/* <div className="forgot-password">
                        <Link to="/">Forgot your Password?</Link>
                    </div> */}

                    <button type="submit" className="login-button" style={{ marginTop: '30px' }}>
                        Login
                    </button>
                </form>

                <div className="signup-container">
                    <span style={{ color: 'black' }}>Don't have an account?</span>
                    <Link to="/register" className="signup-link">
                        Sign Up Here
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
