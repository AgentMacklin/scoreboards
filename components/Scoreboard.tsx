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
  updater: (player: Player, score: number, index: number) => void;
}

export default function Scoreboard(props: ScoreboardProps) {
  let scoreCols = Array.from(Array(props.numCols).keys());
  if (props.reversed) scoreCols = scoreCols.reverse();

  // When a score cell is edited, try to automatically add the numbers, and
  // then update the state in the parent. If eval() can't be performed, just do
  // nothing and let the player fix it
  const onCellsEdited = (event: any, player: Player, index: number) => {
    try {
      const val = eval(event.target.value);
      props.updater(player, Number(val), index);
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
                <td>{player.name}</td>
                {player.scores.map((val, i) => {
                  return (
                    <td key={i} className="has-text-right">
                      <ContentEditable
                        html={String(val ? val : '')}
                        onChange={(e) => onCellsEdited(e, player, i)}
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
