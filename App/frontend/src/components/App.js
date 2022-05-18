import React,{useContext} from 'react';
import GlobalStyle from '../common/GlobalStyle'
import styled from "styled-components";
import StudentRoutes from '../routes/StudentRoutes'
import TeacherRoutes from '../routes/TeacherRoutes'
import AdminRoutes from '../routes/AdminRoutes'
import RoutesController from '../routes/RoutesController'
import AdminSidebar from './Sidebars/AdminSidebar'
import StudentSidebar from './Sidebars/StudentSidebar'
import TeacherSidebar from './Sidebars/TeacherSidebar'
import HeaderBar from './HeaderBar/HeaderBar';
import {AppContext} from "../contexts/AppContext"


const App = () => {
  const {
    showSmallSidebar,
    isMobile,
    showNav,
    setShowNav,
     accessUser,
     auth,
  } = useContext(AppContext)
  

  const controllerAdmin = () => auth  && accessUser.role === 'admin'
  const controllerStudent = () => auth  && accessUser.role === 'student'
  const controllerTeacher = () => auth  && accessUser.role === 'teacher'
  

  return (
    <>
    <GlobalStyle/>
    {
     !auth && (
       <RoutesController/>
     )
    }
    <AppWrapper
     isMobile = {isMobile}
    >
        <SidebarView
           showNav={showNav}
           isMobile = {isMobile}
          >
          {
          controllerAdmin() && (
            <AdminSidebar />
          )
          } 
          {
          controllerStudent() && (
            <StudentSidebar/>
            )
          } 
          {
           controllerTeacher() && (
            <TeacherSidebar />
          )
          } 
        </SidebarView>
        {showNav && 
         <Modal
         onClick={()=>setShowNav(false)}
         showNav={showNav}
        />}
        <AppView 
          showSmallSidebar={showSmallSidebar}
          isMobile = {isMobile}
          >
          {
          auth && (
            <HeaderBar/>
          )
          }
          {
          controllerAdmin() && (
            <AdminRoutes />
          )
          } 
          {
          controllerStudent() && (
            <StudentRoutes />
          )
          } 
          {
          controllerTeacher() && (
            <TeacherRoutes />
          )
          } 
        </AppView>
        {/* <Footer/> */}
    </AppWrapper>
  </>

  );
};

const AppWrapper = styled.div`
    display: flex;
    flex-direction: row;
    height: 100%;
    overflow-y: ${({showNav}) => showNav ? 'scroll' : 'auto'};
`
const SidebarView = styled.div`
    position: fixed;
    left: 0;
    height: 100vh;
    background: #f7f7fa;
    z-index: 100;
    transform: ${({showNav,isMobile}) => showNav ? 'translateX(0px)' : !showNav && !isMobile ? 'translateX(0px)' : 'translateX(-101%)'};
    transition: all 300ms ease-in;
 
`
const AppView = styled.div`
    width: ${({showSmallSidebar,isMobile}) => showSmallSidebar ? 'calc(100% - 60px)' : isMobile ?  '100%' : 'calc(100% - 285px)'};
    position: relative;
    left: ${({showSmallSidebar,isMobile}) => showSmallSidebar ? '60px' : isMobile ? '0px' : '285px'};
    transition: all 200ms ease-in;
`
const Modal = styled.div`
    background: #0000009c;
    height: 100%;
    width: 100%;
    position: fixed;
    z-index: 99;
    transition: all 200ms ease-in;
    &:hover {
      cursor: pointer;
    }
`


export default App;
