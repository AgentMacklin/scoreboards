import Link from 'next/link';
import { NextRouter, useRouter } from 'next/router';
import voca from 'voca';

export default function Breadcrumb() {
  let path: string = '/';
  const router: NextRouter = useRouter();
  const route = router.asPath;
  const splittedRoute = voca.split(route, '/');
  const currentPage = splittedRoute[splittedRoute.length - 1];

  const formalizeRouteName = (name: string) => {
    let str = voca.replaceAll(name, '-', ' ');
    return voca.titleCase(str);
  };

  // "rebuild" the path to the page as the goes through the routes
  const buildPath = (p: string) => {
    path += p;
    return path;
  };

  return (
    <div className="breadcrumb container">
      <ul>
        {splittedRoute.map((route, idx) => (
          <li key={idx} className={route === currentPage ? 'is-active' : ''}>
            <Link href={buildPath(route)}>
              <a>{route === '' ? 'Home' : formalizeRouteName(route)}</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
