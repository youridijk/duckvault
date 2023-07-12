import { Alert, Pressable, View } from 'react-native';
import { ArchiveBoxIcon } from 'react-native-heroicons/solid';
import React, { useState } from 'react';
import useAuth from '../../../state/auth/useAuth';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { PrivateCollectionButton } from '../../../types/types';
import settings from '../../../Settings';
import colors from '../../../styles/Colors';

type AddRemoveVariables = {
  issueCode: string;
  userOwnsIssue: boolean;
  authHeaders: Record<string, string>;
};

async function updatePrivateCollectionStatus({ issueCode, userOwnsIssue, authHeaders }: AddRemoveVariables) {
  // if (Math.random() < 0.4) {
  //   throw Error('Something wrong maybe');
  // }
  // return;

  const url = `${settings.backendUrl}/user/owned_issues/${issueCode}`;

  const response = await fetch(url, {
    method: userOwnsIssue ? 'DELETE' : 'POST',
    headers: authHeaders,
  });

  if (!response.ok) {
    const responseBody = await response.json();
    return Promise.reject(responseBody);
  }

  return Promise.resolve();
}

export default function(props: PrivateCollectionButton) {
  const { userOwnsIssueInitialValue, issueCode } = props;
  const [userOwnsIssue, setUserOwnsIssue] = useState(userOwnsIssueInitialValue);
  const { authHeaders } = useAuth();
  const queryClient = useQueryClient();

  const mutation = useMutation<void, { message: string }, AddRemoveVariables, void>({
    mutationFn: updatePrivateCollectionStatus,
    onMutate: function(variables) {
      setUserOwnsIssue(!variables.userOwnsIssue);
    },
    onSuccess: function(data, variables) {
      queryClient.setQueryData(
        ['issue', variables.issueCode],
        (oldData) => {
          return oldData ? { ...oldData, userOwnsIssue: !variables.userOwnsIssue } : oldData;
        },
      );
      queryClient.invalidateQueries(['private-collection-me', 12])
    },
    onError: function(error, variables) {
      // Revert on error
      setUserOwnsIssue(!variables.userOwnsIssue);
      Alert.alert(error.message);
    },
  });

  return (
    <View>
      <Pressable
        {...props}
        onPress={() => mutation.mutate({ issueCode, userOwnsIssue, authHeaders })}
      >
        <ArchiveBoxIcon color={userOwnsIssue ? colors.secondary : colors.white} />
      </Pressable>
    </View>
  );
}
