import React,{useState,useEffect} from "react";
import { useMediaQuery } from 'react-responsive'
import {reactLocalStorage} from 'reactjs-localstorage';

export const AppContext = React.createContext(null);

export const AppContextProvider = ({ children }) => {
 const [accessUser, setAccessUser] = useState(
    reactLocalStorage.getObject('userAccess')
 )
 const localUser = reactLocalStorage.getObject('userAccess')
 const [auth, setAuth] = useState(localUser.user_id)
  const [showSmallSidebar, setShowSmallSidebar] = useState(false)
  const [user, setUser] = useState([])
  const isMobile  = useMediaQuery({ query: '(max-width: 1024px)' })
  const isSmallDevice  = useMediaQuery({ query: '(max-width: 768px)' })
  const [mobileNav, setMobileNav] = useState(isMobile)
  const [showNav, setShowNav] = useState(false)
  const [loginError, setLoginError] = useState(false)
  const [announcement, setAnnouncement] = useState(false)
  useEffect(() => {
    setMobileNav(isMobile)
  }, [isMobile]);
  return (
    <AppContext.Provider value={{
     showSmallSidebar,
     setShowSmallSidebar,
     user,
     setUser,
     mobileNav,
     setMobileNav,
     showNav,
     setShowNav,
     isMobile,
     accessUser,
     setAccessUser,
     auth,
     setAuth,
     loginError,
     setLoginError,
     announcement,
     setAnnouncement,
     isSmallDevice
    }}>
      {children}
    </AppContext.Provider>
  );
}