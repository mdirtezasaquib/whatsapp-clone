import React, { useRef, useState } from "react";
import {
  FaCheckDouble,
  FaPaperclip,
  FaSmile,
  FaCamera,
  FaMicrophone,
  FaPaperPlane,
  FaPhoneAlt,
  FaVideo,
  FaSearch,
  FaTimes,
} from "react-icons/fa";
import EmojiPicker from "emoji-picker-react";

export default function ChatBox({
  selectedUser,
  messages,
  currentUser,
  newMsg,
  setNewMsg,
  onSend,
  onBack,
}) {
  const fileInputRef = useRef(null);
  const messageAreaRef = useRef(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  const handleVoiceInput = () => {
    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = "en-IN";
    recognition.start();

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setNewMsg((prev) => prev + " " + transcript);
    };
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewMsg((prev) => prev + ` [File: ${file.name}]`);
    }
  };

  const handleEmojiClick = (emojiData) => {
    setNewMsg((prev) => prev + emojiData.emoji);
  };

  const handleCameraOpen = () => {
    alert("Camera access coming soon...");
  };

  const handleCallClick = () => alert("Call feature coming soon...");
  const handleVideoCallClick = () => alert("Video Call feature coming soon...");

  if (!selectedUser) {
    return (
      <div className="flex-1 flex items-center justify-center text-gray-500 text-lg bg-teal-50">
        Select a contact to chat
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-gray-100 relative h-[100svh]">
    
      <div className="bg-white px-3 py-3 sticky top-16 z-10 flex items-center justify-between gap-2">
        <div className="flex items-center gap-3">
          {typeof onBack === "function" && (
            <button
              onClick={onBack}
              className="md:hidden text-[#25D366] text-xl font-extrabold mr-2"
              title="Back"
            >
              ←
            </button>
          )}
          <img
            src={selectedUser.profileImage || "/default-avatar.png"}
            alt={selectedUser.name}
            className="w-10 h-10 rounded-full object-cover border border-teal-500"
          />
          <span className="font-semibold text-lg">{selectedUser.name}</span>
        </div>

        <div className="flex items-center gap-4 text-teal-700">
          <button onClick={handleCallClick} title="Audio Call">
            <FaPhoneAlt size={18} />
          </button>
          <button onClick={handleVideoCallClick} title="Video Call">
            <FaVideo size={20} />
          </button>

        
          <div className="relative hidden sm:block">
            <input
              type="text"
              placeholder="Search messages ..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border border-gray-300 rounded-full px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-[#2ca194]"
            />
            <FaSearch className="absolute top-2 right-3 text-gray-400" />
          </div>

          
          <div className="block sm:hidden relative">
            <button
              onClick={() => {
                setShowMobileSearch((prev) => {
                  const newState = !prev;
                  if (newState) {
                    setTimeout(() => {
                      if (messageAreaRef.current) {
                        messageAreaRef.current.scrollTo({
                          top: 0,
                          behavior: "smooth",
                        });
                      }
                    }, 50);
                  }
                  return newState;
                });
              }}
            >
              {showMobileSearch ? (
                <FaTimes className="text-red-500 text-lg" />
              ) : (
                <FaSearch className="text-teal-700 text-lg" />
              )}
            </button>
          </div>
        </div>
      </div>

    
      {showMobileSearch && (
        <div className="px-3 pb-2 sm:hidden">
          <input
            type="text"
            placeholder="Search messages ..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#2ca194] mt-5"
          />
        </div>
      )}

      
      <div
        ref={messageAreaRef}
        className="flex-1 overflow-y-auto px-2 py-3 space-y-3"
      >
        {messages.map((msg, idx) => {
          const isOwn = msg.senderEmail === currentUser.email;
          const isMatch =
            searchTerm &&
            msg.message.toLowerCase().includes(searchTerm.toLowerCase());

          return (
            <div
              key={idx}
              className={`p-3 rounded-2xl text-sm md:text-base max-w-[85%] sm:max-w-[75%] break-words ${
                isOwn
                  ? "bg-green-200 self-end ml-auto text-right"
                  : "bg-white self-start"
              } ${isMatch ? "ring-2 ring-yellow-400 bg-yellow-100" : ""}`}
            >
              <p>{msg.message}</p>
              <div className="text-xs text-gray-500 mt-1 flex justify-end items-center gap-1">
                <span>
                  {new Date(msg.timestamp).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
                {isOwn && (
                  <FaCheckDouble
                    className={`${
                      msg.status === "READ" ? "text-blue-500" : "text-gray-400"
                    }`}
                  />
                )}
              </div>
            </div>
          );
        })}
      </div>

    
      {showEmojiPicker && (
        <div className="absolute bottom-24 left-2 z-50 max-w-[300px]">
          <EmojiPicker onEmojiClick={handleEmojiClick} />
        </div>
      )}

      
      <div className="bg-[#f9f9f9] px-3 py-2 flex items-center gap-2 shadow-inner border-t border-gray-300 rounded-t-3xl fixed bottom-0 lg:w-251">
        <button
          onClick={() => fileInputRef.current.click()}
          className="text-gray-600 hover:text-[#2ca194] transition-colors duration-200"
          title="Attach File"
        >
          <FaPaperclip size={22} />
        </button>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileSelect}
          hidden
        />

        <button
          onClick={() => setShowEmojiPicker((prev) => !prev)}
          className="text-gray-600 hover:text-yellow-500 transition duration-200"
          title="Emoji"
        >
          <FaSmile size={24} />
        </button>

        <button
          onClick={handleCameraOpen}
          className="text-gray-600 hover:text-blue-400 transition duration-200"
          title="Camera"
        >
          <FaCamera size={20} />
        </button>

        <button
          onClick={handleVoiceInput}
          className="text-gray-600 hover:text-red-400 transition duration-200"
          title="Voice Input"
        >
          <FaMicrophone size={20} />
        </button>

        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Type your message..."
            value={newMsg}
            onChange={(e) => setNewMsg(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && onSend()}
            className="w-full bg-white border border-gray-300 rounded-full px-5 py-2 text-sm sm:text-base shadow-sm focus:outline-none focus:ring-2 focus:ring-[#2ca194] transition-all duration-300"
          />
        </div>

        <button
          onClick={onSend}
          className="bg-[#2ca194] hover:bg-[#1f8f73] transition-colors duration-300 text-white px-4 py-2 rounded-full shadow-md"
          title="Send"
        >
          <FaPaperPlane size={18} />
        </button>
      </div>
    </div>
  );
}
