import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { IoClose } from "react-icons/io5"; 

export default function ContactList({ contacts, selectedUser, onSelect }) {
  const [search, setSearch] = useState("");
  const [previewImage, setPreviewImage] = useState(null); 

  const filteredContacts = contacts.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      
      <div className="w-full md:w-1/4 bg-gradient-to-br from-[#e5f4ed] via-white to-[#e5f4ed] text-black p-4 md:p-6 overflow-y-auto rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-center md:text-left tracking-wide mt-4">
          All Friends!
        </h2>

      
        <div className="relative mb-5">
          <FiSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 text-teal-600 text-lg" />
          <input
            type="text"
            placeholder="Search by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-4xl border border-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white text-gray-700 placeholder-gray-400 shadow-sm transition-all"
          />
        </div>

        
        {filteredContacts.length === 0 ? (
          <p className="text-center text-gray-400">No users found</p>
        ) : (
          filteredContacts.map((user) => (
            <div
              key={user.email}
              onClick={() => onSelect(user)}
              className={`flex items-center gap-4 p-3 rounded-xl transition-all duration-200 cursor-pointer mb-3 ${
                selectedUser?.email === user.email
                  ? "bg-white/20 backdrop-blur"
                  : "hover:bg-white/10"
              }`}
            >
              
              <img
                src={user.profileImage || "/default-avatar.png"}
                alt={user.name}
                onClick={(e) => {
                  e.stopPropagation(); 
                  setPreviewImage(user.profileImage || "/default-avatar.png");
                }}
                className="w-12 h-12 rounded-full object-cover border-2 border-teal-600 shadow-md cursor-zoom-in"
              />
              <div className="flex flex-col overflow-hidden">
                <p className="font-semibold truncate text-xl">{user.name}</p>
                <p className="text-sm text-teal-600 truncate">{user.email}</p>
              </div>
            </div>
          ))
        )}
      </div>

      
      {previewImage && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setPreviewImage(null)}
        >
          <div
            className="relative bg-white rounded-lg p-2 md:p-4 max-w-sm w-full shadow-lg"
            onClick={(e) => e.stopPropagation()} 
          >
            
            <button
              onClick={() => setPreviewImage(null)}
              className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-xl"
            >
              <IoClose />
            </button>

          
            <img
              src={previewImage}
              alt="Preview"
              className="w-full h-auto rounded-lg object-cover"
            />
          </div>
        </div>
      )}
    </>
  );
}
