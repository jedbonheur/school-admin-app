const mongoose = require('mongoose')
const {Schema } = mongoose;

// schema of model @ applications

const studentSchema = new Schema({
  username: {
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
  studentId: {
   type: String,
   require: true
  },
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
  studentApplication_id:[
          {
          type: Schema.Types.ObjectId,
          ref: 'Application'
          },
     ],
  courses :[
    {
      type: Schema.Types.ObjectId,
      ref: 'Course'
    }
  ]
},{ versionKey: false })

// export of model @ student

module.exports = mongoose.model('Student',studentSchema)