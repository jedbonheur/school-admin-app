import React from 'react';
import {PageWrapper,PageView} from "../../../common/DesignConstants"
import PageTitle from "../../UIs/PageTitle"
const Departments = () => {
 return (
  <div>
   <PageWrapper>
     <PageTitle 
      title='View Programs'
      homePath='dashboard'
      page='view-programs'
     />
     <PageView>
        View Programs
     </PageView>
  </PageWrapper>
  </div>
 );
};

export default Departments;