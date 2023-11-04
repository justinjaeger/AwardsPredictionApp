import React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ReactChildren } from '../../types/keys';

export default function SafeAreaViewFixed({
  children,
  style,
  edges,
  ...rest
}: {
  children: ReactChildren;
  style: StyleProp<ViewStyle>;
  edges?: string[] | undefined;
}) {
  const insets = useSafeAreaInsets();
  const defaultEdges = edges === undefined;
  return (
    <View
      style={[
        {
          paddingTop: defaultEdges || edges?.includes('top') ? insets.top : undefined,
          paddingBottom:
            defaultEdges || edges?.includes('bottom') ? insets.bottom : undefined,
          paddingLeft: defaultEdges || edges?.includes('left') ? insets.left : undefined,
          paddingRight:
            defaultEdges || edges?.includes('right') ? insets.right : undefined,
        },
        style,
      ]}
      {...rest}
    >
      {children}
    </View>
  );
}
