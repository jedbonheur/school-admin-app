import React, {useEffect,useContext} from 'react';
import { Formik, Form } from 'formik';
import {AppContext} from '../../contexts/AppContext'
import { MyTextInput, MySelect, DatePickerField, FileInput} from '../UIs/FormInputs'
import * as Yup from 'yup';
import {useNavigate } from 'react-router-dom';
const axios = require('axios')

// And now we can use these
const AdminAddAnnouncement = () => {
  const {
  user,
 } = useContext(AppContext);
  const navigate = useNavigate();
  return (
    <>
      <h2>Add Announcement</h2>
      <Formik
        initialValues={{
          announcement: '',
          destination: '',
        }}

        validationSchema={Yup.object({
          announcement: Yup.string().min(15, 'Must be at least 10 characters').required('Required'),
          destination: Yup.string().oneOf(['teachers', 'students'],'Invalid Destination').required('Required'),
        })}

        onSubmit={(values) => {
        const formParams = {...values}
        const id = user._id
         const studentPath = '/add-announcement-students/'
         const teacherPath = '/add-announcement-teachers/'
        axios.postForm(`${values.destination === 'teachers' ? teacherPath : studentPath}/`+ id, formParams)
        .then(function (response) {
          if(response.status === 200){
            navigate("/admin/thankyou", { replace: true, state: 'Your Announcement is now Published !' });
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
            label="Announcement"
            name="announcement"
            type="text"
            placeholder="Announcement"
          />
          <MySelect label="Destination" name="destination">
            <option value="">Select</option>
            <option value="teachers">Teachers</option>
            <option value="students">Students</option>
          </MySelect>

          <FileInput 
            label="Upload Anouncement"
            name="announcement_file"
            type="file"
            accept='application/pdf'
            required
            onChange={(event) => {
              setFieldValue("announcement_file", event.currentTarget.files[0])
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

export default AdminAddAnnouncement;