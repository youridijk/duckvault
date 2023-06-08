import React, { PropsWithChildren, ReactNode, useState } from 'react';
import { Pressable, PressableProps, StyleSheet, Text, View } from 'react-native';
import colors from '../styles/Colors';

const style = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    flex: 1,
    padding: 5,
    borderRadius: 10,
  },
  buttonText: {
    fontWeight: 'bold',
    color: colors.white,
    fontSize: 16,
    textAlign: 'center',
  },
  buttonsView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: colors.black,
    marginVertical: 10,
    borderRadius: 10,
  },
});

type TabViewProps = { activeBackgroundColor: string; backgroundColor: string; children: (React.JSX.Element)[] };

export function TabView(props: TabViewProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { children } = props;

  return (
    <View>
      <View
        style={style.buttonsView}
      >
        {children.map((child, index) => {
          if (child.type.name !== TabScreen.name) {
            throw new Error(`Only ${TabScreen.name} is allowed as child of a ${TabView.name}`);
          }

          return <SwitcherButton
            key={index}
            title={child.props.title}
            onPress={() => setSelectedIndex(index)}
            style={[style.button, { backgroundColor: index === selectedIndex ? props.activeBackgroundColor : props.backgroundColor }]} />;
        })}
      </View>
      <View>
        {children[selectedIndex]}
      </View>
    </View>
  );
}

export function TabScreen(props: PropsWithChildren<{ title: string; component?: ReactNode }>) {
  return (
    <>
      {props.component == null ? props.children : props.component}
    </>
  );
}

function SwitcherButton(props: PressableProps & { title: string }) {
  return (
    <Pressable {...props} >
      <Text style={style.buttonText}>{props.title}</Text>
    </Pressable>
  );
}
