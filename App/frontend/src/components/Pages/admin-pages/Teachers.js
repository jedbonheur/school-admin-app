import React from 'react';
import {PageWrapper,PageView} from "../../../common/DesignConstants"
import PageTitle from "../../UIs/PageTitle"
import ViewTeachers from "../../Admin/teacher/ViewTeachers"
const Teachers = () => {
 return (
  <div>
   <PageWrapper>
     <PageTitle 
      title='Manage Teachers'
      homePath='dashboard'
      page='view-teachers'
     />
     <PageView>
        <ViewTeachers />
     </PageView>
  </PageWrapper>
  </div>
 );
};

export default Teachers;