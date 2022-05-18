import React, {useContext} from 'react';
import {AppContext} from '../../contexts/AppContext'
import styled from "styled-components";
import moment from 'moment';
const StudentProfile = () => {
const {
    user,
} = useContext(AppContext)
 
 return (
  <ProfileWrapper
  user={user}
  >
     <h2>About Me</h2>
     <div className="student-info">
        <div className="student-image">
        </div>
        <div className="information">
          <div className="box-wrapper">
            <table>
             <tbody>
               <tr>
                  <td className="key">Full Name:</td>
                  <td className="value">{user.firstName} {user.lastName}</td>
               </tr> 
               <tr>
                  <td className="key">Student Id:</td>
                  <td className="value">{user.studentId}</td>
               </tr> 
               <tr>
                  <td className="key">Department:</td>
                  <td className="value">{user.program}</td>
               </tr> 
               <tr>
                  <td className="key">Email:</td>
                  <td className="value">{user.email}</td>
               </tr> 
               <tr>
                  <td className="key">Address:</td>
                  <td className="value">{user.address}</td>
               </tr> 
               <tr>
                  <td className="key">Date of Birth:</td>
                  <td className="value">{moment(user.dob).format('D MMM YYYY')}</td>
               </tr>
               </tbody> 
            </table>
          </div>
        </div>    
     </div>
     <div className="school-info-wrapper">
       <div className="school-info">
         <div>
          <span className="title">Semester</span>
          <span>{user.semester}</span>
         </div>
         <div>
          <span className="title">program</span>
          <span>{user.program}</span>
         </div>
         <div>
           <span className="title"> Gender</span>
           <span>{user.gender}</span>
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
    background-image: url(${({user}) => user.user_photo ? `"${user.user_photo}"` : '/images/userimage-holder.png'});
}
.student-info {
    display: flex;
    flex-wrap: wrap;
    align-items: stretch;
    gap: 1rem;
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
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
    justify-content: space-around;
}.school-info div {
    background: #3498ec;
    padding: 1rem;
    border-radius: 7px;
    text-align: center;
    text-transform: capitalize;
    color: #fff;
    line-height: 2;
    flex: 1;
}.school-info div span {
    display: block;
}
.school-info-wrapper {
    width: 100%;
    padding: 1.5rem 0;
}
span.title {
    background: #ffc107;
    border-radius: 25px;
    color: black;
    margin-bottom: 10px
}

`

export default StudentProfile;