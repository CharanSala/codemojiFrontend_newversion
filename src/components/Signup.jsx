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

  const handler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const submitSignup = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://codemoji.onrender.com/api/signup/participantsignup",
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
        // ✅ Clear any old tokens just in case
        localStorage.removeItem("token");
        sessionStorage.clear();

        // Auto redirect to signin
        setTimeout(() => {
          navigate("/signin");
        }, 1500);
      }
    } catch (error) {
      console.error("Signup Error:", error);
      setMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <div className="flex-grow flex justify-center items-center p-6">
        <div className="relative bg-white p-10 rounded-2xl shadow-lg w-full max-w-md border border-gray-300 transition-all duration-300 hover:shadow-2xl">
          <h1 className="text-2xl flex justify-center mb-10 font-bold drop-shadow-lg text-blue">
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

            {/* Signup Button */}
            <button
              type="submit"
              className="w-full py-3 bg-[#01052A] text-white font-semibold rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              Sign Up
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
