import React from 'react';
import { FlatList, ScrollView, View } from 'react-native';
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
  initialNumToRender?: number;
};

const DynamicHeaderFlatListWrapper = <T,>(props: {
  titleWhenCollapsed: string;
  topOnlyContent: { height: number; component: JSX.Element };
  flatListProps: iDynamicHeaderFlatListProps<T>;
  persistedContent?: { height: number; component: JSX.Element };
  scrollViewRef?: React.RefObject<ScrollView>;
  flatListRef?: React.RefObject<FlatList>;
  onEndReached?: () => void;
  disableBack?: boolean;
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
              <View style={{ paddingTop }} />
              {props.flatListProps.ListHeaderComponent}
            </>
          }
          ref={props.flatListRef}
        />
      )}
      collapsedContent={getCollapsedContent(props.titleWhenCollapsed, props.disableBack)}
    />
  );
};

export default DynamicHeaderFlatListWrapper;
