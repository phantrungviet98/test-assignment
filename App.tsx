/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {FC} from 'react';
import {
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Shadow} from 'react-native-shadow-2';

const buttonSize = {
  width: 100,
  height: 50,
};
const gradientConfigs = {
  start: {x: 0.0, y: 0.25},
  end: {x: 0.5, y: 1.0},
  locations: [0.5, 1],
};

interface WrapperProps {
  hasShadow: boolean;
  children: React.ReactElement;
}

function App(): JSX.Element {
  const buttons = [
    {
      text: 'Button 1',
      colors: ['#6AF0B4FF', '#903DDDFF'],
      hasShadow: false,
    },
    {
      text: 'Button 2',
      colors: ['#6AF0B4FF', '#62B1EBFF'],
      hasShadow: true,
    },
  ];

  const Wrapper: FC<WrapperProps> = ({hasShadow, children}) => {
    if (!hasShadow) {
      return <>{children}</>;
    } else {
      return (
        <Shadow
          startColor={'#00FFB84C'}
          paintInside
          distance={20}
          offset={[0, 0]}>
          {children}
        </Shadow>
      );
    }
  };

  const Inner: FC<WrapperProps> = ({hasShadow, children}) => {
    if (!hasShadow) {
      return <View style={styles.noInner}>{children}</View>;
    } else {
      return (
        <LinearGradient
          {...gradientConfigs}
          style={styles.inner}
          colors={['rgba(106,240,180,0.43)', 'rgba(98,177,235,0.54)']}>
          {children}
        </LinearGradient>
      );
    }
  };

  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={styles.row}>
        {buttons.map(e => {
          return (
            <TouchableOpacity
              key={e.text}
              onPress={() => Alert.alert('', e.text)}>
              <Wrapper hasShadow={e.hasShadow}>
                <LinearGradient
                  {...gradientConfigs}
                  style={styles.gradientBorder}
                  colors={e.colors}>
                  <Inner hasShadow={e.hasShadow}>
                    <Text style={styles.text}>{e.text}</Text>
                  </Inner>
                </LinearGradient>
              </Wrapper>
            </TouchableOpacity>
          );
        })}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  gradientBorder: {
    ...buttonSize,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noInner: {
    height: buttonSize.height - 4,
    width: buttonSize.width - 4,
    backgroundColor: 'black',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inner: {
    ...buttonSize,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    height: buttonSize.height - 4,
    width: buttonSize.width - 4,
  },
  row: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  text: {
    color: 'white',
  },
});

export default App;
