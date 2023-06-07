import React, { ReactNode, useState } from 'react';
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
});

export function TabView(props: { children: ReactNode[] }) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  function SwitcherButton(props: PressableProps & { title: string }) {
    return (
      <Pressable {...props}>
        <Text style={style.buttonText}>{props.title}</Text>
      </Pressable>
    );
  }

  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          backgroundColor: colors.black,
          marginVertical: 10,
        }}
      >
        <Pressable style={[style.button]}>
          <Text style={style.buttonText}>Stories</Text>
        </Pressable>
        <Pressable style={[style.button]}>
          <Text style={style.buttonText}>Equivalent</Text>
        </Pressable>
      </View>

      {props.children[1]}
    </View>
  );
}

export function TabScreen(props: {title: string, })
{

}
