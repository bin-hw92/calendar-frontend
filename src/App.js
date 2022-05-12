import { Route, Routes } from "react-router-dom";
import CalrendarPage from "./pages/CalrendarPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginPage />}/>
        <Route path="/register" element={<RegisterPage />}/>
        <Route path="/calendar" element={<CalrendarPage />}/>
      </Routes>
    </>
  );
};

export default App;