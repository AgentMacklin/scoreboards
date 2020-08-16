import { useRouter } from 'next/router';

export interface ScoreboardCardProps {
  name: string;
  description: string;
  page?: string;
  image?: string;
}

export default function ScoreboardCard(props: ScoreboardCardProps) {
  const router = useRouter();

  const navigateToPage = () => {
    if (props.page) {
      router.push(props.page);
    }
  };
  return (
    <div onClick={navigateToPage} className="media hoverable is-vcentered">
      {props.image && (
        <figure className="media-left my-auto">
          <div className="image is-96x96">
            <img className="is-rounded" src={props.image} />
          </div>
        </figure>
      )}
      <div className="media-content">
        <strong>{props.name}</strong>
        <div>{props.description}</div>
      </div>
    </div>
  );
}
