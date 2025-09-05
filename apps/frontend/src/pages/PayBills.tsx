import React, { useState } from "react";
import NavBar from "../components/NavBar";

const PayBills: React.FC = () => {
  const [payee, setPayee] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");

  return (
    <div className="bg-background min-h-screen">
      <NavBar />
  <div className="max-w-md mx-auto py-8 px-2">
        <h2 className="text-3xl font-bold text-primary mb-6">Pay Bills</h2>
        <form className="bg-white rounded-lg shadow p-6 flex flex-col gap-4">
          <div>
            <label className="block text-gray-700 mb-1">Payee</label>
            <input className="w-full border rounded px-3 py-2" value={payee} onChange={e => setPayee(e.target.value)} placeholder="Utility Company" />
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Amount</label>
            <input className="w-full border rounded px-3 py-2" type="number" value={amount} onChange={e => setAmount(e.target.value)} placeholder="$0.00" />
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Date</label>
            <input className="w-full border rounded px-3 py-2" type="date" value={date} onChange={e => setDate(e.target.value)} />
          </div>
          <button type="submit" className="bg-primary text-accent font-semibold px-6 py-2 rounded shadow hover:bg-wf-gold hover:text-primary transition">Pay Bill</button>
        </form>
      </div>
    </div>
  );
};

export default PayBills;
