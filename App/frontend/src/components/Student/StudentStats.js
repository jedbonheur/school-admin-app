import React from 'react';
import styled from "styled-components";
import { AssignmentList } from '../../common/HelperFunctions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid} from '@fortawesome/fontawesome-svg-core/import.macro'
const StudentStats = ({courses}) => {
  if(!courses) {
  return 
 }
 return (
  <StudentStatsWrapper>
    <div className="StudentStats">
      <div className="totalClasses stats-box">
        <div className="theicon">
          <FontAwesomeIcon icon={solid('user-graduate')} />
        </div>
        <div className="numbers">
          <span className="stats">
           0{courses.length}
           /06</span>
          <span>Total Classes</span>
        </div>
      </div>
      <div className="total-assignments stats-box">
        <div className="theicon">
         <FontAwesomeIcon icon={solid('book')} />
        </div>
        <div className="numbers">
          <span className="stats">{AssignmentList(courses).length}</span>
          <span>Total Assignments</span>
        </div>
      </div>
      <div className="fees-due stats-box">
        <div className="theicon">
         <FontAwesomeIcon icon={solid('dollar-sign')} />
        </div>
        <div className="numbers">
          <span className="stats">$4502</span>
          <span>Outstanding Balance</span>
        </div>
      </div>
    </div>
  </StudentStatsWrapper>
 );
};


const StudentStatsWrapper = styled.div`
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
    align-items: center;
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
    font-size: 37px;
}

`
export default StudentStats;