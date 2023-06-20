import React, {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useState,
} from 'react';
import Issue from '../types/Issue';

type State<T> = [T, Dispatch<SetStateAction<T>>];

// @ts-ignore
const IssuesContext = createContext<State<Set<Issue>>>(undefined);
function IssuesListProvider({children}: PropsWithChildren) {
  const [issuesList, setIssuesList] = useState(new Set<Issue>());

  return (
    <IssuesContext.Provider value={[issuesList, setIssuesList]}>
      {children}
    </IssuesContext.Provider>
  );
}

export {IssuesContext, IssuesListProvider};
