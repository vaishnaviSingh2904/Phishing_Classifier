import { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import MainContainer from "./components/MainContainer";
import Blog from "./components/Blog";
import AboutUs from "./components/AboutUs";
import Footer from "./components/Footer";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import Login from "./components/Login";
import { GoogleOAuthProvider } from "@react-oauth/google";


// Protected Route wrapper component
const ProtectedRoute = ({ children }) => {
  // Check if user is authenticated
  const token = localStorage.getItem("token");

  // If not authenticated, redirect to login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // If authenticated, render the protected component
  return children;
};

function App() {
  const google_client_id =
    "468082536852-jqr7us8j9re4d2sqcsnif22a75mfa90f.apps.googleusercontent.com";
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);


  // Check authentication status on mount and when token changes
  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("token");
      setIsAuthenticated(!!token);
    };

    checkAuth();

    // Add event listener for storage changes (in case of logout in another tab)
    window.addEventListener("storage", checkAuth);

    return () => {
      window.removeEventListener("storage", checkAuth);
    };
  }, []);

  // Function to handle logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  };

  return (
    <>
      <GoogleOAuthProvider clientId={google_client_id}>
        {/* Render Header for all routes except /login */}
        {location.pathname !== "/login" && (
          <Header isAuthenticated={isAuthenticated} onLogout={handleLogout} />
        )}

        <Routes>
          {/* Login Route - Public */}
          <Route
            path="/login"
            element={
              isAuthenticated ?
                <Navigate to="/" replace /> :

                <Login onLoginSuccess={() => setIsAuthenticated(true)} />

            }
          />

          {/* All other routes - Protected */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <MainContainer />
              </ProtectedRoute>
            }
          />

          <Route
            path="/AboutUs"
            element={
              <ProtectedRoute>
                <AboutUs />
              </ProtectedRoute>
            }
          />

          <Route
            path="/Blog"
            element={
              <ProtectedRoute>
                <Blog />
              </ProtectedRoute>
            }
          />

          {/* Catch-all redirect */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

        {/* Render Footer for all routes except /login */}
        {location.pathname !== "/login" && <Footer />}
      </GoogleOAuthProvider>
    </>
  );
}

export default App;