import React from 'react';
import {PageWrapper,PageView} from "../../../common/DesignConstants"
import PageTitle from "../../UIs/PageTitle"
import AdminAddAnnouncement from '../../Admin/AdminAddAnnouncement';
const AddClass = () => {
 return (
  <div>
   <PageWrapper>
     <PageTitle 
      title='Add Announcement'
      homePath='dashboard'
      page='add-announcement'
     />
     <PageView>
        <AdminAddAnnouncement />
     </PageView>
  </PageWrapper>
  </div>
 );
};

export default AddClass;