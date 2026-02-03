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
      <section className="py-12 bg-slate-50 border-b border-slate-100">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 mb-4 flex flex-wrap items-center justify-center gap-3">
            <span>HOW</span>
            <span className="flex items-center py-1 px-3 rounded-2xl ">
              <span className="text-indigo-900">Code</span>
              <span className="text-blue-500 font-light">Moji</span>
              <span className="ml-2  text-3xl">😞</span>
            </span>
            <span>WORKS</span>
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Every round you complete brings a spark of joy. Finish all the
            challenges to turn this sad emoji into a happy one !
          </p>
        </div>
      </section>

      {/* Important Alert Section */}
      <section className="container mx-auto px-6 mt-0">
        <div className="max-w-4xl mx-auto bg-amber-50 border-l-4 border-amber-500 p-6 rounded-r-lg shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <FaExclamationTriangle className="text-amber-600 text-xl" />
            <h4 className="font-bold text-amber-900 uppercase tracking-tight">
              Important Notice
            </h4>
          </div>
          <p className="text-amber-800 leading-relaxed">
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
            <p className="text-slate-700 leading-relaxed mb-4">
              In this round, we provide two emoji-based programs. These programs
              should look familiar to the participant. However, some parts of
              the code are missing, represented by a{" "}
              <span className="text-red-500 font-bold">?</span> mark.
              <h3 className="font-semibold text-indigo-900 mt-2">
                Your task is to figure out the correct values.
              </h3>
            </p>
            <div className="bg-slate-900 text-slate-100 p-4 rounded-lg font-mono text-sm mb-4 shadow-inner">
              📌 fact (🔢) {"{"} <br />
              &nbsp;&nbsp;🤔 (🔢 == ❓) 👉 ↩️ 1️⃣ <br />
              &nbsp;&nbsp;↩️ 🔢 * fact (🔢 - ❓) <br />
              {"}"}
            </div>
            <ul className="space-y-2 text-sm text-slate-600 italic">
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
            <p className="text-slate-700 leading-relaxed mb-4">
              Unlike the first round, the logic here is <b>unknown</b>. It is a
              mix of custom logic that you must decipher. You are provided with
              an online compiler supporting <b>C and Python</b>.
            </p>
            <p className="text-slate-600 mb-4">
              Your task is to write a traditional code script that replicates
              the emoji logic and satisfies all <b>hidden test cases</b>.
            </p>
            <ul className="space-y-2 text-sm text-slate-600 italic">
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
            <p className="text-slate-700 leading-relaxed mb-4">
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
            <ul className="space-y-2 text-sm text-slate-600 italic">
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

      {/* Team Section */}
      <section className="bg-slate-50 py-10 border-t border-slate-200">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-10">Meet the Organizers</h2>
          <div className="flex flex-wrap justify-center gap-12">
            {teamMembers.map((member, index) => (
              <div key={index} className="flex flex-col items-center">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-24 h-24 rounded-2xl object-cover shadow-lg mb-4 border-2 border-white"
                />
                <h4 className="font-bold text-slate-900">{member.name}</h4>
                <p className="text-sm text-slate-500 mb-3">{member.role}</p>
                <div className="flex gap-4 text-slate-400">
                  <a href={member.github} className="hover:text-black">
                    <FaGithub size={18} />
                  </a>
                  <a href={member.linkedin} className="hover:text-blue-600">
                    <FaLinkedin size={18} />
                  </a>
                  <a href={member.instagram} className="hover:text-pink-500">
                    <FaInstagram size={18} />
                  </a>
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
