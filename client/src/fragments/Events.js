import { Link } from 'react-router-dom'
import styled from 'styled-components'

export const Cards = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  @media(min-width: 640px) {
    justify-content: flex-start;
  }
`

export const Thumb = styled.div`
  width: 100%;
  height: 100%;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  transition: transform .3s linear;
`

export const Card = styled.li`
  margin-bottom: 20px;
  position: relative;
  flex-basis: 100%;
  flex-shrink: 0;
  flex-grow: 0;
  background: #ffffff;
  border-radius: 10px;
  overflow: hidden;
  &:hover {
    & ${Thumb} {
      transform: scale(1.2);
    }
  }
  @media(min-width: 640px) {
    margin-bottom: 40px;
    flex-wrap: wrap;    
    flex-basis: calc(33.3333% - 20px);
    &:not(:nth-child(3n)) {
      margin-right: 20px;
    }
    &:not(:nth-child(3n+1)) {
      margin-left: auto;
    }
  }
`

export const StyledLink = styled(Link)`
  display: flex;
  @media(min-width: 640px) {
    flex-wrap: wrap;    
    &:not(:nth-child(3n)) {
      flex-basis: calc(33.3333% - 20px);
    }
    &:nth-child(3n) {
      flex-basis: 33.3333%;
    }
  }
`

export const ThumbContainer = styled.div`
  width: 35%;
  flex-grow: 0;
  flex-shrink: 0;
  overflow: hidden;
  @media(max-width: 639px) {
    max-width: 150px;
  }
  @media(min-width: 640px) {
    width: 100%;
    height: 150px;
  }
  @media(min-width: 1024px) {
    height: 200px;
  }
`

export const Content = styled.div`
  padding: 10px;
  width: 65%;
  flex-grow: 1;
  flex-shrink: 0;
  @media(min-width: 640px) {
    width: 100%;
  }
`

export const Search = styled.input`
  width: ${({ withAdmin }) => withAdmin ? 'calc(100% - 50px - 20px)' : '100%'};
  padding: 10px;
  border: 1px solid transparent;
  border-radius: 30px;
  font-size: 16px;
  font-family: 'Quicksand', sans-serif;
  background: rgba(60,19,211,0.1);
  color: #3c13d3;
  outline: none;
  transition: border-color .25s linear;
  &::placeholder {
    color: #3c13d3;
  }
  &:focus {
    border: 1px solid #3c13d3;
  }
  @media(min-width: 640px) {
    width: calc(66.6666% - 20px);
  }
  @media(min-width: 1024px) {
    width: calc(33.3333% - 20px);
  }
`

export const Pagination = styled.div`
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 20px;
  width: fit-content;
`

export const Pager = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${({ disabled }) => disabled ? 'rgba(181, 174, 212,0.1)' : 'rgba(60,19,211,0.1)'};
  transition: background .25s ease-in;
  &:first-of-type {
    margin-right: 20px;
  }
`