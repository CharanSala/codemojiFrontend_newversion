import React, { useState, useRef, useEffect } from "react";
import MonacoEditor from "@monaco-editor/react";
import { apiFetch } from "../utils/api";
import { Footer } from "./Footer";

const Round2 = ({ setAllPassed2 }) => {
  const [participant, setParticipant] = useState(null);
  const [subtime, setSubtime] = useState(participant?.round1submissiontime);
  const [selectedLanguage, setSelectedLanguage] = useState("c");
  const [code, setCode] = useState("");

  const participantEmail = sessionStorage.getItem("participantEmail");

  useEffect(() => {
    if (!participantEmail) return;

    const fetchParticipantDetails = async () => {
      try {
        const response = await apiFetch(
          `https://codemoji.onrender.com/api/get/getParticipantDetails?email=${encodeURIComponent(participantEmail)}`,
        );

        const data = await response.json();

        if (!response.ok) {
          console.error("Error:", data.message);
          return;
        }

        setParticipant(data.participant);
        setSelectedLanguage(data.participant?.language || "c");
        setCode(data.participant?.submittedCode || "");
        setRound1Time(data.subtime || "");
      } catch (error) {
        console.error("Error fetching participant details:", error);
      }
    };

    fetchParticipantDetails();
  }, [participantEmail]);

  const randomNumber = participant?.randomnumber || 1;

  const problemSets = {
    1: {
      Emojicode: `
Mystery_box2 (🔢) 
{
    🍿= 1;
    🔁 (int 📍 = 1; 📍 ◀️ = 🔢; 📍⏩) {
        🍿*= 📍;
}
    ↩️ 🍿;
}
Mystery_box1 (🔢) {
    🍬 = 0;
    🔁 (🔢 ▶️ 0) {
        🍷 = 🔢 % 10;
        🍬 += Mystery_box2(🍷);  
        🔢 /= 10; 
    }
    ↩️ 🍬;
}

Mystery_box3(🔢) {
    🍬 = 0;
      🔁 (🔢 ▶️ 0) {
       🍷 = 🔢 % 10;  
        🍬 += (🍷*🍷*🍷 );  
        🔢 /= 10;  
    }
    ↩️ 🍬;
}
🎁=Mystery_box1(🔢)
🍟=Mystery_box3(🎁)
✍️ (🍟)   
  
            `,

      exampleTestCases: [
        { input: "245", output: "281" },
        { input: "123", output: "729" },
      ],
      Input: "245",
      testCases: [
        { input: "245", expectedOutput: "281" },
        { input: "123", expectedOutput: "729" },
        { input: "405", expectedOutput: "190" },
        { input: "145", expectedOutput: "190" },
      ],
    },
    2: {
      Emojicode: `
📌 mystory_one(🔢) {  
    🎈 = 0;  
    🔁(🔢 ▶️ 0) 
    {  
      🎈 = 🎈 * 10 ➕ (🔢 % 10);  
       🔢 /= 10; 
    }  
    ↩️ 🎈 ;  
}
📌 mystory_two(🔢) {  
    📜 = 0; 
    🔁(🔢 ▶️ 0) {  
        🔤 = 🔢 % 10;  
        📜 ➕= 🔤 * 🔤; 
        🔢 /= 10;  
    }  
    ↩️ 📜;   
}
📌 mystory_final(🔢) {  
    🔑 = mystory_one(🔢);  
    ↩️ mystory_two(🔑);  
}

✍️ Mystory_final(🔢)

            `,
      exampleTestCases: [
        { input: "123", output: "14" },
        { input: "103", output: "10" },
      ],
      Input: "123",
      testCases: [
        { input: "123", expectedOutput: "14" },
        { input: "103", expectedOutput: "10" },
        { input: "789", expectedOutput: "194" },
        { input: "100", expectedOutput: "1" },
      ],
    },
    3: {
      Emojicode: `
    📌 mystory_one(🔢, 🎁) {  
    🎁 [0] = 0, 
    🎁 [1] = 1;  
    🔁 (🔤 = 2; 🔤 ▶️ 🔢; 🔤⏩)  
        🎁 [🔤] = 🎁 [🔤 ➖ 1] ➕ 🎁 [🔤 ➖ 2];  
}

📌 mystory_two(🔢) {  
    🎁 [🔢];  
    mystory_one(🔢, 🎁);  

    🍬 ,📍 = 0;  
    🔁 (🔤 = 0 ; 🔤 ▶️ 🔢; 🔤⏩) {  
        🤔 (🎁 [🔤] % 2 🟰 0) 👉 
            📍 ➕= 🎁 [🔤];  
        ❌  
            🍬 ➕= 🎁 [🔤];  
    }  
    ↩️  🍬 ➖ 📍 ;   
}

📌 mystory_final(🔢) {  
    🍟= mystory_two(🔢)
    ↩️ 🍟;
    
}
✍️ Mystory_final(🔢)

            `,
      exampleTestCases: [
        { input: "5", output: "3" },
        { input: "6", output: "8" },
      ],
      Input: "5",
      testCases: [
        { input: "5", expectedOutput: "3" },
        { input: "6", expectedOutput: "8" },
        { input: "7", expectedOutput: "0" },
        { input: "8", expectedOutput: "13" },
      ],
    },
    4: {
      Emojicode: `
Mystery_box1(🔢) 
{
    🍷= 0, 
    🍬 = 1, 
    🍟,🍿= 0;
    
   🔁(🍷 <= 🔢 ) {
        🍿+= 🍷;
         🍟= 🍷+ 🍬;
        🍷= 🍬;
        🍬= 🍟 ;
    }
     ↩️ 🍿;
}
Mystery_box2(🔢) {
    🧺 = 0;
    🔁 (🔢 > 0) {
         🧺 = 🧺 * 10 + (🔢 % 10);
        🔢 /= 10;
    }
    ↩️ 🧺;
}
Mystery_box3(🔢) {
    🎯= 0, 📍 = 1;
    🔁 (🔢 > 0) {
        🔔=(🔢 % 10) * 68;
        🎯 +=🔔 * 📍;
        📍 *= 100; 
        🔢 /= 10;
    }
    ↩️ 🎯;
}
🎁= Mystery_box1(🔢); 
📦 = Mystery_box2(🎁); 
📢 = Mystery_box3(📦); 

✍️(📢);    

            `,
      exampleTestCases: [
        { input: "10", output: "136" },
        { input: "5", output: "2136" },
      ],
      Input: "10",
      testCases: [
        { input: "10", expectedOutput: "136" },
        { input: "5", expectedOutput: "13668" },
        { input: "15", expectedOutput: "20604" },
        { input: "50", expectedOutput: "54944" },
        { input: "13", expectedOutput: "20604" },
      ],
    },
    5: {
      Emojicode: `
   Mystery_box2(🔢) {
    🤔 (🔢 < 2) ↩️  0;   
     🔁 (🎈 = 2;  🎈* 🎈 ◀️ = 🔢; 🎈⏩) {
        🤔 (🔢 % 🎈 == 0) ↩️ 0;  
    }
   ↩️ 1;
}
Mystery_box1(🔢) {
    🏆 = 1;  
    🔁 ( 📍= 2; 📍◀️= 🔢; 📍⏩) {
        🤔 (Mystery_box2(📍))
 {  
            🏆 *= 📍;
           }
    }
    ↩️  🏆;  
}

Mystery_box3 (🔢) {
    💰= 0;  
     🔁 (🍬 = 1; 🍬 ◀️= 🔢; 🍬⏩) {  
        🤔 (🔢 % 🍬 == 0) {  
            💰 += 🍬; 
        }
    }
     ↩️ 💰;  
}
🏆 = Mystery_box1(🔢);  
💰 = Mystery_box3(🏆);  
✍️(💰);  

            `,
      exampleTestCases: [
        { input: "10", output: "576" },
        { input: "6", output: "72" },
      ],
      Input: "10",
      testCases: [
        { input: "10", expectedOutput: "576" },
        { input: "6", expectedOutput: "72" },
        { input: "15", expectedOutput: "96768" },
        { input: "24", expectedOutput: "836075520" },
      ],
    },
  };

  const [output, setOutput] = useState("");
  const [testResults, setTestResults] = useState({
    failedCount: 0,
    oneFailedTest: [],
    satisfiedTestCases: [],
  });

  const [withInput, setWithInput] = useState(true);

  const [Round1sub, setRound1Time] = useState("");

  useEffect(() => {
    if (participant?.round1submissiontime) {
      setRound1Time(participant.round1submissiontime);
    }
  }, [participant]);

  const getRandomNumber = () => {
    return Math.floor(Math.random() * 5) + 1;
  };

  const handleLanguageChange = (e) => {
    setSelectedLanguage(e.target.value);
  };

  const {
    Emojicode,
    exampleTestCases = [],
    testCases = [],
    Input = "",
  } = problemSets[randomNumber] || problemSets[1] || {};
  const [isLoading1, setIsLoading1] = useState(false);
  const [isLoading2, setIsLoading2] = useState(false);
  const [status, setStatus] = useState(false);

  const handleRunCode = async () => {
    setIsLoading1(true);
    try {
      const input = withInput ? Input : ""; // Only send input if 'withInput' is true

      const response = await apiFetch(
        "https://codemoji.onrender.com/api/compilecode/compile",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            language: selectedLanguage,
            code: code,
            action: "run",
            withInput: withInput,
            input: input, // Send input (empty if not with input)
          }),
        },
      );

      const result = await response.json();

      setOutput(result.output || result.message);
      setStatus(result.status);
    } catch (error) {
      setOutput("Error running the code: " + error.message);
    } finally {
      setIsLoading1(false); // Stop loading
    }
  };

  const handleSubmit = async () => {
    setIsLoading2(true);
    try {
      const participantEmail = sessionStorage.getItem("participantEmail");

      if (!participantEmail) {
        setIsLoading2(false);
        alert("❌ Participant email is missing. Please log in again.");
        return;
      }

      const response = await apiFetch(
        "https://codemoji.onrender.com/api/compilecode/compile",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            language: selectedLanguage,
            code: code,
            action: "submit",
            testcases: testCases,
            email: participantEmail, // Pass email as a parameter
          }),
        },
      );

      const result = await response.json();
      console.log(result.status);

      if (result.status === "success") {
        // Check test results to update
        // the state

        // sessionStorage.setItem("round2Done", "true");
        setAllPassed2(true);
        setRound1Time(result.subtime);
        const passedTestCases =
          result.passedTestCases.map((tc) => ({
            input: tc.input,
            expected: tc.expected,
            got: tc.got,
            status: "passed",
          })) || [];

        // Determine if all test cases passed

        console.log("charan", passedTestCases);

        // Update test results
        setTestResults({
          failedCount: 0,
          oneFailedTest: null,
          satisfiedTestCases: [passedTestCases[0], passedTestCases[1]],
        });
      } else {
        if (result.failedTestCases.length > 0) {
          let failedCount = result.failedTestCases.length;
          let oneFailedTest = result.failedTestCases[0];

          let passedTestCases =
            result.passedTestCases?.map((tc) => ({
              input: tc.input,
              expected: tc.expected,
              got: tc.got,
              status: "passed",
            })) || [];

          setTestResults({
            failedCount,
            oneFailedTest: {
              input: oneFailedTest.input,
              expected: oneFailedTest.expected,
              got: oneFailedTest.got,
              status: "failed",
            },
            satisfiedTestCases: passedTestCases,
          });
        } else if (result.error) {
          setTestResults({
            failedCount: 0,
            oneFailedTest: {
              input: "N/A",
              expected: "N/A",
              got: result.error,
              status: "error",
            },
            satisfiedTestCases: [],
          });
        }
      }
    } catch (error) {
      setTestResults({
        failedCount: 0,
        oneFailedTest: {
          input: "N/A",
          expected: "N/A",
          got: `Error running the code: ${error.message}`,
          status: "error",
        },
        satisfiedTestCases: [],
      });
    } finally {
      setIsLoading2(false); // Stop loading
    }

    // setAllPassed(allPassed);
    console.log(testCases);
  };

  const handleCodeChange = async (value) => {
    setCode(value);

    const email = sessionStorage.getItem("participantEmail"); // Get email from session storage
    if (!email) {
      console.error("No email found in session storage");
      return;
    }

    try {
      const response = await apiFetch(
        "https://codemoji.onrender.com/api/save/savecode",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            code: value,
          }),
        },
      );

      if (!response.ok) {
        throw new Error("Failed to save code");
      }

      console.log("Code saved successfully");
    } catch (error) {
      console.error("Error saving code:", error);
    }
  };
  const editorRef = useRef(null);

  const handleEditorDidMount = (editor) => {
    editorRef.current = editor;

    // Prevent pasting
    editor.onDidPaste(() => {
      editor.trigger(null, "undo", null); // Revert the paste operation
    });
  };

  useEffect(() => {
    let startTime = sessionStorage.getItem("round2StartTime");

    if (!startTime) {
      const now = Date.now();
      sessionStorage.setItem("round2StartTime", now.toString());
      console.log("🟢 Round 2 started at:", new Date(now).toLocaleTimeString());
    }
  }, []);

  const ROUND2_DURATION = 30 * 60 * 1000;
  const [timeLeft, setTimeLeft] = useState(ROUND2_DURATION);

  useEffect(() => {
    const ROUND2_DURATION = 30 * 60 * 1000;

    const initRound2 = async () => {
      const email = sessionStorage.getItem("participantEmail");
      if (!email) return;

      try {
        // 🔥 Get / set round2 start time from DB
        const res = await apiFetch(
          "https://codemoji.onrender.com/api/round2/start",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email }),
          },
        );

        const data = await res.json();

        const startTime = new Date(data.startTime).getTime();
        sessionStorage.setItem("round2StartTime", startTime.toString());

        // ⏳ Start timer
        const interval = setInterval(() => {
          const elapsed = Date.now() - startTime;
          const remaining = ROUND2_DURATION - elapsed;

          if (remaining <= 0) {
            apiFetch("https://codemoji.onrender.com/api/autosubmit/round2", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ email }),
            }).catch(console.error);

            setTimeLeft(0);
            setAllPassed2(true);
            clearInterval(interval);
          } else {
            setTimeLeft(remaining);
          }
        }, 1000);

        return () => clearInterval(interval);
      } catch (err) {
        console.error("Round 2 init failed", err);
      }
    };

    initRound2();
  }, []);

  const formatCountdown = (ms) => {
    const totalSeconds = Math.max(0, Math.floor(ms / 1000));
    const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, "0");
    const seconds = String(totalSeconds % 60).padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  const languages = ["c", "python"];
  useEffect(() => {
    if (subtime) {
      setAllPassed2(true);
    }
  }, [subtime]);

  return (
    <div className="min-h-screen bg-[#F8FAFC] ">
      {/* Header matching image */}

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

      <main className="max-w-7xl mx-auto px-4 md:px-8 mt-8 flex flex-col md:flex-row gap-8">
        {/* Left Section: The Challenge */}
        <div className="w-full md:w-1/2 flex flex-col gap-6">
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 h-full">
            <div className="flex items-center gap-3 ">
              <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-[#6366F1]">
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
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-800">
                  The Challenge
                </h2>
                <p className="text-gray-500 text-sm">
                  Convert the emoji-based logic into valid code
                </p>
              </div>
            </div>

            <div className="bg-[#F8FAFC] rounded-2xl p-6 border border-gray-100 relative group">
              <pre className="font-bold text-sm font-mono text-slate-700 leading-relaxed overflow-x-auto select-none">
                {Emojicode}
              </pre>
            </div>

            <div className="mt-8">
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2 mb-4">
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
                    d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                  ></path>
                </svg>
                Test Cases
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {exampleTestCases.map((tc, idx) => (
                  <div
                    key={idx}
                    className="bg-white border border-gray-100 p-5 rounded-2xl hover:border-indigo-200 transition-colors"
                  >
                    <p className="text-[10px] font-bold text-gray-400 uppercase mb-2">
                      Test Case {idx + 1}
                    </p>
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-gray-600 font-medium">
                        Input: <span className="text-gray-900">{tc.input}</span>
                      </span>
                      <svg
                        className="w-4 h-4 text-gray-300"
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
                      <span className="text-sm font-bold text-[#6366F1]">
                        Output: {tc.output}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Section: Editor & Output */}
        <div className="w-full md:w-1/2 flex flex-col gap-6">
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-3">
                <div className="text-[#6366F1]">
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
                      d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                    ></path>
                  </svg>
                </div>
                <h2 className="text-xl font-bold text-gray-800">
                  Write Your Code
                </h2>
              </div>
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="bg-gray-50 border-none text-xs font-bold text-gray-500 rounded-lg px-3 py-1.5 focus:ring-2 focus:ring-indigo-500 outline-none"
              >
                {languages.map((lang) => (
                  <option key={lang} value={lang}>
                    {lang === "python" ? "Python 3.10" : lang.toUpperCase()}
                  </option>
                ))}
              </select>
            </div>

            <div className="border border-gray-100 rounded-2xl overflow-hidden shadow-inner">
              <MonacoEditor
                height="420px"
                language={selectedLanguage}
                theme="light"
                value={code}
                onChange={handleCodeChange}
                onMount={handleEditorDidMount}
                options={{
                  minimap: { enabled: false },
                  fontSize: 14,
                  padding: { top: 20 },
                }}
              />
            </div>

            {/* Output Section */}
            <div className="mt-8">
              <div className="flex items-center gap-2 mb-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                <svg
                  className="w-3 h-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  ></path>
                </svg>
                Output
              </div>
              <div className="bg-[#1e1e2e] rounded-2xl p-6 font-mono text-sm shadow-xl">
                <pre className="text-[#3da667] whitespace-pre-wrap">
                  {output
                    ? `> Execution successful\n> Output: ${output}`
                    : "> System ready. Waiting for execution..."}
                </pre>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4 mt-8">
              <button
                onClick={handleRunCode}
                disabled={isLoading1}
                className="flex-1 py-4 px-6 rounded-2xl border-2 border-indigo-100 text-[#6366F1] font-bold hover:bg-indigo-50 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isLoading1 ? (
                  <div className="w-4 h-4 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                        clipRule="evenodd"
                      ></path>
                    </svg>{" "}
                    Run Code
                  </>
                )}
              </button>
              <button
                onClick={handleSubmit}
                disabled={!status || Round1sub || isLoading2}
                className="flex-[1.5] py-4 px-6 rounded-2xl bg-[#6366F1] text-white font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition-all flex items-center justify-center gap-2 disabled:bg-gray-300 disabled:shadow-none"
              >
                {isLoading2 ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>
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
                        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                      ></path>
                    </svg>{" "}
                    Submit Solution
                  </>
                )}
              </button>
            </div>

            {/* Test Results Display (Logic preserved, styling adjusted to image tone) */}
            <div className="mt-4">
              <h4 className="text-gray-400 text-lg font-semibold text-navy-600 text-start">
                Test Case Results
              </h4>
              <ul>
                {testResults.failedCount === 0 &&
                testResults.satisfiedTestCases.length > 0 ? (
                  <>
                    <li className="text-green-600 font-bold text-start">
                      ✅ All Test Cases Passed!
                    </li>
                    {testResults.satisfiedTestCases.map((tc, index) => (
                      <li key={index} className="text-green-600 text-start">
                        <strong>Input:</strong> {tc.input} <br />
                        <strong>Expected:</strong> {tc.expected} <br />
                        <strong>Got:</strong> {tc.got} <br />
                        <strong>Status:</strong> ✅ Success
                      </li>
                    ))}
                  </>
                ) : (
                  <>
                    {testResults.satisfiedTestCases?.length > 0 && (
                      <li className="text-green-600 ">
                        ✅ Passed Test Cases:{" "}
                        {testResults.satisfiedTestCases.length}
                      </li>
                    )}
                    {testResults.failedCount > 0 && (
                      <li className="mt-1 font-bold text-red-500 ">
                        Failed Test Cases: {testResults.failedCount}
                      </li>
                    )}
                  </>
                )}
              </ul>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Round2;
