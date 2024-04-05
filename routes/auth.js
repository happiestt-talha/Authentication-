require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();
const posts = [
    { username: 'talha', msg: 'hi talha' },
    { username: 'ali', msg: 'hi ali' },
    { username: 'ahmad', msg: 'hi ahmad' },
    { username: 'noone', msg: 'hi noone' }
];

// Middleware to authenticate JWT token
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Unauthorized: Token is required' });
    }

    jwt.verify(token, process.env.PRIVATE_ACCESS_TOKEN, (err, user) => {
        if (err) {
            console.error('Token verification error:', err);
            return res.status(403).json({ error: 'Forbidden: Invalid token' });
        }
        req.user = user;
        next();
    });
}

// Route to generate JWT token
app.post('/', (req, res) => {
    const { username } = req.body;

    if (!username) {
        return res.status(400).json({ error: 'Username is required' });
    }

    const user = { name: username };
    const accessToken = jwt.sign(user, process.env.PRIVATE_ACCESS_TOKEN);
    res.json({ accessToken: accessToken });
});

// Protected route to get posts
app.get('/possts', authenticateToken, (req, res) => {
    console.log(req.user);
    res.json(posts);
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

module.exports = app;
