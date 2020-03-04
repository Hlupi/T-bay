import styled, { css } from 'styled-components'


export const Header = styled.header`
	background-size:cover;
  background-repeat: no-repeat;
  ${({ main }) => main ? css`
    background-position: center bottom -4px;
    height: 250px;
    @media(min-width: 640px) {
      transform: rotate(180deg);
      height: 400px;
  }
  ` : css`
    background-position: center;
    height: 200px;
    @media(min-width: 640px) {
      height: 250px;
    }
    @media(min-width: 1024px) {
      height: 300px;
    }
	`};
`

export const Container = styled.div`
	${({ styledPage }) => styledPage && css`
		padding-top: 40px;
		padding-bottom: 40px;
		min-height: calc(100vh - 41px);
		position: relative;
		&::before {
			content: '';
			display: block;
			background-size:cover;
			background-repeat: no-repeat;
			background-position: bottom -2px center;
			background-image: url('/img/shapes.svg');
			transform: rotate(180deg);
			width: 100%;
			height: 100%;
			position: absolute;
			bottom: 0;
		}
	`};
	${({ relative }) =>  relative && 'position: relative'};
	${({ spacingTop }) =>  spacingTop && 'padding-top: 10px'};
`

export const Wrapper = styled.div`
	margin-left: auto;
  margin-right: auto;
  padding-left: 10px;
  padding-right: 10px;
  max-width: 1440px;
	${({ event }) => event && 'padding-bottom: 10px'}; 
	${({ ticket }) => ticket && css`
		padding-bottom: 20px;
		max-width: 800px;
	`};

  @media (min-width: 640px) {
    padding-left: 20px;
    padding-right: 20px;
  }

  @media (min-width: 1024px) {
    padding-left: 40px;
    padding-right: 40px;
  }
`

export const Toolbar = styled.div`
	${({ events }) => events && 'padding: 10px 0'};
	${({ addSpacing }) => addSpacing && 'margin-bottom: 40px'};
	${({ flex }) => flex && css`
		display: flex;
		align-items: center;
	`};
	${({ event }) => event && css`
		margin-bottom: 10px;
		display: flex;
		align-items: center;
		justify-content: space-between;
	`};
`

export const AdminControls = styled.div`
	display: flex;
  align-items: center;
  & > button {
    &:not(:last-of-type) {
      margin-right: 20px;
    }
  }
	${({ overlaying }) => overlaying && css`
		padding: 10px;
		position: absolute;
		top: 0;
		right: 0;
	`};
`

export const Button = styled.button`
  padding: 0 15px;
  border-radius: 10px;
  background: ${({ overlaying }) => overlaying ? 'rgba(247, 247, 247, 0.9)' : 'rgba(60, 19, 211, 0.1)'};
  color: #3c13d3;
  max-height: 20px;
`
