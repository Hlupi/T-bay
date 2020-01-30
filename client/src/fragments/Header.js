import React from 'react'
import styled from 'styled-components'

const Head = styled.header`
  background: linear-gradient(to bottom, #FD5359, #3C13D3);
  height: 400px;
  position: relative;
  @media(max-width: 639px) {
    display: none;
  }
`

const Header = () => {
  return (
    // <svg viewBox="0 0 320 168" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="a"><stop stopColor="#FD5359" offset="0%" /><stop stopColor="#3C13D3" offset="100%" /></linearGradient><linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="b"><stop stopColor="#FD5359" stopOpacity=".6" offset="0%" /><stop stopColor="#3C13D3" stopOpacity=".6" offset="100%" /></linearGradient></defs><g fill="none" fillRule="evenodd"><path d="M1 0h320v138c-15.972 9.949-28.148 16.282-36.528 19-12.242 3.97-22.968 12.578-37.707 6-44.811-20-53.706-30.237-66.809-29.86-22.675.653-53.854 21.417-68.507 23.86-16.608 2.77-40.603-23.86-45.947-23.86-17.907 0-39.408 7.953-64.502 23.86V0z" fillOpacity=".7" fill="url(#a)" transform="translate(-1)" /><path d="M1 0h320v131.413c-31.966 25.329-57.554 37.19-76.764 35.587-47.913-4-66.12-35.196-83.236-29-17.117 6.196-80.217 22.245-95.494 25C36.11 168.3 14.608 159.967 1 138V0z" fill="url(#b)" transform="translate(-1)" /></g></svg>
    <Head />
  )
}

export default Header

