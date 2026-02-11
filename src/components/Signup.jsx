import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
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

  // 🔹 Loader States (ONLY ADDITION)
  const [sendingOtp, setSendingOtp] = useState(false);
  const [verifyingOtp, setVerifyingOtp] = useState(false);
  const [signingUp, setSigningUp] = useState(false);

  const sendOtp = async () => {
    try {
      setSendingOtp(true);

      const response = await fetch("http://localhost:5000/api/send/sendotp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

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
        "http://localhost:5000/api/verify/verifyotp",
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
        "http://localhost:5000/api/signup/participantsignup",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        },
      );

      const result = await response.json();
      console.log("Signup Response:", result);

      setMessage(result.message || "Signup completed");

      if (response.ok) {
        localStorage.removeItem("token");
        sessionStorage.clear();

        setTimeout(() => {
          navigate("/signin");
        }, 1500);
      }
    } catch (error) {
      console.error("Signup Error:", error);
      setMessage("Something went wrong. Please try again.");
    } finally {
      setSigningUp(false);
    }
  };

  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <div className="flex-grow flex justify-center items-center p-6">
        <div className="relative bg-white p-10 rounded-2xl shadow-lg w-full max-w-md border border-gray-300 transition-all duration-300 hover:shadow-2xl">
          <h1 className="text-2xl flex justify-center mb-5 font-bold drop-shadow-lg text-blue">
            Code<span className="text-blue-400">Moji</span>😝
          </h1>

          {message && (
            <div className="text-center mb-4 text-blue-600">{message}</div>
          )}

          <form onSubmit={submitSignup} className="space-y-5">
            {/* Name */}
            <div className="flex flex-col">
              <label className="text-gray-700 font-medium mb-2">
                Full Name
              </label>
              <input
                required
                type="text"
                name="name"
                value={name}
                onChange={handler}
                placeholder="Enter your name"
                className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#01052A] transition-all duration-300 hover:border-[#01052A]"
              />
            </div>

            {/* Email */}
            <div className="flex flex-col">
              <label className="text-gray-700 font-medium mb-2">
                Email Address
              </label>
              <input
                required
                type="email"
                name="email"
                value={email}
                onChange={handler}
                placeholder="Enter your email"
                className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#01052A] transition-all duration-300 hover:border-[#01052A]"
              />
            </div>

            {/* Password */}
            <div className="flex flex-col relative">
              <label className="text-gray-700 font-medium mb-2">Password</label>
              <input
                required
                type={showPassword ? "text" : "password"}
                name="password"
                value={password}
                onChange={handler}
                placeholder="Create a password"
                className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#01052A] transition-all duration-300 hover:border-[#01052A]"
              />
              <button
                type="button"
                className="absolute right-4 top-12 text-gray-500 hover:text-gray-700"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {!otpSent ? (
              <button
                type="button"
                onClick={() => {
                  if (!email) {
                    setMessage("Please enter email first");
                    return;
                  }

                  if (!isValidEmail(email)) {
                    setMessage("Please enter valid email");
                    return;
                  }

                  sendOtp();
                }}
                disabled={sendingOtp}
                className="bg-blue-500 text-white p-2 rounded"
              >
                {sendingOtp ? "Sending..." : "Send OTP"}
              </button>
            ) : (
              <div className="flex flex-col">
                <input
                  type="text"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="p-3 border rounded"
                />

                <button
                  type="button"
                  onClick={verifyOtp}
                  disabled={verified || verifyingOtp}
                  className={`p-2 rounded mt-2 text-white ${
                    verified ? "bg-gray-400 cursor-not-allowed" : "bg-green-500"
                  }`}
                >
                  {verifyingOtp
                    ? "Verifying..."
                    : verified
                      ? "Verified ✓"
                      : "Verify OTP"}
                </button>
              </div>
            )}

            {/* Signup Button */}
            <button
              type="submit"
              disabled={!verified || signingUp}
              className={`w-full py-3 ${
                verified ? "bg-[#01052A]" : "bg-gray-400"
              } text-white rounded-lg`}
            >
              {signingUp ? "Creating Account..." : "Sign Up"}
            </button>

            {/* Footer */}
            <div className="text-center mt-4 text-gray-600 font-medium">
              <p className="text-sm">
                Already have an account?{" "}
                <span
                  onClick={() => navigate("/signin")}
                  className="text-[#01052A] font-bold cursor-pointer hover:underline"
                >
                  Sign in
                </span>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
