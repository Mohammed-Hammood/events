import React from 'react';
import styled from 'styled-components';

interface Props {
    $size: number
}

const LoaderWrapper = styled.div<Props>`
    display: flex;
    justify-content: center;
    align-items: center;
    background-repeat: no-repeat;
    background: linear-gradient(to bottom, var(--fuchia80), var(--darkBlue));
    outline:none;
    border:none;
    cursor:wait;
    position: fixed;
    height: 100%;
    width: 100%;
    border-radius:0px;
    &::after {
        content:"";
        width:${props => props.$size + "px"};
        height:${props => props.$size + "px"};
        border: 3px solid white;
        border-top: 3px solid red;
        border-radius: 50%;
        animation: Loader 1s linear infinite;
    }
    @keyframes Loader {
        from {
            transform:rotate(0deg);
        }
        to {
            transform:rotate(360deg);
        }
    }
`;
export default function Loader(props: { size: number }) {
    const { size } = props;
    return (<LoaderWrapper $size={size}></LoaderWrapper>)
}