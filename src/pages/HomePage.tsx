import "../css/home.css";

export default function HomePage() {
  return (
    <div className="home-page">
      <header className="header-home">
        <a href="/">uzChess.vercel.app</a>
      </header>
      <ul className="links-container-home">
        <li className="links-grid-home">
          <a href="/chess-1" className="link-item-home">
            Chess 1 Side
          </a>
        </li>
        <li className="links-grid-home">
          <a href="/chess-analysis" className="link-item-home">
            Analysis
          </a>
        </li>
        <li className="links-grid-home">
          <a href="/chess-2" className="link-item-home">
            Chess 2 Side
          </a>
        </li>
        <li className="links-grid-home">
          <a href="/chess-online" className="link-item-home">
            Chess Online
          </a>
        </li>
      </ul>
    </div>
  );
}
