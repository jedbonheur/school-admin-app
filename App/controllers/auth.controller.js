require("dotenv").config();
const User = require('../models/user')
const Student = require('../models/students')
const Teacher = require('../models/teachers')
const Admin = require('../models/admin')



const secret = process.env.JWT_SECRET
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs')

exports.signin = async (req, res) => {
   const username = req.body.username
   const role = req.body.role
   const password = req.body.password
   
   const GetUser = () => {
    const therole =  role === 'student' ? Student : role === 'teacher' ? Teacher : role === 'admin' ? Admin : 'null';
    return therole
   }
   
   // student
  if(role === 'student'){
    Student.findOne({
      username : username
    }).populate(['courses'])
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
      .populate(['studentApplication_id']).lean()
    .exec((err, user) => {
     if(err){
      return res.status(401).json(
       {
        status:401,
        message: "something went wrong. try again later!"
       })
      }
      if (!user) {
       return res.status(404).json(
        {
         status:404,
         message: "User don't exist"
        })
       }
       
        const passwordIsValid =  bcrypt.compareSync(
          req.body.password.toString(),
          user.password
        );
        if (!passwordIsValid) {
          return res.status(401).send({
            accessToken: null,
            message: "Invalid Password!"
          });
        }
  
  
        const token = jwt.sign({ user_id: user.id }, secret, {
          expiresIn: 1000 * 5 // 24 hours
        });
        const {password, ...userRest} = user
  
        res.status(200).json(
            {
              status: 200,
              data: {
              ...userRest,
               accessToken: token
              },
              message: "success"
            });
      })
  }

  if(role === 'admin'){
    Admin.findOne({
      username : username
    }).lean()
    .exec((err, user) => {
     if(err){
      return res.status(401).json(
       {
        status:401,
        message: "something went wrong. try again later!"
       })
      }
      if (!user) {
       return res.status(404).json(
        {
         status:404,
         message: "User don't exist"
        })
       }
       
        const passwordIsValid =  bcrypt.compareSync(
          req.body.password.toString(),
          user.password
        );
        if (!passwordIsValid) {
          return res.status(401).send({
            accessToken: null,
            message: "Invalid Password!"
          });
        }
  
  
        const token = jwt.sign({ user_id: user.id }, secret, {
          expiresIn: 1000 * 5 // 24 hours
        });
        const {password, ...userRest} = user
  
        res.status(200).json(
            {
              status: 200,
              data: {
              ...userRest,
               accessToken: token
              },
              message: "success"
            });
      })
  }

  // teacher 
  if(role === 'teacher'){
    Teacher.findOne({
      username : username
    }).lean()
    .exec((err, user) => {
     if(err){
      return res.status(401).json(
       {
        status:401,
        message: "something went wrong. try again later!"
       })
      }
      if (!user) {
       return res.status(404).json(
        {
         status:404,
         message: "User don't exist"
        })
       }
       
        const passwordIsValid =  bcrypt.compareSync(
          req.body.password.toString(),
          user.password
        );
        if (!passwordIsValid) {
          return res.status(401).send({
            accessToken: null,
            message: "Invalid Password!"
          });
        }
  
  
        const token = jwt.sign({ user_id: user.id }, secret, {
          expiresIn: 1000 * 5 // 24 hours
        });
        const {password, ...userRest} = user
  
        res.status(200).json(
            {
              status: 200,
              data: {
              ...userRest,
               accessToken: token
              },
              message: "success"
            });
      })
  }
  
};
