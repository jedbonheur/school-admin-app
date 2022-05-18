const mongoose = require('mongoose')
const {Schema } = mongoose;

// schema of model @ applications

const announcementTeacherSchema = new Schema({
  announcement: {
   type: String,
   require: true
  },
  announcement_file: {
   type: String,
   require: true
  },
  date: {
   type: String,
   require: true
  },
  destination: {
   type: String,
   require: true
  },
  announcer:[
          {
          type: Schema.Types.ObjectId,
          ref: 'Student'
          },
  ],
},{ versionKey: false })

// export of model @ student

module.exports = mongoose.model('AnnouncementTeacher',announcementTeacherSchema)