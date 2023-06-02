import {Text} from 'react-native';
import text from '../../styles/Text';

export function H1(props: any) {
  return <Text style={[text.h1, props.style]}>{props.children}</Text>;
}
