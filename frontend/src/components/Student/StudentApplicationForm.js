import React, {useEffect} from 'react';
import { Formik, Form } from 'formik';
import { MyTextInput, MySelect, DatePickerField, FileInput} from '../UIs/FormInputs'
import * as Yup from 'yup';
import {useNavigate } from 'react-router-dom';
const axios = require('axios')

// And now we can use these
const StudentApplicationForm = () => {
  const navigate = useNavigate();
  return (
    <>
      <h2>Apply</h2>
      <Formik
        initialValues={{
          fname: '',
          lname: '',
          gender: '',
          email: '',
          dob: '',
          program:'',
          semester:'',
          address:'',
        }}

        validationSchema={Yup.object({
          fname: Yup.string().max(15, 'Must be 15 characters or less').required('Required'),
          lname: Yup.string().max(20, 'Must be 20 characters or less').required('Required'),
          gender: Yup.string().oneOf(['male', 'female'],'Invalid gender').required('Required'),
          email: Yup.string().email('Invalid email').required('Required'),
          dob: Yup.date().required('Required'),
          program: Yup.string().oneOf(['computer science', 'software engineering','coding bootcamp'],'Invalid program').required('Required'),
          semester: Yup.string().oneOf(['spring 2022', 'summer 2022','fall 2022','winter 2023'],'Invalid intake').required('Required'),
          address: Yup.string().required('Address required'),
        })}

        onSubmit={(values) => {
        const formParams = {...values}
        
        axios.postForm('/apply', formParams)
        .then(function (response) {
          if(response.status === 200){
            navigate("/student/thankyou", { replace: true, state: 'Thank you for your Application' });
          }
        })
        .catch(function (error) {
          console.log(error);
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
          <MySelect label="Program" name="program">
            <option value="">Select</option>
            <option value="computer science">Computer science</option>
            <option value="software engineering">Software engineering</option>
            <option value="coding bootcamp">Coding BootCamp</option>
          </MySelect>

          <MySelect label="Semester" name="semester">
            <option value="">Select</option>
            <option value="spring 2022">Spring 2022</option>
            <option value="summer 2022">Summer 2022</option>
            <option value="fall 2022">Fall 2022</option>
            <option value="winter 2023">Winter 2023</option>
          </MySelect>
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
          <FileInput 
            label="Motivational Letter"
            name="motivational_letter"
            type="file"
            accept='application/pdf'
            required
            onChange={(event) => {
              console.log('event',event.currentTarget.files)
              setFieldValue("motivational_letter", event.currentTarget.files[0])
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

export default StudentApplicationForm;