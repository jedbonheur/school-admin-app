const mongoose = require('mongoose')
const {Schema } = mongoose;

// schema of model @ applications

const assignmentSchema = new Schema({
  assignment_code: {
   type: String,
   require: true
  },
  assignment_name: {
   type: String,
   require: true
  },
  due_date: {
   type: String,
   require: true
  },
  assignment: {
   type: String,
   require: true
  },
  instructor:[
   {
      type: Schema.Types.ObjectId,
      ref: 'Teacher'
   }
  ],
  course:[
   {
      type: Schema.Types.ObjectId,
      ref: 'Course'
   }
  ]
}
,{ versionKey: false })

// export of model @ application

module.exports = mongoose.model('Assignment', assignmentSchema)