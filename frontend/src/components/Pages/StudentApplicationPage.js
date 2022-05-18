import React,{useContext} from 'react';
import styled from "styled-components";
import StudentApplicationForm from '../Student/StudentApplicationForm'
import {useNavigate } from 'react-router-dom';
import {AppContext} from '../../contexts/AppContext'

// And now we can use these
const StudentApplicationPage = () => {
  const navigate = useNavigate();
  const {
      isSmallDevice
  } = useContext(AppContext);
  const goTologIn = () => {
    navigate('/login')
  }
  return (
    <LoginWrapper isMobile={isSmallDevice} >
      <div className="apply-wrapper">
        <StudentApplicationForm />
      </div>
      <button onClick={goTologIn}  className="btn login-back">Login</button>
    </LoginWrapper>
  );
};



const LoginWrapper = styled.div`
    background-image: url(/images/cambridge.jpg);
    height: ${({isMobile}) => isMobile ? '100%' : '100vh'};
    width: 100%;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    display: flex;
    align-items: center;
    justify-content: center;
    &:after {
    content: "";
    background: #01010178;
    height: 100%;
    width: 100%;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 0;
    }
    
    .apply-wrapper {
       background: #000000b5;
       color: #fff !important;
       text-align: center;
           width: ${({isMobile}) => isMobile ? '100%' : '80%'};
       width: ;
       border-radius: 20px;
       padding: ${({isMobile}) => isMobile ? '0px' : '0px 25px'};
       z-index: 9;
       .inputBloack input {
       background: #5c5858ed;
       color: #fff;
       }
       .inputBloack select {
       background: #5c5858ed;
       color: white;
      }
   } 
   .login-back {
    position: absolute;
    top: -22px;
    right: 20px;
    z-index: 99;
    padding: 12px 33px;
}
img.title-image {
width: 300px;
    padding: 20px;
    margin-top: 50px;
    border-radius: 28px;
}

}
`




export default StudentApplicationPage;