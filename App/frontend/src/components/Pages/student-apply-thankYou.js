import React, {useContext} from 'react';
import styled from "styled-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid} from '@fortawesome/fontawesome-svg-core/import.macro';
import {useNavigate } from 'react-router-dom';
import {AppContext} from '../../contexts/AppContext'

// And now we can use these
const StudentApplicationPage = () => {
   const {
     isMobile,
 } = useContext(AppContext);
  const navigate = useNavigate();
   const goTologIn = () => {
    navigate('/login')
  }
  return (
    <LoginWrapper isMobile={isMobile} >
      <div className="thankyou-wrapper">
       <FontAwesomeIcon icon={solid('check-circle')} />
       <h2>Thank you for you Application,</h2>
        <p>
        We will carefully review your application and get back to you soon.
        </p>
        <p>Within few days you will receive an email with our decision</p>
        <p className="addmission">Admission Office,</p>
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
    

   .login-back {
    position: absolute;
    top: -22px;
    right: 20px;
    z-index: 99;
    padding: 12px 33px;
}
.thankyou-wrapper {
    background: #ffffffba;
    z-index: 999;
    padding: 52px 20px;
    border-radius: 15px;
}

.thankyou-wrapper svg {
    display: block;
    text-align: center;
    width: 100%;
    color: green;
    font-size: 30px;
}

p.addmission {
    padding-top: 39px;
    font-weight: bold;
}

p {
    line-height: 1.5;
}

}
`




export default StudentApplicationPage;