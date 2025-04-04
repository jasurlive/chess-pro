export default function HomePage() {
  return (
    <div className="home-page">
      <h1>Welcome to my chess site</h1>
      <ul>
        <li>
          <a href="/chess-1">Play chess with default pieces</a>
        </li>
        <li>
          <a href="/chess-2">Play chess with custom pieces</a>
        </li>
        <li>
          <a href="/dom-menu">Dom menu</a>
        </li>
        <li>
          <a href="/game-state">Game state</a>
        </li>
      </ul>
    </div>
  );
}
