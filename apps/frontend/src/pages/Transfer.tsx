import React, { useState } from "react";
import NavBar from "../components/NavBar";

const Transfer: React.FC = () => {
  const [amount, setAmount] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  return (
    <div className="bg-background min-h-screen">
      <NavBar />
      <div className="max-w-md mx-auto py-8">
        <h2 className="text-3xl font-bold text-primary mb-6">Transfer Money</h2>
        <form className="bg-white rounded-lg shadow p-6 flex flex-col gap-4">
          <div>
            <label className="block text-gray-700 mb-1">From Account</label>
            <input className="w-full border rounded px-3 py-2" value={from} onChange={e => setFrom(e.target.value)} placeholder="Checking" />
          </div>
          <div>
            <label className="block text-gray-700 mb-1">To Account</label>
            <input className="w-full border rounded px-3 py-2" value={to} onChange={e => setTo(e.target.value)} placeholder="Savings" />
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Amount</label>
            <input className="w-full border rounded px-3 py-2" type="number" value={amount} onChange={e => setAmount(e.target.value)} placeholder="$0.00" />
          </div>
          <button type="submit" className="bg-primary text-accent font-semibold px-6 py-2 rounded shadow hover:bg-wf-gold hover:text-primary transition">Transfer</button>
        </form>
      </div>
    </div>
  );
};

export default Transfer;
