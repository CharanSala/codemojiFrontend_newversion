import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Round1 from "./Round1";
import Round2 from "./Round2";
import Round3 from "./Round3";
import { apiFetch } from "../utils/api";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Events = () => {
  const navigate = useNavigate();
  const [participant1, setParticipant1] = useState(null);
  const participantEmail = sessionStorage.getItem("participantEmail");

  // Round states
  const [selectedRound, setSelectedRound] = useState(1);
  const [allPassed, setAllPassed] = useState(false);
  const [allPassed2, setAllPassed2] = useState(false);
  const [allPassed3, setAllPassed3] = useState(false);

  // Animation states
  const [showCelebration, setShowCelebration] = useState(false);
  const [showSmiley, setShowSmiley] = useState(false);
  const [showCelebration1, setShowCelebration1] = useState(false);

  const [restoreFlow, setRestoreFlow] = useState(false);

  // ---------------- FETCH PARTICIPANT (Unchanged) ----------------
  useEffect(() => {
    if (!participantEmail) return;

    const fetchParticipant = async () => {
      try {
        const response = await apiFetch(
          `https://codemoji.onrender.com/api/get/getParticipantDetails?email=${participantEmail}`,
        );
        const data = await response.json();

        if (!response.ok) return;

        const participant = data.participant;
        setParticipant1(participant);

        const {
          round1submissiontime,
          round2submissiontime,
          round3submissiontime,
        } = participant;

        if (!round2submissiontime) {
          setSelectedRound(1);
        } else if (round2submissiontime && !round1submissiontime) {
          setAllPassed(true);
          setSelectedRound(2);
        } else if (
          round2submissiontime &&
          round1submissiontime &&
          !round3submissiontime
        ) {
          setAllPassed(true);
          setAllPassed2(true);
          setRestoreFlow(true);
        } else if (
          round2submissiontime &&
          round1submissiontime &&
          round3submissiontime
        ) {
          setAllPassed(true);
          setAllPassed2(true);
          setAllPassed3(true);
          setSelectedRound(0);
          setShowCelebration1(true);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchParticipant();
  }, [participantEmail]);

  // ---------------- FLOW LOGIC (Unchanged) ----------------
  useEffect(() => {
    if (restoreFlow) {
      setShowCelebration(true);
      setTimeout(() => {
        setShowCelebration(false);
        setShowSmiley(true);
      }, 3000);
    }
  }, [restoreFlow]);

  useEffect(() => {
    if (showSmiley && restoreFlow) {
      setTimeout(() => {
        setShowSmiley(false);
        setSelectedRound(3);
        setRestoreFlow(false);
      }, 1500);
    }
  }, [showSmiley, restoreFlow]);

  useEffect(() => {
    if (allPassed && !allPassed2 && !restoreFlow) {
      setShowCelebration(true);
      setTimeout(() => {
        setShowCelebration(false);
        setSelectedRound(2);
      }, 3000);
    }
  }, [allPassed, allPassed2, restoreFlow]);

  useEffect(() => {
    if (allPassed2 && !allPassed3 && !restoreFlow) {
      setShowSmiley(true);
      setTimeout(() => {
        setShowSmiley(false);
        setSelectedRound(3);
      }, 1500);
    }
  }, [allPassed2, allPassed3, restoreFlow]);

  useEffect(() => {
    if (allPassed3 && !restoreFlow) {
      setShowCelebration1(true);
      setSelectedRound(0);
    }
  }, [allPassed3, restoreFlow]);

  const showRound1 = () => setSelectedRound(1);
  const showRound2 = () => setSelectedRound(2);
  const showRound3 = () => setSelectedRound(3);

  const handleSignOut = () => {
    sessionStorage.removeItem("participantEmail");
    localStorage.removeItem("token");

    navigate("/");
  };

  const handleReplay = async () => {
    try {
      const response = await apiFetch(
        "https://codemoji.onrender.com/api/replay/reset",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: sessionStorage.getItem("participantEmail"),
          }),
        },
      );
      const data = await response.json();
      if (data.success) {
        sessionStorage.removeItem("round1StartTime");
        sessionStorage.removeItem("round2StartTime");
        sessionStorage.removeItem("round3StartTime");
        setShowCelebration1(false);
        window.location.href = "/signin/events";
      }
    } catch (error) {
      console.error("Replay failed:", error);
    }
  };

  const getRoundTitle = () => {
    switch (selectedRound) {
      case 1:
        return { first: "Logic", second: "Patch" };
      case 2:
        return { first: "Emoji", second: "Decription" };
      case 3:
        return { first: "Code", second: "Unreveal" };
      default:
        return { first: "Mission", second: "Complete" };
    }
  };

  const title = getRoundTitle();

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 relative font-sans">
      <Navbar />

      {/* --- ROUND CELEBRATION OVERLAYS --- */}
      {/* Triggered by showCelebration (Round 1 to 2 transition) */}
      {/* Triggered by showCelebration (Round 1 to 2 transition) */}
      {showCelebration && (
        <div className="fixed inset-0 flex flex-col items-center justify-center  bg-[#F8FAFC] backdrop-blur-md z-[60] text-center px-6">
          {/* Main Card Container */}
          <div className="bg-white p-10 rounded-[2.5rem] shadow-2xl shadow-indigo-100 max-w-lg w-full relative overflow-hidden border border-slate-100">
            {/* Ambient Background Fireworks */}
            <div className="absolute inset-0 opacity-10 pointer-events-none flex justify-between scale-110">
              <video
                src="/Fireworks.mp4"
                autoPlay
                muted
                loop
                className="w-1/2 h-full object-cover"
              />
              <video
                src="/Fireworks.mp4"
                autoPlay
                muted
                loop
                className="w-1/2 h-full object-cover"
              />
            </div>

            <div className="relative z-10">
              {/* Central Gratitude Emoji Video */}
              <div className="flex justify-center mb-4">
                <video
                  src="/Gratitude Emoji.mp4"
                  autoPlay
                  muted
                  loop
                  className="w-56 h-56 object-contain"
                />
              </div>

              <h2 className="text-4xl font-black text-indigo-600 animate-pulse tracking-tight uppercase">
                Round Completed!
              </h2>

              <div className="mt-6 flex flex-col items-center gap-3">
                <p className="text-slate-500 font-bold text-lg">
                  Preparing next challenge...
                </p>
                {/* Progress bar loader for visual polish */}
                <div className="w-48 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-indigo-600 rounded-full animate-[loading_3s_ease-in-out]"></div>
                </div>
              </div>
            </div>

            {/* Decorative Sparkles */}
            <span className="absolute top-8 right-12 text-2xl">✨</span>
            <span className="absolute bottom-12 left-10 text-xl opacity-50">
              🌟
            </span>
          </div>
        </div>
      )}

      {/* Triggered by showSmiley (Round 2 to 3 transition) */}
      {/* Triggered by showSmiley (Round 2 to 3 transition) */}
      {showSmiley && (
        <div className="fixed inset-0 flex flex-col items-center justify-center bg-[#F8FAFC] backdrop-blur-md z-[60] text-center px-6">
          {/* Main Card Container */}
          <div className="bg-white p-10 rounded-[2.5rem] shadow-2xl shadow-orange-100 max-w-lg w-full relative overflow-hidden border border-orange-50">
            {/* Background Fireworks (Subtle) */}
            <div className="absolute inset-0 opacity-20 pointer-events-none flex justify-between">
              <video
                src="/Fireworks.mp4"
                autoPlay
                muted
                loop
                className="w-40 h-full object-cover"
              />
              <video
                src="/Fireworks.mp4"
                autoPlay
                muted
                loop
                className="w-40 h-full object-cover"
              />
            </div>

            <div className="relative z-10">
              {/* Central Emoji Video */}
              <div className="flex justify-center mb-6">
                <video
                  src="/Emoji Laughing.mp4"
                  autoPlay
                  muted
                  loop
                  className="w-48 h-48 rounded-full shadow-inner"
                />
              </div>

              <h2 className="text-5xl font-black text-orange-500 animate-bounce tracking-tight">
                LEVEL UP!
              </h2>

              <div className="mt-4 flex items-center justify-center gap-2">
                <span className="h-1 w-12 bg-orange-200 rounded-full"></span>
                <p className="text-slate-500 font-bold uppercase tracking-widest text-sm">
                  🚀 Rocketing to Round 3
                </p>
                <span className="h-1 w-12 bg-orange-200 rounded-full"></span>
              </div>
            </div>

            {/* Decorative Sparkles (Floating) */}
            <span className="absolute top-10 left-10 text-2xl animate-pulse">
              ✨
            </span>
            <span className="absolute bottom-10 right-10 text-2xl animate-pulse">
              🔥
            </span>
          </div>
        </div>
      )}

      {/* Dynamic Header Section */}
      <div className="text-center mt-24 mb-6">
        <p className="text-slate-500 font-medium text-lg">
          Welcome back, {participant1?.name || "Developer"}!
        </p>
        <h1 className="text-5xl font-black text-slate-900 mt-2">
          {title.first} <span className="text-indigo-600">{title.second}</span>
        </h1>
      </div>

      {/* Round Selection Buttons */}
      {!allPassed3 && (
        <div className="flex justify-center items-center p-1.5 bg-white border border-slate-200 rounded-[2rem] shadow-sm w-fit mx-auto mb-5 gap-2">
          <button
            onClick={showRound1}
            disabled={allPassed}
            className={`px-8 py-2.5 rounded-[1.5rem] font-bold text-sm transition-all duration-300 ${
              selectedRound === 1
                ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200"
                : "text-slate-500 hover:bg-slate-50 disabled:opacity-50"
            }`}
          >
            Round 1
          </button>
          <button
            onClick={showRound2}
            disabled={!allPassed || allPassed2}
            className={`px-8 py-2.5 rounded-[1.5rem] font-bold text-sm transition-all duration-300 ${
              selectedRound === 2
                ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200"
                : "text-slate-500 hover:bg-slate-50 disabled:opacity-50"
            }`}
          >
            Round 2
          </button>
          <button
            onClick={showRound3}
            disabled={!allPassed2 || allPassed3}
            className={`px-8 py-2.5 rounded-[1.5rem] font-bold text-sm transition-all duration-300 ${
              selectedRound === 3
                ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200"
                : "text-slate-500 hover:bg-slate-50 disabled:opacity-50"
            }`}
          >
            Round 3
          </button>
        </div>
      )}

      {/* Final Celebration Screen (Unchanged) */}
      {/* Final Celebration Screen */}
      {showCelebration1 && (
        <div className="fixed inset-0 flex flex-col items-center justify-center bg-[#F8FAFC] z-50 text-center px-6">
          {/* Floating background decorative icons */}
          <div className="absolute inset-0 pointer-events-none">
            <span className="absolute top-1/4 left-1/4 animate-pulse text-2xl">
              ✨
            </span>
            <span className="absolute top-1/3 right-1/4 text-2xl">🎉</span>
            <span className="absolute bottom-1/3 right-1/4 text-2xl">🚀</span>
          </div>

          <div className="bg-white p-12 rounded-[2.5rem] shadow-2xl shadow-indigo-100 max-w-xl w-full relative z-10">
            {/* --- CENTRAL CELEBRATION CLUSTER --- */}
            <div className="flex items-center justify-center gap-2 mb-6">
              {/* Left Small Firework */}
              <video
                src="/Fireworks.mp4"
                autoPlay
                muted
                loop
                className="w-64 h-24 object-cover rounded-full opacity-80"
              />

              {/* Central Smiley Video */}
              <div className="relative">
                <video
                  src="/Emoji Laughing.mp4"
                  autoPlay
                  muted
                  loop
                  className="w-64 h-40 object-contain"
                />
              </div>

              {/* Right Small Firework */}
              <video
                src="/Fireworks.mp4"
                autoPlay
                muted
                loop
                className="w-64 h-24 object-cover rounded-full opacity-80"
                style={{ transform: "scaleX(-1)" }} // Mirror effect
              />
            </div>

            <h1 className="text-5xl font-black text-[#6366F1] leading-tight uppercase tracking-tight">
              Mission <br /> Accomplished!
            </h1>

            <p className="text-slate-500 mt-4 text-lg font-medium">
              You have mastered the language of emojis.
            </p>

            {/* Action Buttons */}
            <div className="flex gap-4 justify-center mt-10">
              <button
                onClick={handleReplay}
                className="flex items-center gap-2 px-6 py-3 bg-[#8B5CF6] hover:bg-indigo-700 text-white font-bold rounded-xl transition-all hover:scale-105 active:scale-95 shadow-lg shadow-indigo-200"
              >
                <span className="text-lg">↺</span> REPLAY EVENT
              </button>
              <button
                onClick={() => navigate("/leaderboard")}
                className="px-6 py-3 border border-slate-200 text-slate-600 font-bold rounded-xl hover:bg-slate-50 transition-all"
              >
                🏆 LEADERBOARD
              </button>
            </div>

            {/* Stats Footer */}
          </div>
        </div>
      )}
      {/* Conditional Round Rendering */}
      <div className="pb-8 max-w-7xl mx-auto px-6">
        {!allPassed3 && (
          <>
            {selectedRound === 1 && <Round1 setAllPassed={setAllPassed} />}
            {selectedRound === 2 && <Round2 setAllPassed2={setAllPassed2} />}
            {selectedRound === 3 && <Round3 setAllPassed3={setAllPassed3} />}
          </>
        )}
      </div>
    </div>
  );
};

export default Events;
