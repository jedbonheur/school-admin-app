import React,{useContext} from 'react';
import {AppContext} from '../../../contexts/AppContext'
import {PageWrapper,PageView} from "../../../common/DesignConstants"
import PageTitle from "../../UIs/PageTitle"
import styled from "styled-components";
import StudentExams from "../../Student/StudentExams"
import StudentAssignments from "../../Student/StudentAssignments"
import StudentStats from "../../Student/StudentStats"
const StudentHome = () => {
const {
  user,
  isMobile
 } = useContext(AppContext);
 
 if(!user){
   return <p>Loading...</p>
 }

 return (
  <PageWrapper>
    <PageTitle 
    title='Student Dashboard'
    homePath='dashboard'
    page='home'
    />
   <PageView>
     <HomeWrapper isMobile={isMobile}>
        <div className="student-stasts">
          {/* <StudentProgressBar percentage={user.courses}/> */}
          <StudentStats courses={user.courses}/>
        </div>
        <div className="student-upcomings">
           <div className="student-assignments">
             <StudentAssignments courses={user.courses} />
           </div>
           <div className="student-exams">
             <StudentExams courses={user.courses} />
           </div>
        </div>
     </HomeWrapper>
   </PageView>
  </PageWrapper>
 );
};

const HomeWrapper = styled.div`
.student-upcomings {
    display: flex;
    flex-wrap: wrap;
    flex-wrap: ${({isMobile})=> isMobile ? 'wrap' : 'nowrap'};
    gap: ${({isMobile})=> isMobile ? '15px' : '0px 15px'};
}
.student-exams {
  width: ${({isMobile})=> isMobile ? '100%' : '50%'}
}
.student-assignments {
   width: ${({isMobile})=> isMobile ? '100%' : '50%'}
}
button.nav.default-nav {
    display:${({isMobile})=> isMobile ? 'none' : 'block'} ;
}

.CircularProgressbar {
    width: 150px;
    vertical-align: middle;
}
`
export default StudentHome;