import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Footer } from "./Footer";
import {
  Eye,
  EyeOff,
  User,
  Mail,
  Lock,
  CheckCircle,
  ShieldCheck,
} from "lucide-react";
import Navbar from "./Navbar";

const Signup = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { name, email, password } = data;

  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [verified, setVerified] = useState(false);

  // 🔹 Loader States preserved
  const [sendingOtp, setSendingOtp] = useState(false);
  const [verifyingOtp, setVerifyingOtp] = useState(false);
  const [signingUp, setSigningUp] = useState(false);

  const sendOtp = async () => {
    try {
      setSendingOtp(true);
      const response = await fetch(
        "https://codemoji.onrender.com/api/send/sendotp",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        },
      );
      const result = await response.json();
      if (response.ok) {
        setOtpSent(true);
        setMessage("OTP sent to your email");
      } else {
        setMessage(result.message);
      }
    } catch (err) {
      setMessage("Error sending OTP");
    } finally {
      setSendingOtp(false);
    }
  };

  const verifyOtp = async () => {
    try {
      setVerifyingOtp(true);
      const response = await fetch(
        "https://codemoji.onrender.com/api/verify/verifyotp",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, otp }),
        },
      );
      const result = await response.json();
      if (response.ok) {
        setVerified(true);
        setMessage("Email verified successfully");
      } else {
        setMessage("Invalid OTP");
      }
    } catch (err) {
      setMessage("Verification failed");
    } finally {
      setVerifyingOtp(false);
    }
  };

  const handler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const submitSignup = async (e) => {
    e.preventDefault();
    try {
      setSigningUp(true);
      const response = await fetch(
        "https://codemoji.onrender.com/api/signup/participantsignup",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        },
      );
      const result = await response.json();
      setMessage(result.message || "Signup completed");
      if (response.ok) {
        localStorage.removeItem("token");
        sessionStorage.clear();
        setTimeout(() => navigate("/signin"), 1500);
      }
    } catch (error) {
      setMessage("Something went wrong. Please try again.");
    } finally {
      setSigningUp(false);
    }
  };

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  return (
    <div className="min-h-screen flex flex-col bg-[#F3F4F6] font-sans">
      <Navbar />

      <div className="flex-grow flex justify-center items-center mt-24 md:p-0 p-5">
        {/* Main Card Container */}
        <div className="flex w-full max-w-4xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden ">
          {/* Left Side: Branding (Matching Uploaded Image) */}
          <div className="hidden lg:flex lg:w-5/12 bg-gradient-to-br from-[#6366F1] via-[#4F46E5] to-[#8B5CF6] p-12 flex-col justify-center items-center text-center text-white relative">
            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>

            <div className="bg-white/20 backdrop-blur-xl p-8 rounded-[2rem] mb-8 border border-white/30 shadow-2xl transform hover:rotate-3 transition-transform">
              <span className="text-8xl">🤩</span>
            </div>

            <h1 className="text-3xl font-black mb-4 tracking-tight leading-tight text-white">
              Code with character
            </h1>
            <p className="text-indigo-100 text-lg font-medium max-w-xs opacity-90">
              Join CodeMoji today and turn your logic into a playful language.
            </p>
          </div>

          {/* Right Side: Form */}
          <div className="w-full lg:w-7/12 p-8 md:p-14 flex flex-col justify-center overflow-y-auto">
            <div className="mb-8">
              <h2 className="text-3xl font-black text-slate-900 mb-2">
                Get Started
              </h2>
              <p className="text-slate-500 font-medium">
                Please fill in your details to create an account.
              </p>
            </div>

            {message && (
              <div
                className={`p-4 rounded-2xl text-sm mb-6 border ${message.includes("Error") || message.includes("Invalid") ? "bg-red-50 border-red-100 text-red-600" : "bg-indigo-50 border-indigo-100 text-indigo-600 font-bold"}`}
              >
                {message}
              </div>
            )}

            <form onSubmit={submitSignup} className="space-y-5">
              {/* Name Input */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">
                  Full Name
                </label>
                <div className="relative">
                  <User
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    size={18}
                  />
                  <input
                    required
                    type="text"
                    name="name"
                    value={name}
                    onChange={handler}
                    placeholder="John Doe"
                    className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all text-slate-700"
                  />
                </div>
              </div>

              {/* Email + OTP Section */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">
                  Email Address
                </label>
                <div className="flex gap-2">
                  <div className="relative flex-grow">
                    <Mail
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                      size={18}
                    />
                    <input
                      required
                      type="email"
                      name="email"
                      value={email}
                      onChange={handler}
                      disabled={otpSent}
                      placeholder="john@example.com"
                      className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all text-slate-700 disabled:bg-slate-100 disabled:cursor-not-allowed"
                    />
                  </div>
                  {!otpSent && (
                    <button
                      type="button"
                      onClick={() => {
                        if (!email)
                          return setMessage("Please enter email first");
                        if (!isValidEmail(email))
                          return setMessage("Please enter valid email");
                        sendOtp();
                      }}
                      disabled={sendingOtp}
                      className="px-6 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-bold text-sm transition-all disabled:bg-slate-300"
                    >
                      {sendingOtp ? "..." : "Send OTP"}
                    </button>
                  )}
                </div>
              </div>

              {/* OTP Input (Conditionally rendered) */}
              {otpSent && !verified && (
                <div className="space-y-2 animate-in fade-in slide-in-from-top-2">
                  <label className="text-xs font-bold text-indigo-600 uppercase tracking-widest ml-1">
                    Enter Verification Code
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Enter otp"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      className="flex-grow p-3.5 bg-white border-2 border-indigo-500 rounded-2xl focus:outline-none shadow-lg shadow-indigo-100 text-center font-bold tracking-[0.5em] text-lg"
                    />
                    <button
                      type="button"
                      onClick={verifyOtp}
                      disabled={verifyingOtp}
                      className="px-6 bg-green-500 hover:bg-green-600 text-white rounded-2xl font-bold text-sm transition-all"
                    >
                      {verifyingOtp ? "..." : "Verify"}
                    </button>
                  </div>
                </div>
              )}

              {/* Password Input */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">
                  Password
                </label>
                <div className="relative">
                  <Lock
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    size={18}
                  />
                  <input
                    required
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={password}
                    onChange={handler}
                    placeholder="Create a strong password"
                    className="w-full pl-12 pr-12 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all text-slate-700"
                  />
                  <button
                    type="button"
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-indigo-600"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Final Submit Button */}
              <button
                type="submit"
                disabled={!verified || signingUp}
                className={`w-full py-4 mt-4 rounded-2xl font-black text-white shadow-xl transition-all flex items-center justify-center gap-2 ${
                  verified
                    ? "bg-[#6366F1] hover:bg-[#4F46E5] shadow-indigo-200 active:scale-[0.98]"
                    : "bg-slate-300 cursor-not-allowed shadow-none"
                }`}
              >
                {signingUp ? "Creating Account..." : "Complete Sign Up"}
                {verified && <ShieldCheck size={20} />}
              </button>

              <div className="text-center mt-6">
                <p className="text-slate-500 font-medium text-sm">
                  Already have an account?{" "}
                  <button
                    type="button"
                    onClick={() => navigate("/signin")}
                    className="text-indigo-600 font-black hover:underline"
                  >
                    Sign in
                  </button>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Signup;
