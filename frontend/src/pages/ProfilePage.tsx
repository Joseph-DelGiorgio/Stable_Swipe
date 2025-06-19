import React from "react";
import WalletBar from "../components/WalletBar";
import ProfileForm from "../components/ProfileForm";

const ProfilePage: React.FC = () => {
  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-50">
      <WalletBar />
      <div className="w-full max-w-xl mt-12 bg-white rounded-xl shadow p-8">
        <h2 className="text-2xl font-semibold mb-6">Edit Profile</h2>
        <ProfileForm />
      </div>
    </div>
  );
};

export default ProfilePage;
