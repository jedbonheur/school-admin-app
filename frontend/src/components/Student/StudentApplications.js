import React, {useContext} from 'react';
import {AppContext} from '../../contexts/AppContext'
import styled from "styled-components";

const StudentApplications = () => {
const {
    user,
} = useContext(AppContext)
 
 if(!user.studentApplication_id){
   return <p>Loading....</p>
 }

 return (
    <ViewApplications>
     <table>
       <thead>
          <tr>
            <th>Student Name</th>
            <th>Program</th>
            <th>Semester</th>
            <th>Status</th>
          </tr>
      </thead>
      <tbody>
      {
        user.studentApplication_id.map((application) => {
          return (
         <tr className="record" key={application._id}>
             <td>{application.firstName} {application.lastName}</td>
             <td>{application.program}</td>
             <td>{application.semester}</td> 
             <td>{application.semester ? 'Approved' : 'Not Approved'}</td> 
         </tr>
          )
        }) 
      }
      </tbody>
     </table>
   </ViewApplications>
 );
};

const ViewApplications = styled.div`
    overflow: scroll;
    &::-webkit-scrollbar {
      display: none;
    }
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
td, th {
    border: 1px solid #ffffff;
    text-align: left;
    padding: 8px;
    text-transform: capitalize;
}
tr:nth-child(even) {
    background-color: #ffc107;
}
table {
    border-collapse: collapse;
    width: 100%;
}
tr.record {
    background: #3498ec;
    color: #ffffff;
}
th {
    background: #ffc107;
}

`

export default StudentApplications;