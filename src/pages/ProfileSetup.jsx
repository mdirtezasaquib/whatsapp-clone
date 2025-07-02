import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  FaUser,
  FaPhone,
  FaLanguage,
  FaBirthdayCake,
  FaCamera,
} from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa6";

export default function ProfileSetup() {
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    age: "",
    language: "",
    photo: null, 
  });
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const userEmail = localStorage.getItem("email");
    if (userEmail) {
      setEmail(userEmail);
      axios
        .get(`http://localhost:8080/profile/${userEmail}`)
        .then((res) => {
          if (res.data) setProfile({ ...res.data, photo: null });
        })
        .catch(() => {});
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("email", email);
    formData.append("firstName", profile.firstName);
    formData.append("lastName", profile.lastName);
    formData.append("phone", profile.phone);
    formData.append("age", profile.age);
    formData.append("language", profile.language);
    if (profile.photo) formData.append("photo", profile.photo);

    try {
      await axios.post("http://localhost:8080/profile/save", formData);
      setTimeout(() => {
        navigate("/home");
      }, 2000); 
    } catch (err) {
      console.error("Error saving profile", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#e5f4ed] via-white to-[#daf4e9] flex flex-col justify-center items-center px-4 py-8">
      <div className="flex items-center gap-2 text-3xl font-bold text-teal-600 mb-6">
        <FaWhatsapp className="text-[#25D366]" />
        WhatsApp
      </div>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md space-y-5 animate-fade-in-up"
      >
        <div className="text-2xl font-semibold text-center text-teal-500">
          Setup Your Profile
        </div>

    
        <div className="flex flex-col items-center gap-2">
          <label className="relative w-28 h-28 rounded-full bg-gray-200 overflow-hidden cursor-pointer border-2 border-[#25D366] flex items-center justify-center">
            {profile.photo ? (
              <img
                src={URL.createObjectURL(profile.photo)}
                alt="Preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <FaCamera className="text-gray-500 text-2xl" />
            )}
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) =>
                setProfile({ ...profile, photo: e.target.files[0] })
              }
            />
          </label>
          <span className="text-sm text-gray-500">Add Profile Photo</span>
        </div>

        
        <div className="relative">
          <FaUser className="absolute top-3 left-3 text-gray-400" />
          <input
            type="text"
            placeholder="First Name"
            className="pl-10 p-3 w-full border border-gray-300 rounded-md"
            value={profile.firstName}
            onChange={(e) =>
              setProfile({ ...profile, firstName: e.target.value })
            }
            required
          />
        </div>

        
        <div className="relative">
          <FaUser className="absolute top-3 left-3 text-gray-400" />
          <input
            type="text"
            placeholder="Last Name"
            className="pl-10 p-3 w-full border border-gray-300 rounded-md"
            value={profile.lastName}
            onChange={(e) =>
              setProfile({ ...profile, lastName: e.target.value })
            }
            required
          />
        </div>

        
        <div className="relative">
          <FaPhone className="absolute top-3 left-3 text-gray-400" />
          <input
            type="text"
            placeholder="Phone Number"
            className="pl-10 p-3 w-full border border-gray-300 rounded-md"
            value={profile.phone}
            onChange={(e) =>
              setProfile({ ...profile, phone: e.target.value })
            }
            required
          />
        </div>

        
        <div className="relative">
          <FaBirthdayCake className="absolute top-3 left-3 text-gray-400" />
          <input
            type="number"
            placeholder="Age"
            className="pl-10 p-3 w-full border border-gray-300 rounded-md"
            value={profile.age}
            onChange={(e) =>
              setProfile({ ...profile, age: e.target.value })
            }
            required
          />
        </div>


        <div className="relative">
          <FaLanguage className="absolute top-3 left-3 text-gray-400" />
          <select
            className="pl-10 p-3 w-full border border-gray-300 rounded-md bg-white"
            value={profile.language}
            onChange={(e) =>
              setProfile({ ...profile, language: e.target.value })
            }
            required
          >
            <option value="">Select Language</option>
            <option value="English">English</option>
            <option value="Hindi">Hindi</option>
            <option value="Urdu">Urdu</option>
            <option value="Bengali">Bengali</option>
            <option value="Marathi">Marathi</option>
          </select>
        </div>

        
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#25D366] hover:bg-[#1db954] text-white font-bold py-2 rounded-lg transition duration-300 shadow-md flex justify-center items-center"
        >
          {loading ? (
            <svg
              className="animate-spin h-5 w-5 mr-2 text-white"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              ></path>
            </svg>
          ) : null}
          {loading ? "Saving..." : "Save and Continue"}
        </button>
      </form>
    </div>
  );
}
