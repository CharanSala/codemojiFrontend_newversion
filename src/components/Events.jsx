import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Round1 from "./Round1";
import Round2 from "./Round2";
import Round3 from "./Round3";

const Events = () => {
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

  // ---------------- FETCH PARTICIPANT ----------------
  useEffect(() => {
    if (!participantEmail) return;

    const fetchParticipant = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/get/getParticipantDetails?email=${participantEmail}`,
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
          // ✅ LOGIC: If Round 3 is submitted, set all passed and hide round component
          setAllPassed(true);
          setAllPassed2(true);
          setAllPassed3(true);
          setSelectedRound(0); // Set to 0 or null so Round3 isn't rendered
          setShowCelebration1(true);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchParticipant();
  }, [participantEmail]);

  // ---------------- REFRESH ANIMATION FLOW ----------------
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
      }, 3000);
    }
  }, [showSmiley, restoreFlow]);

  // ---------------- NORMAL FLOW (NO REFRESH) ----------------
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
      }, 3000);
    }
  }, [allPassed2, allPassed3, restoreFlow]);

  useEffect(() => {
    if (allPassed3 && !restoreFlow) {
      setShowCelebration1(true);
      setSelectedRound(0); // ✅ Hide the Round3 component immediately on submission
    }
  }, [allPassed3, restoreFlow]);

  const showRound1 = () => setSelectedRound(1);
  const showRound2 = () => setSelectedRound(2);
  const showRound3 = () => setSelectedRound(3);

  const handleReplay = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/replay/reset", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: sessionStorage.getItem("participantEmail"),
        }),
      });

      const data = await response.json();

      if (data.success) {
        // 🧹 Clear frontend state
        sessionStorage.removeItem("round1StartTime");
        sessionStorage.removeItem("round2StartTime");
        sessionStorage.removeItem("round3StartTime");

        // reset local states if needed
        setShowCelebration1(false);

        // redirect to round 1

        window.location.href = "/signin/events";
      }
    } catch (error) {
      console.error("Replay failed:", error);
    }
  };

  return (
    <div className="min-h-screen bg-white text-black relative">
      <Navbar />

      <div className="text-center mt-6">
        <h1 className="text-2xl font-semibold text-gray-800">
          Welcome, <span className="text-red-700">{participant1?.name}</span>!
        </h1>
      </div>

      {/* Animations - Smily & Celebration remains same */}
      {showSmiley && (
        <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
          <video
            src="/Fireworks.mp4"
            autoPlay
            muted
            className="w-90 h-60 mt-10"
          />
          <video
            src="/Gratitude Emoji.mp4"
            autoPlay
            muted
            className="w-60 h-60 mt-10"
          />
          <video
            src="/Fireworks.mp4"
            autoPlay
            muted
            className="w-90 h-60 mt-10"
          />
        </div>
      )}

      {showCelebration && (
        <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
          <video
            src="/Fireworks.mp4"
            autoPlay
            muted
            loop
            className="w-80 h-60 mt-10"
          />
          <video
            src="/Emoji Laughing.mp4"
            autoPlay
            muted
            loop
            className="w-60 h-60 mt-10 mx-4"
          />
          <video
            src="/Fireworks.mp4"
            autoPlay
            muted
            loop
            className="w-80 h-60 mt-10"
          />
        </div>
      )}

      {/* Final Celebration Screen */}
      {showCelebration1 && (
        <div className="fixed inset-0 flex flex-col items-center justify-center bg-white z-50">
          <div className="flex">
            <video
              src="/Fireworks.mp4"
              autoPlay
              muted
              loop
              className="w-80 h-60 mt-10"
            />
            <video
              src="/Emoji Laughing.mp4"
              autoPlay
              muted
              loop
              className="w-60 h-60 mt-10 mx-4"
            />
            <video
              src="/Fireworks.mp4"
              autoPlay
              muted
              loop
              className="w-80 h-60 mt-10"
            />
          </div>

          <h1 className="text-4xl font-extrabold text-blue-600 mt-10 animate-bounce">
            🎉 Thank You For Participating! 🎉
          </h1>

          <p className="text-gray-500 mt-4">
            You have successfully completed all rounds.
          </p>

          {/* 🔁 REPLAY BUTTON */}
          <button
            onClick={handleReplay}
            className="mt-8 px-8 py-3 bg-green-500 hover:bg-green-600 text-white text-xl font-bold rounded-xl shadow-lg transition"
          >
            🔄 Replay Event
          </button>
        </div>
      )}

      {/* Buttons - Disabled if all rounds finished */}
      {!allPassed3 && (
        <div className="flex justify-center space-x-6 mt-5">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
            onClick={showRound1}
            disabled={allPassed}
          >
            Round 1
          </button>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
            onClick={showRound2}
            disabled={!allPassed || allPassed2}
          >
            Round 2
          </button>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
            onClick={showRound3}
            disabled={!allPassed2 || allPassed3}
          >
            Round 3
          </button>
        </div>
      )}

      {/* Conditional Round Rendering */}
      <div className="mt-10">
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
