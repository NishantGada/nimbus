import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import './App.css'
import Sidebar from './components/Sidebar';
import Home from './sections/Home/Home';
import Profile from './sections/Profile/Profile';
import Settings from './sections/Settings/Settings';

function App() {
  return (
    <Router>
      <div className="container">
        <Sidebar />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
