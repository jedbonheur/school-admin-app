import React from 'react';
import {  Routes, Route } from 'react-router-dom';
import {AdminHome, AddClass, RegisterTeacher, Admissions, Students, Teachers,AddAnnouncement} from '../components/Pages';
import Page404 from "../common/Page404"
import ThankYou from '../components/UIs/ThankyouPage'
const AdminRoutes = () => {
 return (
   <Routes>
            <Route exact path="/admin/add-class" element={<AddClass/>} />
            <Route exact path="/admin/register-teacher" element={<RegisterTeacher/>} />
            <Route exact path="/admin/view-admissions" element={<Admissions/>} />
            <Route exact path="/admin/view-students" element={<Students/>} />
            <Route exact path="/admin/view-teachers" element={<Teachers/>} />
            <Route exact path="/admin/add-announcement" element={<AddAnnouncement/>} />
            <Route exact path="/admin/thankyou" element={<ThankYou/>} />
             <Route exact path="/page-404"element={<Page404 />} />
            <Route exact path="/" element={<AdminHome/>}/>
            <Route path="*"element={<Page404 />}/>
          </Routes>
 );
};

export default AdminRoutes;