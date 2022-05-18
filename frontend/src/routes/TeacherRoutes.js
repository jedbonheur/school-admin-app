import React from 'react';
import {  Routes, Route } from 'react-router-dom';
import {TeacherHome, AddExam, AddAnnouncementTeacher,  AddAssignment, ViewClasses} from '../components/Pages';
import ThankYou from '../components/UIs/ThankyouPage'
import Page404 from "../common/Page404"
const TeacherRoutes = () => {
 return (
   <Routes>
            <Route exact path="/teacher/add-exam" element={<AddExam/>} />
            <Route exact path="/teacher/add-announcement" element={<AddAnnouncementTeacher/>} />
            <Route exact path="/teacher/add-assignment" element={<AddAssignment/>} />
            <Route exact path="/teacher/view-classes" element={<ViewClasses/>} />
            <Route exact path="/teacher/thankyou" element={<ThankYou/>} />
            <Route exact path="/" element={<TeacherHome/>}/>
             <Route exact path="/page-404"element={<Page404 />} />
            <Route path="*"element={<Page404 />} />
  </Routes>
 );
};

export default TeacherRoutes;