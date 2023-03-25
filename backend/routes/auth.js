const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = "Anshuman";

//create a User using: POST "/api/auth/createuser". No login required.

router.post('/createuser',[
    body('email', 'Enter a valid email').isEmail(),
    body('name', 'Enter a valid name').isLength({min: 3}),
    body('password', 'Password must be atleast 5 characters').isLength({min: 5})
], async (req, res)=>{
    try
    {
        //If there are errors, return bad request and the errors.
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
        }

        //check weather the user with this email exits already.
        let user = await User.findOne({email: req.body.email});
        if(user){
            return res.status(400).json({error: "Sorry a user with this email exists"});
        }

        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);

        //Create a new user.
        user = await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email,
        })

        const data = {
            user: {
                id: user.id
            }
        }

        const authToken = jwt.sign(data, JWT_SECRET);
        res.json(authToken);
    }
    catch(err)
    {
        console.log(err);
        res.status(500).send("Some error occured");
    }
})

module.exports = router