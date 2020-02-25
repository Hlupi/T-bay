import React from 'react'
import styled from 'styled-components'

const CrossButton = styled.button`
  margin-left: auto;
  display: block;
  padding: 0;
  width: ${({ small }) => small ? '35px' : '50px'};
  height: ${({ small }) => small ? '35px' : '50px'};
  border-radius: 50%;
  background: ${({ overlaying }) => overlaying ? 'rgba(247, 247, 247, 0.9)' : 'rgba(60, 19, 211, 0.1)'} ;
  position: relative;
  transition: background .25s linear;
  & > svg {
    width: 40%;
    height: 40%;
    position: relative;
    top: 50%;
    transition: transform .25s linear;
    ${({ open }) => open && 'transform: rotate(45deg)'};
  }
`

const Button = ({onClick, open, overlaying, small }) => {
  return (
    <CrossButton onClick={onClick} open={open} overlaying={overlaying} small={small}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill={ open ? '#fd5359' : '#3c13d3'} d="M492 236H276V20c0-11.046-8.954-20-20-20s-20 8.954-20 20v216H20c-11.046 0-20 8.954-20 20s8.954 20 20 20h216v216c0 11.046 8.954 20 20 20s20-8.954 20-20V276h216c11.046 0 20-8.954 20-20s-8.954-20-20-20z"/></svg>
    </CrossButton>
  )
}

export default Button