import React from "react";

const Message = () => {
  return (
    <div className="h-full max-[1024px]:hidden w-full border border-gray-800 rounded-md bg-gradient-to-b from-zinc-100/10 to-zinc-900/40 p-4">
      <div className="border border-gray-700 w-full p-4 flex rounded-lg items-center bg-black bg-opacity-40">
        <img
          src="./kathu.jpg"
          alt="kathu"
          className="w-12 h-12 rounded-full object-cover"
        />
        <div className=" items-center gap-2 ml-3 text-left">
          <h1 className="text-xl font-medium">Kathu</h1>
          <p className="text-zinc-600 text-sm">Crackhead</p>
        </div>
      </div>
      <div className="p-4 border mt-4 border-gray-700 rounded-md h-[87%] relative bg-black bg-opacity-40">
        <div className="Input bottom-4 absolute">
          <input
            type="text"
            placeholder="Type a message"
            className="w-full bg-transparent border p-4 rounded-lg border-gray-700 focus:outline-none"
          />
        </div>
      </div>
    </div>
  );
};

export default Message;
