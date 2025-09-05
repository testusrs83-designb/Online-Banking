import React from "react";
import NavBar from "../components/NavBar";

const accounts = [
  { type: "Checking", balance: 5234.12, number: "****1234" },
  { type: "Savings", balance: 10234.56, number: "****5678" },
];

const Accounts: React.FC = () => (
  <div className="bg-background min-h-screen">
    <NavBar />
  <div className="max-w-3xl mx-auto py-8 px-2">
      <h2 className="text-3xl font-bold text-primary mb-6">My Accounts</h2>
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        {accounts.map((acc) => (
          <div key={acc.number} className="bg-white rounded-lg shadow p-6 border-l-8 border-primary">
            <div className="text-lg font-semibold text-gray-700">{acc.type} Account</div>
            <div className="text-2xl font-bold text-primary mt-2">${acc.balance.toLocaleString()}</div>
            <div className="text-sm text-gray-500 mt-1">Account {acc.number}</div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default Accounts;
