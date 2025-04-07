const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // ✅ added CORS

let port = 8000;
const app = express();

// ✅ Enable CORS
app.use(cors());

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connection to MongoDB
mongoose.connect('mongodb://localhost:27017/agriculture', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.log("Connection error: ", err));

// Schema
const userSchema = new mongoose.Schema({
    fullName: String,
    username: String,
    password: String
});

// Model
const User = mongoose.model('User', userSchema);

// GET all users
app.get('/users', (req, res) => {
    User.find()
    .then(users => res.json(users))
    .catch(err => res.status(500).json({ message: err.message }));
});

// POST signup
app.post('/signup', (req, res) => {
    const newUser = new User({
        fullName: req.body.fullUserName,
        username: req.body.username,
        password: req.body.passkey
    });

    newUser.save()
    .then(() => res.status(201).json({
        message: "Account Created Successfully"
    }))
    .catch((err) => res.status(500).json({
        message: err.message
    }));
});

// Start Server
app.listen(port, () => {
    console.log(`Server up and running on port ${port}`);
});
