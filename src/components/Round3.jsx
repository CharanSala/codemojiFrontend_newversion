import React, { useState, useEffect } from "react";

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
        const res = await fetch("http://localhost:5000/api/round3/start", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        });

        const data = await res.json();

        const startTime = new Date(data.startTime).getTime();

        interval = setInterval(() => {
          const elapsed = Date.now() - startTime;
          const remaining = Math.floor((ROUND3_DURATION - elapsed) / 1000);

          if (remaining <= 0) {
            fetch("http://localhost:5000/api/autosubmit/round3", {
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

  useEffect(() => {
    const fetchData = async () => {
      if (!participantEmail) return;
      try {
        const pRes = await fetch(
          `http://localhost:5000/api/get/getParticipantDetails?email=${participantEmail}`,
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

        const hRes = await fetch("http://localhost:5000/api/gethint/gethints", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: participantEmail }),
        });
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
      const response = await fetch(
        "http://localhost:5000/api/output/outputverify",
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
      const response = await fetch(
        `http://localhost:5000/api/update/${endpoints[hintNum - 1]}`,
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
    <div>
      <div className="pb-7 rounded-b-xl shadow-lg shadow-gray-300">
        <div className="flex justify-center w-full px-10 relative">
          <h2 className="text-5xl font-extrabold text-center pb-4 bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 text-transparent bg-clip-text drop-shadow-lg animate-pulse">
            Code Unravel
          </h2>
          <p className="absolute right-10 text-2xl font-semibold text-red-700 px-4 py-2 rounded-lg bg-gray-100 shadow-inner">
            ⏳ {formatTimeLeft(timeLeft)}
          </p>
        </div>
      </div>

      <div className="flex justify-between p-10 space-x-6 min-h-screen text-white">
        <div className="w-1/2">
          <div className="bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-700">
            <p className="text-xl font-semibold text-gray-300">
              🔍 Analyze the Emoji Code:
            </p>
            <pre
              className="bg-gray-900 p-5 rounded-lg mt-4 font-mono border border-gray-600 shadow-sm overflow-auto"
              style={{ userSelect: "none" }}
            >
              {Emoji}
            </pre>
            <div className="mt-6">
              <label className="block font-semibold text-gray-300 text-lg">
                Enter the exact output:
              </label>
              <input
                type="text"
                value={userOutput}
                onChange={(e) => setUserOutput(e.target.value)}
                className="w-full p-3 mt-3 border-2 border-gray-600 bg-gray-900 text-white rounded-xl focus:ring focus:ring-blue-400"
                disabled={isSubmitted || timeLeft === 0}
              />
            </div>
            <button
              onClick={handleSubmit}
              className={`mt-6 px-6 py-3 text-lg font-bold rounded-xl transition duration-300 ${
                isLoading1 || isSubmitted || timeLeft === 0
                  ? "bg-gray-600 cursor-not-allowed opacity-70"
                  : "bg-blue-500 hover:bg-blue-600 text-white shadow-md"
              }`}
              disabled={isLoading1 || isSubmitted || timeLeft === 0}
            >
              {isLoading1
                ? "Submitting..."
                : isSubmitted
                  ? "Submitted"
                  : "Submit"}
            </button>
            {message && (
              <p
                className={`mt-5 text-lg font-semibold ${message.includes("✅") ? "text-green-400" : "text-red-500"}`}
              >
                {message}
              </p>
            )}
          </div>
        </div>

        <div className="w-1/2">
          <div className="bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-700">
            <div className="flex justify-between items-center w-full">
              <div className="flex gap-x-4">
                <button
                  className={`px-4 py-2 rounded-lg font-bold transition ${!hint1 ? "bg-blue-500 hover:bg-blue-600" : "bg-gray-700 text-gray-400 cursor-not-allowed"}`}
                  onClick={() => useHint(1, 10, setLoadingH1)}
                  disabled={hint1 || loadingH1 || isSubmitted}
                >
                  {loadingH1 ? "..." : hint1 ? "Hint 1 Used" : "Hint 1"}
                </button>
                <button
                  className={`px-4 py-2 rounded-lg font-bold transition ${hint1 && !hint2 ? "bg-green-500 hover:bg-green-600" : "bg-gray-700 text-gray-400 cursor-not-allowed"}`}
                  onClick={() => useHint(2, 20, setLoadingH2)}
                  disabled={!hint1 || hint2 || loadingH2 || isSubmitted}
                >
                  {loadingH2 ? "..." : hint2 ? "Hint 2 Used" : "Hint 2"}
                </button>
                <button
                  className={`px-4 py-2 rounded-lg font-bold transition ${hint2 && !hint3 ? "bg-red-500 hover:bg-red-600" : "bg-gray-700 text-gray-400 cursor-not-allowed"}`}
                  onClick={() => useHint(3, 30, setLoadingH3)}
                  disabled={!hint2 || hint3 || loadingH3 || isSubmitted}
                >
                  {loadingH3 ? "..." : hint3 ? "Hint 3 Used" : "Hint 3"}
                </button>
              </div>
              <div className="text-xl font-extrabold text-white">
                🏆 Points: <span className="text-blue-400 ml-2">{points}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col mt-4 space-y-2">
            {hint1 && (
              <p className="bg-gray-800 text-blue-400 text-center font-semibold px-4 py-5 rounded-md border border-blue-900 animate-fadeIn">
                <span className="text-white">Hint 1: </span> {Hint1Text}
              </p>
            )}
            {hint2 && (
              <p className="bg-gray-800 text-green-400 text-center font-semibold px-4 py-5 rounded-md border border-green-900 animate-fadeIn">
                <span className="text-white">Hint 2: </span> {Hint2Text}
              </p>
            )}
            {hint3 && (
              <p className="bg-gray-800 text-red-400 text-center font-semibold px-4 py-5 rounded-md border border-red-900 animate-fadeIn">
                <span className="text-white">Hint 3: </span> {Hint3Text}
              </p>
            )}
          </div>

          <div className="mt-5 p-6 bg-gray-900 rounded-lg shadow-lg border border-gray-700">
            {isSubmitted ? (
              <div className="text-center py-4">
                <h1 className="text-2xl font-bold text-blue-400">
                  🎉 Thanks for Participating!
                </h1>
                <p className="text-gray-400 mt-2">
                  Your results are being processed.
                </p>
              </div>
            ) : (
              <>
                <h1 className="text-xl font-bold text-gray-200 mb-4 underline">
                  Round 3 Guidelines
                </h1>
                <ul className="space-y-2 text-gray-300">
                  <li className="bg-gray-800 px-4 py-2 rounded-md shadow-sm">
                    <span className="font-semibold text-blue-400">
                      🔹 Hint 1:
                    </span>{" "}
                    Deducts 10 points. Unlocks Hint 2.
                  </li>
                  <li className="bg-gray-800 px-4 py-2 rounded-md shadow-sm">
                    <span className="font-semibold text-green-400">
                      🔹 Hint 2:
                    </span>{" "}
                    Deducts 20 points. Unlocks Hint 3.
                  </li>
                  <li className="bg-gray-800 px-4 py-2 rounded-md shadow-sm">
                    <span className="font-semibold text-red-400">
                      🔹 Hint 3:
                    </span>{" "}
                    Deducts 30 points.
                  </li>
                </ul>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Round3;
