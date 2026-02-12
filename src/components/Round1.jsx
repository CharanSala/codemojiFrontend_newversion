import React, { useState, useRef, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { apiFetch } from "../utils/api";
import { Footer } from "./Footer";

const Round1 = ({ setAllPassed }) => {
  const navigate = useNavigate();

  // ---------------- TIMER CONFIG ----------------
  const ROUND1_DURATION = 10 * 60;
  const [timeLeft, setTimeLeft] = useState(ROUND1_DURATION);

  useEffect(() => {
    let interval;
    const initTimer = async () => {
      try {
        const email = sessionStorage.getItem("participantEmail");
        if (!email) return;

        const response = await apiFetch(
          "https://codemoji.onrender.com/api/roundstart/round1",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email }),
          },
        );

        const data = await response.json();
        const startTime = new Date(data.round1starttime).getTime();

        const updateTimer = () => {
          const elapsed = Math.floor((Date.now() - startTime) / 1000);
          const remaining = ROUND1_DURATION - elapsed;

          if (remaining <= 0) {
            apiFetch("https://codemoji.onrender.com/api/autosubmit1/round1", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ email }),
            }).catch(console.error);

            setTimeLeft(0);
            setAllPassed(true);
            clearInterval(interval);
          } else {
            setTimeLeft(remaining);
          }
        };

        updateTimer();
        interval = setInterval(updateTimer, 1000);
      } catch (err) {
        console.error("Timer init failed", err);
      }
    };

    initTimer();
    return () => clearInterval(interval);
  }, []);

  const formatCountdown = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const [participant, setParticipant] = useState(null);
  const participantEmail = sessionStorage.getItem("participantEmail");

  useEffect(() => {
    const fetchParticipant = async () => {
      if (!participantEmail) return;
      try {
        const response = await apiFetch(
          `https://codemoji.onrender.com/api/get/getParticipantDetails?email=${participantEmail}`,
        );
        const data = await response.json();
        if (response.ok) {
          setParticipant(data.participant);
        }
      } catch (error) {
        console.error("Error fetching participant data:", error);
      }
    };
    fetchParticipant();
  }, [participantEmail]);

  const { Emojicode1, result1, Emojicode2, result2 } = useMemo(() => {
    const r1 = participant?.randomnumber ?? 1;
    const r2 = r1 === 5 ? 1 : r1 + 1;

    const sets = {
      1: {
        Emojicode: `📌 fact (🔢) {\n  🤔 (🔢 ==❓) 👉 ↩️ 1️⃣\n  ↩️ 🔢 * fact (🔢 -❓)\n}\nfact (🔢)`,
        result: [1, 1],
      },
      2: {
        Emojicode: `📌 sumDigits (🔢) {\n  🤔 (🔢 ==❓) 👉 ↩️ 0️⃣\n  ↩️ ((🔢 % 🔟) ➕ sumDigits (🔢 / ❓)\n}\nsumDigits (🔢)`,
        result: [0, 10],
      },
      3: {
        Emojicode: `📌 sumEven (🔢) {\n  🤔 (🔢 ==❓) 👉 ↩️ 2️⃣\n  ↩️ (❓* 🔢) ➕ sumEven (🔢 – 1️⃣)\n}\nsumEven(🔢)`,
        result: [1, 2],
      },
      4: {
        Emojicode: `📌 reverse (🔢, 🔡) {\n  🤔 (🔢 ==❓) 👉 ↩️ 🔡\n  ↩️ reverse(n/🔟, 🔡*🔟+(🔢% ❓ ))\n}\nreverse (🔢,0)`,
        result: [0, 10],
      },
      5: {
        Emojicode: `📌 fibonacci (🔢) {\n  🤔 ( 🔢 ==❓) 👉 ↩️ 🔢\n  ↩️ fibonacci (🔢 - 1️⃣) ➕ fibonacci (🔢 - ❓)\n}\nfibonacci (🔢)`,
        result: [1, 2],
      },
    };

    return {
      Emojicode1: sets[r1].Emojicode,
      result1: sets[r1].result,
      Emojicode2: sets[r2].Emojicode,
      result2: sets[r2].result,
    };
  }, [participant]);

  const predefinedValues = [1, 2];
  const [inputValues1, setInputValues1] = useState(["", ""]);
  const [inputValues2, setInputValues2] = useState(["", ""]);
  const [resultMessage1, setResultMessage1] = useState("");
  const [resultMessage, setResultMessage] = useState("");
  const [resultMessage2, setResultMessage2] = useState("");
  const [subtime1, setSubtime1] = useState("");
  const [subtime2, setSubtime2] = useState(participant?.round2submissiontime);
  const [isLoading1, setIsLoading1] = useState(false);
  const [isLoading2, setIsLoading2] = useState(false);

  const handleInputChange1 = (index, value) => {
    const newValues = [...inputValues1];
    newValues[index] = value;
    setInputValues1(newValues);
  };

  const handleInputChange2 = (index, value) => {
    const newValues = [...inputValues2];
    newValues[index] = value;
    setInputValues2(newValues);
  };

  const handleSubmit1 = async () => {
    setIsLoading1(true);
    try {
      const response = await apiFetch(
        "https://codemoji.onrender.com/api/logicpatch1/verify1",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            inputValues: inputValues1.map(Number),
            result: result1,
          }),
        },
      );
      const result = await response.json();
      setResultMessage1(result.message);
      setSubtime1(result.submissionTime);
    } catch (error) {
      setResultMessage1("Error verifying inputs");
    } finally {
      setIsLoading1(false);
    }
  };

  const handleSubmit2 = async () => {
    setIsLoading2(true);
    try {
      const email = sessionStorage.getItem("participantEmail");
      if (!subtime1) {
        setResultMessage("⚠️ Please complete the first submission first.");
        return;
      }
      const response = await apiFetch(
        "https://codemoji.onrender.com/api/logicpatch2/verify",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            inputValues: inputValues2.map(Number),
            result: result2,
            email: email,
          }),
        },
      );
      const result = await response.json();
      if (result.status) setAllPassed(true);
      setResultMessage2(result.message);
    } catch (error) {
      setResultMessage("Error verifying inputs");
    } finally {
      setIsLoading2(false);
    }
  };

  return (
    <div className="h-fit bg-gray-50 text-white ">
      {/* Responsive Timer Header */}
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
        ⏰ {formatCountdown(timeLeft)}
      </div>

      {resultMessage && (
        <div className="max-w-4xl mx-auto mb-8  px-4  text-yellow-800 rounded-lg text-center font-bold">
          {resultMessage}
        </div>
      )}

      {/* Main Responsive Grid */}
      <div className="max-w-7xl mx-auto px-4 flex flex-col lg:flex-row gap-6">
        {/* Box 1 */}
        <div className="flex-1 bg-white p-5 md:p-8 rounded-2xl shadow-xl  transition-all">
          <div className="flex items-center gap-2 mb-4">
            <p className="text-slate-500 font-semibold text-lg">
              🧩 Task1: Identify missing values for ❓
            </p>
          </div>

          <pre className="bg-[#1e1e2e] p-4 rounded-xl text-[#3da667] overflow-x-auto text-sm md:text-base leading-relaxed border border-gray-900 mb-6 select-none">
            {Emojicode1}
          </pre>

          <div className="space-y-4">
            {predefinedValues.map((_, index) => (
              <div
                key={index}
                className="flex flex-col sm:flex-row sm:items-center gap-2"
              >
                <label className="text-gray-400 font-medium min-w-[80px]">
                  Value {index + 1}:
                </label>
                <input
                  type="number"
                  placeholder="Enter value"
                  value={inputValues1[index]}
                  onChange={(e) => handleInputChange1(index, e.target.value)}
                  className="text-slate-800 w-full p-3 rounded-lg bg-gray-100  focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 outline-none transition-all"
                />
              </div>
            ))}
          </div>

          <button
            onClick={handleSubmit1}
            className={`w-fit pr-5 pl-5 mt-6 py-3 rounded-xl font-bold text-lg shadow-lg transition-all transform active:scale-95 ${
              subtime1 || subtime2 || isLoading1
                ? "bg-gray-600 cursor-not-allowed opacity-50"
                : "bg-indigo-500 hover:bg-indigo-600 hover:shadow-cyan-500/20"
            }`}
            disabled={subtime1 || subtime2 || isLoading1}
          >
            {isLoading1 ? "Submitting..." : "Verify"}
          </button>
          {resultMessage1 && (
            <h2 className="mt-4 text-start font-semibold text-slate-500 animate-pulse">
              {resultMessage1}
            </h2>
          )}
        </div>

        {/* Box 2 */}
        <div className="flex-1 bg-white p-5 md:p-8 rounded-2xl shadow-xl  transition-all">
          <div className="flex items-center gap-2 mb-4">
            <p className="text-slate-500 font-semibold text-lg">
              🧠Task2: Identify missing values for ❓
            </p>
          </div>

          <pre className="bg-[#1e1e2e] p-4 rounded-xl text-[#3da667] overflow-x-auto text-sm md:text-base leading-relaxed border border-gray-900 mb-6 select-none">
            {Emojicode2}
          </pre>

          <div className="space-y-4">
            {predefinedValues.map((_, index) => (
              <div
                key={index}
                className="flex flex-col sm:flex-row sm:items-center gap-2"
              >
                <label className="text-gray-400 font-medium min-w-[80px]">
                  Value {index + 1}:
                </label>
                <input
                  type="number"
                  placeholder="Enter value"
                  value={inputValues2[index]}
                  onChange={(e) => handleInputChange2(index, e.target.value)}
                  className="text-slate-800 w-full p-3 rounded-lg bg-gray-100  focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 outline-none transition-all"
                />
              </div>
            ))}
          </div>

          <button
            onClick={handleSubmit2}
            className={`w-fit pr-5 pl-5 p-3 mt-6 py-3 rounded-xl font-bold text-lg shadow-lg transition-all transform active:scale-95 ${
              subtime2 || isLoading2
                ? "bg-gray-600 cursor-not-allowed opacity-50"
                : "bg-indigo-500 hover:bg-indigo-600 hover:shadow-cyan-500/20"
            }`}
            disabled={subtime2 || isLoading2}
          >
            {isLoading2 ? "Submitting..." : "Verify"}
          </button>
          {resultMessage2 && (
            <h2 className="mt-4 text-start font-semibold text-slate-500 animate-pulse">
              {resultMessage2}
            </h2>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Round1;
