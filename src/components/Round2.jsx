import React, { useState, useRef, useEffect } from "react";
import MonacoEditor from "@monaco-editor/react";
import { apiFetch } from "../utils/api";

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
    <div>
      <div className="flex justify-center w-full px-10">
        <h3 className="text-5xl font-extrabold text-center pb-5 bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 text-transparent bg-clip-text drop-shadow-lg animate-pulse">
          Emoji Decription
        </h3>

        {/* Right-aligned Timer */}
        <p className="absolute right-10 text-2xl font-semibold text-red-700  px-4 py-2 rounded-lg">
          ⏰ {formatCountdown(timeLeft)}
        </p>
      </div>

      {Round1sub ? (
        <h3 className="text-green-700 font-bold text-lg mb-5 text-center">
          Submission Time: {Round1sub}
        </h3>
      ) : (
        <h3 className="text-lg mb-5 font-bold text-center text-red-700 "></h3>
      )}

      <div className="flex flex-col md:flex-row justify-center items-center md:items-start p-6 space-y-6 md:space-y-0 md:space-x-6 bg-white text-gray-900 min-h-screen">
        {/* Emoji Code Section */}
        <div className="w-full md:w-1/2 flex flex-col bg-gray-00 p-6 rounded-lg bg-slate-300">
          <div className="p-4 rounded-lg bg-navy-100 ">
            <p className="text-navy-700 mb-3 font-bold text-lg text-start">
              🎯 <strong>Task:</strong> Convert this emoji-based code into a
              valid program.
            </p>
            <pre
              className="bg-navy-50 p-4 rounded-md text-navy-800 text-md font-bold"
              style={{ userSelect: "none" }}
            >
              {Emojicode}
            </pre>

            <div className="mt-4">
              <h4 className="font-semibold text-lg text-navy-600 text-start pl-3">
                Test Cases
              </h4>
              {exampleTestCases.map((testCase, index) => (
                <div key={index} className="mt-2 p-3 rounded-md bg-navy-50 ">
                  {index === 0 && (
                    <p className="font-bold text-navy-500">
                      Initial Predefined Input
                    </p>
                  )}
                  <p>
                    <strong>Input:</strong> {testCase.input}
                  </p>
                  <p>
                    <strong>Output:</strong> {testCase.output}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Write Your Code Section */}
        <div className="w-full md:w-1/2 flex flex-col bg-white rounded-lg">
          <h3 className="text-2xl font-bold mb-4 text-navy-600 text-start">
            Write Your Code
          </h3>
          <div className="flex  space-x-6">
            <div className="mb-4 flex justify-center">
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="p-2 bg-navy-100 border border-gray-300 rounded-md text-navy-700"
              >
                <option value="" disabled>
                  Lang
                </option>
                {languages.map((lang) => (
                  <option key={lang} value={lang} className="text-navy-900">
                    {lang.charAt(0).toUpperCase() + lang.slice(1)}
                  </option>
                ))}
              </select>
            </div>
            {/* <div className="mb-4 flex justify-center">
                <label className="flex items-center text-navy-700">
                    <input
                        type="checkbox"
                        checked={!withInput}
                        onChange={() => setWithInput(!withInput)}
                        className="mr-2"
                    />
                    <span>Run without input</span>
                </label>
            </div> */}
          </div>

          <div className="pt-3 bg-navy-50 rounded-lg ">
            <MonacoEditor
              height="400px"
              language={selectedLanguage}
              theme="light"
              value={code}
              onChange={handleCodeChange}
              onMount={handleEditorDidMount}
            />
          </div>

          <div className="flex justify-start space-x-4 mt-4">
            <button
              onClick={handleRunCode}
              className={`px-6 py-2 rounded-md shadow-md flex items-center justify-center gap-2 transition-all duration-300 ease-in-out 
        ${isLoading1 ? " bg-[#01052A] text-white cursor-not-allowed" : "bg-[#01052A] text-white hover:bg-navy-50"}`}
              disabled={isLoading1}
            >
              {isLoading1 ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Running...
                </>
              ) : (
                "Run Code"
              )}
            </button>

            <button
              onClick={handleSubmit}
              disabled={!status || Round1sub || isLoading2}
              className={`px-8 py-2 rounded-md shadow-md flex items-center justify-center gap-2 transition-all duration-300 ease-in-out 
        ${!status || Round1sub || isLoading2 ? "bg-[#01052A] text-white cursor-not-allowed" : "bg-[#01052A] text-white hover:bg-navy-600"}`}
            >
              {isLoading2 ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Submitting...
                </>
              ) : (
                "Submit"
              )}
            </button>
          </div>
          <div className="mt-4">
            <h4 className="text-lg font-semibold text-navy-600 text-start pl-2">
              Output
            </h4>
            <pre className="bg-navy-50 p-4 rounded-md text-navy-800 text-sm border border-gray-300">
              {output || "No output yet."}
            </pre>
          </div>
          <div className="mt-4">
            <h4 className="text-lg font-semibold text-navy-600 text-start">
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
                    <li className="text-red-500 ">
                      ❌ Failed Test Cases: {testResults.failedCount}
                    </li>
                  )}
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Round2;
