import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid} from '@fortawesome/fontawesome-svg-core/import.macro';
import {PageWrapper,PageView} from "../../common/DesignConstants";
import {useLocation } from 'react-router-dom';
import PageTitle from "../UIs/PageTitle"
const ThankyouPage = () => {
const location = useLocation();
 return (
 <PageWrapper>
   <PageTitle 
    title='Thank you'
    homePath='dashboard'
    page='Thank you'
   />
    <PageView>
        <ThankyouWrapper>
          <FontAwesomeIcon icon={solid('check-circle')} />
          <p>{location.state}</p>
        </ThankyouWrapper>
     </PageView>
  </PageWrapper>
 );
};

const ThankyouWrapper = styled.div`
    background: #ffffff;
    width: 50%;
    text-align: center;
    padding: 3rem;
    margin: 0 auto;
    border-radius: 25px;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    color: #2196f3;
    box-shadow: 0px 0px 5px #00000070;
    transition: all 200ms ease;
    svg {
    font-size: 49px;
    color: green;
   }
`

export default ThankyouPage;