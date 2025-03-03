import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Homepage from "./pages/Homepage";
import ReviewForm from "./pages/ReviewForm";
import MyReviews from "./pages/MyReviews";
import MyReview from "./pages/MyReview";
import Summaries from "./pages/Summaries";
import Summary from "./pages/Summary";
import PrivateRoute from "./components/PrivateRoute";
import "tailwindcss/tailwind.css";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [lunches, setLunches] = useState([]);

  const handleLogin = async (username, password) => {
    try {
      const response = await fetch("http://s-scrum-c4a-1.dev.spsejecna.net/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
         // Nutné pro práci s cookies
        body: JSON.stringify({ username, password }),
      });
      
      if (response.ok) {
        setIsAuthenticated(true);
      } else {
        console.error("Login failed");
      }
    } catch (error) {
      console.error("Error during login", error);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetch("http://s-scrum-c4a-1.dev.spsejecna.net/lunches", {
        credentials: "include",
      })
        .then(response => response.json())
        .then(data => setLunches(data))
        .catch(error => console.error("Error fetching lunches", error));
    }
  }, [isAuthenticated]);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login handleLogin={handleLogin} />} />
        <Route path="/" element={<Navigate to="/homepage" />} />
        <Route path="/homepage" element={<PrivateRoute component={() => <Homepage lunches={lunches} />} isAuthenticated={isAuthenticated} />} />
        <Route path="/review/:id" element={<PrivateRoute component={ReviewForm} isAuthenticated={isAuthenticated} />} />
        <Route path="/my-reviews" element={<PrivateRoute component={MyReviews} isAuthenticated={isAuthenticated} />} />
        <Route path="/my-review/:id" element={<PrivateRoute component={MyReview} isAuthenticated={isAuthenticated} />} />
        <Route path="/summaries" element={<PrivateRoute component={Summaries} isAuthenticated={isAuthenticated} />} />
        <Route path="/summary/:id" element={<PrivateRoute component={Summary} isAuthenticated={isAuthenticated} />} />
      </Routes>
    </Router>
  );
}

export default App;