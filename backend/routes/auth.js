const express = require('express');
const router = express.Router();
const User = require('../models/User');

//create a User using: POST "/api/auth/". Doest require Auth

router.post('/', (req, res)=>{
    try
    {
        console.log(req.body);
        const user = User(req.body);
        user.save();
        res.send("HELLO");
    }
    catch(err){console.log(err);}
})

module.exports = router