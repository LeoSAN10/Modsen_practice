import { Routes, Route } from "react-router-dom";
import { HomePage } from "pages/HomePage/HomePage";
import { SettingsPage } from "pages/SettingsPage/SettingsPage";
import { ROUTES } from "constants/Routes";
import { changeThemeForProvider } from "utils/changeTheme";
import { ThemeProvider } from "styled-components";
import { ThemeContext, HistoryContext } from "context/context";
import React from "react";
import GlobalStyle from "styles/globalStyle";

function App() {
  const initialTheme = changeThemeForProvider(localStorage.getItem("theme"));
  const initialHistory = JSON.parse(localStorage.getItem("history")) || [];
  const [history, setHistory] = React.useState(initialHistory);
  const [theme, setTheme] = React.useState(initialTheme);
  return (
    <div className="App">
      <ThemeContext.Provider value={{ theme, setTheme }}>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <HistoryContext.Provider value={{ history, setHistory }}>
            <Routes>
              <Route path={ROUTES.HOME_PAGE} element={<HomePage />} />
              <Route path={ROUTES.SETTINGS_PAGE} element={<SettingsPage />} />
            </Routes>
          </HistoryContext.Provider>
        </ThemeProvider>
      </ThemeContext.Provider>
    </div>
  );
}

export default App;
