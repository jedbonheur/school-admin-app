import React, {useContext,useEffect,useState} from 'react';
import styled from "styled-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid} from '@fortawesome/fontawesome-svg-core/import.macro';
import {AppContext} from "../../contexts/AppContext"
import UserImage from '../UIs/UserImage';
import { getRouteByRole,getAnouncementUrl } from '../../common/HelperFunctions';
import {reactLocalStorage} from 'reactjs-localstorage';
import {useNavigate } from 'react-router-dom';
import Dropdown from './Dropdown'
import DropdownNotification from './DropdownNotification';
const axios = require('axios')

const HeaderBar = () => {
  const {
    user,
    setUser,
    showSmallSidebar,
    setShowSmallSidebar,
    mobileNav,
    setShowNav,
    isMobile,
     accessUser,
     setAccessUser,
     auth,
     setAuth,
     announcement,
     setAnnouncement
  } = useContext(AppContext)
  const [displayDropDown, setDisplayDropDown] = useState(false)
  const [displayDropDownNotify, setDisplayDropDownNotify] = useState(false)

  const navigate = useNavigate();

  const showDropDown = () => {
    setDisplayDropDown(true)
  }
  const hideDropDown = () => {
    setDisplayDropDown(false)
  }
  const showDropDownNotify = () => {
    setDisplayDropDownNotify(!displayDropDownNotify)
  }


  
  const role = () =>  accessUser.role

  const user_id = () =>  accessUser.user_id
  useEffect(() => {
    const getUrl = getAnouncementUrl(role())
     if(getUrl !== ''){
       axios.get(`${getUrl}`)
       .then(function (response) {
         if(response.status === 200){
           setAnnouncement(response.data.data)
         }
      })
       .catch(err => {
         navigate('/page-404')
      })
     }
    
  }, []);

  useEffect(() => {
    const getRoute = getRouteByRole(role())
    if(auth){
      fetch(`${getRoute}${user_id()}`)
      .then(res=> res.json())
      .then(response => {
        setUser(response.data)
      })
      .catch(err => {
         navigate('/page-404')
      })
    }
  }, [])

  if(user.length === 0) {
      return
  }

  const LogoutUser = () => {
        setAccessUser(false)
        setAuth(false)
        reactLocalStorage.remove('userAccess');
        navigate("/login");
  }
  const showSmallSidebarHandler = () => {
    setShowSmallSidebar(!showSmallSidebar)
  }

  const showSidebarMobile = () => {
    setShowNav(true)
  }

  return (
   <FixedHeader 
    isMobile={isMobile}
    showSmallSidebar={showSmallSidebar}
    >
      <HeaderWrapper 
      showSmallSidebar={showSmallSidebar}
      isMobile={isMobile}
      >
        <div className="header-left-part">
          <div className="small-sidebar">
            {
              !mobileNav && (
                <FontAwesomeIcon onClick={showSmallSidebarHandler} icon={solid('outdent')} />
              )
            }
            {
              mobileNav && (
                <FontAwesomeIcon onClick={showSidebarMobile} icon={solid('bars')} />
              )
            }
          </div>
          <div className="search-bar">
          <input type="text" placeholder="Search here" name="search">
          </input>
            <FontAwesomeIcon icon={solid('search')} />
          </div>

        </div>
        <div className="user-area">
        {
          role() !== 'admin' && (

            <div className="notification-announcement">
            <div className="notification" onClick={showDropDownNotify}>
              <FontAwesomeIcon icon={solid('bell')} />
              <span className="notification-wrapper">
                <span className="list">{announcement.length}</span>
              </span>
            </div>
              {
                displayDropDownNotify && (
                  <DropdownNotification announcement={announcement} setDisplayDropDownNotify={setDisplayDropDownNotify} />
                )
              }
            </div>
          )
        }
          
          <div className="user-wrapper">
            <UserImage user_photo={user.user_photo}/>
            <div className="thedropdown">
              {
                !displayDropDown && (
                  <FontAwesomeIcon onClick={showDropDown} icon={solid('angle-down')} />
                )
              }
              {
                displayDropDown && (
                  <FontAwesomeIcon onClick={hideDropDown} icon={solid('angle-up')} />
                )
              }
              {
              displayDropDown && (
                <Dropdown user={user} LogoutUser={LogoutUser} />
              )
              }
            </div>
          </div>
        </div>
      </HeaderWrapper>
  </FixedHeader>
  
 );
};
const FixedHeader = styled.div`
    background: white;
    width: ${({showSmallSidebar,isMobile}) => showSmallSidebar ? 'calc(100% - 60px)' : isMobile ? '100%':'calc(100% - 285px)'};
    position: fixed;
    z-index: 9;
`
const HeaderWrapper = styled.div`
    display: flex;
    align-items: center;
    border-bottom: 1px solid #aaa5a54f;
    padding: 10px 20px;
    padding: ${({showSmallSidebar}) => showSmallSidebar ? '8px 5px' : '10px 20px'};
    justify-content: space-between;
    .user-area {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: ${({isMobile}) => isMobile ? '0px 2rem' : '0px 3rem'}
   }
    .user-wrapper {
        display: flex;
        align-items: center;
        gap: 8px;
    }
   .notification {
       color: #747474;
       font-size: 25px;
      position: relative; 
      &:hover {
    cursor: pointer;
    color: #3498ec;
   }
   }
   
   .search-bar input {
    border: none;
    padding: 5px 0px;
    width: 100%;
}
.notification-announcement {
    position: relative;
}
span.notications {
    font-size: 18px;
    position: absolute;
    top: 0;
    z-index: 99999;
    color: #fff;
}

span.notification-wrapper {
    position: relative;
}
span.list {
font-size: 13px;
    background: red;
    color: #fff;
    border-radius: 5px;
    position: absolute;
    top: -10px;
    left: -10px;
    width: 23px;
    height: 23px;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
}

.search-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: white;
    padding:${({isMobile}) => isMobile ? '3px' : '8px'};
    border-radius: 25px;
    border: 1px solid #e4e4e4;
    width: ${({isMobile}) => isMobile ? '150px' : '270px'};
    position: relative;
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
.header-left-part {
    display: flex;
    align-items: center;
    justify-items: center;
    gap: 2rem;
}.small-sidebar {
    font-size: 25px;
    color: #3498ec;
    &:hover {
    cursor: pointer;
    transition: all 200ms ease-in;
   }
}
.thedropdown {
    color: #414141;
    font-size: 15px;
    &:hover {
      cursor: pointer;
    }
}

`
export default HeaderBar;