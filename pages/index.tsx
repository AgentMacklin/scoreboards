import ScoreboardCard from '@/components/ScoreboardCard';
import Scoreboards from '@/lib/boards';
import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title>Scoreboards!</title>
      </Head>
      <div className="container">
        <h1 className="is-size-1 pb-5 has-text-centered">SCOREBOARDS!</h1>
        <div className="field has-addons pb-6">
          <div className="control has-icons-left is-expanded">
            <span className="icon is-small is-left">
              <i className="material-icons">search</i>
            </span>
            <input type="text" className="input is-rounded" placeholder="Search for scoreboards..."></input>
          </div>
        </div>
        {Scoreboards.map((board, index) => {
          return (
            <ScoreboardCard
              key={index}
              name={board.name}
              description={board.description}
              image={board.image}
              page={board.page}
            ></ScoreboardCard>
          );
        })}
      </div>
    </>
  );
}
