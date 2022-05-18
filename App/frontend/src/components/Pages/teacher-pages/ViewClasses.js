import React from 'react';
import {PageWrapper,PageView} from "../../../common/DesignConstants"
import PageTitle from "../../UIs/PageTitle"
const ViewClasses = () => {
 return (
  <PageWrapper>
   <PageTitle 
    title='View Classes'
    homePath='dashboard'
    page='view-classes'
   />
   <PageView>
      view classes
   </PageView>
  </PageWrapper>
 );
};




export default ViewClasses;