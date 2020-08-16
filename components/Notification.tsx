import { ReactNode } from 'react';

interface NotificationProps {
  children: ReactNode;
  disable: () => void;
}

export default function Notification(props: NotificationProps) {
  return (
    <div className="notification is-danger is-light">
      <button onClick={props.disable} className="delete"></button>
      {props.children}
    </div>
  );
}
