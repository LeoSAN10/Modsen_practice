import { Routes, Route } from "react-router-dom";
import { HomePage } from "pages/HomePage/HomePage"
import { ROUTES } from "constants/Routes";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path={ROUTES.HOME_PAGE} element={<HomePage/>}/>
      </Routes>
      
    </div>
  );
}

export default App;
