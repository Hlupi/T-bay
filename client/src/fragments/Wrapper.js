import styled from 'styled-components'

const Wrapper = styled.div`
  margin-left: auto;
  margin-right: auto;
  padding-left: 10px;
  padding-right: 10px;
  max-width: 1440px;

  @media (min-width: 640px) {
    padding-left: 20px;
    padding-right: 20px;
  }

  @media (min-width: 1024px) {
    padding-left: 40px;
    padding-right: 40px;
  }
`

export default Wrapper