import React, { useState, useEffect } from "react";
import { apiFetch } from "../utils/api";
import { Footer } from "./Footer";

const Round3 = ({ setAllPassed3 }) => {
  const problemSets = {
    1: {
      Emojicode: `📌Mystery_box(🔢 ) {\n  🤔 (🔢 == 0️⃣)\n    ↩️1️⃣ ;\n\n  📕= 🔢 % 🔟; \n\n  🤔 ( 📕% 2️⃣ == 0️⃣) \n     ↩️ Mystery_box (🔢 / 🔟); \n\n  ↩️ 📕*️⃣ Mystery_box (🔢 /🔟); \n}\nMystery_box(482351)`,
      output: 15,
      hint1: `The program breaks down the number and processes each digit separately`,
      hint2: `Certain digits affect the result, while others do not`,
      hint3: `The program extracts digits and multiply only the odd ones (3,5,1)`,
    },
    2: {
      Emojicode: `📌Mystery_box(🔢 ) {\n  🤔 (🔢 == 0️⃣)\n    ↩️1️⃣\n\n  🍬= 🔢 % 🔟\n\n  🤔 ( 🍬% 2️!=0️⃣)\n     ↩️ Mystery_box (🔢 / 🔟) \n\n  ↩️ 🍬*️⃣ Mystery_box (🔢 /🔟) \n}\nMystery_box(482351)`,
      output: 64,
      hint1: `The program breaks down the number and processes each digit separately`,
      hint2: `Certain digits affect the result, while others do not`,
      hint3: `The program extracts digits and multiply only the even ones (4,8,2)`,
    },
    3: {
      Emojicode: `📌Mystery_box(🔢 ) {\n  🤔 (🔢 == 0️⃣)\n    ↩️1️⃣\n\n  📍= 🔢 % 🔟\n\n  🤔 ( 📍% 2️!=0️⃣)\n     ↩️ Mystery_box (🔢 / 🔟) \n\n  ↩️ 📍➕ Mystery_box (🔢 /🔟) \n}\nMystery_box(482351)`,
      output: 14,
      hint1: `The program breaks down the number and processes each digit separately`,
      hint2: `Certain digits affect the result, while others do not`,
      hint3: `The program extracts digits and sum only the even ones (4,8,2)`,
    },
    4: {
      Emojicode: `📌Mystery_box1(🔡) {\n  ↩️🔡==2️⃣||🔡==3️⃣||🔡==5️⃣||🔡==7️⃣\n}\n📌Mystery_box2(🔢 ) {\n  🤔 (🔢 == 0️⃣)\n    ↩️0️⃣\n\n  🎁= 🔢 % 🔟\n\n  🤔 Mystery_box1 ( 🔡)\n     ↩️ Mystery_box (🔢 / 🔟) \n\n  ↩️🎁➕Mystery_box2 (🔢 /🔟) \n}\nMystery_box2(735289)`,
      output: 17,
      hint1: `The program breaks down the number and processes each digit separately`,
      hint2: `Certain digits affect the result, while others do not`,
      hint3: `The program extracts digits and sum only the prime ones (2, 3, 5, 7).`,
    },
    5: {
      Emojicode: `📌Mystery_box1(🔡) {\n  ↩️🔡==2️⃣||🔡==3️⃣||🔡==5️⃣||🔡==7️⃣\n}\n📌Mystery_box2(🔢 ) {\n  🤔 (🔢 == 0️⃣)\n    ↩️0️⃣\n\n  🎯= 🔢 % 🔟\n\n  🤔 Mystery_box1 ( 🔡)\n     ↩️ Mystery_box (🔢 / 🔟) \n\n  ↩️🎯*️⃣Mystery_box2 (🔢 /🔟) \n}\nMystery_box2(735289)`,
      output: 210,
      hint1: `The program breaks down the number and processes each digit separately`,
      hint2: `Certain digits affect the result, while others do not`,
      hint3: `The program extracts digits and multiply only the prime ones (2, 3, 5, 7)`,
    },
  };

  const [participant, setParticipant] = useState(null);
  const participantEmail = sessionStorage.getItem("participantEmail");
  const [timeLeft, setTimeLeft] = useState(1200);

  const [hint1, setHint1] = useState(false);
  const [hint2, setHint2] = useState(false);
  const [hint3, setHint3] = useState(false);

  const [points, setPoints] = useState(0);
  const [userOutput, setUserOutput] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading1, setIsLoading1] = useState(false);
  const [loadingH1, setLoadingH1] = useState(false);
  const [loadingH2, setLoadingH2] = useState(false);
  const [loadingH3, setLoadingH3] = useState(false);
  const [subtime3, setSubtime3] = useState(participant?.round3submissiontime);

  useEffect(() => {
    if (subtime3) {
      setAllPassed3(true);
    }
  }, [subtime3]);

  useEffect(() => {
    const ROUND3_DURATION = 1200 * 1000;
    let interval;

    const initRound3 = async () => {
      const email = sessionStorage.getItem("participantEmail");
      if (!email) return;

      try {
        const res = await apiFetch(
          "https://codemoji.onrender.com/api/round3/start",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email }),
          },
        );

        const data = await res.json();

        const startTime = new Date(data.startTime).getTime();

        interval = setInterval(() => {
          const elapsed = Date.now() - startTime;
          const remaining = Math.floor((ROUND3_DURATION - elapsed) / 1000);

          if (remaining <= 0) {
            apiFetch("https://codemoji.onrender.com/api/autosubmit/round3", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ email }),
            }).catch(console.error);

            setTimeLeft(0);
            setAllPassed3(true);
            clearInterval(interval);
          } else {
            setTimeLeft(remaining);
          }
        }, 1000);
      } catch (err) {
        console.error("Round 3 init failed", err);
      }
    };

    initRound3();

    return () => clearInterval(interval);
  }, []);

  const formatTimeLeft = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const formatCountdown = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!participantEmail) return;
      try {
        const pRes = await apiFetch(
          `https://codemoji.onrender.com/api/get/getParticipantDetails?email=${participantEmail}`,
        );
        const pData = await pRes.json();
        if (pRes.ok) {
          setParticipant(pData.participant);
          if (pData.participant.round3submissiontime) {
            setIsSubmitted(true);
            setAllPassed3(true);
            setMessage("✅ Round 3 Completed!");
          }
        }

        const hRes = await apiFetch(
          "https://codemoji.onrender.com/api/gethint/gethints",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: participantEmail }),
          },
        );
        const hData = await hRes.json();
        if (hRes.ok) {
          setHint1(hData.hint1);
          setHint2(hData.hint2);
          setHint3(hData.hint3);
          setPoints(hData.points);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [participantEmail, setAllPassed3]);

  const randomNumber = participant?.randomnumber ?? 1;
  const {
    Emojicode: Emoji,
    output,
    hint1: Hint1Text,
    hint2: Hint2Text,
    hint3: Hint3Text,
  } = problemSets[randomNumber] || problemSets[1];

  const handleSubmit = async () => {
    setIsLoading1(true);
    try {
      const response = await apiFetch(
        "https://codemoji.onrender.com/api/output/outputverify",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userOutput, output, email: participantEmail }),
        },
      );
      const result = await response.json();
      if (result.success) {
        setIsSubmitted(true);
        setMessage("✅ Success! Your output is correct.");
        setAllPassed3(true);
      } else {
        setMessage("❌ Incorrect output. Please enter the correct answer.");
      }
    } catch (error) {
      setMessage("⚠️ Error occurred. Please try again.");
    } finally {
      setIsLoading1(false);
    }
  };

  const useHint = async (hintNum, pointCost, setLoading) => {
    setLoading(true);
    const endpoints = ["updatepoints", "updatepoints1", "updatepoints2"];
    try {
      const response = await apiFetch(
        `https://codemoji.onrender.com/api/update/${endpoints[hintNum - 1]}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: participantEmail, points: pointCost }),
        },
      );
      if (response.ok) {
        const data = await response.json();
        setPoints(data.points);
        if (hintNum === 1) setHint1(true);
        if (hintNum === 2) setHint2(true);
        if (hintNum === 3) setHint3(true);
      }
    } catch (error) {
      console.error("Hint update failed", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#F8FAFC] ">
      {/* Header Info Bar (Timer and Points) */}
      <div className="max-w-7xl mx-auto px-6 pt-6 flex justify-end gap-4">
        <div
          className="
  md:absolute md:top-28 md:right-10
  sticky top-0 mb-5 md:mb-0 
  bg-red-50 border border-red-200 text-red-700
  px-4 py-2 rounded-full font-mono text-xl font-bold
  shadow-lg transform -translate-y-2 transition-all duration-300
  w-fit
  mx-auto md:ml-auto md:mr-0
"
        >
          {" "}
          ⏰ {formatCountdown(timeLeft)}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="  mx-auto px-6 flex flex-col lg:flex-row gap-8">
        {/* LEFT COLUMN: Emoji Analysis */}
        <div className="flex-1 bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                ></path>
              </svg>
            </div>
            <h2 className="text-xl font-bold text-slate-800">
              Analyze the Emoji Code
            </h2>
          </div>

          <div className="bg-[#1e1e2e] rounded-2xl p-6 mb-8 shadow-inner overflow-hidden relative">
            <pre
              className=" font-mono text-sm text-indigo-100 leading-relaxed overflow-x-auto"
              style={{ userSelect: "none" }}
            >
              {Emoji}
            </pre>
          </div>

          <div className="space-y-4">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">
              Enter the exact output
            </label>
            <div className="flex gap-3">
              <input
                type="text"
                placeholder="Your answer here..."
                value={userOutput}
                onChange={(e) => setUserOutput(e.target.value)}
                className="flex-1 p-4 bg-slate-50 border border-slate-200 rounded-2xl text-slate-800 focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none transition-all"
                disabled={isSubmitted || timeLeft === 0}
              />
              <button
                onClick={handleSubmit}
                disabled={isLoading1 || isSubmitted || timeLeft === 0}
                className={`px-8 rounded-2xl font-bold flex items-center gap-2 transition-all shadow-lg shadow-indigo-100 ${
                  isSubmitted
                    ? "bg-emerald-500 text-white"
                    : "bg-indigo-600 text-white hover:bg-indigo-700"
                } disabled:opacity-50`}
              >
                {isLoading1 ? (
                  "..."
                ) : isSubmitted ? (
                  "Submitted"
                ) : (
                  <>
                    Submit{" "}
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      ></path>
                    </svg>
                  </>
                )}
              </button>
            </div>
            {message && (
              <p
                className={`text-sm font-bold mt-2 ${message.includes("✅") ? "text-emerald-500" : "text-rose-500"}`}
              >
                {message}
              </p>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: Hints & Guidelines */}
        <div className="w-full lg:w-[400px] flex flex-col gap-6">
          {/* Hints Section */}
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-slate-800 flex items-center gap-2">
                <span className="text-yellow-500">💡</span> Available Hints
              </h3>
              <span className="text-[10px] font-bold bg-indigo-50 text-indigo-600 px-2 py-1 rounded-md">
                Points: {points}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-3 mb-6">
              <button
                onClick={() => useHint(1, 10, setLoadingH1)}
                disabled={hint1 || isSubmitted}
                className={`py-3 rounded-xl text-xs font-bold transition-all ${hint1 ? "bg-indigo-600 text-white shadow-md shadow-indigo-100" : "bg-slate-100 text-slate-400 hover:bg-slate-200"}`}
              >
                {loadingH1 ? "..." : "Hint 1"}
              </button>
              <button
                onClick={() => useHint(2, 20, setLoadingH2)}
                disabled={!hint1 || hint2 || isSubmitted}
                className={`py-3 rounded-xl text-xs font-bold transition-all ${hint2 ? "bg-indigo-600 text-white shadow-md shadow-indigo-100" : "bg-slate-100 text-slate-400 hover:bg-slate-200"}`}
              >
                {loadingH2 ? "..." : "Hint 2"}
              </button>
              <button
                onClick={() => useHint(3, 30, setLoadingH3)}
                disabled={!hint2 || hint3 || isSubmitted}
                className={`py-3 rounded-xl text-xs font-bold transition-all ${hint3 ? "bg-indigo-600 text-white shadow-md shadow-indigo-100" : "bg-slate-100 text-slate-400 hover:bg-slate-200"}`}
              >
                {loadingH3 ? "..." : "Hint 3"}
              </button>
            </div>

            <div className="space-y-3">
              {hint1 && (
                <div className="p-4 bg-indigo-50 border border-indigo-100 rounded-2xl animate-fadeIn">
                  <p className="text-xs leading-relaxed text-indigo-700">
                    <strong>Hint 1:</strong> {Hint1Text}
                  </p>
                </div>
              )}
              {hint2 && (
                <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-2xl animate-fadeIn">
                  <p className="text-xs leading-relaxed text-emerald-700">
                    <strong>Hint 2:</strong> {Hint2Text}
                  </p>
                </div>
              )}
              {hint3 && (
                <div className="p-4 bg-rose-50 border border-rose-100 rounded-2xl animate-fadeIn">
                  <p className="text-xs leading-relaxed text-rose-700">
                    <strong>Hint 3:</strong> {Hint3Text}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Guidelines Section */}
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
            <h3 className="font-bold text-slate-800 flex items-center gap-2 mb-4">
              <span className="text-indigo-600">📄</span> Round 3 Guidelines
            </h3>
            <div className="space-y-4 text-xs font-medium text-slate-500">
              <div className="flex gap-3">
                <div className="w-5 h-5 bg-indigo-50 rounded flex items-center justify-center text-indigo-600 shrink-0">
                  1
                </div>
                <p>Hint 1: Deducts 10 points. Unlocks Hint 2.</p>
              </div>
              <div className="flex gap-3">
                <div className="w-5 h-5 bg-indigo-50 rounded flex items-center justify-center text-indigo-600 shrink-0">
                  2
                </div>
                <p>Hint 2: Deducts 20 points. Unlocks Hint 3.</p>
              </div>
              <div className="flex gap-3">
                <div className="w-5 h-5 bg-indigo-50 rounded flex items-center justify-center text-indigo-600 shrink-0">
                  3
                </div>
                <p>Hint 3: Deducts 30 points.</p>
              </div>
            </div>
          </div>

          {/* Pro Tip Section matching image */}
          <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-6 rounded-3xl text-white shadow-lg shadow-indigo-200">
            <div className="flex items-center gap-2 mb-2 font-bold italic">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              Pro Tip
            </div>
            <p className="text-xs opacity-90 leading-relaxed">
              Trace the recursion carefully! Each emoji represents a specific
              mathematical operation or condition. Watch out for the base case
              🔢 == 0️⃣.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Round3;
