import React from 'react';
import {PageWrapper,PageView} from "../../../common/DesignConstants"
import PageTitle from "../../UIs/PageTitle"
const ViewStudents = () => {
 return (
  <PageWrapper>
   <PageTitle 
    title='View Students'
    homePath='dashboard'
    page='view-students'
   />
   <PageView>
      view students
   </PageView>
  </PageWrapper>
 );
};




export default ViewStudents;