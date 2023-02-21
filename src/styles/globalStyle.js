import * as consts from 'styles/Theme'
import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline: none;
    box-sizing: border-box;
    text-decoration: none;
  }
  body {
    background-color: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    transition: background-color 1000ms linear;
    font-family: 'Space Mono', monospace;
    font-size: ${consts.FONT_SIZE.S}px;
    font-weight: ${consts.FONT_SIZE.M}px;
  }
  ::-webkit-scrollbar {
    width: 16px; 
    border-radius: ${consts.BORDER_RADIUS.L}px;
}
/* ползунок скроллбара */
::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.body};
    border-radius: ${consts.BORDER_RADIUS.L}px;
}
`