import React from 'react'
import styled, { css, keyframes } from 'styled-components'
import { Formik } from 'formik'

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
  margin-bottom: 30px;
  text-align: center;
`

export const Element = styled.div`
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
  min-height: 45px;
  &:not(:last-of-type) {
    margin-bottom: 10px;
  }
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
  margin-top: 20px;
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

const fadeIn = keyframes`
  from {
    opacity:0;
  }
  to {
    opacity:1;
  }
`

const fadeOut = keyframes`
  from {
    opacity:1;
  }
  to {
    opacity: 0;
  }
`

const Error = styled.p`
  animation: ${({ visible }) => visible ? css`${fadeIn} 1s ease-out` : css`${fadeOut} 1s ease-out`};
  width: 68%;
  margin-left: auto;
  color: #FD5359;
`

const Form = (props) => {
  const { onClick, handleSubmit, title, fields, onChange, button, open, overlaying, initialValues, validationSchema, formError } = props

  const FormEssentials = (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={(values, { setSubmitting }) => {
      handleSubmit(values)
     }}>
      {props => {
        const {
       values,
       touched,
       errors,
       dirty,
       isSubmitting,
       handleChange,
       handleBlur,
       handleSubmit,
       handleReset, 
       isValidating
    } = props
    const renderFields = fields.length && fields.map((field, i) => {
      const fieldError = isSubmitting && formError && !!~formError.toLowerCase().indexOf(field.name)
      const hasErrors = errors[field.name]
      const wasTouched = touched[field.name]
      return (
        <Element key={i}>
          <Label htmlFor={field.name}>{field.label}</Label>
          <Input name={field.name} id={field.name} value={values[field.name]}  onChange={handleChange} type={field.type} autoComplete={field.autoComplete && field.autoComplete} onBlur={handleBlur} />
          {hasErrors ? wasTouched && 
          <Error visible={hasErrors && wasTouched}>{hasErrors}</Error> 
          : fieldError && 
          <Error visible={isSubmitting && fieldError}>{formError}</Error>
          }
        </Element>
      )
    })

      return (
      <SForm as='form' onSubmit={handleSubmit}>
        <Title>{title}</Title>
        {renderFields}
        <Submit type="submit" center>{button}</Submit>
      </SForm>
      )}
}
    </Formik>
  )

  if(overlaying) return (
    <Container>
      <Backdrop onClick={onClick} />
      <SWrapper>
      <Button onClick={onClick} open={open} />
      {FormEssentials}
      </SWrapper>
    </Container>
  )

  return (
    FormEssentials
  )
}

export default Form