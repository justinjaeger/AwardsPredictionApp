import React from 'react';
import { SubHeader } from '../Text';
import { ScrollView, View } from 'react-native';
import DynamicHeaderFlatListWrapper, {
  iDynamicHeaderFlatListProps,
} from '../DynamicHeaderFlatListWrapper';

const TITLE_WHEN_COLLAPSED_HEIGHT = 40;

const CollapsableHeaderFlatListWrapper = <T,>(props: {
  titleWhenCollapsed: string;
  topOnlyContent: { height: number; component: JSX.Element };
  persistedContent?: { height: number; component: JSX.Element };
  scrollViewRef: React.RefObject<ScrollView>;
  flatListProps: iDynamicHeaderFlatListProps<T>;
  onEndReached?: () => void;
}) => {
  const { titleWhenCollapsed } = props;
  return (
    <DynamicHeaderFlatListWrapper
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
      {...props}
    />
  );
};

export default CollapsableHeaderFlatListWrapper;
