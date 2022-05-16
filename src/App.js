import { Route, Routes } from "react-router-dom";
import CalrendarPage from "./pages/CalrendarPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import TableListPage from "./pages/TableListPage";
import TableWritePage from "./pages/TableWritePage";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginPage />}/>
        <Route path="/register" element={<RegisterPage />}/>
        <Route path="/table">
          <Route index element={<TableListPage />} />
          <Route path="write" element={<TableWritePage />}/>
        </Route>
        <Route path="/calendar" element={<CalrendarPage />}/>
      </Routes>
    </>
  );
};

export default App;