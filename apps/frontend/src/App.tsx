import React from "react";
import { Route } from "wouter";
import HomePage from "./pages/HomePage";

const App: React.FC = () => (
  <>
    <Route path="/" component={HomePage} />
  </>
);

export default App;
