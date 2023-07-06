import React, { PropsWithChildren, ReactNode, useState } from 'react';
import { Pressable, PressableProps, StyleSheet, Text, View } from 'react-native';
import colors from '../../styles/Colors';

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
    marginBottom: 10,
    borderRadius: 10,
  },
});

type TabScreenProps = PropsWithChildren<{ title: string; component?: ReactNode }>;
type TabViewProps = {
  activeBackgroundColor: string;
  backgroundColor: string;
  children: (JSX.Element | null)[];
};

export function TabView(props: TabViewProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { children } = props;

  return (
    <View>
      <View
        style={style.buttonsView}
      >
        {children?.map((child, index) => {
          if (!child) {
            return;
          }

          const childElementType = child.type as React.JSXElementConstructor<TabScreenProps>;
          if (childElementType.name !== TabScreen.name) {
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

export function TabScreen(props: TabScreenProps) {
  return <>{props.component == null ? props.children : props.component}</>;
}

function SwitcherButton(props: PressableProps & { title: string }) {
  return (
    <Pressable {...props} >
      <Text style={style.buttonText}>{props.title}</Text>
    </Pressable>
  );
}
