import React, {useContext,useEffect,useState} from 'react';
import {PageWrapper,PageView} from "../../../common/DesignConstants"
import PageTitle from "../../UIs/PageTitle"
import styled from "styled-components";
import TeacherStats from '../../Teacher/TeacherStats'
import TeacherSlides from '../../Teacher/TeacherSlides'
import TeacherAnnouncementSlide from '../../Teacher/TeacherAnnouncementSlide'
import {AppContext} from '../../../contexts/AppContext'
import {useNavigate } from 'react-router-dom';
const axios = require('axios');
const TeacherHome = () => {
const[data, setData] = useState(false)
const {
  accessUser,
  isMobile
 } = useContext(AppContext);
  const navigate = useNavigate();
useEffect(() => {
  axios.get(`/get-teacher-dashboard/${accessUser.user_id}`)
    .then(function (response) {
     if(response.status === 200){
       setData(response.data.data)
      }
    })
    .catch(function (error) {
         navigate('/page-404')
    });
  }, []); 
 const[announcement, setAnnouncements] = useState(false)
   useEffect(() => {
  axios.get(`/get-teacher-announcement`)
    .then(function (response) {
     if(response.status === 200){
       setAnnouncements(response.data.data)
      }
    })
    .catch(function (error) {
       navigate('/page-404')
    });
  }, []);
 return (
  <PageWrapper>
   <PageTitle 
    title='Teacher Dashboard'
    homePath='dashboard'
    page='home'
   />
   <PageView>
      <HomeWrapper isMobile={isMobile}>
         <div className="student-stasts">
            <TeacherStats data={data}/>
         </div>
         <div className="student-slides">
            <TeacherSlides isMobile={isMobile} courses={data}/>
            <TeacherAnnouncementSlide  isMobile={isMobile}announcement={announcement}/>
         </div>
      </HomeWrapper>
   </PageView>
  </PageWrapper>
 );
};


const HomeWrapper = styled.div`
.student-slides {
    display: flex;
    align-items: center;
    justify-content: stretch;
    flex-wrap: wrap;
    gap: 20px;
    flex-wrap: ${({isMobile})=> isMobile ? 'wrap' : 'nowrap'};
    gap: ${({isMobile})=> isMobile ? '15px' : '0px 15px'};
}
`

export default TeacherHome;