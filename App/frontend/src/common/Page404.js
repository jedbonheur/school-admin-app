import React from 'react';
import styled from "styled-components";
import {PageWrapper,PageView} from "../common/DesignConstants"
import PageTitle from "../components/UIs/PageTitle"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid} from '@fortawesome/fontawesome-svg-core/import.macro'
import {useNavigate } from 'react-router-dom';
const Page404 = () => {
const navigate = useNavigate();
const goBack = () => {
navigate('/')
}
 return (
  <Page404Wrapper>
   <PageWrapper>
     <PageTitle 
      title='Error Page'
      homePath='dashboard'
      page='404 Error'
     />
     <PageView>
      <div className="page-container">
       <FontAwesomeIcon icon={solid('triangle-exclamation')} />
       <p>This page does not exist, please check and try again.</p>
       <button onClick={goBack}>back home</button>
      </div>
     </PageView>
  </PageWrapper>
  </Page404Wrapper>
 );
};

const Page404Wrapper = styled.div`
.page-container {
    display: flex;
    gap: 2rem;
    flex-direction: column;
    align-items: center;
}

.page-container svg {
    font-size: 3rem;
    color: red;
}

.page-container p {
    font-size: 24px;
}

.page-container button {
    border: none;
    padding: 10px 20px;
    border-radius: 4px;
    background: #2196f3;
    color: #fff;
    text-transform: capitalize;
    &:hover {
     background: #ffc107;
    cursor: pointer;
    }
}
`
export default Page404;