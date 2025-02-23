import { useState } from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";

export default function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className={`sidebar ${isExpanded ? "expanded" : "collapsed"}`}>
      {/* Toggle Button */}
      <button className="toggle-btn" onClick={() => setIsExpanded(!isExpanded)}>
        ☰
      </button>

      {/* Navigation Links */}
      <nav>
        <NavItem icon="🏠" label="Home" path="/" isExpanded={isExpanded} />
        <NavItem icon="👤" label="Profile" path="/profile" isExpanded={isExpanded} />
        <NavItem icon="⚙️" label="Settings" path="/settings" isExpanded={isExpanded} />
        <NavItem icon="//" label="Tasks" path="/tasks" isExpanded={isExpanded} />
        <NavItem icon="{}" label="Notes" path="/notes" isExpanded={isExpanded} />
        <NavItem icon="#" label="Links" path="/links" isExpanded={isExpanded} />
        <NavItem icon="$" label="ExpenseTracker" path="/expense-tracker" isExpanded={isExpanded} />
      </nav>
    </div>
  );
}

// Reusable Navigation Item Component
function NavItem({ icon, label, path, isExpanded }) {
  return (
    <Link to={path} className="nav-item">
      <span className="icon">{icon}</span>
      {isExpanded && <span className="label">{label}</span>}
    </Link>
  );
}