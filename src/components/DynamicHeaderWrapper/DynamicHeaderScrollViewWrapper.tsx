import React from 'react';
import { Animated, ScrollView, ScrollViewProps } from 'react-native';
import DynamicHeaderWrapper from '.';
import { getCollapsedContent } from './getCollapsedContent';

const DynamicHeaderScrollViewWrapper = (props: {
  children: JSX.Element;
  titleWhenCollapsed: string;
  topOnlyContent: { height: number; component: JSX.Element };
  persistedContent?: { height: number; component: JSX.Element };
  scrollViewRef: React.RefObject<ScrollView>;
  scrollViewProps?: ScrollViewProps;
  onEndReached?: () => void;
}) => {
  return (
    <DynamicHeaderWrapper
      {...props}
      renderBodyComponent={({ paddingTop, scrollViewProps }) => (
        <ScrollView {...scrollViewProps} {...props.scrollViewProps}>
          <Animated.View style={{ paddingTop }} />
          {props.children}
        </ScrollView>
      )}
      collapsedContent={getCollapsedContent(props.titleWhenCollapsed)}
    />
  );
};

export default DynamicHeaderScrollViewWrapper;
