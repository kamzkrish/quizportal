// MAIN SERVER
var express = require('express'), app= express(), port = 5000;// all this var for starting local server
var dbconnect =require('./config/db');

// db connection aws mysql //
dbconnect();

// Init Middleware then only its returning in postman we need to initalize it do it.
app.use(express.json({ extended: false }));

// Testing local
app.get('/', (req,res) => res.send('Hi'));

// router config- defining the routes
app.use('/api/auth',require('./routes/api/auth'));
app.use('/api/posts',require('./routes/api/posts'));
app.use('/api/profile',require('./routes/api/profile'));
//app.use('/api/profile/experience',require('./routes/api/profile'));
app.use('/api/user',require('./routes/api/user'));

// Running in local
app.listen(port, () => { console.log(`Server running at ${port}`); }); 


