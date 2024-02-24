import React from 'react';
import { Animated, FlatList, ScrollView } from 'react-native';
import DynamicHeaderWrapper from '.';
import { getCollapsedContent } from './getCollapsedContent';
import { useNavigation } from '@react-navigation/native';

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
  const navigation = useNavigation();
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
          ref={props.flatListRef}
        />
      )}
      collapsedContent={getCollapsedContent(
        props.titleWhenCollapsed,
        props.disableBack,
        () => navigation.goBack(),
      )}
    />
  );
};

export default DynamicHeaderFlatListWrapper;
