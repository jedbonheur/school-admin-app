import React from 'react';
import {PageWrapper,PageView} from "../../../common/DesignConstants"
import PageTitle from "../../UIs/PageTitle"
import StudentCourses from "../../Student/StudentCourses";
const Courses = () => {
 return (
  <PageWrapper>
   <PageTitle 
    title='My Courses'
    homePath='dashboard'
    page='courses'
   />
   <PageView>
      <StudentCourses />
   </PageView>
  </PageWrapper>
 );
};




export default Courses;