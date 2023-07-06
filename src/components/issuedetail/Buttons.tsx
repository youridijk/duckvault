import React from 'react';
import { StyleSheet, View } from 'react-native';
import colors from '../../styles/Colors';
import PrivateCollectionButton from './buttons/PrivateCollectionButton';

type Props = {
  userOwnsIssueInitialValue: boolean;
  issueCode: string;
};

const styleSheet = StyleSheet.create({
  buttonsViews: {
    margin: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    gap: 10,
    marginVertical: 10,
  },
  button: {
    flex: 1,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 25,
    paddingVertical: 10,
    borderRadius: 5,
    alignSelf: 'center',
  },
  buttonSpacer: {
    flex: 1,
  },
});

export default function({ issueCode, userOwnsIssueInitialValue }: Props) {
  return (
    <View style={styleSheet.buttonsViews}>
      <PrivateCollectionButton
        style={styleSheet.button}
        userOwnsIssueInitialValue={userOwnsIssueInitialValue}
        issueCode={issueCode}
      />
      <View style={styleSheet.buttonSpacer} />
    </View>
  );
}
