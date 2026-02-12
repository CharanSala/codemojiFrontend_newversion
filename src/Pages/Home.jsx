import React, { useContext } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../components/Signin";
import { ArrowRight, Puzzle, Languages, Search } from "lucide-react"; // Using Lucide for cleaner icons like the image
import { Footer } from "../components/Footer";
const Home = () => {
  const username = useContext(UserContext);
  const navigate = useNavigate();

  const handleStartClick = () => {
    navigate("/signin");
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9FD] overflow-x-hidden">
      {/* Background Stylings from Image */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Subtle Radial Gradient Glow */}
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-[radial-gradient(circle,rgba(99,102,241,0.08)_0%,transparent_70%)]"></div>
        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
      </div>

      <Navbar />

      <main className="flex-grow flex flex-col items-center z-10 pt-20 pb-20">
        {/* Hero Section */}
        <div className="text-center pt-16 md:pt-14 px-4 sm:px-6 max-w-4xl">
          {/* Top Pill Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 mb-8 animate-fade-in">
            <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
            <span className="text-sm font-semibold text-indigo-600 tracking-tight">
              Join the future of coding
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 mb-6">
            Code<span className="text-[#6366F1]">Moji</span> 😜
          </h1>

          <p className="mt-4 text-lg md:text-xl text-slate-600 font-medium max-w-2xl mx-auto leading-relaxed">
            CodeMoji is where coding meets creativity and fun through emojis!
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              className="px-6 py-4 bg-[#6366F1] hover:bg-[#5558e6] hover:scale-105 text-white text-lg font-bold rounded-full shadow-[0_10px_20px_-5px_rgba(99,102,241,0.4)] transition-all flex items-center gap-2 group"
              onClick={handleStartClick}
            >
              Let's Start{" "}
            </button>
          </div>
        </div>

        {/* Feature Cards Grid */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 px-6 sm:px-10 max-w-7xl mx-auto">
          {[
            {
              title: "Logic Patch",
              description:
                "Participants analyze an incomplete emoji code, identify missing logic, and complete it correctly to solve the puzzle.",
              icon: <Puzzle className="text-green-600 w-6 h-6" />,
              color: "bg-green-50",
              accent: "bg-green-500/10",
            },
            {
              title: "Emoji Decryption",
              description:
                "Translate complex emoji programs into C, C++, Java, or Python, ensuring all test cases pass with high precision.",
              icon: <Languages className="text-indigo-600 w-6 h-6" />,
              color: "bg-indigo-50",
              accent: "bg-indigo-500/10",
            },
            {
              title: "Code Reveal",
              description:
                "Deconstruct and analyze emoji program execution step by step to determine the final output and identify bottlenecks.",
              icon: <Search className="text-purple-600 w-6 h-6" />,
              color: "bg-purple-50",
              accent: "bg-purple-500/10",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="group bg-white p-8 rounded-[2.5rem] shadow-[0_4px_25px_rgba(0,0,0,0.03)] border border-slate-100 text-left flex flex-col items-start transition-all hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] hover:-translate-y-2 relative overflow-hidden"
            >
              {/* Corner Accent Circle */}
              <div
                className={`absolute top-0 right-0 w-24 h-24 ${item.accent} rounded-full -mr-8 -mt-8 transition-transform group-hover:scale-110`}
              ></div>

              <div className={`p-4 rounded-2xl ${item.color} mb-6`}>
                {item.icon}
              </div>

              <h3 className="text-2xl font-bold text-slate-900 mb-3">
                {item.title}
              </h3>

              <p className="text-slate-500 text-base leading-relaxed mb-6">
                {item.description}
              </p>

              <button
                className="flex items-center gap-2 text-[#6366F1] font-bold text-sm group-hover:gap-3 transition-all"
                onClick={handleStartClick}
              >
                Explore <ArrowRight size={16} />
              </button>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
