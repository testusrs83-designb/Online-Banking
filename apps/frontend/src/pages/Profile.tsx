import React from "react";
import NavBar from "../components/NavBar";

const Profile: React.FC = () => (
  <div className="bg-background min-h-screen">
    <NavBar />
  <div className="max-w-md mx-auto py-8 px-2">
      <h2 className="text-3xl font-bold text-primary mb-6">Profile</h2>
      <div className="bg-white rounded-lg shadow p-6">
        <div className="mb-4">
          <span className="block text-gray-700 font-semibold">Name:</span>
          <span className="block text-primary">John Doe</span>
        </div>
        <div className="mb-4">
          <span className="block text-gray-700 font-semibold">Email:</span>
          <span className="block text-primary">john.doe@email.com</span>
        </div>
        <div>
          <span className="block text-gray-700 font-semibold">Member Since:</span>
          <span className="block text-primary">2022</span>
        </div>
      </div>
    </div>
  </div>
);

export default Profile;
