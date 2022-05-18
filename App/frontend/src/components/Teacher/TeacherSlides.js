import React from 'react';
import styled from "styled-components";
import { Slide } from 'react-slideshow-image';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid} from '@fortawesome/fontawesome-svg-core/import.macro'
import 'react-slideshow-image/dist/styles.css'
import moment from 'moment';
const TeacherSlides = ({isMobile,courses}) => {
  
  if(!courses) {
    return 
  }


 
 const properties = {
    duration: 2000,
    infinite: true,
    transitionDuration: 1500,
    indicators: true,
    pauseOnHover:true
  };
  const getRandomColor = () => {
    return '#' +  Math.floor(Math.random()*16777215).toString(16);
 }
 return (
  <AssignmentWrapper >
        <h3 className="title">Your Courses</h3>
        <Slide {...properties}>
          {
            !courses.length > 0 && (
             <p className="no-assignment">You don't have  Course</p>
            )
          }
         {  
         courses.length > 0 && (
         courses.map((assignment, index)=> (
            <div className="each-slide" key={index}>
              <div className="assignment-part" style={{'background': getRandomColor()}}>
                <div className="assignment-header">
                 <span>Course: {assignment.course_code}</span>
                 <span>|</span>
                 <span>Department: {assignment.course_depertment}</span>
                </div>
                <div className="assignment-info">
                  <FontAwesomeIcon className="assignment-icon" icon={solid('book-reader')} />
                  <span className="letter">
                    {assignment.course_name}
                  </span>
                </div>
                <div className="footer-wrapper">
                <span className="due">
                  <FontAwesomeIcon className="assignment-icon" icon={solid('clock')} />
                   <span>Schedule: {assignment.schedule}</span>
                </span>
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
    flex: 1;
    width: ${({isMobile})=> isMobile ? '100%' : '48%'};
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
    justify-content: center;
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
export default TeacherSlides;