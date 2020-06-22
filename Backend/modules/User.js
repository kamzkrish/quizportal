const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({

    name:{
        type: String,
        required:true
    },
    email:{
        type: String,
        required:true
    },
    password:{
        type: String,
        required:true
    },
    avatar:{
        type: String,
    
    },
    date: {
        type: Date,
        default: Date.now
    }

});

module.exports = User = mongoose.model('user', UserSchema);


// const { Sequelize, DataTypes } = require('sequelize');
// const sequelize = new Sequelize('sqlite::memory:');

// const User = sequelize.define({

//   name:{
//     type: DataTypes.STRING,
//     allowNull: false
//   },
//   email:{
//     type: DataTypes.STRING,
//     allowNull: false
 
//   },
//   password:{
//     type: DataTypes.STRING,
//     allowNull: false
//   },
//   avatar:{
//     type: DataTypes.STRING
   
//   },
//   date:{
//     type: DataTypes.DATEONLY
//   }
// });

// // `sequelize.define` also returns the model
// module.exports = User === sequelize.models('user',User);