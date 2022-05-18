const mongoose = require('mongoose')
const {Schema } = mongoose;

// schema of model @ applications

const examSchema = new Schema({
  exam_name: {
   type: String,
   require: true
  },
  available_date: {
   type: String,
   require: true
  },
  exam: {
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

module.exports = mongoose.model('Exam', examSchema)