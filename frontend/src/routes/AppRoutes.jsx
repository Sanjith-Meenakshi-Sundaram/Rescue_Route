import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Dashboard from "../pages/Dashboard";
import UserReports from "../pages/UserReports";
import LiveEmergencyMap from "../pages/LiveEmergencyMap";
import ResourceRequests from "../pages/ResourceRequests";
import PartnerHub from "../pages/PartnerHub";
import AISafetyCompanion from "../pages/AISafetyCompanion";

import ReliefMarketplace from "../pages/ReliefMarketplace";


const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/userreports" element={<UserReports />} />
      <Route path="/liveemergencymap" element={<LiveEmergencyMap />} />
      <Route path="/resourcerequests" element={<ResourceRequests />} />
      <Route path="/partnerhub" element={<PartnerHub />} />
      <Route path="/aisafetycompanion" element={<AISafetyCompanion />} />
      <Route path="/ReliefMarketplace" element={<ReliefMarketplace />} />

      

    </Routes>
  );
};

export default AppRoutes;
