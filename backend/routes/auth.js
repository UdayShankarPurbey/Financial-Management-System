const express = require('express');
const router = express.Router();
const User = require('../models/User')
const {body , validationResult} =  require('express-validator')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_SECRET = "@UDAYshankar01122023";
const fetchuser = require("../middleware/fetchuser")

//Route 1 : Create a User Using POST: "/api/auth/createuser".
router.post('/createuser', [
    body('name',"Enter a Valid Name").isLength({ min: 3 }),
    body('username',"Enter a Valid Username").isLength({ min: 3 }),
    body('password',"Password must be 5 character").isLength({ min: 5 }),
], async (req, res) => {
    
    let success = false;


//     //if error occured return bad request.
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // return res.status(400).json({ success ,errors: errors.array() });
        return res.status(400).json({success, errors: errors.array() });

    }
    
    // Check email is unique or not
    try {
        let user = await User.findOne({ username: req.body.username });
        if (user) {
            // return res.status(400).json({success, error: "User With this email exists" });
            return res.status(400).json({success, error: "User With this username exists" });

        }


        //hashing ans salting password
        const salt = await bcrypt.genSalt(10);
        secPass = await bcrypt.hash(req.body.password, salt);
       

        //create a new user
        user = await User.create({
            name: req.body.name,
            password: secPass,
            username: req.body.username
        })
       
        
        //Creating a jwt Token
        const data = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);
        success=true;
        res.json({success, authtoken });

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server error occured");
    }
})


//Route 2 : Authenticate a User Using POST: "/api/auth/login".
router.post('/login', [
    body('username', "Enter a Valid username").isLength({ min: 3 }),
    body('password', 'Password Cannot be blank').exists(),
], async (req, res) => {

    let success = false;

    //if error occured return bad request.
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({success, errors: errors.array() });
    }


    const { username, password } = req.body;

    try {
        let user = await User.findOne({ username });
        if (!user) {

            return res.status(400).json({success, error: "Please Login with Correct Credentials" })
        }
        const passwordCompared = await bcrypt.compare(password, user.password);

        if (!passwordCompared) {


            return res.status(400).json({ success, error: "Please Login with Correct Credentials" })
        }

        const data = {
            user: {
                id: user.id
            }
        }
                

        const authtoken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({success,authtoken});

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server error occured");
    }
})

//Route 3 : Get User Details POST: "/api/auth/getuser". Login Required.
router.post('/getuser', fetchuser, async (req, res) => {
    try {
        userId = req.user.id;
        const user = await User.findById(userId).select('-password');
        res.send(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server error occured");
    }
})

module.exports = router