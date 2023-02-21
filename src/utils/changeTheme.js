import { color, dark, light } from 'styles/Theme'

const changeThemeForProvider = (value) => {
  switch (value) {
    case 'light':
      return light
    case 'dark':
      return dark
    case 'color':
      return color
    default:
      return dark
  }
}

const switchTheme = (theme) => {
  switch (theme) {
    case 'light': {
      localStorage.setItem('theme', 'light')
      return light
    }
    case 'color': {
      localStorage.setItem('theme', 'color')
      return color
    }
    case 'dark': {
      localStorage.setItem('theme', 'dark')
      return dark
    }
    default:
      return dark
  }
}

export { changeThemeForProvider, switchTheme }