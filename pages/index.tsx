import ScoreboardCard, { ScoreboardCardProps } from '@/components/ScoreboardCard';
import Head from 'next/head';

export default function Home() {
  const scoreboards: Array<ScoreboardCardProps> = [
    {
      name: 'Mexican Dominoes',
      description: 'This is a description.',
      page: '/mexican-dominoes',
      image: '/mexican-dominoes.jpg',
    },
  ];

  return (
    <div>
      <Head>
        <title>Scoreboards!</title>
      </Head>
      <div className="section" >
        <div className="container pb-6">
          <div className="columns">
            <div className="column">
              <h1 className="has-text-centered is-size-1 pb-5 ">Scoreboards!</h1>
              <div className="field has-addons ">
                <div className="control has-icons-left is-expanded">
                  <span className="icon is-small is-left">
                    <i className="material-icons">search</i>
                  </span>
                  <input type="text" className="input is-rounded" placeholder="Search for scoreboards..."></input>
                </div>
              </div>
            </div>
            <div className="is-divider-vertical"></div>
            <div className="column pt-6">
              {scoreboards.map((board, index) => {
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
          </div>
        </div>
      </div>
    </div>
  );
}
