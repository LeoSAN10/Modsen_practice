import styled from 'styled-components'
import * as consts from 'styles/Theme'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 500px;
  min-width: 90vw;
  padding: ${consts.RANGE.XL}px;
`

const Title = styled.p`
  font-size: ${consts.FONT_SIZE.L}px;
  letter-spacing: 2px;
  margin-bottom: ${consts.RANGE.M}px;
`
const ClearButton = styled.button`
  background-color: white;
  border-radius: ${consts.BORDER_RADIUS.XS}px;
  cursor: pointer;
  font-size: ${consts.FONT_SIZE.L}px;
  padding: ${consts.RANGE.XS}px;
  width: 160px;
`
export { ClearButton, Container, Title }