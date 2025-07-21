import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FaEdit,
  FaTrashAlt,
  FaCamera,
  FaSave,
  FaTimes,
  FaInstagram,
  FaLinkedin,
  FaGithub,
  FaUser,
  FaEnvelope,
} from "react-icons/fa";
import BottomNavbar from "../components/BottomNavbar";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [editingDesc, setEditingDesc] = useState(false);
  const [newDesc, setNewDesc] = useState("");
  const [socialLinks, setSocialLinks] = useState({
    instagram: "",
    linkedin: "",
    github: "",
  });
  const [editingLinks, setEditingLinks] = useState(false);

  const userEmail = localStorage.getItem("email");

  useEffect(() => {
    if (!userEmail) {
      alert("No user logged in");
      window.location.href = "/login";
    } else {
      fetchUserProfile();
      loadLocalData();
    }
  }, []);

  const fetchUserProfile = async () => {
    try {
      const res = await axios.get(
        `https://whatsappclonebackend-f9g8.onrender.com/auth/auth/${userEmail}`
      );
      setUser(res.data);
    } catch (err) {
      console.error("Failed to fetch user", err);
    }
  };

  const loadLocalData = () => {
    const desc = localStorage.getItem("userDescription");
    if (desc) setNewDesc(desc);

    const links = JSON.parse(localStorage.getItem("userLinks"));
    if (links) setSocialLinks(links);
  };

  const saveDescription = () => {
    localStorage.setItem("userDescription", newDesc);
    setEditingDesc(false);
  };

  const deleteDescription = () => {
    localStorage.removeItem("userDescription");
    setNewDesc("");
  };

  const saveLinks = () => {
    localStorage.setItem("userLinks", JSON.stringify(socialLinks));
    setEditingLinks(false);
  };

  const deleteLinks = () => {
    setSocialLinks({ instagram: "", linkedin: "", github: "" });
    localStorage.removeItem("userLinks");
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
      await axios.delete(
        `https://whatsappclonebackend-f9g8.onrender.com/auth/delete/${user._id}`
      );
      localStorage.clear();
      window.location.href = "/signup";
    } catch (err) {
      console.error("Error deleting account", err);
      alert("Failed to delete account.");
    }
  };

  if (!user)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-teal-500 border-dashed rounded-full animate-spin"></div>
      </div>
    );

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-[#e5f4ed] via-white to-[#daf4e9] text-gray-800 px-5 pt-28 pb-16 flex flex-col items-center gap-8">
        <div className="relative w-36 h-36 mb-2">
          <img
            src={user.profileImage || "/default-avatar.png"}
            alt="Profile"
            className="w-full h-full object-cover rounded-full border-4 border-teal-500 shadow-lg"
          />
          <label className="absolute bottom-0 right-0 bg-teal-600 p-2 rounded-full text-white cursor-pointer hover:bg-teal-700 transition">
            <FaCamera />
            <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
          </label>
        </div>

        <div className="flex flex-col items-center gap-1">
          <div className="flex items-center gap-2 text-2xl font-bold text-teal-700">
            <FaUser /> {user.name}
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <FaEnvelope /> {user.email}
          </div>
        </div>

        <div className="w-full max-w-lg">
          <p className="text-lg font-semibold mb-2 flex items-center gap-2 text-teal-800">
            <FaUser /> About Me
          </p>

          {editingDesc ? (
            <div className="space-y-3">
              <textarea
                rows="3"
                value={newDesc}
                onChange={(e) => setNewDesc(e.target.value)}
                placeholder="Write something about yourself..."
                className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-teal-500 resize-none"
              />
              <div className="flex gap-3 justify-end">
                <button
                  onClick={saveDescription}
                  className="bg-green-600 text-white px-4 py-1 rounded-full hover:bg-green-700 flex items-center gap-1"
                >
                  <FaSave /> Save
                </button>
                <button
                  onClick={() => setEditingDesc(false)}
                  className="bg-gray-300 px-4 py-1 rounded-full hover:bg-gray-400 flex items-center gap-1"
                >
                  <FaTimes /> Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white border border-gray-300 rounded-lg shadow p-4 relative text-sm">
              <p>{newDesc || "No description set."}</p>
              <div className="absolute top-2 right-2 flex gap-3 text-teal-600">
                <button onClick={() => setEditingDesc(true)} title="Edit"><FaEdit /></button>
                {newDesc && (
                  <button onClick={deleteDescription} title="Delete"><FaTrashAlt /></button>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="w-full max-w-lg">
          <p className="text-lg font-semibold mb-2 flex items-center gap-2 text-teal-800">
            <FaLinkedin /> Social Links
          </p>

          {editingLinks ? (
            <div className="space-y-3">
              <div className="relative">
                <FaInstagram className="absolute left-3 top-3 text-pink-600" />
                <input
                  type="url"
                  placeholder="Instagram URL"
                  value={socialLinks.instagram}
                  onChange={(e) => setSocialLinks({ ...socialLinks, instagram: e.target.value })}
                  className="w-full pl-10 p-2 border rounded-md"
                />
              </div>
              <div className="relative">
                <FaLinkedin className="absolute left-3 top-3 text-blue-600" />
                <input
                  type="url"
                  placeholder="LinkedIn URL"
                  value={socialLinks.linkedin}
                  onChange={(e) => setSocialLinks({ ...socialLinks, linkedin: e.target.value })}
                  className="w-full pl-10 p-2 border rounded-md"
                />
              </div>
              <div className="relative">
                <FaGithub className="absolute left-3 top-3 text-gray-700" />
                <input
                  type="url"
                  placeholder="GitHub URL"
                  value={socialLinks.github}
                  onChange={(e) => setSocialLinks({ ...socialLinks, github: e.target.value })}
                  className="w-full pl-10 p-2 border rounded-md"
                />
              </div>

              <div className="flex gap-3 justify-end">
                <button
                  onClick={saveLinks}
                  className="bg-blue-600 text-white px-4 py-1 rounded-full hover:bg-blue-700 flex items-center gap-1"
                >
                  <FaSave /> Save
                </button>
                <button
                  onClick={() => setEditingLinks(false)}
                  className="bg-gray-300 px-4 py-1 rounded-full hover:bg-gray-400 flex items-center gap-1"
                >
                  <FaTimes /> Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white border border-gray-300 rounded-lg shadow p-4 relative text-sm space-y-3">
              <div className="flex flex-col gap-2">
                {socialLinks.instagram && (
                  <a
                    href={socialLinks.instagram}
                    target="_blank"
                    rel="noreferrer"
                    className="text-pink-600 flex items-center gap-2 hover:underline"
                  >
                    <FaInstagram /> Instagram
                  </a>
                )}
                {socialLinks.linkedin && (
                  <a
                    href={socialLinks.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-700 flex items-center gap-2 hover:underline"
                  >
                    <FaLinkedin /> LinkedIn
                  </a>
                )}
                {socialLinks.github && (
                  <a
                    href={socialLinks.github}
                    target="_blank"
                    rel="noreferrer"
                    className="text-gray-800 flex items-center gap-2 hover:underline"
                  >
                    <FaGithub /> GitHub
                  </a>
                )}
              </div>

              <div className="absolute top-2 right-2 flex gap-3 text-teal-600">
                <button onClick={() => setEditingLinks(true)} title="Edit"><FaEdit /></button>
                {(socialLinks.instagram || socialLinks.linkedin || socialLinks.github) && (
                  <button onClick={deleteLinks} title="Delete"><FaTrashAlt /></button>
                )}
              </div>
            </div>
          )}
        </div>

        <button
          onClick={handleDelete}
          className="mt-6 bg-red-500 text-white px-6 py-2 rounded-full flex items-center gap-2 hover:bg-red-600 transition"
        >
          <FaTrashAlt /> Delete Profile
        </button>
      </div>

      <BottomNavbar />
    </>
  );
}
