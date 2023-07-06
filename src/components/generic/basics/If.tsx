import { PropsWithChildren } from 'react';

type Props = PropsWithChildren<{ statement: boolean }>;

export default function({ statement, children }: Props) {
  return statement ? <>{children}</> : null;
}
