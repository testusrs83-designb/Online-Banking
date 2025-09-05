
import React from "react";
import NavBar from "../components/NavBar";
import { useAccounts } from "../hooks/useAccounts";
import { useTransactions } from "../hooks/useTransactions";

const Dashboard: React.FC = () => {
  const { data: accounts, isLoading: loadingAccounts } = useAccounts();
  const { data: transactions, isLoading: loadingTx } = useTransactions();

  return (
    <div className="bg-background min-h-screen">
      <NavBar />
  <div className="max-w-4xl mx-auto py-8 px-2">
        <h2 className="text-3xl font-bold text-primary mb-6">Account Summary</h2>
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-8">
          {loadingAccounts ? (
            <div>Loading accounts...</div>
          ) : Array.isArray(accounts) && accounts.length ? (
            accounts.map((acc: any) => (
              <div key={acc.number} className="bg-white rounded-lg shadow p-6 border-l-8 border-primary">
                <div className="text-lg font-semibold text-gray-700">{acc.type} Account</div>
                <div className="text-2xl font-bold text-primary mt-2">${acc.balance.toLocaleString()}</div>
                <div className="text-sm text-gray-500 mt-1">Account {acc.number}</div>
              </div>
            ))
          ) : (
            <div>No accounts found.</div>
          )}
        </div>
        <h3 className="text-xl font-bold text-primary mb-4">Recent Transactions</h3>
  <div className="bg-white rounded-lg shadow p-4 sm:p-6">
          {loadingTx ? (
            <div>Loading transactions...</div>
          ) : Array.isArray(transactions) && transactions.length ? (
            <table className="w-full text-left">
              <thead>
                <tr>
                  <th className="pb-2">Date</th>
                  <th className="pb-2">Description</th>
                  <th className="pb-2">Amount</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((tx: any, idx: number) => (
                  <tr key={idx} className="border-b last:border-b-0">
                    <td className="py-2">{tx.date}</td>
                    <td className="py-2">{tx.desc}</td>
                    <td className={`py-2 font-semibold ${tx.amount < 0 ? "text-red-600" : "text-green-600"}`}>
                      {tx.amount < 0 ? "-" : "+"}${Math.abs(tx.amount).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div>No transactions found.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
