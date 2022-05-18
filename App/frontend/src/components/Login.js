import React, {useEffect,useContext} from 'react';
import { Formik, Form } from 'formik';
import styled, { keyframes, css } from 'styled-components'
import {AppContext} from '../contexts/AppContext'
import { MyTextInput, MySelect, } from '../components/UIs/FormInputs'
import {reactLocalStorage} from 'reactjs-localstorage';
import * as Yup from 'yup';
import {useNavigate } from 'react-router-dom';

const axios = require('axios')

// And now we can use these
const Login = () => {
  const {
     setUser,
     setAccessUser,
     setAuth,
     loginError,
     setLoginError,
     isSmallDevice
 } = useContext(AppContext);

 const navigate = useNavigate();
 const gotoApplicationPage = () => {
   navigate('/student-send-application')
 }
 const goToRegister = () => {
   navigate('/teacher-registration')
 }
 const adminRegister = () => {
   navigate('/admin-registration')
 }
  return (
    <LoginWrapper isMobile={isSmallDevice}  loginError={loginError} >
      <div className="login-inner-wrapper">
          <img className="title-image" src='/images/AppLogo.png' alt='logo'/>
        <h2>Login</h2>
          {
            loginError && (
             <p className="errors">{loginError}</p>
            )
          }
          
        <Formik
          initialValues={{
            username: '',
            password: '',
            role: '',
          }}

          validationSchema={Yup.object({
            username: Yup.string().email('Invalid email').required('Required'),
            password: Yup.string().required('Required'),
            role: Yup.string().oneOf(['teacher', 'student','admin'],'Invalid Role').required('Required'),
          })}

          onSubmit={(values) => {
          const formParams = {...values}
          axios.post('/auth/signin', formParams)
          .then(function (response) {
            if(response.status === 200){
              setAuth(true)
              setUser(response.data.data)
              reactLocalStorage.setObject('userAccess',{
              token: response.data.data.accessToken,
              role: response.data.data.role,
              user_id: response.data.data._id,
              });
              setAccessUser(reactLocalStorage.getObject('userAccess'))
              navigate('/', {replace: true})
            }
          })
          .catch(function (error) {
              setLoginError(error.response.data.message)
          });
          }}
        
        >
        
    {() => (
        <Form>
          <div className="login-form">
            <MyTextInput
              label="Username: "
              name="username"
              type="text"
              placeholder="username"
            />
            <MyTextInput
              label="Password: "
              name="password"
              type="password"
              placeholder="password"
            />
            <MySelect label="Who are you? :" name="role">
              <option value="">Select</option>
              <option value="teacher">Teacher</option>
              <option value="student">Student</option>
              <option value="admin">Admin</option>
            </MySelect>
          </div>
        <button  className="login btn"type="submit">Enter</button>
       <hr className="divider"/>
          <div className="entries">
            <div className="student">
             <p>New student ? </p>
              <button className="btn btn-student-apply" onClick={gotoApplicationPage}>student Apply</button>
            </div>
            <div className="teacher">
             <p>New Teacher ? </p>
              <button className="btn btn-student-apply" onClick={goToRegister}>Teacher Registration</button>
            </div>

            <div className="teacher">
             <p>Admin ? </p>
              <button className="btn btn-student-apply" onClick={adminRegister}>Register</button>
            </div>

          </div>
          </Form>
        )}
        </Formik>
      </div>
    </LoginWrapper>
  );
};

const shake = keyframes`
  0% { transform: translate(1px, 1px) rotate(0deg); }
  10% { transform: translate(-1px, -2px) rotate(-1deg); }
  20% { transform: translate(-3px, 0px) rotate(1deg); }
  30% { transform: translate(3px, 2px) rotate(0deg); }
  40% { transform: translate(1px, -1px) rotate(1deg); }
  50% { transform: translate(-1px, 2px) rotate(-1deg); }
  60% { transform: translate(-3px, 1px) rotate(0deg); }
  70% { transform: translate(3px, 1px) rotate(-1deg); }
  80% { transform: translate(-1px, -1px) rotate(1deg); }
  90% { transform: translate(1px, 2px) rotate(0deg); }
  100% { transform: translate(1px, -2px) rotate(-1deg); }
`

const LoginWrapper = styled.div`
    background-image: url('/images/cambridge.jpg');
    height: 100vh;
    width: 100%;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    display: flex;
    align-items: center;
    justify-content: center;
    .error {
    color: red;
    position: absolute;
    top: -7px;
    font-size: 11px;
    right: unset;
    font-weight: lighter;
    font-style: italic;
    -webkit-transition: all 300ms ease;
    transition: all 300ms ease;
}
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
    .login-inner-wrapper {
    animation: ${({loginError}) => loginError ? css`300ms ${shake} ease-out` : 'none !important;' };
    z-index: 99;
    padding: 0px 10px !important;
    text-align: center;
    background: #ffffffb5;
    padding: 0px 30px;
    border-radius: 25px;
    }
    .login-form {
        display: flex;
        flex-direction: column;
        gap: 6px;
    }
    button.login.btn {
    margin: 20px auto;
   }
   p.errors {
    color: red;
    font-style: italic;
}
button.btn.btn-student-apply {
    margin: 0 auto;
    padding: 10px 26px;
    font-weight: lighter;
    text-transform: capitalize;
}
.student {
      gap: 10px;
    display: flex;
    flex-direction: column;
}
.teacher {
      gap: 10px;
    display: flex;
    flex-direction: column;
}
hr.divider {
    margin: 12px 0px;
}
.entries {
    display: flex;
    gap: 2rem;
    text-align: left;
}
img.title-image {
    width: 300px;
    padding-top: 10px;
}
}
`




export default Login;