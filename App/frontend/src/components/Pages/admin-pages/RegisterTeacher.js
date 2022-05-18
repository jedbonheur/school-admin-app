import React from 'react';
import {PageWrapper,PageView} from "../../../common/DesignConstants"
import PageTitle from "../../UIs/PageTitle"
import ViewRegistrations from "../../Admin/teacher/ViewRegistrations"
const AddTeacher = () => {
 return (
  <div>
   <PageWrapper>
     <PageTitle 
      title='Register Instructor'
      homePath='dashboard'
      page='register-teacher'
     />
     <PageView>
        <ViewRegistrations />
     </PageView>
  </PageWrapper>
  </div>
 );
};

export default AddTeacher;