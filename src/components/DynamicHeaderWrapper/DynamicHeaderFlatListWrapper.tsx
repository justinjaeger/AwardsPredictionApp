import React from 'react';
import { View } from 'react-native';
import DynamicHeaderWrapper from '.';
import { getCollapsedContent } from './getCollapsedContent';
import { FlashList, FlashListProps } from '@shopify/flash-list';

const stripProps = (object: any) => ({
  ...object,
  ref: undefined,
});

const DynamicHeaderFlatListWrapper = <T,>(props: {
  titleWhenCollapsed: string;
  topOnlyContent: { height: number; component: JSX.Element };
  flatListProps: FlashListProps<T>;
  persistedContent?: { height: number; component: JSX.Element };
  flashListRef?: React.LegacyRef<FlashList<T>>;
  disableBack?: boolean;
}) => {
  return (
    <DynamicHeaderWrapper
      {...stripProps(props)}
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
          ref={props.flashListRef}
        />
      )}
      collapsedContent={getCollapsedContent(props.titleWhenCollapsed, props.disableBack)}
    />
  );
};

export default DynamicHeaderFlatListWrapper;
