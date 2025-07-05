import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaWhatsapp, FaEnvelope, FaLock } from "react-icons/fa";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const login = async () => {
    if (!form.email || !form.password) {
      setMessage("❌ Please fill in all fields.");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post("http://localhost:8080/auth/login", form);

      if (res.data === "Login successful") {
        
        localStorage.setItem("email", form.email);

        
        localStorage.setItem(
          "currentUser",
          JSON.stringify({
            name: form.email.split("@")[0],
            email: form.email,
          })
        );

        setMessage("✅ Login successful");
        setTimeout(() => {
          navigate("/chat");
        }, 800);
      } else {
        setMessage("❌ " + (res.data.message || res.data));
      }
    } catch (err) {
      setMessage("❌ " + (err.response?.data || "Login failed"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e5f4ed] via-white to-[#daf4e9] flex flex-col items-center justify-center px-4 py-6 relative">
    
      <div className="text-teal-600 text-3xl font-bold flex items-center gap-2 mb-8">
        <FaWhatsapp className="text-[#25D366]" />
        WhatsApp
      </div>

    
      <div className="w-full max-w-sm bg-white shadow-md rounded-xl p-6 space-y-5">
      
        <div className="relative">
          <FaEnvelope className="absolute top-3 left-3 text-gray-400" />
          <input
            type="email"
            placeholder="Email"
            className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-full bg-white focus:outline-[#25D366]"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </div>

      
        <div className="relative">
          <FaLock className="absolute top-3 left-3 text-gray-400" />
          <input
            type="password"
            placeholder="Password"
            className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-full bg-white focus:outline-[#25D366]"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
        </div>

        
        <button
          onClick={login}
          disabled={loading}
          className="w-full py-3 bg-[#25D366] text-white font-semibold rounded-full hover:bg-[#1db954] transition"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

      
        {message && (
          <p
            className={`text-center font-medium ${
              message.startsWith("✅") ? "text-green-600" : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}

        
        <p className="text-center text-gray-600">
          Don&apos;t have an account?{" "}
          <a
            href="/signup"
            className="text-[#075E54] font-semibold hover:underline"
          >
            Signup
          </a>
        </p>
      </div>

      
      {loading && (
        <div className="absolute inset-0 flex justify-center items-center bg-white/50 backdrop-blur-sm z-20">
          <div className="w-10 h-10 border-4 border-[#25D366] border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
}
