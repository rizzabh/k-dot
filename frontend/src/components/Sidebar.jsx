import React from "react";
import { FaSignOutAlt } from "react-icons/fa";
import { useState } from "react";
import { useClipboard } from "use-clipboard-copy";
import { CgSpinner } from "react-icons/cg";
import { getAuth, signOut } from "firebase/auth";

import axios from "axios";

const Sidebar = () => {
  const logout = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        console.log("Logged Out");
        localStorage.removeItem("user");
        window.location.href = "/";
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const [randomcat, setRandomCat] = useState(false);
  const [randomline, setRandomLine] = useState(false);
  const [caturl, setCatUrl] = useState("");
  const [line, setLine] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchRandomCat = async () => {
    setLoading(true);

    try {
      const response = await axios.get(
        "https://api.thecatapi.com/v1/images/search"
      );
      const cat = response.data[0]; // The response is an array, so take the first element
      console.log(cat);
      setCatUrl(cat.url);
    } catch (error) {
      console.error("Error fetching random cat:", error);
    }
    setLoading(false);
  };

  const downloadCatImage = () => {
    const link = document.createElement("a");
    link.href = caturl;
    link.download = "random_cat.jpg";
    link.click();
  };

  const fetchRandomPickupLine = async () => {
    try {
      const response = await axios.get("https://rizzapi.vercel.app/random");
      console.log(response.data);
      const line = response.data;
      setLine(line.text);
      setCopy(false);
    } catch (error) {
      console.error("Error fetching random pickup line:", error);
    }
  };
  const clipboard = useClipboard();
  const [copy, setCopy] = useState(false);
  const copyToClipboard = () => {
    clipboard.copy(line);
    setCopy(true);
  };

  return (
    <div className="h-[90vh]">
      <div className="w-full border rounded-md max-h-[140vh] md:h-screen border-gray-800 p-4">
        <div className="flex justify-between p-2 border rounded-md border-gray-900 bg-gray-600/20">
          <h1 className="px-3 py-2 font-bold text-xl">K-chat</h1>
          <button
            onClick={logout}
            className="px-3 py-2 text-red-600 p-1 border bg-red-600/10 border-red-700 rounded-lg"
          >
            <FaSignOutAlt />
          </button>
        </div>
        <div className="mt-4 p-2 border border-gray-800/70 rounded-md cursor-pointer hover:bg-gray-500/20 flex">
          <img
            src="./rizzabh (Large).jpg"
            className="rounded-full object-cover"
            height={40}
            width={40}
            alt=""
          />
          <div className="text-left">
            <h2 className="font-semibold ml-4">Rishu</h2>
            <p className="ml-4 text-sm text-gray-500">Tap to Open Chat</p>
          </div>
        </div>
        <h1 className="text-left ml-2 font-medium text-xl text-gray-300 py-4 border-t mt-6 border-gray-800">
          Explore Mini Games:
        </h1>
        <div className="grid grid-cols-2 gap-4 cursor-pointer">
          <div
            onClick={() => {
              setRandomCat(true);
              setRandomLine(false);
              fetchRandomCat();
            }}
            className={`group border rounded-md relative overflow-hidden ${
              randomcat ? "border-gray-100 border-2" : "border-gray-600"
            }`}
          >
            <img
              src="./cat.png"
              alt="cat"
              className="object-cover rounded-md transition-transform duration-300 ease-in-out group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black rounded-md opacity-75"></div>
            <div className="absolute bottom-0 ml-2 flex items-center justify-center text-white text-sm">
              Random Cat
            </div>
          </div>

          <div
            className={`group border rounded-md relative overflow-hidden ${
              randomline ? "border-gray-100 border-2" : "border-gray-600"
            }`}
            onClick={() => {
              setRandomLine(true);
              setRandomCat(false);
              fetchRandomPickupLine();
            }}
          >
            <img
              src="./rizzcat.png"
              alt="cat"
              className="object-cover scale-125 rounded-md transition-transform duration-300 ease-in-out group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black rounded-md opacity-75"></div>
            <div className="absolute bottom-0 ml-2 flex items-center justify-center text-white text-sm">
              Random Pickup line
            </div>
          </div>
        </div>
        <div>
          {loading && (
            <div className="mt-4 flex justify-center">
              <div className="loader flex mt-8">
                {" "}
                <CgSpinner className="animate-spin mr-2 justify-center items-center " />{" "}
                Loading
              </div>
            </div>
          )}
          {caturl.length > 0 && !loading && (
            <>
              <img
                src={caturl}
                alt="Random Cat"
                className="object-cover rounded-md mt-4 w-full h-60"
              />
              <button
                onClick={downloadCatImage}
                className="border border-gray-500 hover:bg-white hover:text-black px-4 py-2 mt-4 rounded-full opacity-50"
              >
                Download
              </button>
            </>
          )}
          {line.length > 0 && (
            <div className="mt-3 p-2 border border-gray-800/70 rounded-md cursor-pointer hover:bg-gray-500/20 flex">
              <div className="text-center">
                <h2 className="font-light italic text-md">"{line}"</h2>
                <button
                  onClick={copyToClipboard}
                  className="border border-gray-700 py-2 px-4 mx-auto text-sm mt-2 rounded-full bg-gray-600/10 hover:bg-gray-500/20 hover:text-gray-100 opacity-50"
                >
                  {clipboard.copy && copy ? "Copied!" : "Copy"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
