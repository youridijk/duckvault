import React, {
  createContext, useContext,
  useState,
} from "react";
import { Text, View } from "react-native";


const IssuesContext = createContext(undefined);
function IssuesListProvider({ children }) {
  const [issuesList, setIssuesList] = useState(new Set());

  return (
    <IssuesContext.Provider value={[issuesList, setIssuesList]}>
      {children}
    </IssuesContext.Provider>
  );
}

export { IssuesContext, IssuesListProvider };

function ComponentWithGlobalState() {
  const [issuesList, setIssueList] = useContext(IssuesContext);

  return (
    <View>
      <Text>State data {JSON.stringify(issuesList)}</Text>
    </View>
  );
}


