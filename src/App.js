import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import './App.css'
import Sidebar from './components/Sidebar/Sidebar';
import Home from './sections/Home/Home';
import Profile from './sections/Profile/Profile';
import Settings from './sections/Settings/Settings';
import Tasks from "./sections/Tasks/Tasks";
import Notes from "./sections/Notes/Notes";
import Links from "./sections/Links/Links";
import ExpenseTracker from "./sections/ExpenseTracker/ExpenseTracker";

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
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/notes" element={<Notes />} />
            <Route path="/links" element={<Links />} />
            <Route path="/expense-tracker" element={<ExpenseTracker />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
