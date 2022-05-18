import React, {useEffect,useState} from 'react';
import styled from "styled-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid} from '@fortawesome/fontawesome-svg-core/import.macro';
import {CourseStudentList} from  '../../common/HelperFunctions'
import {useNavigate } from 'react-router-dom';
const axios = require('axios');
const TeacherStats = ({data}) => {
 const[announcement, setAnnouncements] = useState(false)
 const navigate = useNavigate();
   useEffect(() => {
  axios.get(`/get-teacher-announcement/`)
    .then(function (response) {
     if(response.status === 200){
       setAnnouncements(response.data.data)
      }
    })
    .catch(function (error) {
       navigate('/page-404')
    });
  }, []);
 if( !data || !announcement){
   return <p>Loading...</p>
 }

 return (
  <AdminStatsWrapper>
    <div className="StudentStats">
      <div className="totalClasses stats-box">
        <div className="theicon">
          <FontAwesomeIcon icon={solid('users-between-lines')} />
        </div>
        <div className="numbers">
          <span className="stats">
           {data.length}
          </span>
          <span>Total Courses</span>
        </div>
      </div>
      <div className="total-assignments stats-box">
        <div className="theicon">
         <FontAwesomeIcon icon={solid('user-graduate')} />
        </div>
        <div className="numbers">
          <span className="stats">{CourseStudentList(data).length}</span>
          <span>Total Students</span>
        </div>
      </div>
      <div className="fees-due stats-box">
        <div className="theicon">
         <FontAwesomeIcon icon={solid('list-check')} />
        </div>
        <div className="numbers">
          <span className="stats">{announcement.length}</span>
          <span>Total Announcements</span>
        </div>
      </div>
    </div>
  </AdminStatsWrapper>
 );
};


const AdminStatsWrapper = styled.div`
.StudentStats {
    display: flex;
    align-items: center;
    padding: 20px 0px;
    justify-content: space-around;
    flex-wrap: wrap;
    gap:10px;
}
.stats-box {
    flex: 1;
    border-radius: 30px 0px;
    padding: 20px;
    display: flex;
    gap: 10px;
    // flex-wrap: wrap;
    align-items: flex-end;
    justify-content: space-between;
}
.totalClasses {
    background-color: rgb(244 104 65 / 0.2);
    border-color: #f46841;
    border-radius: 30px 0px;
    border: 1px solid #f46841;
    .theicon {
      color:#f46841;
    }
}
.total-assignments {
    background-color: rgb(253 187 56 / 0.5);
    border-color: #fdbb38;
    border-radius: 30px 0px;
    border: 1px solid #fdbb38;
   .theicon {
      color:#fdbb38
    }
}
span.stats {
    font-size: 30px !important;
}
.fees-due {
    background-color: rgb(110 107 250 / 0.2);
    border-color: #6e6bfa;
    border-radius: 30px 0px;
    border: 1px solid #6e6bfa;
    .theicon {
      color:#6e6bfa;
    }
}
.numbers {
    display: flex;
    flex-direction: column;
    word-wrap: break-word;
}
span.stats {
    font-weight: bold;
    font-size: 1.2rem;
    text-align: right;
}
.numbers span {
    white-space: nowrap;
}
.theicon {
    font-size: 55px;
}

`
export default TeacherStats;