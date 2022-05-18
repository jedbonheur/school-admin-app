import React from 'react';
import {PageWrapper,PageView} from "../../../common/DesignConstants"
import PageTitle from "../../UIs/PageTitle"
import ViewStudents from "../../Admin/student/ViewStudents"
const Students = () => {
 return (
  <div>
   <PageWrapper>
     <PageTitle 
      title='View Students'
      homePath='dashboard'
      page='view-students'
     />
     <PageView>
        <ViewStudents />
     </PageView>
  </PageWrapper>
  </div>
 );
};

export default Students;