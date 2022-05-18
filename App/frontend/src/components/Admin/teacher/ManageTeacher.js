import React, {useEffect, useState, useContext} from 'react';
import styled from "styled-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid} from '@fortawesome/fontawesome-svg-core/import.macro'
import moment from 'moment';
import ClassButton from "../../UIs/ClassButton";
import {AppContext} from "../../../contexts/AppContext"
import {useNavigate } from 'react-router-dom';

const axios = require('axios');
const ManageTeacher = ({id}) => {
 const[teacher,setTeacher] = useState(false)
 const[refresh,setRefresh] = useState(false)
 const[schoolClasses,setSchoolClasses] = useState(false)
 const[availableClass,setAvailableClass] = useState(false)
 const navigate = useNavigate();

 const {isMobile} = useContext(AppContext)
 useEffect(() => {
  axios.get(`/getTeacher/${id}`)
   .then(function (response) {
    if(response.status === 200){
      setTeacher(response.data.data)
     }
   })
   .catch(function (error) {
          navigate('/page-404')
   });
 }, [id,refresh]); 
 
 useEffect(() => {
  axios.get(`/allclass/`)
   .then(function (response) {
    if(response.status === 200){
      setSchoolClasses(response.data.data)
     }
   })
   .catch(function (error) {
              navigate('/page-404')
   });
 }, [refresh]); 

 useEffect(() => {
     if(!schoolClasses || !teacher){
       return
     }
     const filteredClassed = schoolClasses.filter((class_Id) => {
      return teacher.courses.every((courseid) => {
        return courseid._id.toString() !== class_Id._id.toString(); 
      });
    });
    setAvailableClass(filteredClassed)
 }, [schoolClasses,teacher,refresh]); 


 const classSelected = (e,id) => {
     e.preventDefault();
    const class_id = document.getElementById('classes').value;
    const body = {
      courseId : class_id
    }
    //assign a student to a class
    axios.post(`/assignClassTeacher/${id}`, body)
     
   .then(function (response) {
    if(response.status === 200){
      setRefresh(!refresh)
     }
   })
   .catch(function (error) {
              navigate('/page-404')
   });
   
 }

 const handleRemoveCourse = (e,teacherId,CourseId) => {
    e.preventDefault();
    const body = {
      courseId : CourseId
    }
    //remove a class to a teacher
    axios.post(`/removeclass-teacher/${teacherId}`, body)
     
   .then(function (response) {
    if(response.status === 200){
      setRefresh(!refresh)
     }
   })
   .catch(function (error) {
            navigate('/page-404')
   });
 }

  
 if(!teacher || !schoolClasses || !availableClass){
  return <p>Loading...</p>
 }

 return (
      <ProfileWrapper
        teacher={teacher}
        isMobile={isMobile}
        >
           <h2>Teacher Space</h2>
           <div className="student-info">
              <div className="student-image">
              </div>
              <div className="information">
                <div className="box-wrapper">
                  <table>
                   <tbody>
                     <tr>
                        <td className="key">Full Name:</td>
                        <td className="value">{teacher.firstName} {teacher.lastName}</td>
                     </tr>  
                     <tr>
                        <td className="key">Department:</td>
                        <td className="value">{teacher.program}</td>
                     </tr> 
                     <tr>
                        <td className="key">Email:</td>
                        <td className="value">{teacher.email}</td>
                     </tr> 
                     <tr>
                        <td className="key">Address:</td>
                        <td className="value">{teacher.address}</td>
                     </tr> 
                     <tr>
                        <td className="key">Date of Birth:</td>
                        <td className="value">{moment(teacher.dob).format('D MMM YYYY')}</td>
                     </tr>
                     </tbody> 
                  </table>
                </div>
              </div>    
           </div>
           <div className="school-info-wrapper">
             <div className="school-info">
               <div className="info-wrapper">
                <span className="title">Degree</span> 
                <span className="letter">
                  <FontAwesomeIcon icon={solid('file-pdf')} />
                  <a href={teacher.degree}>Download</a>
                </span>
               </div>
               <div className="info-wrapper">
                <span className="title">Assigned Class</span>
                <div className="classlist">
                 {
                   teacher.courses.length === 0 && (
                     <p>No Class Assigned</p>
                   )
                 }
                 {
                   teacher.courses.map(course => <ClassButton teacher={teacher} handleRemoveCourse={handleRemoveCourse} key={course._id} course={course}/>)
                 }
                </div>
               </div>
               <div className="info-wrapper">
                 <span className="title"> Add Class</span>
                  <div className="add-class">
                    <select className="select-class" defaultValue="default" name="class" id="classes">
                      <option value="default" disabled >
                        {availableClass.length <= 0 ? 'No class to Add ' : 'Assign class' }
                         
                         </option>
                        {
                        availableClass.map((course) => {
                           return <option className="options" key={course._id} value={course._id} >{course.course_name}</option>
                          }
                        )
                        }
                    </select>
                    <button onClick={(e) => classSelected(e,teacher._id)} className="btn register-class">Register</button>
                  </div>
               </div>
             </div>
           </div>   
        </ProfileWrapper>
 );
};


