import React from 'react';
import DynamicHeaderScrollViewWrapper from '../DynamicHeaderScrollViewWrapper';
import { SubHeader } from '../Text';
import { ScrollView, ScrollViewProps, View } from 'react-native';

const TITLE_WHEN_COLLAPSED_HEIGHT = 40;

const CollapsableHeaderScrollViewWrapper = ({
  children,
  titleWhenCollapsed,
  topOnlyContent,
  persistedContent,
  scrollViewRef,
  scrollViewProps,
}: {
  children: JSX.Element;
  titleWhenCollapsed: string;
  topOnlyContent: { height: number; component: JSX.Element };
  persistedContent: { height: number; component: JSX.Element };
  scrollViewRef: React.RefObject<ScrollView>;
  scrollViewProps?: ScrollViewProps;
}) => {
  return (
    <DynamicHeaderScrollViewWrapper
      scrollViewProps={scrollViewProps}
      scrollViewRef={scrollViewRef}
      topOnlyContent={topOnlyContent}
      collapsedContent={{
        height: TITLE_WHEN_COLLAPSED_HEIGHT,
        component: (
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
            }}
          >
            <SubHeader style={{ textAlign: 'center' }}>{titleWhenCollapsed}</SubHeader>
          </View>
        ),
      }}
      persistedContent={persistedContent}
    >
      {children}
    </DynamicHeaderScrollViewWrapper>
  );
};

export default CollapsableHeaderScrollViewWrapper;
