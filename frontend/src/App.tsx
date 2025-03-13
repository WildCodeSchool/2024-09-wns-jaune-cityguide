import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home'
import Inscription from "./pages/Inscription/Inscription";
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Inscription />} />
      </Routes>
    </Router>
  );
}

export default App
