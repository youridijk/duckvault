import {Text} from 'react-native';
import text from '../../styles/Text';

export function H2(props: any) {
  return <Text style={[text.h2, props.style]}>{props.children}</Text>;
}
