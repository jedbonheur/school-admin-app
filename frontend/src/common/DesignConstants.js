
import React, {useContext} from 'react';
import styled from "styled-components";
import {AppContext} from "../contexts/AppContext"
export const COLORS = {
 text: 'black',
 background: 'yellow',
 primary: 'rebeccapurple',
};

// ***************************
//    -------hooks--------
// ***************************

export const PageWrapper = ({children}) => {
  const {
    isMobile
  } = useContext(AppContext)
    return  <PageWrapperWrapper isMobile={isMobile}>{children}</PageWrapperWrapper>
}
const PageWrapperWrapper = styled.div`
    display: block;
    border-radius: 20px;
    padding: ${({isMobile}) => isMobile ? '2rem 1rem' : '2rem'};
    margin-top: 30px;
}
`
export const PageView = ({children}) => {
  const {
    isMobile
  } = useContext(AppContext)
    return  <PageViewWrapper isMobile={isMobile}>{children}</PageViewWrapper>
}
const PageViewWrapper = styled.div`
    background-color: #ffffff;
    border-radius: 5px;
    padding: ${({isMobile}) => isMobile ? '1rem' : '2rem'};
    height: 100%;
    width: 100%;
    display: block;
    box-shadow: 0px 0px 4px 0px #00000047;
    height: 100%;
    &:hover {
    box-shadow: 0px 0px 4px 0px #ffc107;
    transition: all 300ms ease;
    overflow: scroll;
    &::-webkit-scrollbar {
      display: none;
    }
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
}
`