import React from 'react';
import styled from "styled-components";
import { Slide } from 'react-slideshow-image';
import { AssignmentList } from '../../common/HelperFunctions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid} from '@fortawesome/fontawesome-svg-core/import.macro'
import 'react-slideshow-image/dist/styles.css'
import moment from 'moment';
const StudentAssignments = ({courses}) => {
  
  if(!courses) {
    return 
  }

 const newAssignment = AssignmentList(courses)
 
 const properties = {
    duration: 2000,
    infinite: true,
    transitionDuration: 1500,
    indicators: true,
    pauseOnHover:true
  };
  const getRandomColor = () => {
    var lum = -0.25;
    var hex = String('#' + Math.random().toString(16).slice(2, 8).toUpperCase()).replace(/[^0-9a-f]/gi, '');
    if (hex.length < 6) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    var rgb = "#",
        c, i;
    for (i = 0; i < 3; i++) {
        c = parseInt(hex.substr(i * 2, 2), 16);
        c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
        rgb += ("00" + c).substr(c.length);
    }
    return rgb;
 }
 return (
  <AssignmentWrapper >
        <h3 className="title">Upcoming Assignments</h3>
        <Slide {...properties}>
          {
            !newAssignment.length > 0 && (
             <p className="no-assignment">You don't have  assignments</p>
            )
          }
         {  
          newAssignment.length > 0 && (
         newAssignment.map((assignment, index)=> (
            <div className="each-slide" key={index}>
              <div className="assignment-part" style={{'background': getRandomColor()}}>
                <div className="assignment-header">
                 <span>Course: {assignment.course_name}</span>
                 <span>|</span>
                 <span>Assignment: {assignment.assignment_name}</span>
                </div>
                <div className="assignment-info">
                  <FontAwesomeIcon className="assignment-icon" icon={solid('book-reader')} />
                  <span className="letter">
                    <FontAwesomeIcon icon={solid('file-pdf')} />
                    <a href={assignment.assignment}>Download assignment</a>
                  </span>
                </div>
                <div className="footer-wrapper">
                <span className="due">
                  <FontAwesomeIcon className="assignment-icon" icon={solid('clock')} />
                   <span>Due: {moment(assignment.due_date).format('D MMM YYYY')}</span>
                </span>
                <span className="instructor">Instructor: {assignment.instructor[0].firstName} {assignment.instructor[0].lastName}</span>
                </div>
              </div>
            </div>
          ))
          )
        } 
        </Slide>
  </AssignmentWrapper>
 );
};

const AssignmentWrapper = styled.div`

 
 box-shadow: 0px 0px 3px 1px #00000054;
    padding: 1rem;
    border-radius: 7px;
   height: 100%;
 .assignment-part {
    text-align: center;
    color: #fff;
    padding: 1rem;
    text-transform: capitalize;
    border-radius: 14px;
}

.assignment-header {
  display: flex;
    align-items: center;
    padding: 5px;
    background: #ffc107;
    margin: 5px 0px;
    color: black;
    gap: 36px;
    justify-content: space-evenly;
    font-size: 24px
    font-weight: bold;
}
.footer-wrapper {
    display: flex;
    flex-direction: row;
    gap: 10px;
    justify-content: space-between;
    align-items: center;
}

.assignment-info {
    padding: 2rem 0px;
    display: flex;
    justify-content: center;
    gap: 10px;
    font-size: 30px;
    align-items: center;
}
p.no-assignment {
    text-align: center;
}

span.letter {
    background: #3498ec;
    border: 1px solid;
    display: flex;
    gap: 5px;
    align-items: center;
    padding: 5px;
    color: #fff !important;
    border-radius: 11px;
    font-size:18px;
    a {
    color: #fff;
    }
}
.assignment-icon {
    font-size: 3rem;
}
span.due {
    background: #4caf50;
    box-shadow: 3px 3px black;
    border-radius: 5px;
    padding: 10px;
    display: flex;
    align-items: center;
    gap: 7px;
    font-size: 15px !important;
    svg {
     font-size: 20px !important;
    }
 }
}

.title {
    padding-bottom: 10px;
}
span.instructor {
    font-size: 12px;
}
.each-slide {
    padding: 0px 10px;
}
.react-slideshow-container .default-nav:last-of-type {
    margin-left: -45px;
}
.react-slideshow-container .default-nav:last-of-type {
    margin-left: -45px;
}
.react-slideshow-container .default-nav:first-of-type {
    margin-right: -45px;
}

.react-slideshow-container+ul.indicators {
    gap: 20px;
}
.react-slideshow-container+ul.indicators .each-slideshow-indicator:before {
    position: absolute;
    top: 0;
    left: 0;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    content: '';
    background: #3498ec;
    text-align: center;
}





`
export default StudentAssignments;