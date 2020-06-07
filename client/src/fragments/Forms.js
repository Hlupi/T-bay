import React, { Component } from 'react'
import styled, { css, keyframes } from 'styled-components'
import { Formik } from 'formik'

import { Wrapper } from './Layout'
import CrossButton from './Button'

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
  min-height: 100vh; /*FIXXX*/
  z-index: 0;
  cursor: pointer;
`

const SWrapper = styled(Wrapper)`
  margin-top: 10px;
  margin-bottom: 20px;
  max-width: 700px;
  ${({ center }) => center && css`
    position: fixed;
    top: 10px;
    left: 0;
    right: 0;
  `};
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

export const Button = styled.button`
  margin-top: 20px;
  padding: 0 15px;
  border-radius: 10px;
  background: rgba(60, 19, 211, 0.1);
  color: #3c13d3;
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

export const Error = styled.p`
  animation: ${({ visible }) => visible ? css`${fadeIn} 1s ease-out` : css`${fadeOut} 1s ease-out`};
  width: 68%;
  margin-left: auto;
  color: #FD5359;

  ${({comment}) => comment && css`
  width: auto;
  margin-left: 0;
  @media(min-width: 640px) {
    margin-left: 100px;
  }
  `};
`

class Form extends Component {
  constructor(props) {
    super(props)
    this.state = {
      toCenter: false,
      desktop: true
    }
    this.wrppr = React.createRef()
  }

  handlesScroll = () => {
    const stopScroll = this.state.desktop ? 400 : 290
    const scrolledAmount =
      document.body.scrollTop || document.documentElement.scrollTop
    if (scrolledAmount > stopScroll) {
      this.setState({ toCenter: true })
    } else {
      this.setState({ toCenter: false })
    }
  }

  mediaChanged = (mq) => {
    this.setState({ desktop: mq.matches })
    return mq
  }

  componentDidMount() {
    if(this.props.overlaying) {
      if(!window.matchMedia) return
      this.mq = window.matchMedia('(min-width: 640px')
      this.mediaChanged(this.mq).addListener(this.mediaChanged)
      this.handlesScroll()
      window.addEventListener('scroll', this.handlesScroll)
      window.addEventListener('resize', this.resizeHandler)
    }
  }

  componentWillUnmount() {
    if(this.props.overlaying) {
      window.removeEventListener('scroll', this.handlesScroll)
      window.removeEventListener('resize', this.resizeHandler)
      this.mq && this.mq.removeListener(this.mediaChanged)
    }
    
  }

  render() {
    const { onClick, handleSubmit, title, fields, button, open, overlaying, initialValues, validationSchema, formError, ariaLabel } = this.props
    const FormEssentials = (
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={(values) => {
        handleSubmit(values)}}>
        {props => {
          const { values, touched, errors, isSubmitting, handleChange, handleBlur, handleSubmit } = props
          const renderFields = fields.length && fields.map((field, i) => {
            const fieldError = isSubmitting && formError && !!~formError.toLowerCase().indexOf(field.name)
            const hasErrors = errors[field.name]
            const wasTouched = touched[field.name]
            return (
              <Element key={i}>
              <Label htmlFor={field.name}>{field.label}</Label>
              <Input name={field.name} id={field.name} value={values[field.name]}  onChange={handleChange} type={field.type} autoComplete={field.autoComplete && field.autoComplete} onBlur={handleBlur} min={field.min} max={field.max} />
              {hasErrors ? wasTouched && 
              <Error visible={hasErrors && wasTouched}>{hasErrors}</Error> 
              : fieldError && 
              <Error visible={isSubmitting && fieldError}>{formError}</Error>
              }
            </Element>
          )
        })
        
        return (
          <SWrapper center={overlaying && this.state.toCenter} ref={this.wrppr}>
            {overlaying && <CrossButton onClick={onClick} open={open} ariaLabel={ariaLabel} overlaying />}
            <SForm as='form' onSubmit={handleSubmit}>
              <Title>{title}</Title>
              {renderFields}
              <Button type="submit" center>{button}</Button>
            </SForm>
          </SWrapper>
        )}
      }
      </Formik>
    )

    if(overlaying) return (
      <Container>
    <Backdrop onClick={onClick} />
    {FormEssentials}
    </Container>
    )
    
    return (
      FormEssentials
    )
  }
} 
    
export default Form