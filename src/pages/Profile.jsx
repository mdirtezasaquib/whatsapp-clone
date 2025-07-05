import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaEdit, FaTrashAlt, FaCamera } from "react-icons/fa";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [editingDesc, setEditingDesc] = useState(false);
  const [newDesc, setNewDesc] = useState("");

  const userEmail = localStorage.getItem("email");

  useEffect(() => {
    if (!userEmail) {
      alert("No user logged in");
      window.location.href = "/login";
    } else {
      fetchUserProfile();
    }
  }, []);

  const fetchUserProfile = async () => {
    try {
      const res = await axios.get(`https://whatsappclonebackend-f9g8.onrender.com/auth/auth/${userEmail}`);
      setUser(res.data);
      setNewDesc(res.data.description || "");
    } catch (err) {
      console.error("Failed to fetch user", err);
    }
  };

  const updateDescription = async () => {
    try {
      await axios.put(`https://whatsappclonebackend-f9g8.onrender.com/auth/update-description`, {
        email: user.email,
        description: newDesc,
      });
      setEditingDesc(false);
      fetchUserProfile();
    } catch (err) {
      console.error("Failed to update description");
    }
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = async () => {
      try {
        await axios.put(
          `https://whatsappclonebackend-f9g8.onrender.com/auth/profile/upload/${user.email}`,
          { image: reader.result }
        );
        fetchUserProfile();
      } catch (err) {
        console.error("Image upload failed", err);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete your account?")) return;

    try {
      await axios.delete(`https://whatsappclonebackend-f9g8.onrender.com/auth/delete/${user.email}`);
      localStorage.clear();
      window.location.href = "/signup";
    } catch (err) {
      console.error("Error deleting account", err);
    }
  };

  if (!user)
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500 text-lg">
        Loading Profile...
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e5f4ed] via-white to-[#daf4e9] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-xl bg-white rounded-xl shadow-lg p-6 space-y-6">
        
        <div className="relative w-32 h-32 mx-auto">
          <img
            src={user.profileImage || "/default-avatar.png"}
            alt="Profile"
            className="w-full h-full object-cover rounded-full border-4 border-teal-500 shadow-md"
          />
          <label className="absolute bottom-0 right-0 bg-teal-600 p-2 rounded-full text-white cursor-pointer">
            <FaCamera />
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </label>
        </div>

        
        <h2 className="text-2xl font-bold text-teal-700 text-center">
          {user.name}
        </h2>
        <p className="text-center text-gray-600">{user.email}</p>

        
        <div>
          <p className="text-lg font-semibold text-gray-700 mb-1">About Me</p>
          {editingDesc ? (
            <div className="space-y-2">
              <textarea
                value={newDesc}
                onChange={(e) => setNewDesc(e.target.value)}
                className="w-full border border-gray-300 rounded-md p-2"
                rows="3"
              />
              <div className="flex gap-3 justify-center">
                <button
                  onClick={updateDescription}
                  className="bg-green-600 text-white px-4 py-1 rounded-full hover:bg-green-700"
                >
                  Save
                </button>
                <button
                  onClick={() => setEditingDesc(false)}
                  className="bg-gray-300 px-4 py-1 rounded-full hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="relative bg-gray-50 rounded-md p-3 text-sm text-gray-700 shadow-inner">
              <p>{user.description || "No description set."}</p>
              <button
                className="absolute top-2 right-2 text-teal-600 hover:text-teal-800"
                onClick={() => setEditingDesc(true)}
              >
                <FaEdit />
              </button>
            </div>
          )}
        </div>

        
        <button
          onClick={handleDelete}
          className="bg-red-500 text-white px-4 py-2 rounded-full flex items-center justify-center gap-2 hover:bg-red-600"
        >
          <FaTrashAlt /> Delete Profile
        </button>
      </div>
    </div>
  );
}
