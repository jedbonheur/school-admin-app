import React, {useEffect,useState} from 'react';
import { Formik, Form } from 'formik';
import { MyTextInput, MySelect, MytextArea} from '../../UIs/FormInputs'
import * as Yup from 'yup';
import {useNavigate } from 'react-router-dom';
const axios = require('axios')

// And now we can use these
const AddClassForm = () => {
  const [instructors,setInstructions] =useState(false)
  useEffect(() => {
      axios.get('/get-instructors/')
          .then(function (response) {
            if(response.status === 200){
              setInstructions(response.data.data)
            }
          })
          .catch(function (error) {
              navigate('/page-404')
          });
  }, []);
  const navigate = useNavigate();
  if(!instructors){
    return 
  }
  const departments = ['Computer Science', 'software engineering', 'networking', 'web development', 'bootcamp']
  return (
    <>
      <h2>Add Class</h2>
      <Formik
        initialValues={{
          course_name: '',
          course_depertment: '',
          schedule: '',
          instructor: '',
        }}

        validationSchema={Yup.object({
          course_name: Yup.string().max(15, 'Must be 15 characters or less').required('Required'),
          schedule: Yup.string().required('Required'),
          course_depertment: Yup.string().oneOf([...departments],'Invalid Department').required('Required'),
          instructor: Yup.string().required('Required'),
        })}

        onSubmit={(values) => {
        const formParams = {...values}
        axios.post(`/addCourse/${formParams.instructor}`,formParams)
        .then(function (response) {
          if(response.status === 200){
            navigate("/admin/thankyou", { replace: true, state: 'Course Successfully Created' });
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
            label="Course Name"
            name="course_name"
            type="text"
            placeholder="Java Script"
          />
          <MytextArea
            label="Class Schedule"
            name="schedule"
            type="text"
            rows="4" cols="30"
            placeholder="Monday 6:30PM - 9:30PM"
          />

          <MySelect label="Department" name="course_depertment">
           <option value="">Select</option>
            {
             departments.map(department => {
              return <option value={department}>{department}</option>
             })
            }
          </MySelect>

          <MySelect label="Instructor" name="instructor">
           <option value="">Select</option>
            {
             instructors.map(instructor => {
              return <option value={instructor._id}>{instructor.firstName} {instructor.lastName}</option>
             })
            }
          </MySelect> 

        </div>
         <button className="btn"type="submit">Submit</button>
        </Form>
       )}
      </Formik>
    </>
  );
};

export default AddClassForm;