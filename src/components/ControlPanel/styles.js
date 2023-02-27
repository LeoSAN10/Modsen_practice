import styled from 'styled-components'
import * as consts from 'styles/Theme'

const Container = styled.div`
  ${consts.CENTER}
  flex-direction: column;
  margin-top: ${consts.RANGE.M}px;
`
const Button = styled.button`
  background-color: ${({ theme }) => theme.text};
  border: none;
  border-radius: ${consts.BORDER_RADIUS.L}px;
  color: ${({ theme }) => theme.header};
  cursor: pointer;
  font-weight: ${consts.FONT_WEIGHT.XL};
  height: 70px;
  margin: ${consts.RANGE.S}px;
  width: 70px;
  &:hover {
    opacity: 0.6;
  }
`
const Row = styled.div`
  ${consts.CENTER}
`

export { Button, Container, Row }