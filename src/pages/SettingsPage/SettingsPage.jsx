import React, { useContext } from 'react'

import { HistoryContext } from 'context/context'
import { ClearButton, Container, Title } from './styles'
import { ThemeSelect } from 'components/Theme/Theme'
import Header from 'components/Header/Header'

export const SettingsPage = () => {
  const { setHistory } = useContext(HistoryContext)
  const clearHistory = () => {
    setHistory([])
    localStorage.removeItem('history')
  }
  return (
    <Container>
      <Header></Header>
      <Title>Settings:</Title>
      <p>Choose theme:</p>
      <ThemeSelect />
      <ClearButton onClick={clearHistory}>
        Clear history
      </ClearButton>
    </Container>
  )
}

export default SettingsPage