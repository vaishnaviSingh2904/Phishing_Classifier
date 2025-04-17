import "./App.css";
import Header from "./components/Header";
import MainContainer from "./components/MainContainer";
import Blog from "./components/Blog";
import AboutUs from "./components/AboutUs";
import Footer from "./components/Footer";
import { Routes, Route, useLocation } from "react-router-dom";
import Login from "./components/Login";

function App() {
  const location = useLocation();
  // const isMainRoute = location.pathname === '/';

  return (
    <>
      {/* Render Header for all routes except /login */}
      {location.pathname !== "/login" && <Header />}

      <Routes>
        {/* Login Route */}
        <Route path="/login" element={<Login />} />

        {/* Main Route */}
        <Route path="/" element={<MainContainer />} />

        {/* About Us Route */}
        <Route path="/AboutUs" element={<AboutUs />} />

        {/* Blog Route */}
        <Route path="/Blog" element={<Blog />} />
      </Routes>

      {/* Render Footer for all routes except /login */}
      {location.pathname !== "/login" && <Footer />}
    </>
  );
}

export default App;
