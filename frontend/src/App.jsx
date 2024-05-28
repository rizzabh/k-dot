import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Route } from "react-router-dom";
import Home from "./pages/Home";
import Chat from "./pages/Chat";
import { Routes } from "react-router-dom";
import { RoleProvider } from "./context/roleContext";
function App() {
  return (
    <>
      <RoleProvider>
        <div>
          <div className="gradient w-96 h-96 absolute bg-[#35109C] blur-3xl opacity-40 rounded-full -mt-80 max-sm:w-72 -z-9"></div>
          <div className="gradient w-96 h-96 absolute bg-[#10599C] blur-3xl opacity-40 rounded-full -mt-80 right-0  max-sm:w-72 -z-9"></div>

          <Routes>
            <Route path="/" exact Component={Home} />
            <Route path="/chat" Component={Chat} />
          </Routes>
        </div>
      </RoleProvider>
    </>
  );
}

export default App;
