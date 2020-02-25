import styled from 'styled-components'

export const Comment = styled.div`
  padding: 15px 0;
  display: flex;
  align-items: baseline;
  border-top: 1px solid #efefef;
  border-bottom: 1px solid #efefef;
  &:last-child {
    margin-bottom: 15px;
  }
`

export const Content = styled.p`
  width: ${({ admin }) => admin ? 'calc(80% - 100px)' :' 80%' };
`