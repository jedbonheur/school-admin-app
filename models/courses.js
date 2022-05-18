const mongoose = require('mongoose')
const {Schema } = mongoose;

// schema of model @ applications

const courseSchema = new Schema({
  course_name: {
   type: String,
   require: true
  },
  course_code: {
   type: String,
   require: true
  },
  course_depertment: {
   type: String,
   require: true
  },
  schedule: {
   type: String,
   require: true
  },
  instructor:[
   {
      type: Schema.Types.ObjectId,
      ref: 'Teacher'
   }
  ],
  students:[
   {
      type: Schema.Types.ObjectId,
      ref: 'Student'
   }
  ],
  assignments:[
   {
      type: Schema.Types.ObjectId,
      ref: 'Assignment'
   }
  ],
  exams:[
   {
      type: Schema.Types.ObjectId,
      ref: 'Exam'
   }
  ]
}
,{ versionKey: false })

// export of model @ application

module.exports = mongoose.model('Course',courseSchema)