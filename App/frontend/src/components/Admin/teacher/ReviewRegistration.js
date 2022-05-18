import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid} from '@fortawesome/fontawesome-svg-core/import.macro'
import moment from 'moment';
import {useNavigate } from 'react-router-dom';
const axios = require('axios');

const ReviewRegistration = ({id,setAdmissionRefresh,admissionRefresh}) => {
 const[application,setApplication] = useState(false)
 const[refresh,setRefresh] = useState(false)
 const[actionError,setActionError] = useState(false)
 const navigate = useNavigate();

  useEffect(() => {
  axios.get(`/getRegistration/${id}`)
   .then(function (response) {
    if(response.status === 200){
      setApplication(response.data.data)
     }
   })
   .catch(function (error) {
              navigate('/page-404')
   });
 }, [id,refresh]); 

 const approveApplication = (id) => {
   axios.post(`/approve-registration/${id}`)
   .then(function (response) {
    if(response.status === 200){
      setRefresh(!refresh)
      setAdmissionRefresh(!admissionRefresh)
      setActionError(false)
     }
   })
   .catch(function (error) {
          setActionError(error.response.data.message)
   });
 }
 const approveReject = () => {
   axios.post(`/reject-registration/${id}`)
   .then(function (response) {
    if(response.status === 200){
      setRefresh(!refresh)
      setAdmissionRefresh(!admissionRefresh)
      setActionError(false)
     }
   })
   .catch(function (error) {
         setActionError(error.response.data.message)
   });
 }
  
 if(!application){
  return <p>Loading...</p>
 }

 return (
      <ProfileWrapper
        application={application}
        >
           <h2>Teacher's Registration</h2>
           <div className="student-info">
              <div className="student-image">
              </div>
              <div className="information">
                <div className="box-wrapper">
                  <table>
                   <tbody>
                     <tr>
                        <td className="key">Full Name:</td>
                        <td className="value">{application.firstName} {application.lastName}</td>
                     </tr> 
                     <tr>
                        <td className="key">Department:</td>
                        <td className="value">{application.program}</td>
                     </tr> 
                     <tr>
                        <td className="key">Email:</td>
                        <td className="value">{application.email}</td>
                     </tr> 
                     <tr>
                        <td className="key">Address:</td>
                        <td className="value">{application.address}</td>
                     </tr> 
                     <tr>
                        <td className="key">Date of Birth:</td>
                        <td className="value">{moment(application.dob).format('D MMM YYYY')}</td>
                     </tr>
                     </tbody> 
                  </table>
                </div>
              </div>    
           </div>
           {
              actionError && (
                <p className="erroaction">       
                <FontAwesomeIcon icon={solid('triangle-exclamation')} /> 
                {actionError}</p>
              )
              
           }
           <div className="school-info-wrapper">
             <div className="school-info">
               <div>
                <span className="title">Degree</span> 
                <span className="letter">
                  <FontAwesomeIcon icon={solid('file-pdf')} />
                  <a href={application.degree}>Download</a>
                </span>
               </div>
               <div>
                <span className="title">Status</span>
                
                <button className="status">
                 {application.status === "approved" ? 'approved' : application.status === "pending" ? 'pending' : 'rejected'}
                 </button>
               </div>
               <div>
                 <span className="title"> Decision</span>
                 <span className="buttons">
                 {
                  application.status === 'approved' && (
                   <button className="btn-approved">Approved</button>
                  )
                 }
                 {
                  application.status === 'rejected' && (
                   <button className="btn-rejected">Rejected</button>
                  )
                 }
                 {
                  application.status === 'pending' && (
                   <>
                   <button onClick={()=> approveApplication(application._id)} className="btn-approve">Approve</button>
                   <button onClick={()=> approveReject(application._id)} className="btn-refuse">Reject</button>
                   </>
                  )
                 }
                 </span>
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
    background-image: url(${({application}) => application.user_photo ? `"${application.user_photo}"` : '/images/userimage-holder.png'})
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

button.btn-approved {
    background: #008000;
    border: none;
    color: #fff;
    padding: 10px 20px;
    text-transform: capitalize;
}

p.erroaction {
    background: #ffc107;
    padding: 5px 20px;
    margin: 0 auto;
    margin-top: 20px;
    color: red;
    display: flex;
    align-items: center;
    gap: 12px;
    font-size: 16px;
    width: 44%;
    justify-content: center;
}

`


export default ReviewRegistration;
