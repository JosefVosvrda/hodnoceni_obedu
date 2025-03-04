import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from "react-router-dom";
import Login from "./pages/Login";
import Homepage from "./pages/Homepage";
import ReviewForm from "./pages/ReviewForm";
import MyReviews from "./pages/MyReviews";
import MyReview from "./pages/MyReview";
import Summaries from "./pages/Summaries";
import Summary from "./pages/Summary";
import PrivateRoute from "./components/PrivateRoute";
import Header from "./components/Header";
import "tailwindcss/tailwind.css";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch("http://s-scrum-c4a-1.dev.spsejecna.net/check-auth", {
        });

        if (response.ok) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error("Chyba při ověřování autentizace:", error);
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  const handleLogin = async (username, password) => {
    try {
      const response = await fetch("http://s-scrum-c4a-1.dev.spsejecna.net/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
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

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/login" element={<Login handleLogin={handleLogin} />} />
          <Route path="/" element={<Navigate to="/homepage" />} />
          <Route path="/homepage" element={<PrivateRoute component={Homepage} isAuthenticated={isAuthenticated} />} />
          <Route path="/review/:id" element={<PrivateRoute component={ReviewForm} isAuthenticated={isAuthenticated} />} />
          <Route path="/my-reviews" element={<PrivateRoute component={MyReviews} isAuthenticated={isAuthenticated} />} />
          <Route path="/my-review/:id" element={<PrivateRoute component={MyReview} isAuthenticated={isAuthenticated} />} />
          <Route path="/summaries" element={<PrivateRoute component={Summaries} isAuthenticated={isAuthenticated} />} />
          <Route path="/summary/:id" element={<PrivateRoute component={Summary} isAuthenticated={isAuthenticated} />} />
        </Routes>
      </Layout>
    </Router>
  );
}

const Layout = ({ children }) => {
  const location = useLocation();
  return (
    <div>
      {location.pathname !== "/login" && <Header />}
      {children}
    </div>
  );
};

export default App;