const ProfileWrapper = styled.div`
.student-image {
    width: 14rem;
    height: 14rem;
    background-position: center;
    background-size: cover;
    border-radius: 7px;
    box-shadow: 0px 0px 5px #0000005e;
    background-image: url(${({teacher}) => teacher.user_photo ? `"${teacher.user_photo}"` : '/images/userimage-holder.png'})
}
.student-info {
    display: flex;
    flex-wrap: wrap;
    align-items: stretch;
    gap: 1rem;
}
.classlist {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
}

.information table {
    height: 100%;
    border-radius: 7px;
    padding: 16px;
}
.box-wrapper {
    height: 100%;
    width: 100%;
    border-radius: 7px;
    box-shadow: 0px 0px 5px #0000005e;
    padding: 16px;
}
td.key {
    color: black;
    font-weight: bold;
}
td.value {
    padding-left: 25px;
    text-transform: capitalize;
}

tbody tr {
    line-height: 1.6;
}

.school-info {
    display: ${({isMobile}) => isMobile ? 'block' : 'flex'};
    gap: 1rem;
    flex-wrap: wrap;
    justify-content: space-around;
}.school-info .info-wrapper {
    background: #3498ec;
    padding: 1rem;
    border-radius: 7px;
    text-align: center;
    text-transform: capitalize;
    color: #fff;
    line-height: 2;
    flex: 1;
    margin: ${({isMobile}) => isMobile ? '5px' : '0px'};
}.school-info div span {
    display: block;
}
.school-info-wrapper {
    width: 100%;
    padding: 1.5rem 0;
}
span.title {
    background: #ffc107;
    border-radius: 5px;
    color: black;
    margin-bottom: 25px;
}

button.btn-approve {
    border: none;
    color: #fff;
    background: green;
    padding: 10px 20px;
}
button.btn-rejected {
    border: none;
    color: #fff;
    background: red;
    padding: 10px 20px;
}
button.btn-refuse {
    border: none;
    color: #fff;
    background: #ae1313;
    padding: 10px 20px;
}

span.status {
    background: yellow;
    color: black;
}

button.status {
    background: #ffc107;
    border: none;
    color: #000;
    padding: 10px 20px;
    text-transform: capitalize;
}


button.btn-approve:hover {
    background: #8bc34a;
    color: black;
    transition: all 200ms ease;
    cursor: pointer;
}
button.btn-refuse:hover {
    background: #ff0000;
    color: black;
    transition: all 200ms ease;
    cursor: pointer;
}
.buttons {
    display: flex !important;
    gap: 10px;
    align-items: center;
    justify-content: center;
}
.docs {
    display: flex !important;
}

span.letter {
    display: flex !important;
    align-items: center;
    gap: 7px;
    justify-content: center;
}

span.letter svg {
    color: white;
    font-size: 29px;
}

span.letter a {
    color: #ffc107;
}

span.letter a:hover {
    color: red;
}

.add-class {
    text-align: center;
    display: flex;
    align-items: center;
    flex-direction: column;
}

button.btn.register-class {
    padding: 7px 28px;
    background: #de5613;
    margin: 1rem 0px;
    border-radius: 3px;
    &:hover {
      background: green;
    color: #fff;
    }
}
select#classes {
    background: #ffc107;
    outline: none;
    border: none;
    padding: 5px;
    text-transform: uppercase;
}


button.btn-approved {
    background: #008000;
    border: none;
    color: #fff;
    padding: 10px 20px;
    text-transform: capitalize;
}


`


export default ManageTeacher;
