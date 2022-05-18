import React from 'react';
import {PageWrapper,PageView} from "../../../common/DesignConstants"
import PageTitle from "../../UIs/PageTitle"
import ViewAdmissions from "../../Admin/student/ViewAdmissions"
const Admissions = () => {
 return (
  <div>
   <PageWrapper>
     <PageTitle 
      title='View Admissions'
      homePath='dashboard'
      page='view-admissions'
     />
     <PageView>
        <ViewAdmissions />
     </PageView>
  </PageWrapper>
  </div>
 );
};

export default Admissions;