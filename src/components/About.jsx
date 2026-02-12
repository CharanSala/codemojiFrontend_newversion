import React from "react";
import Navbar from "./Navbar";
import {
  FaLinkedin,
  FaInstagram,
  FaGithub,
  FaExclamationTriangle,
} from "react-icons/fa";

// Team Photos
import photo1 from "/images/photo1.jpg";
import photo2 from "/images/photo3.jpg";
import photo3 from "/images/photo2.jpg";

const teamMembers = [
  {
    name: "Charan Sala",
    role: "Coordinator",
    image: photo1,
    github: "https://github.com/CharanSala",
    linkedin: "https://www.linkedin.com/in/salacharan/",
    instagram: "https://www.instagram.com/charan_sala_/",
  },
  {
    name: "D Pravalika",
    role: "Coordinator",
    image: photo2,
    github: "#",
    linkedin: "#",
    instagram: "#",
  },
  {
    name: "Sk Kudhan",
    role: "Coordinator",
    image: photo3,
    github: "#",
    linkedin: "#",
    instagram: "#",
  },
];

const About = () => {
  return (
    <div className="bg-white min-h-screen font-sans text-slate-800">
      <Navbar />

      {/* Hero Header */}
      <section className="py-12 bg-slate-50 border-b border-slate-100 mt-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-3xl md:text-5xl font-black tracking-tight text-slate-900 mb-4 flex flex-wrap items-center justify-center gap-3">
            <span>HOW</span>
            <span className="flex items-center py-1  rounded-2xl ">
              <span className="text-gray-900">Code</span>
              <span className="text-indigo-500 font-bold">Moji</span>
              <span className=" text-5xl">😜</span>
            </span>
            <span>WORKS</span>
          </h1>
          <p className="text-lg text-slate-500 font-medium max-w-2xl mx-auto">
            Every round you complete brings a spark of joy. Finish all the
            challenges to turn this sad emoji into a happy one !
          </p>
        </div>
      </section>

      {/* Important Alert Section */}
      <section className="container mx-auto px-6 mt-0">
        <div className="max-w-4xl mx-auto bg-[#F9F8F6] border-l-4 border-amber-400 p-6 rounded-r-lg shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <FaExclamationTriangle className="text-amber-600 text-xl" />
            <h4 className="font-bold text-amber-900 uppercase tracking-tight">
              Important Notice
            </h4>
          </div>
          <p className="text-amber-800 leading-relaxed font-medium">
            Once a round starts, the <strong>timer runs continuously</strong>.
            Signing out or closing your browser tab{" "}
            <strong>will not pause</strong> the clock. Ensure you have
            dedicated, uninterrupted time before starting your Codemoji session!
          </p>
        </div>
      </section>

      {/* Rounds Detail - Column Format */}
      <section className="container mx-auto px-6 py-16 max-w-4xl">
        {/* Round 1 */}
        <div className="flex flex-col md:flex-row gap-8 mb-20 relative">
          <div className="md:w-1/4">
            <h2 className="text-5xl font-bold text-indigo-100 tracking-tighter flex items-center gap-2">
              01 <span className="text-3xl ">😞</span>
            </h2>
            <h3 className="text-xl font-bold text-indigo-600 uppercase tracking-wider">
              Logic Patch
            </h3>
          </div>
          <div className="md:w-3/4 border-l-4 border-indigo-500 pl-8 py-2">
            <p className="text-slate-500 font-medium leading-relaxed mb-4">
              In this round, we provide two emoji-based programs. These programs
              should look familiar to the participant. However, some parts of
              the code are missing, represented by a{" "}
              <span className="text-red-500 font-bold">?</span> mark.
              <h3 className="font-bold text-slate-500 mt-2">
                Your task is to figure out the correct values.
              </h3>
            </p>
            <div className="bg-gray-900 text-slate-100 p-4 rounded-lg font-mono text-sm mb-4 shadow-inner">
              📌 fact (🔢) {"{"} <br />
              &nbsp;&nbsp;🤔 (🔢 == ❓) 👉 ↩️ 1️⃣ <br />
              &nbsp;&nbsp;↩️ 🔢 * fact (🔢 - ❓) <br />
              {"}"}
            </div>
            <ul className="space-y-2 text-sm text-slate-600 font-medium">
              <li>
                ⏱️ <b>Time Limit:</b> 10 Minutes to complete both programs.
              </li>
              <li>
                🏆 <b>Scoring:</b> Successful submission earns <b>50 Emojis</b>.
              </li>
              <li>
                ⚠️ <b>Timeout:</b> If the timer hits zero, you receive 0 points
                and move to Round 2.
              </li>
            </ul>
          </div>
        </div>

        {/* Round 2 */}
        <div className="flex flex-col md:flex-row gap-8 mb-20 relative">
          <div className="md:w-1/4">
            <h2 className="text-5xl font-bold text-purple-100 tracking-tighter flex items-center gap-2">
              02 <span className="text-3xl ">😐</span>
            </h2>
            <h3 className="text-xl font-bold text-purple-600 uppercase tracking-wider">
              Emoji Decryption
            </h3>
          </div>
          <div className="md:w-3/4 border-l-4 border-purple-500 pl-8 py-2">
            <p className="text-slate-500 font-medium leading-relaxed mb-4">
              Unlike the first round, the logic here is <b>unknown</b>. It is a
              mix of custom logic that you must decipher. You are provided with
              an online compiler supporting <b>C and Python</b>.
            </p>
            <p className="text-slate-500 mb-4 font-medium">
              Your task is to write a traditional code script that replicates
              the emoji logic and satisfies all <b>hidden test cases</b>.
            </p>
            <ul className="space-y-2 text-sm text-slate-500 font-medium ">
              <li>
                ⏱️ <b>Time Limit:</b> 30 Minutes.
              </li>
              <li>
                🏆 <b>Scoring:</b> Successful completion earns <b>50 Emojis</b>.
              </li>
              <li>
                ⚠️ <b>Timeout:</b> Failing to submit results in 0 points before
                moving to Round 3.
              </li>
            </ul>
          </div>
        </div>

        {/* Round 3 */}
        <div className="flex flex-col md:flex-row gap-8 mb-10 relative">
          <div className="md:w-1/4">
            <h2 className="text-5xl font-bold text-pink-100 tracking-tighter flex items-center gap-2">
              03 <span className="text-3xl ">😊</span>
            </h2>
            <h3 className="text-xl font-bold text-pink-600 uppercase tracking-wider">
              Code Unreveal
            </h3>
          </div>
          <div className="md:w-3/4 border-l-4 border-pink-500 pl-8 py-2">
            <p className="text-slate-500 font-medium leading-relaxed mb-4">
              The final challenge requires pure mental tracing. We provide an
              emoji code snippet, and you must <b>predict the exact output</b>.
              To assist you, three hints are available, but they come at a cost
              to your final score.
            </p>
            <div className="grid grid-cols-3 gap-2 mb-4 text-center text-xs font-bold">
              <div className="bg-pink-50 p-2 rounded border border-pink-100">
                Hint 1: -10 pts
              </div>
              <div className="bg-pink-100 p-2 rounded border border-pink-200">
                Hint 2: -20 pts
              </div>
              <div className="bg-pink-200 p-2 rounded border border-pink-300">
                Hint 3: -30 pts
              </div>
            </div>
            <ul className="space-y-2 text-sm text-slate-500 font-medium ">
              <li>
                ⏱️ <b>Time Limit:</b> 20 Minutes.
              </li>
              <li>
                🏆 <b>Leaderboard:</b> Final rankings are based on total Emoji
                points.
              </li>
              <li>
                ⚡ <b>Tie-breaker:</b> Earliest submission wins!
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-[#F8FAFC] py-24 border-t border-slate-100 relative overflow-hidden">
        {/* Abstract Background Decoration */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none opacity-40">
          <div className="absolute top-20 left-10 w-64 h-64 bg-indigo-100 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-50 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-black text-slate-900 tracking-tight mb-4">
              The Minds Behind <span className="text-indigo-600">CodeMoji</span>
            </h2>
            <div className="h-1.5 w-28 bg-indigo-600 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-3xl mx-auto">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="h-fit group relative bg-white border border-slate-100 p-10 rounded-lg shadow-xl shadow-slate-300 hover:shadow-2xl hover:shadow-indigo-100 transition-all duration-500 hover:-translate-y-3"
              >
                {/* Subtle Accent Gradient on Hover */}
                <div className="absolute inset-0 bg-gradient-to-b from-indigo-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[2.5rem]"></div>

                <div className="relative z-10 flex flex-col items-center">
                  {/* Image Container with Modern Border */}
                  <div className="relative mb-8">
                    <div className="absolute inset-0 bg-indigo-600 rounded-3xl scale-105 opacity-0 group-hover:opacity-10 group-hover:rotate-6 transition-all duration-500"></div>
                    <img
                      src={member.image}
                      alt={member.name}
                      className="relative w-36 h-36 rounded-[2rem] object-cover ring-4 ring-white shadow-lg transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  <h4 className="text-2xl font-black text-slate-800 mb-1">
                    {member.name}
                  </h4>

                  <p className="text-indigo-600 font-bold uppercase tracking-[0.2em] text-[10px] mb-8 bg-indigo-50 px-4 py-1.5 rounded-full">
                    {member.role}
                  </p>

                  {/* Social Icons with Clean Layout */}
                  <div className="flex gap-4 p-4 bg-slate-50/50 rounded-2xl border border-slate-100 transition-colors group-hover:bg-white">
                    <a
                      href={member.github}
                      className="text-slate-400 hover:text-slate-900 transition-all transform hover:scale-110"
                    >
                      <FaGithub size={20} />
                    </a>
                    <div className="w-[1px] h-5 bg-slate-200"></div>
                    <a
                      href={member.linkedin}
                      className="text-slate-400 hover:text-indigo-600 transition-all transform hover:scale-110"
                    >
                      <FaLinkedin size={20} />
                    </a>
                    <div className="w-[1px] h-5 bg-slate-200"></div>
                    <a
                      href={member.instagram}
                      className="text-slate-400 hover:text-pink-500 transition-all transform hover:scale-110"
                    >
                      <FaInstagram size={20} />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
