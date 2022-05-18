import React, {useContext} from 'react';
import styled from "styled-components";
import {NavLink } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid} from '@fortawesome/fontawesome-svg-core/import.macro'
import {AppContext} from "../../contexts/AppContext";

const Sidebar = () => {
   const {showSmallSidebar,isMobile,setShowNav} = useContext(AppContext)
   return (
  <SidebarWrapper 
     showSmallSidebar={showSmallSidebar}
     isMobile={isMobile}
   >
     <div className="logo">
      {!showSmallSidebar &&
       <img src="/images/AppLogo.png" alt="logo"/>
      }
      {showSmallSidebar &&
       <img src="/images/AppLogo_small.png" alt="logo"/>
      }
      {isMobile &&
         <span className="icon close">
             <FontAwesomeIcon onClick={()=> setShowNav(false)} icon={solid('xmark')} />
          </span>
      }
     </div>
     <div className="navigation">
      <ul>
       <li>
          <NavLink 
          className={({ isActive }) => isActive ? "activeLink" : ""}
          to='/'
          >
          <span className="icon">
             <FontAwesomeIcon icon={solid('home')} />
          </span>
          <span className="navigation_item">Dashboard</span>
         </NavLink>
       </li>
       <li>
          <NavLink 
          className={({ isActive }) => isActive ? "activeLink" : ""}
          to='/student/profile'
          >
          <span className="icon">
             <FontAwesomeIcon icon={solid('user-graduate')} />
          </span>
          <span className="navigation_item">Profile</span>
         </NavLink>
       </li>
       <li>
         <NavLink
          className={({ isActive }) => isActive ? "activeLink" : ""}
          to='/student/apply'>
         <span className="icon">
             <FontAwesomeIcon icon={solid('paper-plane')} />
          </span>
          <span className="navigation_item">Apply</span>
         </NavLink>
       </li>
       <li>
          <NavLink
          className={({ isActive }) => isActive ? "activeLink" : ""}
          to='/student/applications'>
         <span className="icon">
             <FontAwesomeIcon icon={solid('folder-tree')} />
          </span>
          <span className="navigation_item">Applications</span>
          </NavLink>
       </li>
       <li>
          <NavLink
          className={({ isActive }) => isActive ? "activeLink" : ""}
          to='/student/courses'>
            <span className="icon">
               <FontAwesomeIcon icon={solid('layer-group')} />
            </span>
            <span className="navigation_item">Courses</span>
          </NavLink>
       </li>
       {/* <li>
          <NavLink
          className={({ isActive }) => isActive ? "activeLink" : ""}
          to='/student/exams'>
            <span className="icon">
               <FontAwesomeIcon icon={solid('folder-open')} />
            </span>
            <span className="navigation_item">Exams</span>
          </NavLink>
       </li> */}
      </ul>
     </div>
  </SidebarWrapper>
 );
};

const SidebarWrapper = styled.div`
 width: ${({showSmallSidebar,isMobile}) => showSmallSidebar ? '61px' : isMobile ? '65vw' : '18vw'};
 transition: width 200ms ease-in;
 background: #f7f7fa;
 span.navigation_item {
 display: ${({showSmallSidebar}) => showSmallSidebar ? 'none' : 'block'};
 transition: display 200ms ease-in;
}
.logo {
    border-bottom: 1px solid #aaa5a54f;
    display: flex;
    align-items: center;
    justify-content: space-between;
    img {
    padding: 10px 11px;
    width: ${({showSmallSidebar}) => showSmallSidebar ? '61.5px' : '208px'};
    transition: width 200ms ease-in;
    }
}
.navigation a {
    display: flex;
    align-items: center;
    gap: 0px 9px;
    font-size: 18px;;
    padding: 14px 20px;
    text-decoration: none;
    color: #6f6f6f;
    &:hover {
     border-left: 9px solid #3498ec;
     z-index: 91;
     color: #3498ec;
      span.navigation_item {
               display: block !important;
               transition: all 300ms ease-in-out;
               background:${({showSmallSidebar}) => showSmallSidebar ? '#ffc107;' : 'none'}; 
               color: ${({showSmallSidebar}) => showSmallSidebar ? '#fff' : ''}; ;
               position: absolute;
               padding: 14px;
               left: 62px;
      }
    }
   }
   .navigation li:nth-child(even) {
      background: #efeff5;
   }
   a.activeLink {
    border-left: 9px solid #ffc107 !important;
    color: #ffffff !important;
    background: #3498ec !important;
   transition: all 300ms ease-in-out !important;
   }
   span.icon {
    font-size: 18px;
   }
   
span.icon.close {
    font-weight: bold;
    font-size: 24px;
    color: #3498ec;
    border: 2px solid;
    margin: 0px 12px;
    padding: 0px 8px;
    transition: all 200ms ease;
}
span.icon.close:hover, span.icon.close:active {
    cursor: pointer;
    border-radius: 50%;
    transform: rotate(180deg);
    transition: all 200ms ease;
}


`

export default Sidebar;