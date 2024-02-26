import React, { LegacyRef } from 'react';
import { ScrollView, View } from 'react-native';
import DynamicHeaderWrapper from '.';
import { getCollapsedContent } from './getCollapsedContent';
import { FlashList, FlashListProps } from '@shopify/flash-list';

const stripRef = (object: any) => ({
  ...object,
  ref: undefined,
});

const DynamicHeaderFlatListWrapper = <T,>(props: {
  titleWhenCollapsed: string;
  topOnlyContent: { height: number; component: JSX.Element };
  flatListProps: FlashListProps<T>;
  persistedContent?: { height: number; component: JSX.Element };
  scrollViewRef?: React.RefObject<ScrollView>;
  onEndReached?: () => void;
  disableBack?: boolean;
}) => {
  return (
    <DynamicHeaderWrapper
      {...stripRef(props)}
      renderBodyComponent={({ paddingTop, scrollViewProps }) => (
        <FlashList
          {...scrollViewProps}
          {...props.flatListProps}
          ListHeaderComponent={
            <>
              <View style={{ paddingTop }} />
              {props.flatListProps.ListHeaderComponent}
            </>
          }
          renderScrollComponent={(scrollProps) => (
            <ScrollView {...scrollProps} ref={props.scrollViewRef} />
          )}
        />
      )}
      collapsedContent={getCollapsedContent(props.titleWhenCollapsed, props.disableBack)}
    />
  );
};

export default DynamicHeaderFlatListWrapper;
