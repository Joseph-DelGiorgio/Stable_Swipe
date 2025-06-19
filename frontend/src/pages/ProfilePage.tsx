import React from "react";

const ProfilePage: React.FC = () => {
  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-50">
      <div className="w-full max-w-xl mt-12 bg-white rounded-xl shadow p-8">
        <h2 className="text-2xl font-semibold mb-6">Edit Profile</h2>
        {/* TODO: Render ProfileForm here */}
        <div className="text-gray-400">Profile form coming soon.</div>
      </div>
    </div>
  );
};

export default ProfilePage;
