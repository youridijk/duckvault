import {Text, TextProps} from 'react-native';
import text from '../../styles/Text';

export default function (props: TextProps) {
  return (
    <Text {...props} style={[text.normal, props.style]}>
      {props.children}
    </Text>
  );
}
