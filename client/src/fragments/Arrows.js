import React from 'react'
import styled from 'styled-components'

const SVG = styled.svg`
  width: 40%;
  position: relative;
  transform: translate(${({ left }) => left ? '-10%' : '10%'}, 10%);
`

export const Arrow = ({ disabled, left }) => {
  const fill = disabled ? "#988bc9" : "#3c13d3"
  return (
    <SVG xmlns="http://www.w3.org/2000/svg" viewBox={left ? "0 0 443.52 443.52" : "0 0 512.002 512.002"} left={left}>
      {left ? 
      <path fill={fill} d="M143.492 221.863L336.226 29.129c6.663-6.664 6.663-17.468 0-24.132-6.665-6.662-17.468-6.662-24.132 0l-204.8 204.8c-6.662 6.664-6.662 17.468 0 24.132l204.8 204.8c6.78 6.548 17.584 6.36 24.132-.42 6.387-6.614 6.387-17.099 0-23.712L143.492 221.863z"/> : 
      <path fill={fill} d="M388.425 241.951L151.609 5.79c-7.759-7.733-20.321-7.72-28.067.04-7.74 7.759-7.72 20.328.04 28.067l222.72 222.105-222.728 222.104c-7.759 7.74-7.779 20.301-.04 28.061a19.8 19.8 0 0014.057 5.835 19.79 19.79 0 0014.017-5.795l236.817-236.155c3.737-3.718 5.834-8.778 5.834-14.05s-2.103-10.326-5.834-14.051z"/>}
    </SVG>)}