const express = require('express');
const router = express.Router();
const Admin = require('../models/Admin')
const {body , validationResult} =  require('express-validator')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_SECRET = "@UDAYshankar01122023";

//Route 1 : Create a Admin Using POST: "/api/admin/auth/createuser".
router.post('/createuser', [
    body('name',"Enter a Valid Name").isLength({ min: 3 }),
    body('email',"Enter aValid Email").isEmail(),
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
        let admin = await Admin.findOne({ email: req.body.email });
        if (admin) {
            return res.status(400).json({success, error: "User With this email exists" });

        }


        //hashing ans salting password
        const salt = await bcrypt.genSalt(10);
        secPass = await bcrypt.hash(req.body.password, salt);
       

        //create a new user
        admin = await Admin.create({
            name: req.body.name,
            password: secPass,
            email: req.body.email
        })
       
        
        //Creating a jwt Token
        const data = {
            admin: {
                id: admin.id
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


//Route 2 : Authenticate a User Using POST: "/api/admin/auth/login".
router.post('/login', [
    body('email', "Enter a Valid Email").isEmail(),
    body('password', 'Password Cannot be blank').exists(),
], async (req, res) => {

    let success = false;

    //if error occured return bad request.
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() });
    }


    const { email, password } = req.body;

    try {
        let admin = await Admin.findOne({ email });
        if (!admin) {


            return res.status(400).json({ success, error: "Please Login with Correct Credentials" })
        }
        const passwordCompared = await bcrypt.compare(password, admin.password);

        if (!passwordCompared) {


            return res.status(400).json({ success, error: "Please Login with Correct Credentials" })
        }

        const data = {
            admin: {
                id: admin.id
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


module.exports = router