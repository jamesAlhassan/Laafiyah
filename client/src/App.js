import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "../src/pages/home/Home";
import Login from "./pages/Login";
import About from "./pages/about/About";
import Signup from "./pages/Signup";
import AllDoctors from "./pages/allDoctors/AllDoctors";
import Doctor from "./pages/doctor/Doctor";
import Dashboard from "./pages/Dashboard/Dashboard";
import Profile from "./pages/Dashboard/Profile";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import DoctorDashboard from "./pages/doctorDashboard/DoctorDashboard";
import Booking from "./pages/booking/Booking";
import ConfirmBooking from "./pages/booking/ConfirmBooking";
import PatientDashboard from "./pages/patientDashboard/PatientDashboard";

const App = () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<Home />} />
            <Route path='about' element={<About />} />
            <Route path='login' element={<Login />} />
            <Route path='signup' element={<Signup />} />
            <Route path='dashboard' element={<Dashboard />} />
            <Route path='profile' element={<Profile />} />
            <Route path='alldoctors' element={<AllDoctors />} />
            <Route path='doctor/:id' element={<Doctor />} />
            <Route path='/doctordashboard' element={<DoctorDashboard />} />
            <Route path='/booking/:doctorId' element={<Booking />} />
            <Route path='/confirmbooking' element={<ConfirmBooking />} />
            <Route path='/patientdashboard' element={<PatientDashboard />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
