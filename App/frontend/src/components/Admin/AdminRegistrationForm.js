import React, {useEffect} from 'react';
import { Formik, Form } from 'formik';
import { MyTextInput, MySelect, DatePickerField, FileInput} from '../UIs/FormInputs'
import * as Yup from 'yup';
import {useNavigate } from 'react-router-dom';
const axios = require('axios')

// And now we can use these
const TeacherRegistrationForm = () => {
  const navigate = useNavigate();
  return (
    <>
      <img className="title-image" src='/images/schoolAdminLogo.png' alt='logo'/>
      <h2>Admin Registration</h2>
      <Formik
        initialValues={{
          fname: '',
          lname: '',
          gender: '',
          email: '',
          dob: '',
          address:'',
        }}

        validationSchema={Yup.object({
          fname: Yup.string().max(15, 'Must be 15 characters or less').required('Required'),
          lname: Yup.string().max(20, 'Must be 20 characters or less').required('Required'),
          gender: Yup.string().oneOf(['male', 'female'],'Invalid gender').required('Required'),
          email: Yup.string().email('Invalid email').required('Required'),
          dob: Yup.date().required('Required'),
          address: Yup.string().required('Address required'),
        })}

        onSubmit={(values) => {
        const formParams = {...values}
        
        axios.postForm('/admin-register/', formParams)
        .then(function (response) {
          if(response.status === 200){
            navigate("/admin-apply/thankyou");
          }
        })
        .catch(function (error) {
          navigate('/page-404')
        });
        }}
      
      >
      
   {({setFieldValue}) => (
      <Form>
        <div className="flex-form">
          <MyTextInput
            label="First Name"
            name="fname"
            type="text"
            placeholder="Jane"
          />

          <MyTextInput
            label="Last Name"
            name="lname"
            type="text"
            placeholder="Doe"
          />
           <MyTextInput
            label="Address"
            name="address"
            type="text"
            placeholder="1245 rue crevier N5H0R4"
          />
         

          <MyTextInput
            label="Email"
            name="email"
            type="email"
            placeholder="jane@formik.com"
          />

          <MySelect label="Gender" name="gender">
            <option value="">Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </MySelect>

          <DatePickerField
            label="Date of Birth"
            name="dob"
            type="date"
            value={new Date()}
          />

          <FileInput 
            label="Upload User Photo"
            name="user_photo"
            type="file"
            accept='image/*'
            required
            onChange={(event) => {
              setFieldValue("user_photo", event.currentTarget.files[0])
            }}
          /> 
        </div>
      <button className="btn"type="submit">Submit</button>
        </Form>
       )}
      </Formik>
    </>
  );
};

export default TeacherRegistrationForm;