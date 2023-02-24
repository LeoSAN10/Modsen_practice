import styled from 'styled-components'
import * as consts from 'styles/Theme'

const Container = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
`
const List = styled.ul.attrs(() => ({
  type: 'list',
}))`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 450px;
  width: 160px;
  overflow-y: scroll;
  overflow-x: hidden;
`
const Title = styled.h1`
  color: ${({ theme }) => theme.text};
  font-size: ${consts.FONT_SIZE.L}px;
  margin-bottom: ${consts.RANGE.S}px;
`

const Item = styled.li`
  list-style-type: none;
`

const Button = styled.button`
  background: none;
  border: 1px solid ${({ theme }) => theme.text};
  border-radius: ${consts.BORDER_RADIUS.S}px;
  color: ${({ theme }) => theme.text};
  cursor: pointer;
  font-weight: ${consts.FONT_WEIGHT.L};
  margin-top: ${consts.RANGE.M}px;
  padding: ${consts.RANGE.XS}px ${consts.RANGE.S}px;
`

export { Button, Container, Item, List, Title }