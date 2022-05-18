import React from 'react';
import styled from "styled-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid} from '@fortawesome/fontawesome-svg-core/import.macro'
const ClassButton = ({course,handleRemoveCourse,teacher}) => {
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
 const randomColor = getRandomColor()
 return (
  <CourseButtonWrapper randomColor={randomColor}>
   <FontAwesomeIcon icon={solid('book')} />
   <span>{course.course_code}</span>
   <FontAwesomeIcon onClick={(e) => handleRemoveCourse(e,teacher._id,course._id)} className="closing-icon" icon={solid('times-circle')} />
  </CourseButtonWrapper>
 );
};

const CourseButtonWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-around;
    gap: 7px;
    background: ${({randomColor}) => randomColor} !important;
    padding: 0 5px !important;
    width: 117px !important;
    font-size: 14px !important;
        border-radius: 5px;
  svg {
    font-size: 150%;
  }
  &:hover {
    transform: scale(1.4);
    transition: all 200ms ease;
    cursor: pointer
}

  .closing-icon:hover {
    transform: rotate(180deg);
    color: #3498ec;
    cursor: pointer;
    transition: all 200ms ease;
}
  
  
`
export default ClassButton;