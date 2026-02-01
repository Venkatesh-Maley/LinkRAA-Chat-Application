require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const Registeruser = require('./model');
const jwt = require('jsonwebtoken');
const middleware = require('./middleware');
const Msgmodel = require('./msgmodel');
const Sharemodel = require('./sharemodel');
const cors = require('cors');
const app = express();

// Use environment variable for MongoDB URI or fallback to the provided one (for local dev)
const mongoURI = process.env.MONGODB_URI || "mongodb+srv://venkychat:venkychat@cluster0.d47qttq.mongodb.net/";
const jwtSecret = process.env.JWT_SECRET || 'jwtSecret';

mongoose.connect(mongoURI)
    .then(() => console.log('DB Connected...'))
    .catch(err => console.log(err));

app.use(express.json());
app.use(cors({ origin: "*" }));

// Health check route
app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'OK' });
});

// Existing routes
app.post('/api/register', async (req, res) => {
    try {
        const { username, email, password, confirmpassword } = req.body;
        let exist = await Registeruser.findOne({ email });
        if (exist) {
            return res.status(400).json({ error: 'User Already Exists' });
        }
        if (password !== confirmpassword) {
            return res.status(400).json({ error: 'Passwords do not match' });
        }
        let newUser = new Registeruser({
            username,
            email,
            password,
            confirmpassword
        });
        await newUser.save();
        res.status(200).json({ message: 'Registered Successfully' });
    } catch (err) {
        console.error('Register Error:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        let exist = await Registeruser.findOne({ email });
        if (!exist) {
            return res.status(400).json({ error: 'User Not Found' });
        }
        if (exist.password !== password) {
            return res.status(400).json({ error: 'Invalid Credentials' });
        }
        let payload = {
            user: {
                id: exist.id
            }
        };
        jwt.sign(payload, jwtSecret, { expiresIn: '1h' },
            (err, token) => {
                if (err) throw err;
                return res.json({ token });
            }
        );
    } catch (err) {
        console.error('Login Error:', err);
        res.status(500).json({ error: 'Server Error' });
    }
});

app.get('/api/myprofile', middleware, async (req, res) => {
    try {
        let exist = await Registeruser.findById(req.user.id);
        if (!exist) {
            return res.status(400).json({ error: 'User not found' });
        }
        res.json(exist);
    } catch (err) {
        console.error('MyProfile Error:', err);
        res.status(500).json({ error: 'Server Error' });
    }
});

app.post('/api/addmsg', middleware, async (req, res) => {
    try {
        const { text } = req.body;
        const exist = await Registeruser.findById(req.user.id);
        let newmsg = new Msgmodel({
            user: req.user.id,
            username: exist.username,
            text
        });
        await newmsg.save();
        let allmsg = await Msgmodel.find();
        res.json(allmsg);
    } catch (err) {
        console.error('AddMsg Error:', err);
        res.status(500).json({ error: 'Server Error' });
    }
});

app.get('/api/getmsg', middleware, async (req, res) => {
    try {
        let allmsg = await Msgmodel.find();
        res.json(allmsg);
    } catch (err) {
        console.error('GetMsg Error:', err);
        res.status(500).json({ error: 'Server Error' });
    }
});

app.post('/api/share', middleware, async (req, res) => {
    try {
        const { name, email, phone, branch, passingYear, resumeLink, portfolioLink } = req.body;

        if (!name || !email || !phone || !branch || !passingYear) {
            return res.status(400).json({ error: 'All required fields must be filled' });
        }

        const newShare = new Sharemodel({
            user: req.user.id,
            name,
            email,
            phone,
            branch,
            passingYear,
            resumeLink,
            portfolioLink
        });

        await newShare.save();
        res.status(200).json({ message: 'shared Successfully' });
    } catch (err) {
        console.error('Share Error:', err);
        res.status(500).json({ error: 'Server Error' });
    }
});

app.get('/api/share1', async (req, res) => {
    try {
        const allShares = await Sharemodel.find();
        res.json(allShares);
    } catch (err) {
        console.error('GetShare Error:', err);
        res.status(500).json({ error: 'Server Error' });
    }
});

// Conditionally start server if not running as a Vercel serverless function
if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
        console.log(`Server Running on port ${PORT}...`);
    });
}

// Export the app for Vercel
module.exports = app;
