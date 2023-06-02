import {Text} from 'react-native';
import text from '../../styles/Text';

export function H3(props: any) {
  return (
    <Text {...props} style={[text.h3, props.style]}>
      {props.children}
    </Text>
  );
}
