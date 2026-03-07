import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./components/Login";
import Register from "./components/Register";
import Tasks from "./components/Tasks";
import Logout from "./components/Logout";
import Header from "./components/Header";
import { Footer } from "./components/Footer";

function App() {
  return (
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Tasks />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/tasks" element={<Tasks />} />
        </Routes>
        <Footer/>
      </BrowserRouter>
  );
}

export default App;
