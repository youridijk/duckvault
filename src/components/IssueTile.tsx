import Issue from '../types/Issue';
import text from '../styles/Text';
import React, {useContext} from 'react';
import {Dimensions, Image, Text, TouchableHighlight, View} from 'react-native';
import {IssuesContext} from '../state/IssuesContext';
import Settings from '../Settings';
import colors from '../styles/Colors';

export default function (props: {issue: Issue}) {
  const [issuesList, setIssuesList] = useContext(IssuesContext);

  function removeIssue() {
    const list = new Set(
      [...issuesList].filter(i => i.issuecode !== issue.issuecode),
    );
    setIssuesList(list);
  }

  const {issue} = props;
  const imageUrl = `${Settings.imageProxyUrl}/200x/${props.issue.image_urls}`;
  return (
    <TouchableHighlight onPress={removeIssue} style={{marginHorizontal: 6}}>
      <View
        style={{
          padding: 10,
          backgroundColor: colors.primary,
          width: Dimensions.get('window').width / 2.5,
          height: 240,
          marginHorizontal: 1,
          alignItems: 'center',
          borderRadius: 10,
        }}>
        {/*<AutoHeightImage width={100} source={{uri: imageUrl}} />*/}
        <Image style={{width: 100, height: 152}} source={{uri: imageUrl}} />
        <Text style={text.h3}>{issue.title}</Text>
      </View>
    </TouchableHighlight>
  );
}
