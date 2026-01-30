import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../components/Signin";

const Home = () => {
  const username = useContext(UserContext);
  const navigate = useNavigate();

  const handleStartClick = () => {
    navigate("/signin");
  };

  return (
    <div>
      <div className="-z-10 absolute bg-[#01052A] h-[55%] w-full"></div>
      <Navbar />
      <div
        className="min-h-screen flex flex-col items-center bg-no-repeat bg-top text-white"
        style={{ backgroundImage: "", backgroundSize: "100% 50vh" }}
      >
        <div className="text-center pt-16 px-6">
          <h1 className="text-6xl font-bold drop-shadow-lg text-white">
            Code<span className="text-blue-400">Moji</span>😝
          </h1>
          <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">
            CodeMoji is where coding meets creativity and fun through emojis!
          </p>
          <button
            className={
              "mt-6 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-lg font-semibold rounded-full shadow-lg transition-transform transform hover:scale-105"
            }
            onClick={handleStartClick}
          >
            Let's Start
          </button>
        </div>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 px-8 max-w-6xl mx-auto z-10 relative">
          {[
            {
              title: "Logic Patch",
              description:
                "Participants analyze an incomplete emoji code, identify missing logic, and complete it correctly.",

              icon: "🧩",
            },
            {
              title: "Emoji Decription",
              description:
                "Participants translate an emoji program into C, C++, Java, or Python, ensuring all test cases pass.",
              icon: "👨‍💻",
            },
            {
              title: "Code Reveal",
              description:
                "participants analyze an emoji program step by step to determine its output.",
              icon: "🔍",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-2xl shadow-lg text-center mt-4 text-gray-900"
            >
              <div className="text-6xl mb-4">{item.icon}</div>
              <h3 className="text-xl font-semibold">{item.title}</h3>
              <p className="text-gray-600 mt-2">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
