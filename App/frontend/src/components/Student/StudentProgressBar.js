import React, {useState} from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const StudentProgressBar = ({percentage}) => {
 if(!percentage){
  return
 }
 return (
  <div>
    <CircularProgressbar value={percentage.length} text={`${percentage.length}%`} />
  </div>
 );
};

export default StudentProgressBar;