import React from 'react';
import {useTranslation} from 'react-i18next';
import {TextInput} from 'react-native';
import colors from '../styles/Colors';

export default function (props: {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}) {
  const {t} = useTranslation();

  return (
    <TextInput
      style={{
        color: 'white',
        fontSize: 17,
        padding: 12,
        backgroundColor: colors.white,
      }}
      onChangeText={props.setSearchTerm}
      value={props.searchTerm}
      placeholder={t('search.searchBarText') as string}
      placeholderTextColor="grey"
    />
  );
}
