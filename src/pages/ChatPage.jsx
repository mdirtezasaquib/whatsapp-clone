import { useEffect, useState } from "react";
import axios from "axios";
import ContactList from "../components/ContactList";
import ChatBox from "../components/ChatBox";
import BottomNavbar from "../components/BottomNavbar";

export default function ChatPage() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const [contacts, setContacts] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMsg, setNewMsg] = useState("");
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    if (!currentUser || !currentUser.email) return;

    axios
      .get("https://whatsappclonebackend-f9g8.onrender.com/auth/getAll/users")
      .then((res) => {
        const others = res.data.filter((u) => u.email !== currentUser.email);
        setContacts(others);
        setLoading(false); 
      })
      .catch((err) => {
        console.error("Error fetching users:", err);
        setLoading(false); 
      });
  }, [currentUser]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const loadChat = (user) => {
    setSelectedUser(user);
    axios
      .get("https://whatsappclonebackend-f9g8.onrender.com/api/chat/messages", {
        params: {
          sender: currentUser.email,
          receiver: user.email,
        },
      })
      .then((res) => setMessages(res.data))
      .catch((err) => console.error("Error loading chat:", err));
  };

  const sendMessage = () => {
    if (!newMsg.trim()) return;

    axios
      .post("https://whatsappclonebackend-f9g8.onrender.com/api/chat/send", {
        senderEmail: currentUser.email,
        receiverEmail: selectedUser.email,
        message: newMsg,
      })
      .then(() => {
        setNewMsg("");
        loadChat(selectedUser);
      })
      .catch((err) => console.error("Error sending message:", err));
  };

  if (!currentUser) {
    return (
      <div className="flex items-center justify-center h-screen text-red-600">
        Please login first.
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-12 h-12 border-4 border-green-400 border-dashed rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row h-screen mt-12">
      {(isMobile && !selectedUser) || !isMobile ? (
        <ContactList
          contacts={contacts}
          selectedUser={selectedUser}
          onSelect={loadChat}
        />
      ) : null}

      {(isMobile && selectedUser) || !isMobile ? (
        <ChatBox
          selectedUser={selectedUser}
          messages={messages}
          currentUser={currentUser}
          newMsg={newMsg}
          setNewMsg={setNewMsg}
          onSend={sendMessage}
          onBack={() => setSelectedUser(null)}
        />
      ) : null}

      {isMobile && !selectedUser && <BottomNavbar />}
    </div>
  );
}
