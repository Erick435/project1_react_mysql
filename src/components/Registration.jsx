import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../UserContext';

function Registration() {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [securityQuestion1, setSecurityQuestion1] = useState(''); // New state variables
    const [securityAnswer1, setSecurityAnswer1] = useState('');
    const [securityQuestion2, setSecurityQuestion2] = useState('');
    const [securityAnswer2, setSecurityAnswer2] = useState('');

    const navigate = useNavigate();
    const { setUsername: setGlobalUsername } = useUser();

    const handleRegistration = () => {
        const userData = {
            email,
            username,
            password,
            security_question_1: securityQuestion1, // Updated field names
            security_answer_1: securityAnswer1,
            security_question_2: securityQuestion2,
            security_answer_2: securityAnswer2,
        };

        axios.post('http://localhost:3001/registration', userData)
            .then((response) => {
                console.log('User registered successfully');
                setGlobalUsername(username);
                navigate('/');
            })
            .catch((error) => {
                console.error('Registration error:', error.response.data.error);
            });
    }

    return (
        <div>
            <h2>Registration</h2>
            <form>
                <input
                    type="text"
                    name="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
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
                <input
                    type="text"
                    name="securityQuestion1"
                    placeholder="Security Question 1"
                    value={securityQuestion1}
                    onChange={(e) => setSecurityQuestion1(e.target.value)}
                />
                <input
                    type="text"
                    name="securityAnswer1"
                    placeholder="Security Answer 1"
                    value={securityAnswer1}
                    onChange={(e) => setSecurityAnswer1(e.target.value)}
                />
                <input
                    type="text"
                    name="securityQuestion2"
                    placeholder="Security Question 2"
                    value={securityQuestion2}
                    onChange={(e) => setSecurityQuestion2(e.target.value)}
                />
                <input
                    type="text"
                    name="securityAnswer2"
                    placeholder="Security Answer 2"
                    value={securityAnswer2}
                    onChange={(e) => setSecurityAnswer2(e.target.value)}
                />
                <button type="button" onClick={handleRegistration}>Register</button>
            </form>
        </div>
    );
}

export default Registration;
