import React, { useState } from "react";
import { useLogin, useAuth } from "../hooks/useAuth";

const HomePage: React.FC = () => {
  const { data, isLoading } = useAuth();
  const login = useLogin();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <main className="min-h-screen bg-background flex flex-col items-center justify-center">
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg p-8 border-t-8 border-primary">
        <div className="flex items-center mb-6">
          <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mr-4">
            {/* Wells Fargo logo placeholder */}
            <span className="text-3xl font-bold text-accent">WF</span>
          </div>
          <h1 className="text-4xl font-bold text-primary">Wells Fargo</h1>
        </div>
        <p className="text-lg text-gray-700 mb-4">Banking made easy. Secure. Reliable. Trusted.</p>
        {isLoading ? (
          <div>Loading...</div>
        ) : data?.user ? (
          <a href="/dashboard" className="bg-primary text-accent font-semibold px-6 py-2 rounded shadow hover:bg-wf-gold hover:text-primary transition">Go to Dashboard</a>
        ) : (
          <form
            className="flex flex-col gap-4"
            onSubmit={e => {
              e.preventDefault();
              login.mutate({ email, password });
            }}
          >
            <input
              type="email"
              placeholder="Email"
              className="border rounded px-3 py-2"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="border rounded px-3 py-2"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
            <button
              type="submit"
              className="bg-primary text-accent font-semibold px-6 py-2 rounded shadow hover:bg-wf-gold hover:text-primary transition"
              disabled={login.isLoading}
            >
              {login.isLoading ? "Signing In..." : "Sign In"}
            </button>
            {login.isError && (
              <div className="text-red-600">{(login.error as Error).message}</div>
            )}
          </form>
        )}
      </div>
      <footer className="mt-8 text-sm text-gray-500">&copy; 2025 Wells Fargo Clone. For demo purposes only.</footer>
    </main>
  );
};

export default HomePage;
