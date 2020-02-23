import { Link } from 'react-router-dom'
import styled from 'styled-components'

export const Container = styled.section`
  position: relative;
`

export const Toolbar = styled.div`
  padding: 10px 0;
`

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
    &:not(:nth-child(3n)) {
      margin-right: 20px;
      flex-basis: calc(33.3333% - 20px);
    }
    &:nth-child(3n) {
      flex-basis: 33.3333%;
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

export const Title = styled.h3`
  font-size: 18px;
  margin-bottom: 5px;
`

export const Description = styled.p`
  font-size: 16px;
  margin-bottom: 10px;
`

export const Date = styled.p`
  font-size: 14px;
  color: #514e57;
`