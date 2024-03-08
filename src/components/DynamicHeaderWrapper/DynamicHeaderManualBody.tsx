import React from 'react';
import DynamicHeaderWrapper from '.';
import { getCollapsedContent } from './getCollapsedContent';
import { FlashList, FlashListProps } from '@shopify/flash-list';

const stripProps = (object: any) => ({
  ...object,
  ref: undefined,
});

const DynamicHeaderManualBody = <T,>(props: {
  titleWhenCollapsed?: string;
  topOnlyContent: { height: number; component: JSX.Element };
  persistedContent?: { height: number; component: JSX.Element };
  flashListRef?: React.LegacyRef<FlashList<T>>;
  disableBack?: boolean;
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
          ? getCollapsedContent(props.titleWhenCollapsed, props.disableBack)
          : {
              height: 0,
              component: <></>,
            }
      }
    />
  );
};

export default DynamicHeaderManualBody;
