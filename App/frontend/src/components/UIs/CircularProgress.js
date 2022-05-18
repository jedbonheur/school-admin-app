import React from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import styled from "styled-components";
import 'react-circular-progressbar/dist/styles.css';

const CircularProgress = ({stats}) => {
 return (
    <CircularProgressWrapper>
    <CircularProgressbar value={stats} text={`${stats}%`}/>
    </CircularProgressWrapper>
 );
};

const CircularProgressWrapper = styled.div`
.CircularProgressbar {
    width: 150px;
    vertical-align: middle;
}
`
export default CircularProgress