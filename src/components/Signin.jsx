import React, { useState, createContext } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import Navbar from "./Navbar";
import { Footer } from "./Footer";

export const UserContext = createContext();

const Signin = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { email, password } = data;
  const [user, setUser] = useState(null);

  // ✅ LOADER STATE preserved
  const [loading, setLoading] = useState(false);

  const handler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const display = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(
        "https://codemoji.onrender.com/api/users/participantverify",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        },
      );

      const result = await response.json();
      setMessage(result.message);

      if (response.ok) {
        sessionStorage.clear();
        sessionStorage.setItem("participantEmail", result.email);
        localStorage.setItem("token", result.token);
        navigate("/signin/events");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("You are not a valid user. Please register");
    }
    setLoading(false);
  };

  const goToSignup = () => {
    navigate("/signup");
  };

  return (
    <UserContext.Provider value={user}>
      <div className="min-h-screen flex flex-col bg-[#F3F4F6] font-sans">
        <Navbar />

        <div className="flex-grow flex justify-center items-center p-4 mt-28">
          {/* Main Card Container */}
          <div className="flex w-full max-w-4xl bg-white rounded-[2rem] shadow-2xl overflow-hidden min-h-[550px]">
            {/* Left Side: Branding (As seen in image) */}
            <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-[#6366F1] via-[#4F46E5] to-[#8B5CF6] p-12 flex-col justify-center items-center text-center text-white relative">
              <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>

              <div className="bg-white/20 backdrop-blur-md p-6 rounded-3xl mb-8 border border-white/30 shadow-xl">
                <span className="text-7xl">🤪</span>
              </div>

              <h1 className="text-4xl font-black mb-4 tracking-tight">
                Welcome back!
              </h1>
              <p className="text-indigo-100 text-lg font-medium leading-relaxed">
                Elevate your coding workflow with <br /> the power of
                expressions.
              </p>
            </div>

            {/* Right Side: Form */}
            <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
              <div className="mb-8">
                <h2 className="text-3xl font-black text-slate-900 mb-2">
                  Sign In
                </h2>
                <p className="text-slate-500 font-medium">
                  Please enter your credentials to continue.
                </p>
              </div>

              {message && (
                <div
                  className={`p-3 rounded-lg text-sm mb-4 border ${message.includes("valid") ? "bg-red-50 border-red-100 text-red-600" : "bg-green-50 border-green-100 text-green-600"}`}
                >
                  {message}
                </div>
              )}

              <form onSubmit={display} className="space-y-6">
                {/* Email Input */}
                <div className="relative">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 block ml-1">
                    Email Address
                  </label>
                  <div className="relative group">
                    <input
                      required
                      type="email"
                      name="email"
                      value={email}
                      onChange={handler}
                      placeholder="Enter your email"
                      className="w-full pl-4 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 focus:bg-white transition-all text-slate-700"
                    />
                  </div>
                </div>

                {/* Password Input */}
                <div className="relative">
                  <div className="flex justify-between items-center mb-2 px-1">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                      Password
                    </label>
                    {/* <span className="text-xs font-bold text-indigo-600 hover:underline cursor-pointer">
                      Forgot password?
                    </span> */}
                  </div>
                  <div className="relative group">
                    <input
                      required
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={password}
                      onChange={handler}
                      placeholder="••••••••"
                      className="w-full pl-4 pr-12 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 focus:bg-white transition-all text-slate-700"
                    />
                    <button
                      type="button"
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-indigo-600 transition-colors"
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>

                {/* <div className="flex items-center ml-1">
                  <input
                    type="checkbox"
                    id="remember"
                    className="rounded text-indigo-600 focus:ring-indigo-500"
                  />
                  <label
                    htmlFor="remember"
                    className="ml-2 text-sm text-slate-500 font-medium"
                  >
                    Remember me
                  </label>
                </div> */}

                {/* Login Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full py-4 rounded-2xl font-bold text-white shadow-lg shadow-indigo-200 transition-all flex items-center justify-center gap-2 ${
                    loading
                      ? "bg-slate-300 cursor-not-allowed"
                      : "bg-[#6366F1] hover:bg-[#4F46E5] active:scale-[0.98]"
                  }`}
                >
                  {loading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Authenticating...
                    </div>
                  ) : (
                    "Login to Account"
                  )}
                </button>

                <div className="text-center mt-6">
                  <p className="text-slate-500 font-medium text-sm">
                    Don't have an account?{" "}
                    <button
                      type="button"
                      onClick={goToSignup}
                      className="text-indigo-600 font-bold hover:underline"
                    >
                      Sign up
                    </button>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </UserContext.Provider>
  );
};

export default Signin;
