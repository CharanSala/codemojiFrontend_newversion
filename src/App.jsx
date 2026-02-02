import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Signin, { UserContext } from "./components/Signin";
import About from "./components/About";
import Events from "./components/Events";
import Leaderboard from "./components/Leaderboard";
import Signup from "./components/Signup";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";

const App = () => {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={user}>
      <BrowserRouter>
        <Routes>
          {/* ❌ BLOCK when token exists */}
          <Route
            path="/"
            element={
              <PublicRoute>
                <Home />
              </PublicRoute>
            }
          />

          <Route path="/signup" element={<Signup />} />

          <Route
            path="/signin"
            element={
              <PublicRoute>
                <Signin setUser={setUser} />
              </PublicRoute>
            }
          />

          {/* PUBLIC */}
          <Route path="/about" element={<About />} />

          {/* 🔐 PROTECTED */}
          <Route
            path="/signin/events"
            element={
              <ProtectedRoute>
                <Events />
              </ProtectedRoute>
            }
          />

          <Route
            path="/leaderboard"
            element={
              <ProtectedRoute>
                <Leaderboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
};

export default App;
