import React, { useEffect } from "react";
import axios from "axios";
import { useContext } from "react";
import { useState } from "react";
import { signOut, getAuth } from "firebase/auth";
import { RoleContext } from "../context/roleContext";
import Sidebar from "../components/Sidebar";
import Message from "../components/Message";
import { ToastContainer, toast } from "react-toastify";
const Chat = () => {
  const [chats, setChats] = useState([]);
  const { user } = useContext(RoleContext);

  const fetchChats = async () => {
    const { data } = await axios.get("http://localhost:5000/api/chat");
    console.log(data);
    setChats(data);
  };

  if (user === "k") {
    toast.success("Logged in as K");
    console.log("Logged in as K");
  } else {
    toast.success("Logged in as R");
    console.log("Logged in as R");
  }
  useEffect(() => {
    fetchChats();
  }, []);

  // const logout = () => {
  //   const auth = getAuth();
  //   signOut(auth)
  //     .then(() => {
  //       console.log("Logged Out");
  //       localStorage.removeItem("user");
  //       window.location.href = "/";
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };
  return (
    <div>
      {/* <button
        className="logout w-fit px-4 bg-red-500 hover:bg-red-700 gap-3 text-white flex items-center justify-center rounded-md py-2 mt-4"
        onClick={logout}
      >
        Logout
      </button>
      {chats.map((chat) => {
        return (
          <div key={chat._id}>
            <h1>{chat.chatName}</h1>
          </div>
        );
      })} */}
      <ToastContainer theme="dark" />
      <div className="grid grid-cols-2 max-md:grid-cols-1 lg:grid-cols-[1fr_3fr] gap-6 auto-rows-fr">
        <Sidebar className="" />
        <Message className="border" />
      </div>
    </div>
  );
};

export default Chat;
