import React from 'react';
import {PageWrapper,PageView} from "../../../common/DesignConstants"
import PageTitle from "../../UIs/PageTitle"
import StudentApplicationForm from "../../Student/StudentApplicationForm";
const Apply = () => {
 return (
  <PageWrapper>
   <PageTitle 
    title='Student Dashboard'
    homePath='dashboard'
    page='Apply'
   />
   <PageView>
      <StudentApplicationForm />
   </PageView>
  </PageWrapper>
 );
};




export default Apply;