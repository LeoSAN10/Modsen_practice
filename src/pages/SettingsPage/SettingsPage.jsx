import React, { useContext } from 'react'

import { HistoryContext } from '@context'

export const Settings = () => {
  const { setHistory } = useContext(HistoryContext)
  const clearHistory = () => {
    setHistory([])
    localStorage.removeItem('history')
  }
  return (
    <div></div>
  )
}