import React from 'react';
import {PageWrapper,PageView} from "../../../common/DesignConstants"
import PageTitle from "../../UIs/PageTitle"
import TeacherAddAnnouncement from "../../Teacher/TeacherAddAnnouncement"
const AddAnnouncement = () => {
 return (
  <PageWrapper>
   <PageTitle 
    title='Add Announcement'
    homePath='dashboard'
    page='add-announcement'
   />
   <PageView>
      <TeacherAddAnnouncement />
   </PageView>
  </PageWrapper>
 );
};




export default AddAnnouncement;