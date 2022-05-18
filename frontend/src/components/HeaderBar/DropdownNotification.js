import React from 'react';
import {Link } from "react-router-dom";
import styled from "styled-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid} from '@fortawesome/fontawesome-svg-core/import.macro';
import moment from 'moment';

const DropdownNotification = ({announcement,setDisplayDropDownNotify}) => {
 const downloadFile = () => {
    setDisplayDropDownNotify(false)
 }
 return (
  <DropdownWrapper>
   <div className="announcement-map">
    {
     announcement.map((announce) => {
       return (
        <a className="announce-info" key={announce._id} onClick={downloadFile} href={announce.announcement_file}>
          <div className="info">
           <p className="title">{announce.announcement}</p>
           <p className="date">{moment(announce.date).format('D MMM YYYY')}</p>
          </div>
          <div className="file">
            <FontAwesomeIcon icon={solid('file-pdf')} />
          </div>
        </a>
       )
     })
    }
   </div>
  </DropdownWrapper>
 );
};

const DropdownWrapper = styled.div`

    position: absolute;
    right: 0px;
    background: white;
    top: 45px;
    border: 1px solid #b3b3b357;
    border-radius: 4px;
    transition: all 200ms ease;
 
.announce-info {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-top: 1px solid #18181821;
    padding: 5px;
    gap: 1rem;
}
a.announce-info {
    text-decoration: none;
}

.info {
    display: flex;
    align-items: flex-start;
    justify-content: center;
    flex-direction: column;
}

p.title {
    font-size: 17px;
    white-space: nowrap;
    color: #000;
}

p.date {
font-size: 13px;
    color: #838383;
    padding-top: 5px;
    font-weight: lighter;
    
}

.file {
    font-size: 38px;
    color: #3498ec;
}
.announce-info:hover {
    background: #ffc107;
    cursor: pointer;
}

    font-size: 15px;
    white-space: nowrap;
    color: #000;
    font-weight: bold;

`

export default DropdownNotification;