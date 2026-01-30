import React, { useState, useRef, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const Round1 = ({ setAllPassed }) => {
  const navigate = useNavigate();

  // ---------------- TIMER CONFIG ----------------
  const ROUND1_DURATION = 10 * 60; // 1 minute as per your code
  const [timeLeft, setTimeLeft] = useState(ROUND1_DURATION);

  useEffect(() => {
    let interval;
    const initTimer = async () => {
      try {
        const email = sessionStorage.getItem("participantEmail");
        if (!email) return;

        const response = await fetch(
          "http://localhost:5000/api/roundstart/round1",
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
            fetch("http://localhost:5000/api/autosubmit1/round1", {
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
        const response = await fetch(
          `http://localhost:5000/api/get/getParticipantDetails?email=${participantEmail}`,
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

  // --- LOGIC TO SELECT PROBLEMS BASED ON FETCHED DATA ---
  const { Emojicode1, result1, Emojicode2, result2 } = useMemo(() => {
    const r1 = participant?.randomnumber ?? 1;
    const r2 = r1 === 5 ? 1 : r1 + 1;

    console.log("num1", r1);
    console.log("num2", r2);

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
  }, [participant]); // Recalculate whenever participant data is loaded

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

  const fetchRound2SubTime = async (setSubtime2) => {
    try {
      const email = sessionStorage.getItem("participantEmail");
      if (!email) return;
      const response = await fetch(
        `https://codemojibackend2k25.onrender.com/getround2submissiontime?email=${encodeURIComponent(email)}`,
      );
      const data = await response.json();
      if (response.ok) setSubtime2(data.subtime2);
    } catch (error) {
      console.error("Error fetching submission time:", error);
    }
  };

  useEffect(() => {
    fetchRound2SubTime(setSubtime2);
  }, []);

  const handleSubmit1 = async () => {
    setIsLoading1(true);
    try {
      const response = await fetch(
        "http://localhost:5000/api/logicpatch1/verify1",
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
      const response = await fetch(
        "http://localhost:5000/api/logicpatch2/verify",
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

  useEffect(() => {
    if (subtime1) setResultMessage("");
  }, [subtime1]);
  useEffect(() => {
    if (subtime2) setAllPassed(true);
  }, [subtime2]);

  return (
    <div className="min-h-screen bg-white text-white ">
      <div className="flex justify-center w-full px-10">
        <h3 className="text-5xl pb-3 font-extrabold text-center bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 text-transparent bg-clip-text drop-shadow-lg animate-pulse">
          Logic Patch
        </h3>
        <p className="absolute right-10 text-2xl font-semibold text-red-700 px-4 py-2 rounded-lg">
          ⏰ {formatCountdown(timeLeft)}
        </p>
      </div>

      {resultMessage && (
        <div className="mb-2 text-lg font-bold text-center text-yellow-700">
          {resultMessage}
        </div>
      )}

      <div className="flex justify-between p-6 space-x-6">
        {/* Box 1 */}
        <div className="w-1/2 bg-gray-800 p-6 rounded-xl shadow-md border border-gray-700">
          <p className="text-cyan-400 font-semibold mb-5">
            Task: Identify missing values for ❓
          </p>
          <pre
            className="bg-gray-900 p-4 rounded-md text-green-400 overflow-auto"
            style={{ userSelect: "none" }}
          >
            {Emojicode1}
          </pre>
          <div className="mt-4">
            {predefinedValues.map((_, index) => (
              <div key={index} className="mt-2">
                <label className="text-gray-300">Value {index + 1}: </label>
                <input
                  type="text"
                  value={inputValues1[index]}
                  onChange={(e) => handleInputChange1(index, e.target.value)}
                  className="p-2 ml-3 border rounded-md bg-gray-700 text-white"
                />
              </div>
            ))}
          </div>
          <button
            onClick={handleSubmit1}
            className={`mt-4 px-6 py-2 rounded-md text-white font-semibold ${subtime1 || subtime2 || isLoading1 ? "bg-gray-700" : "bg-cyan-500"}`}
            disabled={subtime1 || subtime2 || isLoading1}
          >
            {isLoading1 ? "Submitting..." : "Submit"}
          </button>
          <h2 className="mt-2 text-cyan-300">{resultMessage1}</h2>
        </div>

        {/* Box 2 */}
        <div className="w-1/2 bg-gray-800 p-6 rounded-xl shadow-md border border-gray-700">
          <p className="text-cyan-400 font-semibold mb-5">
            Task: Identify missing values for ❓
          </p>
          <pre
            className="bg-gray-900 p-4 rounded-md text-green-400 overflow-auto"
            style={{ userSelect: "none" }}
          >
            {Emojicode2}
          </pre>
          <div className="mt-4">
            {predefinedValues.map((_, index) => (
              <div key={index} className="mt-2">
                <label className="text-gray-300">Value {index + 1}: </label>
                <input
                  type="text"
                  value={inputValues2[index]}
                  onChange={(e) => handleInputChange2(index, e.target.value)}
                  className="p-2 ml-3 border rounded-md bg-gray-700 text-white"
                />
              </div>
            ))}
          </div>
          <button
            onClick={handleSubmit2}
            className={`mt-4 px-6 py-2 rounded-md text-white font-semibold ${subtime2 || isLoading2 ? "bg-gray-700" : "bg-cyan-500"}`}
            disabled={subtime2 || isLoading2}
          >
            {isLoading2 ? "Submitting..." : "Submit"}
          </button>
          <h2 className="mt-2 text-cyan-300">{resultMessage2}</h2>
        </div>
      </div>
    </div>
  );
};

export default Round1;
