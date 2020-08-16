interface LeaderboardProps {
  players: string[];
  gameResetter: () => void;
}

// A simple card with a list of names already sorted in the parent
export default function Leaderboard(props: LeaderboardProps) {
  return (
    <div className="card">
      <div className="card-header">
        <div className="card-header-title">Leaderboard</div>
      </div>
      <div className="card-content">
        <ol>
          {props.players.map((player, idx) => (
            <li className="is-size-5" key={idx}>
              {player}
            </li>
          ))}
        </ol>
      </div>
      <div className="card-footer">
        <div className="card-footer-item">
          <button onClick={props.gameResetter} className="button is-danger is-fullwidth is-rounded">
            Reset Game
          </button>
        </div>
      </div>
    </div>
  );
}
