const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create user Schema & model
const UserSchema = new Schema({
    Username: {
        type: String,
       

    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    distance: {
        type: String
    }, 
    time: { 
        type: String 
    },
    token: { 
        type: String 
    },
    AccessedAt: { 
        type: Date, default: Date.now()
     },

   
    
});

const Users = mongoose.model('users', UserSchema);

module.exports = Users;