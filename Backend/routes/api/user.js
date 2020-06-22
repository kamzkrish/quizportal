var express = require('express'), router= express.Router();
const { check, validationResult } = require('express-validator');
const User = require('../../modules/User');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var normalize = require('normalize-url');
//var token = jwt.sign({ foo: 'bar' }, 'shhhhh');
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';
// see the express validaor site to see it.
// res.send should display the output. 

router.post('/', 
        [
        check('name','Name is required').not().isEmpty(),
        check('email','Enter valid email').isEmail(),
        check('password','Please enter a password with more than 6 characters').isLength({ min: 5 })
        ],
        async (req, res) => 
        {
        const errors = validationResult(req);
        if (!errors.isEmpty()) 
        {
        return res.status(400).json({errors: errors.array()});
        }   
//Added this to call from users module go to line 23  
const {name, email, password, date} = req.body;

//use try and catch here continue from line 21
    try {
        //check if the user is really there 
        let user = await User.findOne({ email });
        if(user) {
        return res.status(400).json({ errors: [{msg: "User already exist" }] });
        }

        var avatar = normalize(gravatar.url(email, 
        {s: '200', r: 'pg', d: 'mm'}));
        user = new User({name, email, password, avatar, date});

        //date giving error..
        //bcrypt..
        const salt = await bcrypt.genSalt(10);
        user.password =await bcrypt.hash(password, salt);

        // user is saved here 
        await user.save();

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
//************************* Postman error Json ************************************/
// {
//     "errors": [
//         {
//             "msg": "Name is required",
//             "param": "name",
//             "location": "body"
//         },
//         {
//             "msg": "Enter valid email",
//             "param": "email",
//             "location": "body"
//         },
//         {
//             "msg": "Please enter a password with more than 6 characters",
//             "param": "password",
//             "location": "body"
//         }
//     ]
// }
//**********************************************************************************/
module.exports = router;

