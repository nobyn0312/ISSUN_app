import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export const Container = ({ children }: Props) => {
  const style = {
    maxWidth: '768px',
    margin: '0 auto',
    overflow: 'hidden',
  };

  return <div style={style}>{children}</div>;
};
