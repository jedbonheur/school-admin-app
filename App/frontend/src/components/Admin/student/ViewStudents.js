import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid} from '@fortawesome/fontawesome-svg-core/import.macro'
import ManageStudent from './ManageStudent'
import {useNavigate } from 'react-router-dom';
const axios = require('axios');


const ViewStudents = () => {
 const[students,setStudents] = useState([])
 const[resultToSearch,setResultToSearch] = useState([])
 const[page,setPage] = useState(1)
 const[limit,setLimit] = useState(3)
 const[totalPages,setTotalPages] = useState(0)
 const[reviewId,setReviewId] = useState(false)
 const[admissionRefresh,setAdmissionRefresh] = useState(false)
 const[emptyResult,setEmptyResult] = useState(false)
 const navigate = useNavigate();

 useEffect(() => {
  axios.get(`/getAllStudents?page=${page}&limit=${limit}`)
   .then(function (response) {
    if(response.status === 200){
      setTotalPages(response.data.totalPages)
      setStudents(response.data.data)
      setResultToSearch(response.data.data)
     }
   })
   .catch(function (error) {
          navigate('/page-404')
   });
 }, [page,limit]);

 useEffect(() => {

 }, [page,limit,admissionRefresh]);


 const pagePerRow = (e) => {
     e.preventDefault();
     const pagePerLimit = e.target.value
     // if(totalPages === page) {
     //    return
     // }
      setLimit(pagePerLimit)
 }
 
 const searchRecord = (e) => {
   const searchKey = e.target.value
   const filteredApplications = resultToSearch.filter((application) => {
       return (
        application.firstName.toLowerCase()
        .includes(searchKey.toLowerCase()) || 
        application.lastName.toLowerCase()
        .includes(searchKey.toLowerCase()) || 
        application.semester.toLowerCase()
        .includes(searchKey.toLowerCase()) || 
        application.program.toLowerCase()
        .includes(searchKey.toLowerCase()) || 
        application.email.toLowerCase()
        .includes(searchKey.toLowerCase()) ||
        application.studentId.toLowerCase()
        .includes(searchKey.toLowerCase())
        
        )
   })

if(filteredApplications.length <= 0 ){
    setEmptyResult(true)
    // setStudents(applications)
   } else {
    setEmptyResult(false)
    setStudents(filteredApplications)
   }
 }

 const nextRows = () => {
  if(totalPages > page) {
   setPage(page + 1)
  }
 }

 const prevRows = () => {
  if(page <= 1) {
   return setPage(1)
  }
  setPage(page - 1)
 }

 const reviewApplication = (id) => {
  setReviewId(id)
 }

 if(students.length <= 0){
  return <p>Loading...</p>
 }

return (
 <>
    {
     reviewId && (
       <ManageStudent id={reviewId} setAdmissionRefresh={setAdmissionRefresh} admissionRefresh={admissionRefresh}/>
     )
    }
    <ViewApplications>
     <div className="search-wrapper">
            <div className="search-bar">
                <input type="text" onChange={(e) => searchRecord(e)} placeholder="Search here" name="search">
                </input>
                    <FontAwesomeIcon icon={solid('search')} />
            </div>
            {
            emptyResult && (
                <p className="match">Nothing match your search</p>
            )
            }
    </div>
     <table>
       <thead>
          <tr>
            <th>Student Id</th>
            <th>Student Name</th>
            <th>Email</th>
            <th>Program</th>
            <th>Semester</th>
            <th className="action-td">Action</th>
          </tr>
      </thead>
      <tbody>
      {
        students.map((student) => {
          return (
         <tr className="record" key={student._id}>
             <td>{student.studentId}</td>
             <td>{student.firstName} {student.lastName}</td>
             <td>{student.email}</td>
             <td>{student.program}</td>
             <td>{student.semester}</td> 
             <td className="action-td">
              <button className="review-btn" onClick={()=> reviewApplication(student._id) }>Action</button>
             </td> 
         </tr>
          )
        })
      }
      </tbody>
     </table>
     <div className="pages-wrapper">
        <div className="page-select">
         <p>Rows Per Page: </p>
           <select name="pages"  defaultValue={limit}  id="pages" onChange={pagePerRow}>
             <option value={limit}>{limit}</option>
             <option value="1">1</option>
             <option value="2">2</option>
             <option value="3">3</option>
             <option value="4">4</option>
           </select>
        </div>
        <div className="next-button">
           <div className="icon" onClick={prevRows}>
             <FontAwesomeIcon icon={solid('angle-left')} />
           </div>
           <div>Page {page} of {totalPages}</div>
           <div className="icon" onClick={nextRows}>
           <FontAwesomeIcon icon={solid('angle-right')} />
           </div>
        </div>
     </div>
   </ViewApplications>
 </>
 )
};


const ViewApplications = styled.div`
    overflow: scroll;
    &::-webkit-scrollbar {
      display: none;
    }
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
td, th {
    border: 1px solid #ffffff;
    text-align: left;
    padding: 8px;
    text-transform: capitalize;
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
.pages-wrapper {
    display: flex;
    align-items: center;
    padding: 12px 0px;
    gap: 0.5rem;
}

.page-select {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.next-button {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}
form.pic-page {
    padding: 0px;
}

.icon {
    background: #3498ec;
    padding: 5px 13px;
    color: white;
}

.icon:hover {
    background: #ffc107;
    cursor: pointer;
    transition: all 200ms ease;
}

.icon:hover svg {
    transform: rotate(360deg);
    transition: all 200ms ease;
}
select#pages {
    background: #ffffff;
    padding: 2px 0px;
    border: 2px solid #3498ec;
    border-radius: 3px;
}
select#pages:focus {
    outline: none;
}
button.review-btn {
    background: #ffc107;
    border: none;
    padding: 2px 5px;
}
.action-td {
    text-align: center;
}
button.review-btn:hover {
    color: #ffffff;
    cursor: pointer;
}
td.Approved_color {
    background: green;
}
td.Pending_color {
    background: #ffc107;
}
td.Rejected_color {
    background: #ce2e2e;
}

.search-bar input {
    border: none;
    padding: 5px 0px;
    width: 100%;
}
.search-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: white;
    justify-content: space-between;
    background: white;
    padding: 3px;
    border-radius: 4px;
    border: 2px solid #e4e4e4;
    width: 270px;
    position: relative;
    margin: 1rem 0px;
}
.search-bar input::placeholder {
    color: #7c7c7c;
}
.search-bar input:focus-visible {
    border: none;
    outline: none;
    color: #2196F3;
}
input[placeholder="Search here"]:focus {
    background: none;
}
.search-bar svg {
    color: #ffc107;
    font-size: 14px;
        position: absolute;
    right: 1.5vw;
}
p.match {
    background: #ffc107;
    text-align: center;
    padding: 7px 10px;
    transition: all 200ms ease;
}
.search-wrapper {
    display: flex;
    align-items: center;
    gap: 8px;
}

`
export default ViewStudents;