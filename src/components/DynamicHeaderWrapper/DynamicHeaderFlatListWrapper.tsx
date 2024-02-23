import React from 'react';
import { Animated, FlatList, ScrollView } from 'react-native';
import DynamicHeaderWrapper from '.';
import { getCollapsedContent } from './getCollapsedContent';

export type iDynamicHeaderFlatListProps<T> = {
  data: T[];
  keyExtractor: (item: T, index: number) => string;
  renderItem: (item: { item: T; index: number }) => JSX.Element;
  ListHeaderComponent?: JSX.Element;
  ListFooterComponent?: JSX.Element;
  getItemLayout?: (
    data: Array<T> | null | undefined,
    index: number,
  ) => { length: number; offset: number; index: number };
  ref?: React.RefObject<FlatList<T>>;
};

const DynamicHeaderFlatListWrapper = <T,>(props: {
  titleWhenCollapsed: string;
  topOnlyContent: { height: number; component: JSX.Element };
  persistedContent?: { height: number; component: JSX.Element };
  scrollViewRef: React.RefObject<ScrollView>;
  flatListProps: iDynamicHeaderFlatListProps<T>;
  onEndReached?: () => void;
}) => {
  return (
    <DynamicHeaderWrapper
      {...props}
      renderBodyComponent={({ paddingTop, scrollViewProps }) => (
        <FlatList
          {...scrollViewProps}
          {...props.flatListProps}
          ListHeaderComponent={
            <>
              <Animated.View style={{ paddingTop }} />
              {props.flatListProps.ListHeaderComponent}
            </>
          }
          // So the problem with flatlist:
          // I can use all the optimizations I want
          // But when we switch from one tab back to the other,
          // flatlist doesn't reset
          // and acts like the blank spaces are no longer necessary
          removeClippedSubviews
          maxToRenderPerBatch={3}
          updateCellsBatchingPeriod={500}
          initialNumToRender={3} // can use this instead of "first render" thing
        />
      )}
      collapsedContent={getCollapsedContent(props.titleWhenCollapsed)}
    />
  );
};

export default DynamicHeaderFlatListWrapper;
