import React,{useContext, useEffect,useState} from 'react';
import {AppContext} from '../../../contexts/AppContext'
import {PageWrapper,PageView} from "../../../common/DesignConstants"
import PageTitle from "../../UIs/PageTitle"
import AdminStats from "../../Admin/AdminStats"
import AdminProgress from "../../Admin/AdminProgress"
import styled from "styled-components";
import {useNavigate } from 'react-router-dom';
const axios = require('axios');


const AdminHome = () => {
  const[data, setData] = useState(false)
  const navigate = useNavigate();
  useEffect(() => {
  axios.get(`/get-admin-dashboard/`)
    .then(function (response) {
     if(response.status === 200){
       setData(response.data.data)
      }
    })
    .catch(function (error) {
            navigate('/page-404')
    });
  }, []); 


const {
  user,
  isMobile
 } = useContext(AppContext);
 
 return (
  <div>
   <PageWrapper>
     <PageTitle 
      title='Admin Dashboard'
      homePath='dashboard'
      page='Home'
     />
     <PageView>
      <HomeWrapper isMobile={isMobile}>
        <div className="student-stasts">
          <AdminStats data={data}/>
        </div>
        <div className="progress-stasts">
          <AdminProgress data={data}/>
        </div>
        {/* <div className="admin">
           <div className="student-assignments">
             <StudentAssignments courses={user.courses} />
           </div>
           <div className="student-exams">
             <StudentExams courses={user.courses} />
           </div>
        </div> */}
     </HomeWrapper>
     </PageView>
  </PageWrapper>
  </div>
 );
};

const HomeWrapper = styled.div`

`

export default AdminHome;