import React from 'react';
import {PageWrapper,PageView} from "../../../common/DesignConstants"
import PageTitle from "../../UIs/PageTitle"
const AddExam = () => {
 return (
  <PageWrapper>
   <PageTitle 
    title='Add Exam'
    homePath='dashboard'
    page='add-exam'
   />
   <PageView>
      Add Exam
   </PageView>
  </PageWrapper>
 );
};




export default AddExam;