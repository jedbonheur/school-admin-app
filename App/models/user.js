const mongoose = require('mongoose')
const {Schema } = mongoose;
const bcrypt = require('bcrypt') 

// schema of model @user

const userSchema = new Schema({
  username: {
   type: String,
   require: true
  },
  email: {
   type: String,
   require: true
  },
  password: {
   type: String,
   require: true
  },
  role: {
   type: String,
   require: true
  },

});

// export of model @ user

module.exports = mongoose.model('User',userSchema)