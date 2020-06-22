var express = require('express'), 
router= express.Router();
const User = require('../../modules/User');
const auth = require('../../middleware/auth');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');

router.get('/', (req,res) => res.send('Auth router'));  

// Similar logic as user.js and we have here to do
// post api/auth
// autheticate user and get the token
// access is public
router.post('/',  
// see the documentation for express-validator
        [
        check('email','Enter valid email').isEmail(),
        check('password','Password is required').exists()
        ],
        async (req, res) => 
        {
        const errors = validationResult(req);
        if (!errors.isEmpty()) 
        {
        return res.status(400).json({errors: errors.array()});
        }   
// Added this to call from users module go to line 23  
        const { email, password, date} = req.body;
// use try and catch here continue from line 21
    try {
// check if the user is really there 
        let user = await User.findOne({ email });
        if(!user) {
        return res.status(400).json({ errors: [{msg: "Invalid Credentials" }] });
        }
// Check if the password matches 
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
        return res.status(400).json({ errors: [{msg: "Invalid Credentials" }] });   
        }      
// implementing jwt form this line
        var payload = {
            user: {
                id:user.id
            }
        };
// use this secret key seperate config
        jwt.sign(payload,'secretkey', {expiresIn:36000}, (err,token) => {if(err) throw err;  res.json({token});});
        }

    catch(err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }       
});

module.exports =router;


