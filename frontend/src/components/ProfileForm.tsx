import React, { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { useUser } from "../UserContext";
import type { UserProfile } from "../UserContext";

const genders = ["Male", "Female", "Non-binary", "Other"];

const ProfileForm: React.FC = () => {
  const { profile, setProfile } = useUser();
  const [form, setForm] = useState<UserProfile>(
    profile || {
      name: "",
      age: 18,
      gender: "Other",
      bio: "",
      imageUri: "",
    }
  );
  const [imagePreview, setImagePreview] = useState(form.imageUri);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: name === "age" ? Number(value) : value }));
  };

  const handleImage = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setForm((f) => ({ ...f, imageUri: ev.target?.result as string }));
        setImagePreview(ev.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    if (!form.name.trim()) return setError("Name is required");
    if (form.age < 18) return setError("You must be at least 18");
    if (!form.bio.trim()) return setError("Bio is required");
    setSaving(true);
    setTimeout(() => {
      setProfile(form);
      setSaving(false);
      setSuccess(true);
    }, 800); // Simulate async save
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <div className="flex flex-col items-center gap-2">
        <label htmlFor="image" className="cursor-pointer">
          <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden border-2 border-blue-200 shadow">
            {imagePreview ? (
              <img src={imagePreview} alt="Profile" className="object-cover w-full h-full" />
            ) : (
              <span className="text-gray-400 text-3xl">+</span>
            )}
          </div>
          <input
            id="image"
            name="image"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImage}
          />
        </label>
        <span className="text-xs text-gray-400">Tap to upload</span>
      </div>
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={form.name}
        onChange={handleChange}
        className="input input-bordered w-full"
        required
      />
      <input
        type="number"
        name="age"
        placeholder="Age"
        min={18}
        value={form.age}
        onChange={handleChange}
        className="input input-bordered w-full"
        required
      />
      <select
        name="gender"
        value={form.gender}
        onChange={handleChange}
        className="input input-bordered w-full"
      >
        {genders.map((g) => (
          <option key={g} value={g}>{g}</option>
        ))}
      </select>
      <textarea
        name="bio"
        placeholder="Short bio (max 200 chars)"
        value={form.bio}
        onChange={handleChange}
        maxLength={200}
        className="input input-bordered w-full min-h-[80px]"
        required
      />
      {error && <div className="text-red-500 text-sm text-center">{error}</div>}
      {success && <div className="text-green-600 text-sm text-center">Profile saved!</div>}
      <button
        type="submit"
        className="btn-primary w-full mt-2 disabled:opacity-60"
        disabled={saving}
      >
        {saving ? "Saving..." : "Save Profile"}
      </button>
    </form>
  );
};

export default ProfileForm;
