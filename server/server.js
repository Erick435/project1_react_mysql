// server.js
require('dotenv').config();
const bcrypt = require('bcrypt');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');
const app = express();


app.use(bodyParser.json());
app.use(cors());

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
});

// Define API endpoints for user registration, login, and password recovery here.
// Use the 'mysql' package to interact with your database.

// =========================== REGISTRATION =========================

app.post('/registration', (req, res) => {
    // Extract user registration data from req.body
    const { email, username, password, security_question_1, security_answer_1, security_question_2, security_answer_2 } = req.body;

    // Check if the email is unique by querying your database
    const checkEmailQuery = 'SELECT COUNT(*) as count FROM users WHERE email = ?';
    db.query(checkEmailQuery, [email], (err, results) => {
        if (err) {
            // Handle database error
            res.status(500).json({ error: 'Database error' });
        } else {
            const emailCount = results[0].count;
            if (emailCount > 0) {
                // Email is not unique
                res.status(400).json({ error: 'Email is already in use' });
            } else {
                // Email is unique, proceed with registration
                // Hash and salt the password
                bcrypt.hash(password, 10, (hashErr, hash) => {
                    if (hashErr) {
                        // Handle password hashing error
                        res.status(500).json({ error: 'Password hashing error' });
                    } else {
                        // Insert user data into the database
                        const insertUserQuery = 'INSERT INTO users (email, username, password, security_question_1, security_answer_1, security_question_2, security_answer_2) VALUES (?, ?, ?, ?, ?, ?, ?)';
                        db.query(insertUserQuery, [email, username, hash, security_question_1, security_answer_1, security_question_2, security_answer_2], (insertErr, insertResults) => {
                            if (insertErr) {
                                // Handle database insertion error
                                res.status(500).json({ error: 'User registration error' });
                            } else {
                                // Send a success response
                                res.status(200).json({ message: 'User registered successfully' });
                            }
                        });
                    }
                });
            }
        }
    });
});


// ========================== LOGIN ============================

app.post('/login', (req, res) => {
    console.log('Received a login request');
    const { username, password } = req.body;

    // Query the database to check if the username and password match
    const checkLoginQuery = 'SELECT * FROM users WHERE username = ?';
    db.query(checkLoginQuery, [username], (err, results) => {
        if (err) {
            // Handle database error
            res.status(500).json({ error: 'Database error' });
        } else if (results.length === 0) {
            // User with the provided username does not exist
            res.status(401).json({ error: 'User not found' });
        } else {
            // Check the password using bcrypt
            const user = results[0];
            bcrypt.compare(password, user.password, (hashErr, isMatch) => {
                if (hashErr || !isMatch) {
                    // Password doesn't match
                    res.status(401).json({ error: 'Incorrect password' });
                } else {
                    // Password is correct, the user is authenticated
                    res.status(200).json({ message: 'Login successful' });
                }
            });
        }
    });
});


app.listen(3001, () => {
    console.log('Server is running on port 3001');
});
