const express = require('express');
const mongoose = require('mongoose');
const Registeruser = require('./model');
const jwt = require('jsonwebtoken');
const middleware = require('./middleware');
const Msgmodel = require('./msgmodel');
const Sharemodel = require('./sharemodel'); // New model for shared details
const cors = require('cors');
const app = express();

mongoose.connect("mongodb+srv://venkychat:venkychat@cluster0.d47qttq.mongodb.net/")
    .then(() => console.log('DB Connected...'))
    .catch(err => console.log(err));

app.use(express.json());
app.use(cors({ origin: "*" }));

// Existing routes
app.post('/register', async (req, res) => {
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

app.post('/login', async (req, res) => {
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
        jwt.sign(payload, 'jwtSecret', { expiresIn: '1h' },
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

app.get('/myprofile', middleware, async (req, res) => {
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

app.post('/addmsg', middleware, async (req, res) => {
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

app.get('/getmsg', middleware, async (req, res) => {
    try {
        let allmsg = await Msgmodel.find();
        res.json(allmsg);
    } catch (err) {
        console.error('GetMsg Error:', err);
        res.status(500).json({ error: 'Server Error' });
    }
});

// New route to handle form submissions
app.post('/share', middleware, async (req, res) => {
    try {
        const { name, email, phone, branch, passingYear, resumeLink, portfolioLink } = req.body;

        // Validate required fields
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
        // const allShares = await Sharemodel.find();
        // res.json(allShares);
    } catch (err) {
        console.error('Share Error:', err);
        res.status(500).json({ error: 'Server Error' });
    }
});

// New route to get shared details
app.get('/share1', async (req, res) => {
    try {
        const allShares = await Sharemodel.find();
        res.json(allShares);
    } catch (err) {
        console.error('GetShare Error:', err);
        res.status(500).json({ error: 'Server Error' });
    }
});

app.listen(5000, () => {
    console.log('Server Running...');
});
