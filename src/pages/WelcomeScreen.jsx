import { FaGoogle, FaWhatsapp } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function WelcomeScreen() {
  const navigate = useNavigate();

  
  useEffect(() => {
    const email = localStorage.getItem("email");
    if (email) {
      navigate("/chat");
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e5f4ed] via-white to-[#daf4e9] text-teal-600 flex flex-col justify-between items-center px-6 py-2 relative">
      
      
      <div className="flex justify-center mt-4">
        <div className="bg-white rounded-full p-4">
          <FaWhatsapp className="text-[#25D366] text-6xl" />
        </div>
      </div>

    
      <div className="text-center">
        <h1 className="text-3xl font-bold leading-snug">
          Talk freely. Connect instantly.
        </h1>
        <p className="text-gray-400 mt-2">
          Stay close, no matter the distance.
        </p>
      </div>

    
      <div className="w-full space-y-4">
        <button
          className="flex items-center justify-center gap-2 w-full bg-white text-black py-3 rounded-full font-medium text-sm shadow-sm"
          onClick={() => alert("Google Auth coming soon...")}
        >
          <FaGoogle />
          Sign up with Google
        </button>

        <div className="flex items-center text-sm text-gray-400 justify-center gap-2">
          <div className="h-px bg-gray-600 w-1/4"></div>
          OR
          <div className="h-px bg-gray-600 w-1/4"></div>
        </div>

        <button
          className="w-full bg-[#25D366] hover:bg-[#1db954] text-white py-2 rounded-full font-bold transition duration-300"
          onClick={() => navigate("/signup")}
        >
          Create an account
        </button>
      </div>

      
      <div className="text-center text-xs text-gray-400 px-4 leading-snug">
        Tap to chat. By doing so, you agree to our{" "}
        <span className="underline">Terms</span>,{" "}
        <span className="underline">Privacy Policy</span>, and a bite of our{" "}
        <span className="underline">Cookies 🍪</span>
      </div>

      
      <div className="w-full">
        <p className="text-center text-sm mb-2 text-gray-400">
          Already have an account?
        </p>
        <button
          onClick={() => navigate("/login")}
          className="w-full border border-green-500 text-green-600 py-2 rounded-full text-sm"
        >
          Sign In
        </button>
      </div>
    </div>
  );
}
