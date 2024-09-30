import React, { useState } from 'react';
import './Register.css';
import { Link } from 'react-router-dom';
import logo from '../Logo.png';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const RegisterPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false); // State to toggle visibility
    const [showNewPassword, setShowNewPassword] = useState(false); // For new password

    const handleLogin = (e) => {
        e.preventDefault();
        // Handle login logic here
        console.log('Registering with', { email, password, newPassword });
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <div className='Logo-center'>
                    <h1>Welcome To</h1>
                    <img src={logo} alt="Logo" className="logo" />
                    <h2 style={{ fontFamily: 'cursive', fontWeight: 'bold' }}>RentEZ</h2>
                </div>

                <form onSubmit={handleLogin}>
                    {/* Email Input */}
                    <p style={{
                        display: 'flex',
                        justifyContent: 'start',
                        fontSize: '15px',
                        marginBottom: '-10px',
                        color: 'black'
                    }}>
                        Email:
                    </p>
                    <input
                        type="email"
                        placeholder="email@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="input"
                    />

                    {/* Password Input */}
                    <p style={{
                        display: 'flex',
                        justifyContent: 'start',
                        fontSize: '15px',
                        marginBottom: '-9px',
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
                        />
                        <span
                            className="password-toggle-icon"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </span>
                    </div>

                    {/* New Password */}
                    <p style={{
                        display: 'flex',
                        justifyContent: 'start',
                        fontSize: '15px',
                        marginBottom: '-10px',
                        color: 'black',
                        marginTop: '20px'
                    }}>
                        Enter new password:
                    </p>
                    <div className="password-input-container">
                        <input
                            type={showNewPassword ? "text" : "password"}
                            placeholder="New password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                            className="input"
                        />
                        <span
                            className="password-toggle-icon"
                            onClick={() => setShowNewPassword(!showNewPassword)}
                        >
                            {showNewPassword ? <FaEyeSlash /> : <FaEye />}
                        </span>
                    </div>

                    <button type="submit" className="login-button" style={{marginTop:'20px'}}>
                        Sign up
                    </button>
                </form>

                <div className="signup-container">
                    <span style={{ color: 'black' }}>Already have an account?</span>
                    <Link to="/Login" className="signup-link">
                        Sign In Here
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
