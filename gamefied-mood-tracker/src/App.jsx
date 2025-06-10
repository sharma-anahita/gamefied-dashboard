import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/dashboard";
import Sidebar from "./components/sidebar";
import Login from "./pages/login"; 
import ExploreStore from './components/exploreStore';
import Friends from './components/Friends';
import Payments from './components/Payments';

function App() {
  return (
    <Router>
      <div className="app-layout">
        
        <div className="page-content">
          <Routes>
            <Route path="/dash" element={<Dashboard />} />
            <Route path="/" element={<Login />} /> 
            <Route path="/ExploreStore" element={<ExploreStore />} />
            <Route path="/Friends" element={<Friends />} />
            <Route path="/Payments" element={<Payments />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
