import React from 'react';
import DynamicHeaderWrapper from '.';
import { getCollapsedContent } from './getCollapsedContent';
import { FlashList, FlashListProps } from '@shopify/flash-list';

const stripProps = (object: any) => ({
  ...object,
  ref: undefined,
});

/**
 * How to use:
 * When your use case for Dynamic Header with scrolling body can't be met with the body
 * as a single, basic ScrollView or FlashList, you can use this component instead.
 * Just note: you'll want to pass {...scrollViewProps} to the FlashList or ScrollView component
 * that you pass in, AND set the paddingTop to top of the scroll body like:
 * <View style={{ paddingTop }} />
 */
const DynamicHeaderManualBody = <T,>(props: {
  titleWhenCollapsed?: string;
  topOnlyContent: { height: number; component: JSX.Element };
  persistedContent?: { height: number; component: JSX.Element };
  flashListRef?: React.LegacyRef<FlashList<T>>;
  disableBack?: boolean;
  onPressBack?: () => void;
  renderBodyComponent: (props: {
    paddingTop: number;
    scrollViewProps: FlashListProps<T>;
  }) => JSX.Element;
}) => {
  return (
    <DynamicHeaderWrapper
      {...stripProps(props)}
      renderBodyComponent={props.renderBodyComponent}
      collapsedContent={
        props.titleWhenCollapsed
          ? getCollapsedContent(
              props.titleWhenCollapsed,
              props.disableBack,
              props.onPressBack,
            )
          : {
              height: 0,
              component: <></>,
            }
      }
    />
  );
};

export default DynamicHeaderManualBody;
