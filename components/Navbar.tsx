export default function Navbar() {
  return (
    <nav className="navbar pb-5" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <a href="/" className="navbar-item">
          <img src="scoreboard.svg" className="navbar-logo" />
        </a>
        <a
          role="button"
          className="navbar-burger burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbar-main"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>
      <div className="navbar-menu" id="navbar-main">
        <div className="navbar-start">
          <a href="#" className="navbar-item">
            GitHub
          </a>
        </div>
        <div className="navbar-end"></div>
      </div>
    </nav>
  );
}
