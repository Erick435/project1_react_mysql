import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../UserContext'; // Import the useUser hook

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { setUsername: setGlobalUsername } = useUser(); // Use the useUser hook

    const handleLogin = () => {
        // Send a POST request to your server for login
        axios.post('http://localhost:3001/login', { username, password })
            .then((response) => {
                // Handle the login success
                console.log('User logged in successfully');
                setGlobalUsername(username); // Set the username in the context
                navigate('/'); // Redirect to the homepage
            })
            .catch((error) => {
                // Handle login error
                console.error('Login error:', error.response.data.error);
            });
    }

    return (
        <div>
            <h2>Login</h2>
            <form>
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="button" onClick={handleLogin}>Login</button>
            </form>
        </div>
    );
}

export default Login;
