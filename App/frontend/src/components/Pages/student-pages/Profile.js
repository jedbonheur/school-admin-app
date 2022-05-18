import React from 'react';
import {PageWrapper,PageView} from "../../../common/DesignConstants"
import PageTitle from "../../UIs/PageTitle"
import StudentProfile from "../../Student/StudentProfile"
const profile = () => {
 return (
  <div>
   <PageWrapper>
     <PageTitle 
      title='Profile'
      homePath='dashboard'
      page='Profile'
     />
     <PageView>
        <StudentProfile />
     </PageView>
  </PageWrapper>
  </div>
 );
};

export default profile;