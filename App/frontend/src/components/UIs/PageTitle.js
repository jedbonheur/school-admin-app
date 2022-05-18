import React from 'react';
import {useNavigate } from 'react-router-dom';
import styled from "styled-components";
const PageTitle = ({title, homePath, page}) => {
  const navigate = useNavigate();
 return (

   <PageTitleWrapper className="heading">
      <h2>{title}</h2>
      <p className="navigator">
       <span onClick={() => {navigate('/')}} className="homepath">{homePath}</span>
       <span>/</span>
       <span className="page">{page}</span>
      </p>
   </PageTitleWrapper>
 );
};

const PageTitleWrapper = styled.div`
padding-bottom: 20px;
p.navigator {
    display: flex;
    align-items: start;
    gap: 0px 5px;
}span.homepath {
    text-transform: capitalize;
    color: #f6b700;
    border-bottom: 2px solid;
}
span.page {
    color: #2196f3;
    text-transform: capitalize;
}
span.homepath:hover {
    cursor: pointer;
    font-weight: bold;
    font-size: 18px;
    transition: all 200ms cubic-bezier(0.4, 0, 0.2, 1);
}
`

export default PageTitle;