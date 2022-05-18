import React from 'react';
import {  Routes, Route } from 'react-router-dom';
import Login from '../components/Login'
import Page404 from "../common/Page404"
import StudentApplicationPage from '../components/Pages/StudentApplicationPage'
import TeacherApplicationPage from '../components/Pages/TeacherApplicationPage'
import AdminRegistration from '../components/Pages/AdminRegistration'
import ApplyThankYou from '../components/Pages/student-apply-thankYou'
import AdminThankYou from '../components/Pages/admin-registration-thankYou'
const RoutesController = () => {
 return (
   <Routes>
            <Route exact path="/" 
              element={<Login/>}
            />
            <Route exact path="/login" 
              element={<Login/>}
            />
            <Route exact path="/student-send-application" 
              element={<StudentApplicationPage/>}
            />
            <Route exact path="/teacher-registration" 
              element={<TeacherApplicationPage/>}
            />
            <Route exact path="/admin-registration" 
              element={<AdminRegistration/>}
            />
             <Route exact path="/admin-apply/thankyou" element={<AdminThankYou/>} />
             <Route exact path="/student-apply/thankyou" element={<ApplyThankYou/>} />
            <Route path="*"element={<Page404 />} />
          </Routes>
 );
};

export default RoutesController;