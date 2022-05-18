import React from 'react';
import {PageWrapper,PageView} from "../../../common/DesignConstants"
import PageTitle from "../../UIs/PageTitle"
const AddAssignment = () => {
 return (
  <PageWrapper>
   <PageTitle 
    title='Add Assignment'
    homePath='dashboard'
    page='add-assignment'
   />
   <PageView>
      Add Assignment
   </PageView>
  </PageWrapper>
 );
};




export default AddAssignment;