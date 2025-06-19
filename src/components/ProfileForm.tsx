import React, { useState } from "react";

type Profile = {
  name: string;
  age: number;
  gender: string;
  bio: string;
  imageUri: string;
};

type ProfileFormProps = {
  initialProfile?: Profile;
  onSave: (profile: Profile) => void;
};

const ProfileForm: React.FC<ProfileFormProps> = ({ initialProfile, onSave }) => {
  const [name, setName] = useState(initialProfile?.name || "");
  const [age, setAge] = useState(initialProfile?.age || 18);
  const [gender, setGender] = useState(initialProfile?.gender || "");
  const [bio, setBio] = useState(initialProfile?.bio || "");
  const [imageUri, setImageUri] = useState(initialProfile?.imageUri || "");

  // Placeholder for image upload logic (e.g., IPFS)
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      // TODO: Upload to IPFS and get URI
      setImageUri(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ name, age, gender, bio, imageUri });
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <input
        className="border rounded px-2 py-1"
        type="text"
        placeholder="Name"
        value={name}
        onChange={e => setName(e.target.value)}
        required
      />
      <input
        className="border rounded px-2 py-1"
        type="number"
        min={18}
        max={100}
        placeholder="Age"
        value={age}
        onChange={e => setAge(Number(e.target.value))}
        required
      />
      <select
        className="border rounded px-2 py-1"
        value={gender}
        onChange={e => setGender(e.target.value)}
        required
      >
        <option value="">Select Gender</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="other">Other</option>
      </select>
      <textarea
        className="border rounded px-2 py-1"
        placeholder="Bio"
        value={bio}
        onChange={e => setBio(e.target.value)}
        required
      />
      <input
        className="border rounded px-2 py-1"
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
      />
      {imageUri && <img src={imageUri} alt="Profile" className="w-24 h-24 rounded-full object-cover mt-2" />}
      <button className="bg-blue-600 text-white px-4 py-2 rounded" type="submit">
        Save Profile
      </button>
    </form>
  );
};

export default ProfileForm; 