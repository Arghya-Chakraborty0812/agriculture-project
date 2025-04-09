const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bcrypt = require('bcrypt');
const cors = require('cors');

const app = express();
const port = 8000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Disable automatic index.html serving
app.use(express.static(path.join(__dirname, 'public'), { 
    index: false 
}));

// Explicit root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/agriculture', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error("Connection error:", err));

// User Model
const userSchema = new mongoose.Schema({
    fullName: String,
    username: { type: String, unique: true },
    password: String
});
const User = mongoose.model('User', userSchema);

// Authentication Endpoints
app.post('/signin', async (req, res) => {
    try {
        const { username, passkey } = req.body;
        const user = await User.findOne({ username });
        
        if (!user) return res.status(401).json({ message: "Invalid credentials" });
        
        const match = await bcrypt.compare(passkey, user.password);
        if (!match) return res.status(401).json({ message: "Invalid credentials" });
        
        res.status(200).json({ 
            message: "Login successful", 
            redirect: '/index.html' 
        });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});

app.post('/signup', async (req, res) => {
    try {
        const { fullName, username, passkey } = req.body;
        const hashedPassword = await bcrypt.hash(passkey, 10);
        
        const newUser = new User({
            fullName,
            username,
            password: hashedPassword
        });
        
        await newUser.save();
        res.status(201).json({ message: "Account created successfully" });
    } catch (err) {
        res.status(400).json({ 
            message: err.code === 11000 
                ? "Username already exists" 
                : "Registration failed" 
        });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});