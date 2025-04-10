import './App.css';
import Header from './components/Header';
import MainContainer from './components/MainContainer';
import Footer from './components/Footer';
import { Routes, Route, useLocation } from 'react-router-dom'; // Fixed import
import Login from './components/Login';

function App() {
  const location = useLocation();
  const isMainRoute = location.pathname === '/';
  return (
    <>
      {isMainRoute && <Header/>}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<MainContainer />}/> 
      </Routes>
      {isMainRoute && <Footer/>}
    </>
  );
}

export default App;
