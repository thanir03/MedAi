import React from "react";
import RoutePage from "./RoutePage";
import NavBar from "./components/NavBar/NavBar";

const App = () => {
  return (
    <div>
      <NavBar />
      <main>
        <RoutePage />
      </main>
    </div>
  );
};

export default App;

// Pages
// 1. Static page explaining Disease Prediction with Symptoms
// 2. Disease Prediction With Symptoms Page
