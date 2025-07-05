import { useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  FaWhatsapp,
  FaUserAlt,
  FaEnvelope,
  FaLock,
  FaKey,
  FaCamera,
} from "react-icons/fa";

export default function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const navigate = useNavigate();
  const fileInputRef = useRef(null); 

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setSelectedImage(reader.result);
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleIconClick = () => {
    fileInputRef.current.click();
  };

  const sendOtp = async () => {
    if (!form.name || !form.email || !form.password) {
      setMessage("Please fill all the fields before sending OTP.");
      return;
    }

    setLoading(true);
    setMessage("");
    try {
      await axios.post("https://whatsappclonebackend-f9g8.onrender.com/auth/register", form);
      setMessage("OTP sent to your email.");
      setOtpSent(true);
    } catch (err) {
      setMessage(err.response?.data || "Error sending OTP.");
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async () => {
    setLoading(true);
    try {
      const res = await axios.post("https://whatsappclonebackend-f9g8.onrender.com/auth/verify", {
        email: form.email,
        otp,
      });

      if (res.data === "OTP verified successfully") {
        setMessage("✅ Verified");

        if (selectedImage) {
          await axios.put(
            `https://whatsappclonebackend-f9g8.onrender.com/auth/profile/upload/${form.email}`,
            { image: selectedImage }
          );
        }

        navigate("/login");
      } else {
        setMessage("❌ Invalid OTP");
      }
    } catch (err) {
      setMessage(err.response?.data || "OTP verification failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e5f4ed] via-white to-[#daf4e9] flex flex-col justify-center items-center relative text-sm px-4 py-6">
      <div className="text-teal-600 text-3xl font-bold flex items-center gap-2 mb-6">
        <FaWhatsapp className="text-[#25D366]" />
        WhatsApp
      </div>

      <div className="w-full max-w-sm space-y-4">
        {!otpSent && (
          <>
            
            <div className="text-center">
              {preview ? (
                <img
                  src={preview}
                  alt="preview"
                  className="w-24 h-24 rounded-full mx-auto object-cover border-2 border-teal-400 mb-2"
                />
              ) : (
                <div
                  className="w-24 h-24 rounded-full mx-auto bg-gray-200 flex items-center justify-center text-gray-500 mb-2 cursor-pointer"
                  onClick={handleIconClick}
                >
                  <FaCamera size={24} />
                </div>
              )}

              <div className="flex justify-center">
                <button
                  type="button"
                  onClick={handleIconClick}
                  className="flex items-center gap-1 text-sm text-teal-600 hover:underline"
                >
                  <FaCamera /> Choose Image
                </button>
              </div>

              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleImageChange}
                className="hidden"
              />
            </div>
          </>
        )}

      
        {!otpSent ? (
          <>
            <div className="relative">
              <FaUserAlt className="absolute top-3 left-3 text-gray-400" />
              <input
                type="text"
                placeholder="Name"
                required
                className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-full bg-white focus:outline-[#25D366]"
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>

            <div className="relative">
              <FaEnvelope className="absolute top-3 left-3 text-gray-400" />
              <input
                type="email"
                placeholder="Email"
                required
                className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-full bg-white focus:outline-[#25D366]"
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>

            <div className="relative">
              <FaLock className="absolute top-3 left-3 text-gray-400" />
              <input
                type="password"
                required
                placeholder="Password"
                className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-full bg-white focus:outline-[#25D366]"
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
            </div>

            <button
              onClick={sendOtp}
              disabled={loading || !form.name || !form.email || !form.password}
              className={`w-full py-3 rounded-full font-semibold transition ${
                loading || !form.name || !form.email || !form.password
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-[#25D366] text-white hover:bg-[#1db954]"
              }`}
            >
              {loading ? "Sending OTP..." : "Send OTP"}
            </button>
          </>
        ) : (
          <>
            <div className="relative">
              <FaKey className="absolute top-3 left-3 text-gray-400" />
              <input
                type="text"
                placeholder="Enter OTP"
                className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-full bg-white focus:outline-[#25D366]"
                onChange={(e) => setOtp(e.target.value)}
              />
            </div>

            <button
              onClick={verifyOtp}
              className="w-full py-3 bg-[#075E54] text-white rounded-full font-semibold hover:bg-[#064b45] transition"
            >
              Verify OTP
            </button>

            <button
              onClick={sendOtp}
              disabled={loading}
              className="w-full py-3 border border-[#25D366] text-[#25D366] rounded-full font-semibold hover:bg-[#e8f9f0] transition"
            >
              Resend OTP
            </button>
          </>
        )}

        {message && (
          <div className="text-center text-red-600 font-medium">{message}</div>
        )}

        <p className="text-center text-gray-600">
          Already registered?{" "}
          <a
            href="/login"
            className="text-[#075E54] font-semibold hover:underline"
          >
            Login
          </a>
        </p>
      </div>

      
      {loading && (
        <div className="absolute inset-0 flex justify-center items-center bg-white/60 backdrop-blur-sm z-20">
          <div className="w-10 h-10 border-4 border-[#25D366] border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
}
