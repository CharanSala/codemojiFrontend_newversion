import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { apiFetch } from "../utils/api";
import { Home, LogIn, LogOut, Trophy, Info, Menu, X } from "lucide-react";

const Navbar = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [emojies, setEmoji] = useState(0);
  const [EmailIn, setEmialIn] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  useEffect(() => {
    const checkEmail = () => {
      const mailstatus = sessionStorage.getItem("participantEmail");
      setEmialIn(!!mailstatus);
    };
    checkEmail();
  }, []);

  const handleSignOut = () => {
    sessionStorage.removeItem("participantEmail");
    localStorage.removeItem("token");
    setEmialIn(false);
    navigate("/");
  };

  useEffect(() => {
    const fetchPoints = async () => {
      try {
        const email = sessionStorage.getItem("participantEmail");
        if (!email) return;

        const response = await apiFetch(
          `https://codemoji.onrender.com/api/getpoints/getPoints1?email=${encodeURIComponent(email)}`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          },
        );

        if (!response.ok) throw new Error("Failed to fetch points");
        const data = await response.json();
        setEmoji(data.points);
      } catch (error) {
        console.error("Error fetching points:", error);
      }
    };

    const intervalId = setInterval(fetchPoints, 5000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo Section */}
        <Link to="/" className="flex items-center gap-2 group">
          <h2 className="text-2xl font-black tracking-tight text-slate-900">
            🚀 Code<span className="text-indigo-500 ">Moji </span>{" "}
            <span className="text-lg">😜</span>
          </h2>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden lg:flex items-center space-x-8">
          <NavLink to="/" icon={<Home size={18} />} label="Home" />

          {EmailIn ? (
            <>
              <NavLink
                to="/leaderboard"
                icon={<Trophy size={18} />}
                label="Leaderboard"
              />
              <button
                onClick={handleSignOut}
                className="flex items-center gap-2 text-slate-600 font-bold hover:text-red-500 transition-colors"
              >
                <LogOut size={18} /> Sign Out
              </button>
            </>
          ) : (
            <NavLink to="/signin" icon={<LogIn size={18} />} label="Sign In" />
          )}

          <NavLink to="/about" icon={<Info size={18} />} label="About" />

          {/* Points Badge */}
          <li className="flex items-center gap-2 px-4 py-1.5 bg-indigo-50 border border-indigo-100 rounded-full shadow-sm">
            <span className="text-lg">😜</span>
            <span className="text-indigo-600 font-bold tabular-nums">
              {emojies}
            </span>
          </li>
        </ul>

        {/* Mobile Toggle */}
        <button onClick={toggleMenu} className="lg:hidden text-slate-900 p-2">
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-white border-b border-slate-100 shadow-2xl animate-in slide-in-from-top duration-300">
          <ul className="flex flex-col p-6 space-y-6">
            <MobileNavLink
              to="/"
              label="Home"
              icon={<Home />}
              onClick={toggleMenu}
            />

            {EmailIn ? (
              <>
                <MobileNavLink
                  to="/leaderboard"
                  label="Leaderboard"
                  icon={<Trophy />}
                  onClick={toggleMenu}
                />
                <button
                  onClick={() => {
                    handleSignOut();
                    toggleMenu();
                  }}
                  className="flex items-center gap-4 text-slate-600 font-bold text-lg"
                >
                  <LogOut className="text-red-500" /> Sign Out
                </button>
              </>
            ) : (
              <MobileNavLink
                to="/signin"
                label="Sign In"
                icon={<LogIn />}
                onClick={toggleMenu}
              />
            )}

            <MobileNavLink
              to="/about"
              label="About"
              icon={<Info />}
              onClick={toggleMenu}
            />

            <li className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
              <span className="font-bold text-slate-900">Your Emojis</span>
              <div className="flex items-center gap-2 bg-white px-4 py-1 rounded-full border border-slate-200 shadow-sm">
                <span>😜</span>
                <span className="text-indigo-600 font-bold">{emojies}</span>
              </div>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

// Internal Helper Components for Cleanliness
const NavLink = ({ to, icon, label }) => (
  <li>
    <Link
      to={to}
      className="flex items-center gap-2 text-slate-600 font-bold hover:text-indigo-500 transition-colors"
    >
      {icon} {label}
    </Link>
  </li>
);

const MobileNavLink = ({ to, label, icon, onClick }) => (
  <li>
    <Link
      to={to}
      onClick={onClick}
      className="flex items-center gap-4 text-slate-600 font-bold text-lg"
    >
      <span className="text-indigo-500">{icon}</span> {label}
    </Link>
  </li>
);

export default Navbar;
