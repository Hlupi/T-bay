import styled from 'styled-components'

export const Container = styled.div`
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
		background-image: url('/img/header.svg');
		transform: rotate(180deg);
		width: 100%;
		height: 100%;
		position: absolute;
		bottom: 0;
	}
`