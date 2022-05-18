import React from 'react';
import {PageWrapper,PageView} from "../../../common/DesignConstants"
import PageTitle from "../../UIs/PageTitle"
import StudentApplications from "../../../components/Student/StudentApplications"

const application = () => {
 return (
  <PageWrapper>
   <PageTitle 
    title='Student Applications'
    homePath='dashboard'
    page='applications'
   />
   <PageView>
      <StudentApplications />
   </PageView>
  </PageWrapper>
 );
};

export default application;