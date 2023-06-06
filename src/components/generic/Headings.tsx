import { Text, TextProps } from 'react-native';
import text from '../../styles/Text';

export function H1(props: TextProps) {
  return (
    <Text {...props} style={[text.h1, props.style]}>
      {props.children}
    </Text>
  );
}

export function H2(props: TextProps) {
  return (
    <Text {...props} style={[text.h2, props.style]}>
      {props.children}
    </Text>
  );
}

export function H3(props: TextProps) {
  return (
    <Text {...props} style={[text.h3, props.style]}>
      {props.children}
    </Text>
  );
}

export function H4(props: TextProps) {
  return (
    <Text {...props} style={[text.h4, props.style]}>
      {props.children}
    </Text>
  );
}

export function H5(props: TextProps) {
  return (
    <Text {...props} style={[text.h5, props.style]}>
      {props.children}
    </Text>
  );
}

export function H6(props: TextProps) {
  return (
    <Text {...props} style={[text.h6, props.style]}>
      {props.children}
    </Text>
  );
}
