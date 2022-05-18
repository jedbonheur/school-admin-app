import React from 'react';
import {PageWrapper,PageView} from "../../../common/DesignConstants"
import PageTitle from "../../UIs/PageTitle"
import AddClassForm from "../../Admin/student/AddClassForm"
const AddClass = () => {
 return (
  <div>
   <PageWrapper>
     <PageTitle 
      title='Add Class'
      homePath='dashboard'
      page='add-class'
     />
     <PageView>
        <AddClassForm />
     </PageView>
  </PageWrapper>
  </div>
 );
};

export default AddClass;