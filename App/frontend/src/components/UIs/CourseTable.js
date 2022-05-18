import React from 'react';
import styled from "styled-components";
const CourseTable = ({title,courses}) => {
 if(!courses || !title) {
  return <p>Loading...</p>;
 }
 return (
  <CourseTableWrapper>
    <div className="courses_table">
      <div className="title">
        <h3>{title}</h3>
        {/* <span>view All courses</span> */}
      </div>
      <div>
       <table>
       <thead>
          <tr>
            <th>Course</th>
            <th>Schedule</th>
            <th>Name</th>
            <th>Instructor</th>
          </tr>
      </thead>
      <tbody>
      {
        courses.map((course) => {
          return (
         <tr className="record" key={course._id}>
             <td>{course.course_code}</td>
             <td className="schedule">{course.schedule}</td>
             <td>{course.course_name}</td>
             <td>{course.instructor[0].firstName} {course.instructor[0].lastName}</td>  
         </tr>
          )
        })
      }
      </tbody>
     </table>
      </div>
    </div>
  </CourseTableWrapper>
 );
};

const CourseTableWrapper = styled.div`
    box-shadow: 0px 0px 3px 1px #00000054;
    padding: 1rem;
    border-radius: 7px;
    height: 100%;
    overflow: scroll;
    &::-webkit-scrollbar {
      display: none;
    }
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
td, th {
    border: 1px solid #ffffff78;
    text-align: left;
    padding: 4px 6px;
    text-transform: capitalize;
    font-size: smaller;
}
tr:nth-child(even) {
    background-color: #ffc107;
}
table {
    border-collapse: collapse;
    width: 100%;
}
tr.record {
    background: #3498ec;
    color: #ffffff;
}
th {
    background: #ffc107;
}
.title {
    display: flex;
    justify-content: space-between;
    padding-bottom: 10px;
}

`
export default CourseTable;