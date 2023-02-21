import React, { useContext } from 'react'

import { switchTheme } from 'utils/changeTheme'

import { ThemeContext } from 'context/context'

import { MySelect } from './styles'

export const ThemeSelect = () => {
  const { setTheme } = useContext(ThemeContext)
  const changeTheme = ({ target: { value } }) => {
    setTheme(switchTheme(value))
  }
  return (
    <MySelect
      onChange={changeTheme}
      defaultValue={localStorage.getItem('theme')}>
      <option value="light">Light</option>
      <option value="dark">Dark</option>
      <option value="color">Color</option>
    </MySelect>
  )
}