import React from "react";

const NavBar: React.FC = () => (
  <nav className="bg-primary text-accent px-6 py-3 flex items-center justify-between shadow">
    <div className="flex items-center">
      <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center mr-2">
        {/* Wells Fargo logo placeholder */}
        <span className="text-xl font-bold text-accent">WF</span>
      </div>
      <span className="text-2xl font-bold tracking-wide">Wells Fargo</span>
    </div>
    <ul className="flex space-x-6 text-lg font-medium">
      <li><a href="/accounts" className="hover:text-wf-gold">Accounts</a></li>
      <li><a href="/transfer" className="hover:text-wf-gold">Transfer</a></li>
      <li><a href="/pay-bills" className="hover:text-wf-gold">Pay Bills</a></li>
      <li><a href="/profile" className="hover:text-wf-gold">Profile</a></li>
    </ul>
    <div className="flex items-center">
      <div className="w-8 h-8 bg-wf-gold rounded-full flex items-center justify-center">
        <span className="text-primary font-bold">U</span>
      </div>
    </div>
  </nav>
);

export default NavBar;
