import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import chroma from 'chroma-js'

export function Loader({className}) {
  return (
    <div className={className}>
      <span></span>
    </div>
  )
}

const StyledLoader =  styled(Loader)`
  overflow: visible;
  box-sizing: border-box;
  display: block;
  height: ${props => props.size}px;
  width: ${props => props.size}px;
  -webkit-animation: loader-2-1 3s linear infinite;
          animation: loader-2-1 3s linear infinite;

  @-webkit-keyframes loader-2-1 {
    0%   { -webkit-transform: rotate(0deg); }
    100% { -webkit-transform: rotate(360deg); }
  }
  @keyframes loader-2-1 {
    0%   { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  span {
    display: block;
    box-sizing: border-box;
    overflow: visible;
    position: absolute;
    top: 0; left: 0;
    bottom: 0; right: 0;
    margin: auto;
    height: ${props => props.size}px;
    width: ${props => props.size}px;
    clip: rect(
      ${props => props.size/2}px,
      ${props => props.size}px,
      ${props => props.size}px,
      0
    );
    -webkit-animation: loader-2-2 1.5s cubic-bezier(0.770, 0.000, 0.175, 1.000) infinite;
            animation: loader-2-2 1.5s cubic-bezier(0.770, 0.000, 0.175, 1.000) infinite;
  }
  @-webkit-keyframes loader-2-2 {
    0%   { -webkit-transform: rotate(0deg); }
    100% { -webkit-transform: rotate(360deg); }
  }
  @keyframes loader-2-2 {
    0%   { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  span::before {
    content: "";
    box-sizing: border-box;
    display: block;
    position: absolute;
    top: 0; left: 0;
    bottom: 0; right: 0;
    margin: auto;
    height: ${props => props.size}px;
    width: ${props => props.size}px;
    border: ${props => props.thickness}px solid transparent;
    border-top: ${props => props.thickness}px solid #1572E8;
    border-radius: 50%;
    -webkit-animation: loader-2-3 1.5s cubic-bezier(0.770, 0.000, 0.175, 1.000) infinite;
            animation: loader-2-3 1.5s cubic-bezier(0.770, 0.000, 0.175, 1.000) infinite;
  }
  @-webkit-keyframes loader-2-3 {
    0%   { -webkit-transform: rotate(0deg); }
    100% { -webkit-transform: rotate(360deg); }
  }
  @keyframes loader-2-3 {
    0%   { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  span::after {
    content: "";
    box-sizing: border-box;
    display: block;
    position: absolute;
    top: 0; left: 0;
    bottom: 0; right: 0;
    margin: auto;
    height: ${props => props.size}px;
    width: ${props => props.size};
    border: ${props => props.thickness}px solid ${props => chroma("#1572E8").alpha(0.5).hex()};
    border-radius: 50%;
  }
`

StyledLoader.propTypes = {
  size: PropTypes.number,
  thickness: PropTypes.number
}

StyledLoader.defaultProps = {
  size: 32,
  thickness: 3
}

export default StyledLoader
