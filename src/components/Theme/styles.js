import styled from 'styled-components'
import * as consts from 'styles/Theme'

const MySelect = styled.select`
  border-radius: ${consts.BORDER_RADIUS.S}px;
  cursor: pointer;
  font-size: ${consts.FONT_SIZE.L}px;
  margin: ${consts.RANGE.S}px 0;
  padding: ${consts.RANGE.XS}px;
  width: 160px;
`

export { MySelect }