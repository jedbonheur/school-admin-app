require("dotenv").config();
const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const Application = require('../models/application')
const Student = require('../models/students')
const Admin = require('../models/admin')
const Course = require('../models/courses')
const Teacher = require('../models/teachers')
const AnnouncementStudent = require('../models/announcementStudents')
const AnnouncementTeacher = require('../models/announcementTeachers')
const Exam = require('../models/exam')
const Assignment = require('../models/assignment')
const TeachersApplication = require('../models/teachersApplication')
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })
const { uploadFile} = require('../s3-functions/s3')
const dayjs = require('dayjs')
const {generatePassword,sendEmail,getMessage,getimage} = require('../helper/helperFunctions')




  // add new endpoints here 👇
  // ***********************************************************************************************
  // @method POST
  // @route /approve-registration/:registration_id
  // @desc approve teacher registration
  // _____________________________________________
  // *********************************************
  router.post('/approve-registration/:registration_id', async (req, res) => {
      const registration_id = req.params.registration_id
      const getGeneratedPassword = generatePassword()
      const RegistrationData = await TeachersApplication.findById(registration_id).lean()

      const {email,firstName,lastName} = RegistrationData
      const RandomPassWord = bcrypt.hashSync(getGeneratedPassword, 8)
      
    
      //check if the user does not already exist 
     Teacher.find(
        {
          email: email
        }
      ).then(
        (doc,err)=> {
        if(err){
          return res.status(401).json(
              { 
                status:401, 
                message: "something went wrong. try again later!" 
              })
          }


          if(doc.length >= 1 ){
          return res.status(500).json(
            { 
              status:500, 
              message: "Email exist all ready in our database" 
            })
          }else {
            const {
                    _id : teacherRegistration_id, 
                    ...rest
                  } = RegistrationData
 
                  const newTeacher = new Teacher(
                    {
                    ...rest, 
                    teacherRegistration_id:teacherRegistration_id,
                    username : email,
                    role : 'teacher',
                    password: RandomPassWord,
                  })

                  newTeacher.save().then((doc,err) => {
                      if(err){
                          return res.status(401).json(
                          { 
                            status:401, 
                            message: "something went wrong. try again later!" 
                          })
                      }
                      const fullName = firstName + " " + lastName
                      sendEmail(email, "Registration Confirmation", getMessage(fullName,email,'teacher',getGeneratedPassword))
                      res.status(200).json(
                          { 
                            status:200, 
                            message: "ok" 
                      })
                  })
              TeachersApplication.updateOne(
              { 
                  _id:registration_id
              },
              {
              $set: {
                      "status" : "approved",
                    }
            },(err,data) => {
                  if(err){
                      return res.status(401).json(
                      { 
                        status:401, 
                        message: "something went wrong. try again later!" 
                      })
                  }
              }
            )
          }
         }
      )
       
    })
  // @method POST
  // @route /admitStudent/:application_id
  // @desc admit a student
  // _____________________________________________
  // *********************************************
  router.post('/admitStudent/:application_id', async (req, res) => {
      const application_id = req.params.application_id
      const getGeneratedPassword = generatePassword()
      Application.updateOne(
        { 
            _id:application_id
        },
        {
        $set: {
                "status" : "approved",
              }
       },(err,data) => {
            if(err){
                return res.status(401).json(
                { 
                  status:401, 
                  message: "something went wrong. try again later!" 
                })
            }
        }
      )

      const ApplicationData = await Application.findById(application_id).lean()
      const {email,firstName,lastName} = ApplicationData
      const RandomPassWord = bcrypt.hashSync(getGeneratedPassword, 8)
      
      //check if the user does not already exist 
      Student.find(
          {
            email: email
          }
      ).then((doc,err) => {
        if(err){
          return res.status(401).json(
              { 
                status:401, 
                message: "something went wrong. try again later!" 
              })
          }
          
          if(doc.length >= 1 ){
          return res.status(500).json(
            { 
              status:500, 
              message: "Email exist all ready" 
            })
          }else {
            const {
              _id : studentApplication_id,
               ...rest
            }= ApplicationData
            const newStudent = new Student(
              {
              ...rest, 
              studentApplication_id:studentApplication_id,
              username : email,
              role : 'student',
              password: RandomPassWord,
            })

            newStudent.save().then((doc,err) => {
                if(err){
                    return res.status(401).json(
                    { 
                      status:401, 
                      message: "something went wrong. try again later!" 
                    })
                }
                const fullName = firstName + " " + lastName
                sendEmail(email, "Registration Confirmation", getMessage(fullName,email,'student',getGeneratedPassword))
                res.status(200).json(
                    { 
                      status:200, 
                      message: "ok" 
                })
            }) 

          }
      })
    })

  // @method POST
  // @route /reject-registration/:application_id
  // @desc reject registration
  // _____________________________________________
  // *********************************************
  router.post('/reject-registration/:application_id', async (req, res) => {
      const application_id = req.params.application_id
      TeachersApplication.updateOne(
        { 
            _id:application_id
        },
        {
        $set: {
                "status" : "rejected",
              }
       },(err,data) => {
            if(err){
                return res.status(401).json(
                { 
                  status:401, 
                  message: "something went wrong. try again later!" 
                })
            }
            res.status(200).json(
              { 
                status:200, 
                message: "ok" 
          })
        }
      )
    })
  // @method Post
  // @route /add-announcement-teacher/
  // @desc add announcement teacher
  // _____________________________________________
  // *********************************************

  const TeacherAnnouncementUpload = upload.fields(
    [
      { name: 'announcement_file', maxCount: 1 },
    ]
  )
  router.post('/add-announcement-teachers/:announcer_id', TeacherAnnouncementUpload, async (req, res) => {
      const announcer = req.params.announcer_id
      const announcement = req.body.announcement
      const destination = req.body.destination
      const date = new Date()

      const awsURL = process.env.AWS_URL
      const uploadAnnouncement = await uploadFile(req.files['announcement_file'][0])
      const announcement_file = `${awsURL}${req.files['announcement_file'][0].originalname}`


      const newAnnouncement = new AnnouncementTeacher(
      {announcer, announcement, date, destination, announcement_file});
    
    newAnnouncement.save().then((doc,err) => {
         if(err){
            return res.status(401).json(
            { 
              status:401, 
              message: "something went wrong. try again later!" 
            })
         }
         res.status(200).json(
            { 
              status:200, 
              message: "ok" 
        })
    })

    })
  // @method Post
  // @route /add-announcement-student/
  // @desc add announcement student
  // _____________________________________________
  // *********************************************

  const AnnouncementUpload = upload.fields(
    [
      { name: 'announcement_file', maxCount: 1 },
    ]
  )
  router.post('/add-announcement-students/:announcer_id', AnnouncementUpload, async (req, res) => {
      const announcer = req.params.announcer_id
      const announcement = req.body.announcement
      const destination = req.body.destination
      const date = new Date()

      const awsURL = process.env.AWS_URL
      const uploadAnnouncement = await uploadFile(req.files['announcement_file'][0])
      const announcement_file = `${awsURL}${req.files['announcement_file'][0].originalname}`


      const newAnnouncement = new AnnouncementStudent(
      {announcer, announcement, date, destination, announcement_file});
    
    newAnnouncement.save().then((doc,err) => {
         if(err){
            return res.status(401).json(
            { 
              status:401, 
              message: "something went wrong. try again later!" 
            })
         }
         res.status(200).json(
            { 
              status:200, 
              message: "ok" 
        })
    })

    })
  // @method GET
  // @desc get-teacher-announcement
  // _____________________________________________
  // *********************************************
  router.get('/get-studemt-announcement/', async (req, res) => {
      AnnouncementStudent.find()
      .populate(['announcer'])
      .then(data => {
              res.status(200).json(
                { 
                  status: 200, 
                  data: data,
                  message: "success" 
                });
            })
            .catch(err => {
              res.status(err).json(
                { 
                  status: err,  
                  message: "error" 
                });
            })
    })
  // @method GET
  // @desc get-teacher-announcement
  // _____________________________________________
  // *********************************************
  router.get('/get-instructors/', async (req, res) => {
      Teacher.find()
      .then(data => {
              res.status(200).json(
                { 
                  status: 200, 
                  data: data,
                  message: "success" 
                });
            })
            .catch(err => {
              res.status(err).json(
                { 
                  status: err,  
                  message: "error" 
                });
            })
    })
  // @method GET
  // @desc get-teacher-announcement
  // _____________________________________________
  // *********************************************
  router.get('/get-teacher-announcement/', async (req, res) => {
      AnnouncementTeacher.find()
      .populate(['announcer'])
      .then(data => {
              res.status(200).json(
                { 
                  status: 200, 
                  data: data,
                  message: "success" 
                });
            })
            .catch(err => {
              res.status(err).json(
                { 
                  status: err,  
                  message: "error" 
                });
            })
    })
  // @method GET
  // @desc get-teacher-dashboard
  // _____________________________________________
  // *********************************************
  router.get('/get-teacher-dashboard/:teacher_id', async (req, res) => {
      const teacher_id= req.params.teacher_id
      Course.find({'instructor' : teacher_id})
      .populate(['students'])
      .then(data => {
              res.status(200).json(
                { 
                  status: 200, 
                  data: data,
                  message: "success" 
                });
            })
            .catch(err => {
              res.status(err).json(
                { 
                  status: err,  
                  message: "error" 
                });
            })
    })
  // @method GET
  // @route /get-dashboard/
  // @desc get-dashboard
  // _____________________________________________
  // *********************************************
  router.get('/get-admin-dashboard/', async (req, res) => {
      const Applications = await Application.find()
      const Teachers = await Teacher.find()
      Student.find()
      .then(data => {
              res.status(200).json(
                { 
                  status: 200, 
                  data: {
                    students: data,
                    Teachers: Teachers,
                    Applications: Applications,
                  }, 
                  message: "success" 
                });
            })
            .catch(err => {
              res.status(err).json(
                { 
                  status: err,  
                  message: "error" 
                });
            })
    })
  // @method POST
  // @route /Reject/:application_id
  // @desc reject admission
  // _____________________________________________
  // *********************************************
  router.post('/rejectApplication/:application_id', async (req, res) => {
      const application_id = req.params.application_id
      Application.updateOne(
        { 
            _id:application_id
        },
        {
        $set: {
                "status" : "rejected",
              }
       },(err,data) => {
            if(err){
                return res.status(401).json(
                { 
                  status:401, 
                  message: "something went wrong. try again later!" 
                })
            }
            res.status(200).json(
              { 
                status:200, 
                message: "ok" 
          })
        }
      )
    })
  // @method Put
  // @route /removeclass/:studentId
  // @desc remove a class 
  // _____________________________________________
  // *********************************************
  router.post('/removeclass-teacher/:teacherId', async (req, res) => {
     
      const teacherId = req.params.teacherId
      const courseId = req.body.courseId
      
      Teacher.updateOne(
        { 
            _id:teacherId
        },
        {
        $pull: {
                "courses" : courseId,
               }
       },(err,data) => {
            if(err){
                return res.status(401).json(
                { 
                  status:401, 
                  message: "something went wrong. try again later!" 
                })
            }
        }
      )

      Course.updateOne(
        { 
            _id: courseId
        },
        {
        $pull: {
                "instructor" : teacherId,
               }
       },(err,data) => {
            if(err){
                return res.status(401).json(
                { 
                  status:401, 
                  message: "something went wrong. try again later!" 
                })
            }
           res.status(200).json(
              { 
                status:200, 
                message: "ok" 
          })
        }
      )
    })
  // @method Put
  // @route /removeclass/:studentId
  // @desc remove a class 
  // _____________________________________________
  // *********************************************
  router.post('/removeclass-student/:studentId', async (req, res) => {
     
      const studentId = req.params.studentId
      const courseId = req.body.courseId
      
      Student.updateOne(
        { 
            _id:studentId
        },
        {
        $pull: {
                "courses" : courseId,
               }
       },(err,data) => {
            if(err){
                return res.status(401).json(
                { 
                  status:401, 
                  message: "something went wrong. try again later!" 
                })
            }
        }
      )

      Course.updateOne(
        { 
            _id: courseId
        },
        {
        $pull: {
                "students" : studentId,
               }
       },(err,data) => {
            if(err){
                return res.status(401).json(
                { 
                  status:401, 
                  message: "something went wrong. try again later!" 
                })
            }
           res.status(200).json(
              { 
                status:200, 
                message: "ok" 
          })
        }
      )
    })

  // @method POST
  // @route /assignClass/:studentId
  // @desc assign a Class to a student 
  // _____________________________________________
  // *********************************************
  router.post('/assignClass/:studentId', async (req, res) => {
     
      const studentId = req.params.studentId
      const courseId = req.body.courseId
      
      Student.updateOne(
        { 
            _id:studentId
        },
        {
        $push: {
                "courses" : courseId,
               }
       },(err,data) => {
            if(err){
                return res.status(401).json(
                { 
                  status:401, 
                  message: "something went wrong. try again later!" 
                })
            }
        }
      )

      Course.updateOne(
        { 
            _id: courseId
        },
        {
        $push: {
                "students" : studentId,
               }
       },(err,data) => {
            if(err){
                return res.status(401).json(
                { 
                  status:401, 
                  message: "something went wrong. try again later!" 
                })
            }
           res.status(200).json(
              { 
                status:200, 
                message: "ok" 
          })
        }
      )
    })
  // @method POST
  // @route /assignAssingment/:assignment_id
  // @desc assign a assignment to a class 
  // _____________________________________________
  // *********************************************
  router.post('/assign-assingment/:assignment_id', async (req, res) => {
     
      const assignment_id = req.params.assignment_id
      const courseId = req.body.courseId

      Course.updateOne(
        { 

            _id:courseId
        },
        {
        $push: {
                "assignments" : assignment_id,
               }
       },(err,data) => {
            if(err){
                return res.status(401).json(
                { 
                  status:401, 
                  message: "something went wrong. try again later!" 
                })
            }
            res.status(200).json(
              { 
                status:200, 
                message: "ok" 
          })
        }
      )
    })
  // @method POST
  // @route /release-exam/:assignment_id
  // @desc release exam  
  // _____________________________________________
  // *********************************************
  router.post('/release-assingment/:exam_id', async (req, res) => {
     
      const exam_id = req.params.exam_id
      const courseId = req.body.courseId

      Course.updateOne(
        { 

            _id:courseId
        },
        {
        $push: {
                "exams" : exam_id,
               }
       },(err,data) => {
            if(err){
                return res.status(401).json(
                { 
                  status:401, 
                  message: "something went wrong. try again later!" 
                })
            }
            res.status(200).json(
              { 
                status:200, 
                message: "ok" 
          })
        }
      )
    })
  // @method POST
  // @route /assignClass/:teacherId
  // @desc assign a Class to a teacher 
  // _____________________________________________
  // *********************************************
  router.post('/assignClassTeacher/:teacherId', async (req, res) => {
     
      const teacherId = req.params.teacherId
      const courseId = req.body.courseId
      
      Teacher.updateOne(
        { 
            _id:teacherId
        },
        {
        $push: {
                "courses" : courseId,
               }
       },(err,data) => {
            if(err){
                return res.status(401).json(
                { 
                  status:401, 
                  message: "something went wrong. try again later!" 
                })
            }
        }
      )

      Course.updateOne(
        { 
            _id: courseId
        },
        {
        $push: {
                "instructor" : teacherId,
               }
       },(err,data) => {
            if(err){
                return res.status(401).json(
                { 
                  status:401, 
                  message: "something went wrong. try again later!" 
                })
            }
           res.status(200).json(
              { 
                status:200, 
                message: "ok" 
          })
        }
      )
    })

 // @method get
  // @route /allclass/
  // @desc get ALL CLASSES
  // _____________________________________________
  // *********************************************
  router.get('/allclass/', (req, res) => {
   
    Course.find()
    .then(data => {
        res.status(200).json(
          { 
            status: 200, 
            data: data, 
            message: "success" 
          });
      })
      .catch(err => {
        res.status(err).json(
          { 
            status: err,  
            message: "error" 
          });
      })
  })


  // @method get
  // @route /getAdmin/:admin_id
  // @desc get teacher
  // _____________________________________________
  // *********************************************
  router.get('/getAdmin/:admin_id', async (req, res) => {
   
    const id = req.params.admin_id;
    Admin.findOne({_id: id})
    .then(data => {
        res.status(200).json(
          { 
            status: 200, 
            data: data, 
            message: "success" 
          });
      })
      .catch(err => {
        res.status(err).json(
          { 
            status: err,  
            message: "error" 
          });
      })
  })
  // @method get
  // @route /getTeacher/:teacherId
  // @desc get teacher
  // _____________________________________________
  // *********************************************
  router.get('/getTeacher/:teacherId', async (req, res) => {
   
    const id = req.params.teacherId;
    Teacher.findOne({_id: id})
    .populate(['courses'])
    .populate(['teacherRegistration_id'])
    .then(data => {
        res.status(200).json(
          { 
            status: 200, 
            data: data, 
            message: "success" 
          });
      })
      .catch(err => {
        res.status(err).json(
          { 
            status: err,  
            message: "error" 
          });
      })
  })
  // @method get
  // @route /admitStudent/:application_id
  // @desc get Student
  // _____________________________________________
  // *********************************************
  router.get('/getStudent/:studentId', async (req, res) => {
   
    const id = req.params.studentId;
    Student.findOne({_id: id})
    .populate(['courses'])
    .populate({ 
     path: 'courses',
      populate: {
        path: 'assignments',
        match: {'due_date' : {$gt: new Date().toISOString()} },
        model: 'Assignment'
      } 
    })
    .populate({ 
     path: 'courses',
      populate: {
        path: 'exams',
        // match: {'available_date' : {$lt: new Date().toISOString()} },
        model: 'Exam'
      } 
    })
    .populate({ 
     path: 'courses',
      populate: {
        path: 'instructor',
        model: 'Teacher'
      } 
    })
    .populate(['studentApplication_id'])
    .then(data => {
        res.status(200).json(
          { 
            status: 200, 
            data: data, 
            message: "success" 
          });
      })
      .catch(err => {
        res.status(err).json(
          { 
            status: err,  
            message: "error" 
          });
      })
  })

  // @method POST
  // @route Add a assignment/
  // @desc 
  // _____________________________________________
  // *********************************************
     
  const AssignmentUpload = upload.fields(
    [
      { name: 'assignment', maxCount: 1 },
    ]
  )

  router.post('/add-assignment/:instructor_id', AssignmentUpload, async (req, res) => {
      const courseId = req.body.courseId
      const instructor_id = req.params.instructor_id
      const assignment_name = req.body.assignment_name
      const due_date = req.body.due_date
      const awsURL = process.env.AWS_URL
      const uploadAssignment = await uploadFile(req.files['assignment'][0])
      const assignment = `${awsURL}${req.files['assignment'][0].originalname}`
      const instructor = [instructor_id]
      const course = [courseId]
      

      const newAssignment = new Assignment(
      {assignment_name, due_date, assignment,instructor,course});
    
    newAssignment.save().then((doc,err) => {
         if(err){
            return res.status(401).json(
            { 
              status:401, 
              message: "something went wrong. try again later!" 
            })
         }
         res.status(200).json(
            { 
              status:200, 
              message: "ok" 
        })
    })
  })
  // @method Exam
  // @route add-exam/
  // @desc 
  // _____________________________________________
  // *********************************************
     
  const ExamUpload = upload.fields(
    [
      { name: 'exam', maxCount: 1 },
    ]
  )

  router.post('/add-exam/:instructor_id', ExamUpload, async (req, res) => {
    const courseId = req.body.courseId
      const exam_name = req.body.exam_name
      const available_date = req.body.available_date
      const instructor_id = req.params.instructor_id
      const awsURL = process.env.AWS_URL
      const uploadAssignment = await uploadFile(req.files['exam'][0])
      const exam = `${awsURL}${req.files['exam'][0].originalname}`
      const instructor = [instructor_id]
      const course = [courseId]
      

      const newExam = new Exam(
      {exam_name, available_date, exam,instructor,course});
    
    newExam.save().then((doc,err) => {
         if(err){
            return res.status(401).json(
            { 
              status:401, 
              message: "something went wrong. try again later!" 
            })
         }
         res.status(200).json(
            { 
              status:200, 
              message: "ok" 
        })
    })
  })

  // @method POST
  // @route Add a class/
  // @desc s
  // _____________________________________________
  // *********************************************
   
  router.post('/addCourse/:teacherId', async (req, res) => {
      const teacherId = req.params.teacherId
      const course_name = req.body.course_name
      const course_depertment = req.body.course_depertment
      const schedule = req.body.schedule
      const digitCode = Math.floor(Math.random() * 899) + 111;
      const courseInitial = course_name.split(" ").join('').substring(0,3).toUpperCase()
      const course_code = courseInitial + digitCode

      const newCourse = new Course(
      {course_code ,course_name, course_depertment, schedule});
    
    newCourse.save().then((doc,err) => {
         if(err){
            return res.status(401).json(
            { 
              status:401, 
              message: "something went wrong. try again later!" 
            })
         }
Teacher.updateOne(
        { 
            _id:teacherId
        },
        {
        $push: {
                "courses" : doc._id,
               }
       },(err,data) => {
            if(err){
                return res.status(401).json(
                { 
                  status:401, 
                  message: "something went wrong. try again later!" 
                })
            }
        }
      )

      Course.updateOne(
        { 
            _id: doc._id
        },
        {
        $push: {
                "instructor" : teacherId,
               }
       },(err,data) => {
            if(err){
                return res.status(401).json(
                { 
                  status:401, 
                  message: "something went wrong. try again later!" 
                })
            }
           res.status(200).json(
              { 
                status:200, 
                message: "ok" 
          })
        }
      )
    })
  })

  // @method POST
  // @route admin-register/
  // @desc admin-register
  // _____________________________________________
  // *********************************************
   
  // to be added
  const adminUpload = upload.fields(
    [
      { name: 'user_photo', maxCount: 1 },
    ]
  )
  router.post('/admin-register', adminUpload, async (req, res) => {
      const awsURL = process.env.AWS_URL
      const uploadaUser_photo = await uploadFile(req.files['user_photo'][0])
      const user_photo = `${awsURL}${req.files['user_photo'][0].originalname}`
      const firstName = req.body.fname
      const lastName = req.body.lname
      const gender = req.body.gender
      const email = req.body.email
      const dob = req.body.dob
      const address = req.body.address
      const getGeneratedPassword = generatePassword()
      const RandomPassWord = bcrypt.hashSync(getGeneratedPassword, 8)
      Admin.find(
        {
          email: email
        }
      ).then(
        (doc,err)=> {
        if(err){
          return res.status(401).json(
              { 
                status:401, 
                message: "something went wrong. try again later!" 
              })
          }
        
          if(doc.length >= 1 ){
          return res.status(500).json(
            { 
              status:500, 
              message: "Email exist all ready" 
            })
          }else {
            const newAdmin = new Admin(
            {firstName, lastName, gender, email, dob, address, user_photo,
            username : email,
            role : 'admin',
            password: RandomPassWord,
            });

            newAdmin.save().then((doc,err) => {
                if(err){
                    return res.status(401).json(
                    { 
                      status:401, 
                      message: "something went wrong. try again later!" 
                    })
                }
                const fullName = firstName + " " + lastName
                sendEmail(email, "Registration Confirmation", getMessage(fullName,email,'admin',getGeneratedPassword))
                res.status(200).json(
                    { 
                      status:200, 
                      message: "ok" 
                })
            })
          }
        })
  })
  // @method POST
  // @route apply/
  // @desc sent application
  // _____________________________________________
  // *********************************************
   
  // to be added
  const cpUpload = upload.fields(
    [
      { name: 'user_photo', maxCount: 1 },
      { name: 'motivational_letter', maxCount: 1}
    ]
  )
  router.post('/apply', cpUpload, async (req, res) => {
      const awsURL = process.env.AWS_URL
      const uploadaUser_photo = await uploadFile(req.files['user_photo'][0])
      const uploadMotivational_letter = await uploadFile(req.files['motivational_letter'][0])
      const user_photo = `${awsURL}${req.files['user_photo'][0].originalname}`
      const motivational_letter = `${awsURL}${req.files['motivational_letter'][0].originalname}`
      const firstName = req.body.fname
      const lastName = req.body.lname
      const gender = req.body.gender
      const email = req.body.email
      const dob = req.body.dob
      const program = req.body.program
      const semester = req.body.semester
      const address = req.body.address
      const status = "pending"
      const newApplication = new Application(
      {firstName, lastName, gender, email, dob, program,semester, address, user_photo,motivational_letter,status});
    
    newApplication.save().then((doc,err) => {
         if(err){
            return res.status(401).json(
            { 
              status:401, 
              message: "something went wrong. try again later!" 
            })
         }
         res.status(200).json(
            { 
              status:200, 
              message: "ok" 
        })
    })
  })
  // @method POST
  // @route /teacher-registration/
  // @desc teacher registration
  // _____________________________________________
  // *********************************************
   
  // to be added
  const teacherUpload = upload.fields(
    [
      { name: 'user_photo', maxCount: 1 },
      { name: 'degree', maxCount: 1}
    ]
  )
  router.post('/teacher-registration/', teacherUpload, async (req, res) => {
      const awsURL = process.env.AWS_URL
      const upload_photo = await uploadFile(req.files['user_photo'][0])
      const upload_degree = await uploadFile(req.files['degree'][0])
      const user_photo = `${awsURL}${req.files['user_photo'][0].originalname}`
      const degree = `${awsURL}${req.files['degree'][0].originalname}`
      const firstName = req.body.fname
      const lastName = req.body.lname
      const gender = req.body.gender
      const email = req.body.email
      const dob = req.body.dob
      const address = req.body.address
      const program = req.body.program
      const status = "pending"
      const newTeacher = new TeachersApplication(
      {firstName, lastName, gender, email, dob, program, address, user_photo,degree,status});
    
    newTeacher.save().then((doc,err) => {
         if(err){
            return res.status(401).json(
            { 
              status:401, 
              message: "something went wrong. try again later!" 
            })
         }
         res.status(200).json(
            { 
              status:200, 
              message: "ok" 
        })
    })
  })
  // @method get
  // @route 
  // @desc get All Applications
  // _____________________________________________
  // *********************************************
  router.get('/getApplications/', async (req, res) => {
    const { page, limit} = req.query
    const count = await Application.countDocuments()
    Application.find()
    .limit(limit*1)
    .skip((page -1) * limit)
    .then(data => {
        res.status(200).json(
          { 
            status: 200, 
            data,
            totalPages: Math.ceil(count/limit),
            message: "success" 
          });
      })
      .catch(err => {
        res.status(err).json(
          { 
            status: err,  
            message: "error" 
          });
      })
  })
  // @method get
  // @route 
  // @desc get All teachers registration 
  // _____________________________________________
  // *********************************************
  router.get('/getallregistrations/', async (req, res) => {
    const { page, limit} = req.query
    const count = await TeachersApplication.countDocuments()
    TeachersApplication.find()
    .limit(limit*1)
    .skip((page -1) * limit)
    .then(data => {
        res.status(200).json(
          { 
            status: 200, 
            data,
            totalPages: Math.ceil(count/limit),
            message: "success" 
          });
      })
      .catch(err => {
        res.status(err).json(
          { 
            status: err,  
            message: "error" 
          });
      })
  })
  // @method get
  // @route getAllStudents
  // @desc get All Students
  // _____________________________________________
  // *********************************************
  router.get('/getAllStudents/', async (req, res) => {
    const { page, limit} = req.query
    const count = await Student.countDocuments()
    Student.find()
    .limit(limit*1)
    .skip((page -1) * limit)
    .then(data => {
        res.status(200).json(
          { 
            status: 200, 
            data,
            totalPages: Math.ceil(count/limit),
            message: "success" 
          });
      })
      .catch(err => {
        res.status(err).json(
          { 
            status: err,  
            message: "error" 
          });
      })
  })
  // @method get
  // @route getAllTeachers
  // @desc get All Teachers
  // _____________________________________________
  // *********************************************
  router.get('/getAllTeachers/', async (req, res) => {
    const { page, limit} = req.query
    const count = await Teacher.countDocuments()
    Teacher.find()
    .limit(limit*1)
    .skip((page -1) * limit)
    .then(data => {
        res.status(200).json(
          { 
            status: 200, 
            data,
            totalPages: Math.ceil(count/limit),
            message: "success" 
          });
      })
      .catch(err => {
        res.status(err).json(
          { 
            status: err,  
            message: "error" 
          });
      })
  })
  // @method get
  // @route 
  // @desc get  Application
  // _____________________________________________
  // *********************************************
  router.get('/getApplication/:applicationId', (req, res) => {
    const applicationId = req.params.applicationId;
    Application.findById(applicationId)
    .then(data => {
        res.status(200).json(
          { 
            status: 200, 
            data,
            message: "success" 
          });
      })
      .catch(err => {
        res.status(err).json(
          { 
            status: err,  
            message: "error" 
          });
      })
  })
  // @method get
  // @route /getRegistration/
  // @desc get  Teacher's Registration
  // _____________________________________________
  // *********************************************
  router.get('/getRegistration/:applicationId', (req, res) => {
    const applicationId = req.params.applicationId;
    TeachersApplication.findById(applicationId)
    .then(data => {
        res.status(200).json(
          { 
            status: 200, 
            data,
            message: "success" 
          });
      })
      .catch(err => {
        res.status(err).json(
          { 
            status: err,  
            message: "error" 
          });
      })
  })
  // *******************************************************************************************************
  // add new endpoints here ☝️
  // ---------------------------------
  // Nothing to modify below this line

  // this is our catch all endpoint.
  router.get("*", (req, res) => {
    res.status(404).json({
      status: 404,
      message: "This is obviously not what you are looking for."
    });
  })


module.exports = router;