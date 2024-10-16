const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const users = []; // In-memory store, replace with DB in production.

// Register
exports.register = async (req, res) => {
    const { username, password } = req.body;
    const passwordHash = await User.hashPassword(password);
    const user = new User(users.length + 1, username, passwordHash);
    users.push(user);
    res.status(201).json({ message: 'User registered successfully' });
};

// Login
exports.login = async (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username);
    if (!user || !(await user.comparePassword(password))) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
    res.status(200).json({ token });
};
