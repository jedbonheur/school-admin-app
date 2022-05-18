const mongoose = require('mongoose')
const {Schema } = mongoose;

// schema of model @ applications

const applicationSchema = new Schema({
  firstName: {
   type: String,
   require: true
  },
  lastName: {
   type: String,
   require: true
  },
  gender: {
   type: String,
   require: true
  },
  email: {
   type: String,
   require: true
  },
  dob: {
   type: String,
   require: true
  },
  program: {
   type: String,
   require: true
  },
  semester: {
   type: String,
   require: true
  },
  address: {
   type: String,
   require: true
  },
  user_photo: { 
    type: String,
    require: true
  },
  motivational_letter: {
    type: String,
    require: true
  },
  status: {
    type: String,
    require: true
  }
}
,{ versionKey: false })

// export of model @ application

module.exports = mongoose.model('Application',applicationSchema)