import React from 'react';
import DynamicHeaderScrollViewWrapper from '../DynamicHeaderScrollViewWrapper';
import { SubHeader } from '../Text';
import { ScrollViewProps, View } from 'react-native';

const TITLE_WHEN_COLLAPSED_HEIGHT = 40;

const CollapsableHeaderScrollViewWrapper = ({
  children,
  titleWhenCollapsed,
  headerContentOnlyAtTopHeight,
  HeaderContentOnlyAtTop,
  headerContentToPersistHeight,
  HeaderContentToPersist,
  scrollViewProps,
}: {
  children: JSX.Element;
  titleWhenCollapsed: string;
  headerContentOnlyAtTopHeight: number;
  HeaderContentOnlyAtTop: JSX.Element;
  headerContentToPersistHeight: number;
  HeaderContentToPersist: JSX.Element;
  scrollViewProps?: ScrollViewProps;
}) => {
  return (
    <DynamicHeaderScrollViewWrapper
      scrollViewProps={scrollViewProps}
      headerContentOnlyAtTopHeight={headerContentOnlyAtTopHeight}
      HeaderContentOnlyAtTop={HeaderContentOnlyAtTop}
      headerContentOnlyWhenCollapsedHeight={TITLE_WHEN_COLLAPSED_HEIGHT}
      HeaderContentOnlyWhenCollapsed={
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
          }}
        >
          <SubHeader style={{ textAlign: 'center' }}>{titleWhenCollapsed}</SubHeader>
        </View>
      }
      headerContentToPersistHeight={headerContentToPersistHeight}
      HeaderContentToPersist={HeaderContentToPersist}
    >
      {children}
    </DynamicHeaderScrollViewWrapper>
  );
};

export default CollapsableHeaderScrollViewWrapper;
