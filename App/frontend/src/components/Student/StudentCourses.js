import React,{useContext,useState,useEffect} from 'react';
import styled from "styled-components";
import CourseTableWrapper from "../UIs/CourseTable"
import StudentAssignments from "./StudentAssignments"
import {AppContext} from '../../contexts/AppContext'
const StudentCourses = () => {
 const {
  user,
  isMobile
 } = useContext(AppContext);

  if(!user) {
  return
 }
 return (
  <StudentCoursesWrapper
  isMobile ={isMobile}>
   <div className="wrapper-course">
      <div className="assignment">
         <StudentAssignments courses={user.courses}/>
      </div>
      <div className="course">
         <CourseTableWrapper title="Lessons" courses={user.courses}/>
      </div>
   </div>
  </StudentCoursesWrapper>
 );
};

const StudentCoursesWrapper = styled.div`
.wrapper-course {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 1rem;
    justify-content: stretch;
}
.course {
 width: 100%;
 align-self: stretch;
}
.assignment {
  width: 100%;
  align-self: stretch;
}




`

export default StudentCourses;