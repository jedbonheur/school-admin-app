import React from 'react';
import {Link } from "react-router-dom";
import styled from "styled-components";
import UserImage from '../UIs/UserImage';

const Dropdown = ({user,LogoutUser}) => {

 return (
  <DropdownWrapper>
    <div className="header">
      <UserImage user_photo={user.user_photo}/>
      <div className="userinfo">
       <p className="name">{user.firstName} {user.lastName}</p>
       <p className="role">{user.role}</p>
      </div>
    </div>
    <div className="links">
      <ul>
       <li>
         <Link 
          to='/'
          >Profile</Link>
       </li>
       <li>
         <Link 
          to='/'
          >Inbox</Link>
       </li>
       <li>
         <span onClick={LogoutUser}>Logout</span>
       </li>
      </ul>
    </div>
  </DropdownWrapper>
 );
};

const DropdownWrapper = styled.div`
    position: absolute;
    right: 16px;
    top: 55px;
    background: #ededed;
    border: 1px solid #00000012;
    border-radius: 5px;
    overflow: hidden;
    
.header {
    display: flex;
    gap: 5px;
    align-items: center;
}
p.name {
    color: black;
    font-weight: bold;
}

.userinfo {
    padding: 5px 10px;
    display: flex;
    flex-direction: column;
    gap: 5px;
    text-transform: capitalize;  
}
.header {
    padding: 0px 4px;
}
.links ul li a {
    list-style: none;
    padding: 9px 5px;
    display: block;
    border-top: 1px solid #afafaf4d;
    text-decoration: none;
    color: #000000 !important;
    background: white;
}
.links ul li {
    list-style: none;
}
.links ul li span {
    list-style: none;
    padding: 9px 5px;
    display: block;
    border-top: 1px solid #afafaf4d;
    text-decoration: none;
    color: #000000 !important;
    background: white;
}
.links ul li span:hover {
    cursor: pointer;
    background: #3498ec;
    color: #fff !important;
    
}
.links ul li a:hover {
    cursor: pointer;
    background: #3498ec;
    color: #fff !important;

}
span.list {
    font-size: 12px;
    color: #fff;
    font-weight: bold;
    padding: 7px;
}

span.notification-wrapper {
    background: red;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: -13px;
    left: 10px;
    border-radius: 50%;
}



`

export default Dropdown;