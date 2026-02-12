import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { apiFetch } from "../utils/api";
import { Footer } from "./Footer";

const Leaderboard = () => {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await apiFetch(
          "https://codemoji.onrender.com/api/lead/leaderboard",
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          },
        );

        if (!response.ok) {
          throw new Error("Failed to fetch leaderboard data");
        }

        const data = await response.json();
        setLeaderboardData(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchLeaderboard();
    const interval = setInterval(fetchLeaderboard, 5000);
    return () => clearInterval(interval);
  }, []);

  // Helper to get time based on latest round (Logic from your original code)
  const getSubmissionTime = (p) => {
    if (p.latestRound === 3) return p.round3Time;
    if (p.latestRound === 2) return p.round2Time;
    if (p.latestRound === 1) return p.round1Time;
    return "--";
  };

  const topThree = leaderboardData.slice(0, 3);
  const restOfUsers = leaderboardData.slice(3);

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans pb-5">
      <Navbar />

      <div className="container mx-auto px-4 pt-12 mt-20">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-black text-[#1E293B] mb-4">
            The Hall of Fame
          </h1>
          <p className="text-slate-500 max-w-lg mx-auto font-medium">
            Compete with top coders and rise through the ranks. Every emoji
            counts towards your legacy.
          </p>
        </div>

        {loading && (
          <p className="text-center py-10">Loading Hall of Fame...</p>
        )}
        {error && <p className="text-red-500 text-center py-10">{error}</p>}

        {!loading && !error && leaderboardData.length > 0 && (
          <>
            {/* --- TOP 3 PODIUM --- */}
            <div className="flex flex-col md:flex-row items-end justify-center gap-6 mb-20">
              {/* Rank 2 */}
              {topThree[1] && (
                <div className="bg-white p-8 rounded-[2rem] shadow-xl shadow-slate-200/50 w-full md:w-64 text-center order-2 md:order-1 h-fit border-t-4 border-slate-200">
                  <div className="relative inline-block mb-4">
                    <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-4xl">
                      🥈
                    </span>
                    <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center text-4xl shadow-inner">
                      😎
                    </div>
                  </div>
                  <h3 className="font-black text-slate-800 truncate">
                    {topThree[1].email.split("@")[0]}
                  </h3>
                  <p className="text-indigo-600 font-black text-2xl mt-1">
                    {topThree[1].points}{" "}
                    <span className="text-sm uppercase tracking-widest text-slate-400">
                      pts
                    </span>
                  </p>
                  <span className="inline-block mt-4 px-4 py-1 bg-slate-50 text-slate-400 rounded-full text-xs font-bold uppercase tracking-tighter">
                    Rank 2
                  </span>
                </div>
              )}

              {/* Rank 1 (Champion) */}
              {topThree[0] && (
                <div className="bg-white p-10 rounded-[2.5rem] shadow-2xl shadow-indigo-100 w-full md:w-80 text-center order-1 md:order-2 z-10 border-2 border-indigo-50 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-2 bg-indigo-500"></div>
                  <div className="relative inline-block mb-6">
                    <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-5xl animate-bounce">
                      🥇
                    </span>
                    <div className="w-28 h-28 bg-indigo-50 rounded-full flex items-center justify-center text-6xl shadow-inner border-4 border-white">
                      😜
                    </div>
                  </div>
                  <h3 className="font-black text-slate-900 text-xl truncate">
                    {topThree[0].email.split("@")[0]}
                  </h3>
                  <p className="text-indigo-600 font-black text-4xl mt-2">
                    {topThree[0].points}{" "}
                    <span className="text-lg uppercase tracking-widest text-slate-400">
                      pts
                    </span>
                  </p>
                  <div className="mt-6">
                    <span className="px-8 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-black uppercase tracking-widest shadow-lg shadow-indigo-200">
                      Champion
                    </span>
                  </div>
                </div>
              )}

              {/* Rank 3 */}
              {topThree[2] && (
                <div className="bg-white p-8 rounded-[2rem] shadow-xl shadow-slate-200/50 w-full md:w-64 text-center order-3 h-fit border-t-4 border-orange-200">
                  <div className="relative inline-block mb-4">
                    <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-4xl">
                      🥉
                    </span>
                    <div className="w-20 h-20 bg-orange-50 rounded-full flex items-center justify-center text-4xl shadow-inner">
                      🤓
                    </div>
                  </div>
                  <h3 className="font-black text-slate-800 truncate">
                    {topThree[2].email.split("@")[0]}
                  </h3>
                  <p className="text-indigo-600 font-black text-2xl mt-1">
                    {topThree[2].points}{" "}
                    <span className="text-sm uppercase tracking-widest text-slate-400">
                      pts
                    </span>
                  </p>
                  <span className="inline-block mt-4 px-4 py-1 bg-slate-50 text-slate-400 rounded-full text-xs font-bold uppercase tracking-tighter">
                    Rank 3
                  </span>
                </div>
              )}
            </div>

            {/* --- LIST TABLE --- */}
            <div className="max-w-5xl mx-auto">
              {/* Table Headers */}
              <div className="grid grid-cols-12 px-8 mb-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                <div className="col-span-1">#</div>
                <div className="col-span-5">Developer</div>
                <div className="col-span-3 text-center">Score</div>
                <div className="col-span-3 text-right">Last Submission</div>
              </div>

              {/* Table Rows */}
              <div className="flex flex-col gap-3">
                {restOfUsers.map((participant, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-12 items-center bg-white px-8 py-5 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow"
                  >
                    <div className="col-span-1 font-black text-slate-300 text-xl">
                      {index + 4}
                    </div>
                    <div className="col-span-5 flex items-center gap-4">
                      <div className="w-10 h-10 bg-slate-50 rounded-lg flex items-center justify-center text-xl">
                        {index % 2 === 0 ? "🤖" : "👾"}
                      </div>
                      <div>
                        <p className="font-bold text-slate-700 truncate max-w-[200px]">
                          {participant.email}
                        </p>
                        <p className="text-[10px] text-slate-400 font-medium uppercase">
                          Joined Recently
                        </p>
                      </div>
                    </div>
                    <div className="col-span-3 text-center flex items-center justify-center gap-2">
                      <span className="font-black text-indigo-600 text-xl">
                        {participant.points}
                      </span>
                      <span className="text-lg">😜</span>
                    </div>
                    <div className="col-span-3 text-right">
                      <p className="font-bold text-slate-600 text-sm">
                        {getSubmissionTime(participant)}
                      </p>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                        Today
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer CTA */}
              <div className="mt-12 text-center">
                <button className="px-10 py-3 border-2 border-slate-200 text-slate-600 font-bold rounded-xl hover:bg-white hover:border-indigo-200 transition-all">
                  View Complete Rankings
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Leaderboard;
