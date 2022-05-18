import React from 'react';
import styled from "styled-components";
import CircularProgress from '../UIs/CircularProgress';
const AdminProgress = ({data}) => {
 
 if(!data){
  return
 }
 const getApplicationApproval = () => {
   const TotalApplication = data.Applications.length;
   const ApprovedTotal = data.Applications.filter(application => application.status === 'approved').length
   
   return ((ApprovedTotal * 100)/TotalApplication).toFixed()
 }
 const getRejectionRate = () => {
   const TotalApplication = data.Applications.length;
   const RejectedTotal = data.Applications.filter(application => application.status === 'rejected').length
   
   return Math.ceil((RejectedTotal * 100)/TotalApplication)
 }

 return (
  <AdminProgressWith>
   <div className="admin-wrapper">
     <div className="stats-applications approval">
        <div className="approvalrate">Approval Rate</div>
        <CircularProgress stats={getApplicationApproval()}/>
        <div className="data-details">
          <span className="approved">Approved: {data.Applications.filter(application => application.status === 'approved').length}</span>
          <span className="rejected">Rejected: {data.Applications.filter(application => application.status === 'rejected').length}</span>
        </div>
     </div>
     <div className="stats-applications rejection">
        <div className="approvalrate">Rejection Rate</div>
        <CircularProgress stats={getRejectionRate()}/>
        <div className="data-details">
          <span className="approved">Approved: {data.Applications.filter(application => application.status === 'approved').length}</span>
          <span className="rejected">Rejected: {data.Applications.filter(application => application.status === 'rejected').length}</span>
        </div>
     </div>
   </div>
  </AdminProgressWith>
 );
};

const AdminProgressWith = styled.div`
.admin-wrapper {
    display: flex;
    gap: 20px;
    flex-wrap:wrap;
}

.stats-applications {
    text-align: center;
    display: flex;
    flex-direction: column;
    gap: 9px;
    align-items: center;
    padding: 30px;
    border-radius: 25px;
    box-shadow: 0px 0px 4px 0px #00000047;
        flex: 1;
}
.approval {
 .CircularProgressbar .CircularProgressbar-text {
    fill: green;
    font-size: 20px;
    dominant-baseline: middle;
    text-anchor: middle;
  }
  .CircularProgressbar .CircularProgressbar-path {
    stroke: green;
    stroke-linecap: round;
    transition: stroke-dashoffset 0.5s ease 0s;
}
}
.rejection {
 .CircularProgressbar .CircularProgressbar-text {
    fill: red;
    font-size: 20px;
    dominant-baseline: middle;
    text-anchor: middle;
  }
  .CircularProgressbar .CircularProgressbar-path {
    stroke: red;
    stroke-linecap: round;
    transition: stroke-dashoffset 0.5s ease 0s;
}
}

.approvalrate {
    font-size: 20px;
    font-weight: bold;
}
span.approved {
    position: relative;
}
span.rejected {
    position: relative;
}

.data-details {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0px 40px;
    position: relative;
}

span.rejected::before {
    content: "";
    background: red;
    width: 13px;
    height: 13px;
    position: absolute;
    left: -18px;
    top: 50%;
    transform: translateY(-50%);
}
span.approved::before {
    content: "";
    background: green;
    width: 13px;
    height: 13px;
    position: absolute;
    left: -18px;
    top: 50%;
    transform: translateY(-50%);
}


`

export default AdminProgress;