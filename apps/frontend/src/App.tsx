import React from "react";
import { Route } from "wouter";

import HomePage from "./pages/HomePage";
import Dashboard from "./pages/Dashboard";
import Accounts from "./pages/Accounts";
import Transfer from "./pages/Transfer";
import PayBills from "./pages/PayBills";
import Profile from "./pages/Profile";

const App: React.FC = () => (
  <>
    <Route path="/" component={HomePage} />
    <Route path="/dashboard" component={Dashboard} />
    <Route path="/accounts" component={Accounts} />
    <Route path="/transfer" component={Transfer} />
    <Route path="/pay-bills" component={PayBills} />
    <Route path="/profile" component={Profile} />
  </>
);

export default App;
