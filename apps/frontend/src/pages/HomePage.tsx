import React from "react";


const HomePage: React.FC = () => (
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
      <button className="bg-primary text-accent font-semibold px-6 py-2 rounded shadow hover:bg-wf-gold hover:text-primary transition">Sign In</button>
    </div>
    <footer className="mt-8 text-sm text-gray-500">&copy; 2025 Wells Fargo Clone. For demo purposes only.</footer>
  </main>
);

export default HomePage;
