import React from 'react';
import styled from "styled-components";
const UserImage = ({user_photo}) => {
 return (
  <DefaultImageWrapper user_photo={user_photo}></DefaultImageWrapper>
 );
};

const DefaultImageWrapper = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-position: center;
    background: url('${({user_photo}) => user_photo ? user_photo : ('/images/userimage-holder.png')}') ;
    background-size: cover;
`

export default UserImage;