import colors from '../../styles/Colors';
import { H4 } from '../generic/Headings';
import { View } from 'react-native';
import { Issue } from '../../types/db/Inducks';

type Props = {
  issue: Issue;
  width?: number;
  height?: number;
  aspectRatio: number | string;
};

export default function({ issue, width, height, aspectRatio }: Props) {
  return (
    <View style={{
      width,
      height,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.grey,
      padding: 10,
      borderRadius: 5,
      aspectRatio,
    }}>
      <H4>{issue.publication.title + ' ' + issue.issuenumber}</H4>
    </View>
  );
}
