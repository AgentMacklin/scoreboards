/**
 * The scoreboard creates a table with editable cells. The table also takes a
 * deleter function that will remove a player from the porent component.
 */

import Player from '@/lib/players';
import ContentEditable from 'react-contenteditable';

interface ScoreboardProps {
  players: Player[];
  numCols: number;
  reversed: boolean;
  deleter: (player: string) => void;
  scoreUpdater?: (player: Player, score: number, index: number) => void;
  nameUpdater?: (player: Player, name: string) => void;
}

export default function Scoreboard(props: ScoreboardProps) {
  let scoreCols = Array.from(Array(props.numCols).keys());
  if (props.reversed) scoreCols = scoreCols.reverse();

  const onNameUpdated = (event: any, player: Player) => {
    const name = event.target.value.replace(/(<([^>]+)>)/gi, "")
    props.nameUpdater(player, name);
  }

  // When a score cell is edited, try to automatically add the numbers, and
  // then update the state in the parent. If eval() can't be performed, just do
  // nothing and let the player fix it
  const onCellsEdited = (event: any, player: Player, index: number) => {
    try {
      const val = eval(event.target.textContent);
      props.scoreUpdater(player, Number(val), index);
    } catch (SyntaxError) {
      return; // don't do anything if math can't be performed
    }
  };
  return (
    <div className="table-container">
      <table className="table is-fullwidth">
        <thead>
          <tr>
            <th>Player</th>
            {scoreCols.map((val, idx) => {
              return (
                <th key={idx} className="has-text-right">
                  {val}
                </th>
              );
            })}
            <th className="has-text-right">Total</th>
            <th className="has-text-right"></th>
          </tr>
        </thead>
        <tbody>
          {props.players.map((player, idx) => {
            return (
              <tr key={idx}>
                <td>
                  <ContentEditable
                    html={player.name}
                    onChange={(e) => onNameUpdated(e, player)}
                  >
                  </ContentEditable>
                </td>
                {player.scores.map((val, i) => {
                  return (
                    <td key={i} className="has-text-right">
                      <ContentEditable
                        html={String(val ? val : '')}
                        // dummy onChange so TS will stop complaining
                        onChange={(e) => (e)}
                        onBlur={(e) => onCellsEdited(e, player, i)}
                      ></ContentEditable>
                    </td>
                  );
                })}
                <td className="has-text-right">{player.total}</td>
                <td className="has-text-right">
                  <i className="material-icons" onClick={() => props.deleter(player.name)}>
                    delete
                  </i>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
