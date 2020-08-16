import Breadcrumb from '@/components/Breadcrumb';
import Leaderboard from '@/components/Leaderboard';
import Notification from '@/components/Notification';
import Scoreboard from '@/components/Scoreboard';
import Player from '@/lib/players';
import Head from 'next/head';
import { useState } from 'react';

type SetterCallback = (value: boolean) => void;
const numRounds = 13;

export default function MexicanDominoes() {
  const [players, setPlayers] = useState<Player[]>([]);

  // used for creating players
  const [inputName, setInputName] = useState<string | undefined>('');

  // For toggling a notification that says a player already exists
  const [playerExists, setPlayerExists] = useState<boolean>(false);

  // For toggling a notification that says a player name field is empty and a
  // name is required
  const [playerNameEmpty, setPlayerNameEmpty] = useState<boolean>(false);

  const doesPlayerExist = (newPlayer: Player) => {
    return players.findIndex((player) => player.name === newPlayer.name) >= 0;
  };

  // Passed to the scoreboard component so a player's score can be updated when
  // a cell is changed
  const scoreUpdater = (player: Player, score: number, index: number) => {
    player.scores[index] = score;
    player.total = 0;
    for (let i = 0; i < player.scores.length; i++) {
      if (player.scores[i]) player.total += player.scores[i];
    }
    const updatedPlayers = players.map((p) => (p === player ? player : p));
    setPlayers(updatedPlayers);
  };

  // Helper function that can enable and automatically close one of the notifications
  // after a delay
  const enableNotification = (setter: SetterCallback) => {
    setter(true);
    setInterval(() => {
      setter(false);
    }, 5000);
  };

  const disableNotification = (setter: SetterCallback) => {
    setter(false);
  };

  // Sort the players by their total score and return the sorted list as player
  // names for the leaderboard
  const createLeaderboardArray = () => {
    let playerToSort = Array.from(players);
    playerToSort.sort((a, b) => a.total - b.total);
    return playerToSort.map((p) => p.name);
  };

  // Initialize a new player, and will toggle a notification if there's an error
  const addPlayer = () => {
    if (inputName && inputName !== '') {
      let newPlayer: Player = { name: inputName, scores: Array(numRounds).fill(null), total: 0 };
      if (!doesPlayerExist(newPlayer)) {
        setPlayers((_players) => [..._players, newPlayer]);
        setInputName('');
      } else enableNotification(setPlayerExists);
    } else {
      enableNotification(setPlayerNameEmpty);
    }
  };

  // Create a player if the create player name field is active and the user hits
  // the enter key
  const handleNameInput = (event: any) => {
    if (event.keyCode === 13) addPlayer();
  };

  const deletePlayer = (player: string) => {
    setPlayers(players.filter((p) => p.name !== player));
  };

  return (
    <>
      <Head>
        <title>Scoreboards | Mexican Dominoes</title>
      </Head>
      <div className="section">
        <Breadcrumb></Breadcrumb>
        <div className="container pb-5">
          {playerExists && (
            <Notification disable={() => disableNotification(setPlayerExists)}>
              A player with that name already exists. Please choose a different name.
            </Notification>
          )}
          {playerNameEmpty && (
            <Notification disable={() => disableNotification(setPlayerNameEmpty)}>
              Name is required to create a player. Please input your name.
            </Notification>
          )}
          <div className="field has-addons">
            <div className="control has-icons-left is-expanded">
              <span className="icon is-small is-left pl-2">
                <i className="material-icons">person</i>
              </span>
              <input
                value={inputName}
                onKeyUp={handleNameInput}
                onChange={(e) => setInputName(e.target.value)}
                className="input is-rounded"
                type="text"
                placeholder="Enter your name..."
              />
            </div>
            <div className="control">
              <button onClick={addPlayer} className="button is-primary is-rounded">
                Create
              </button>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="columns">
            <div className="column">
              <Scoreboard
                players={players}
                numCols={13}
                reversed={true}
                deleter={deletePlayer}
                updater={scoreUpdater}
              ></Scoreboard>
            </div>
            <div className="column is-one-third-tablet is-one-fifth-desktop">
              <Leaderboard gameResetter={() => setPlayers([])} players={createLeaderboardArray()}></Leaderboard>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
