import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import About from "./pages/About";
import Signup from "./pages/Signup";
import AllDoctors from "./pages/allDoctors/AllDoctors";
import Doctor from "./pages/doctor/Doctor";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='about' element={<About />} />
          <Route path='login' element={<Login />} />
          <Route path='signup' element={<Signup />} />
          <Route path='alldoctors' element={<AllDoctors />} />
          <Route path='doctor' element={<Doctor />} />

        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
