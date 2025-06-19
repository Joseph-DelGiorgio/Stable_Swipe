import React from "react";
import ProfileForm from "../components/ProfileForm";
import { useUser } from "../UserContext";

const ProfilePage: React.FC = () => {
  const { profile, setProfile } = useUser();

  const handleSave = (newProfile: typeof profile) => {
    setProfile(newProfile);
    alert("Profile saved! " + JSON.stringify(newProfile));
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-50">
      <div className="w-full max-w-xl mt-12 bg-white rounded-xl shadow p-8">
        <h2 className="text-2xl font-semibold mb-6">Edit Profile</h2>
        <ProfileForm initialProfile={profile || undefined} onSave={handleSave} />
      </div>
    </div>
  );
};

export default ProfilePage; 