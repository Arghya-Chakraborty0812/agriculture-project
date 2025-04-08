const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const bcrypt = require('bcrypt');

const app = express();
const port = 8000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve the login page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

// Serve static files from "public"
app.use(express.static(path.join(__dirname, 'public')));


// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/agriculture', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('MongoDB connected');
}).catch((err) => {
    console.error("Connection error: ", err);
});

// Schema
const userSchema = new mongoose.Schema({
    fullName: String,
    username: String,
    password: String
});

const User = mongoose.model('User', userSchema);

// Signin with bcrypt
app.post('/signin', (req, res) => {
    const { username, passkey } = req.body;
    User.findOne({username : username})
    .then(user => {
        if(!user){
            return res.status(401).json({message : "Invalid Username or Password"});
        }
        bcrypt.compare(passkey, user.password)
        .then(match => {
            if(match){
                res.status(200).json({message : "Sign-in Successful", redirect : 'index.html'});
            }
            else{
                res.status(401).json({message : "Invalid Username or Password"});
            }
        });
    })
    .catch(err => {
        res.status(500).json({message : "Server Error"});
    })
});

// Signup with bcrypt
app.post('/signup', (req, res) => {
    const { fullName, username, passkey } = req.body;

    bcrypt.hash(passkey, 10)
        .then(hashedPassword => {
            const newUser = new User({
                fullName,
                username,
                password: hashedPassword // ✅ Now it's a string, not a Promise
            });

            return newUser.save();
        })
        .then(() => res.status(201).json({ message: "Account Created Successfully" }))
        .catch(err => res.status(500).json({ message: err.message }));
});


// Start server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
