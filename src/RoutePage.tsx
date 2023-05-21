import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import DiseasePredictionPage from "./pages/DiseasePredictionPage";

const RoutePage = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/disease" element={<DiseasePredictionPage />} />
    </Routes>
  );
};

export default RoutePage;
