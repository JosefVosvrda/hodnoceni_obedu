import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie";
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
    const checkAuth = () => {
      const token = Cookies.get("token"); // Získání JWT tokenu z cookies
      setIsAuthenticated(!!token);
    };

    checkAuth();
  }, []);

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/login" element={<Login />} />
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
