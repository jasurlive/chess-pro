import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { FaChess, FaChessKing, FaGlobe } from "react-icons/fa";
import { SiLichess } from "react-icons/si";
import ChessGame from "../tools/Game";
import "../css/dom-menu.css";
import "../css/App.css";

function Chess1() {
  return (
    <div>
      <ChessGame />
    </div>
  );
}

function Chess2() {
  return (
    <div>
      <ChessGame />
    </div>
  );
}
function ChessAnalysis() {
  return <div className="dom-menu-general-div">Chess Analysis Component</div>;
}
function ChessOnline() {
  return <div className="dom-menu-general-div">Chess Online Component</div>;
}

function App() {
  return (
    <Router>
      <nav className="dom-menu-container">
        <ul className="dom-menu-ul">
          <li className="dom-menu-item">
            <Link to="/chess-1">
              <FaChess />
            </Link>
          </li>
          <li className="dom-menu-item">
            <Link to="/chess-analysis">
              <SiLichess />
            </Link>
          </li>
          <li className="dom-menu-item">
            <Link to="/chess-2">
              <FaChessKing />
            </Link>
          </li>

          <li className="dom-menu-item">
            <Link to="/chess-online">
              <FaGlobe />
            </Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/chess-1" element={<Chess1 />} />
        <Route path="/chess-2" element={<Chess2 />} />
        <Route path="/chess-analysis" element={<ChessAnalysis />} />
        <Route path="/chess-online" element={<ChessOnline />} />
      </Routes>
    </Router>
  );
}

export default App;
