import React from 'react';
import {  Routes, Route } from 'react-router-dom';
import {StudentHome, Courses, Application,  Profile, Apply} from '../components/Pages';
import ThankYou from '../components/UIs/ThankyouPage'
import Page404 from "../common/Page404"
const StudentRoutes = () => {
 return (
   <Routes>
            <Route exact path="/student/apply" element={<Apply/>} />
            <Route exact path="/student/profile" element={<Profile/>} />
            {/* <Route exact path="/student/exams" element={<Exam/>} /> */}
            <Route exact path="/student/applications" element={<Application/>} />
            <Route exact path="/student/courses" element={<Courses/>} />
            <Route exact path="/student/thankyou" element={<ThankYou/>} />
            <Route exact path="/" element={<StudentHome/>}/>
            <Route exact path="/page-404"element={<Page404 />} />
            <Route path="*"element={<Page404 />} />
          </Routes>
 );
};

export default StudentRoutes;