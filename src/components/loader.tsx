import React from 'react';
import styled from 'styled-components';

interface Props {
    $size: number
}

const LoaderWrapper = styled.div<Props>`
    display: flex;
    justify-content: center;
    align-items: center;
    outline:none;
    background:transparent;
    border:none;
    cursor:wait;
    position: relative;
    height: 100%;
    width: 100%;
    min-height: 222px;
    border-radius:0px;
    &::after {
        content:"";
        width:${props => props.$size + "px"};
        height:${props => props.$size + "px"};
        border: 3px solid white;
        border-top: 3px solid #007aff;
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