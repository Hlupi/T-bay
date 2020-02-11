import React from 'react'
import styled, { css } from 'styled-components'

import Wrapper from './Wrapper'
import Button from './Button'

const Container = styled.article`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`

const Backdrop = styled.div`
  background: rgba(60, 19, 211, 0.6);
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 0;
  cursor: pointer;
`

const SWrapper = styled(Wrapper)`
  margin-top: 10px;
  margin-bottom: 20px;
  max-width: 700px;
`

export const SForm = styled(Wrapper)`
  padding-top: 20px;
  padding-bottom: 20px;
  position: relative;
  z-index: 1;
  max-width: 500px;
  background: #fff;
  border-radius: 10px;
`

export const Title = styled.h3`
  margin-bottom: 10px;
  text-align: center;
`

export const Element = styled.div`
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  `

export const Label = styled.label`
  margin-right: ${({ auto }) => auto ? '20px' : 'auto'};
  width: ${({ auto }) => !auto && '30%'};
  `

export const Input = styled.input`
  ${({ auto }) => auto && 'margin-right: 20px'};
  padding: 0px 10px;
  width: ${({ auto }) => !auto && '69%'};
  font-size: 16px;
  font-family: 'Quicksand', sans-serif;
  border: 1px solid #3c13d3;
  border-radius: 20px;
`

export const Submit = styled.button`
  padding: 0 15px;
  border-radius: 10px;
  background: rgba(60, 19, 211, 0.1);
  color: #3c13d3;
  font-size: 16px;
  font-family: 'Quicksand', sans-serif;
  ${({ center }) => center && css`
    position: relative;
    left: 50%;
    transform: translateX(-50%);
  `};
`

const Form = (props) => {
  const { onClick, onSubmit, title, fields, onChange, button, open } = props
  const renderFields = fields && fields.map((field, i) => {
    return (
      <Element key={i}>
        <Label htmlFor={field.name}>{field.label}</Label>
        <Input name={field.name} id={field.name} value={field.value} type={field.type} onChange={onChange} />
      </Element>
    )
  })
  return (
    <Container>
      <Backdrop onClick={onClick} />
      <SWrapper>
      <Button onClick={onClick} open={open} />
      <SForm as='form' onSubmit={onSubmit}>
        <Title>{title}</Title>
        {renderFields}
        <Submit type="submit" center>{button}</Submit>
      </SForm>
      </SWrapper>
    </Container>
  )
}

export default Form