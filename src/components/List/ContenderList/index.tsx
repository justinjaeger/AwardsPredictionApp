import React, { useState } from 'react';
import { TouchableHighlight, View } from 'react-native';
import COLORS from '../../../constants/colors';
import { Category, Contender } from '../../../models';
import { useSubscriptionEffect } from '../../../util/hooks';
import { BodyLarge } from '../../Text';
import ContenderListItem from './ContenderListItem';

type iContenderListProps = {
  category: Category;
  contenders: Contender[];
  isSelectable?: boolean; // makes items appear "on" or "off"
  onPressThumbnail?: (c: Contender) => Promise<void>;
  onPressItem?: (c: Contender) => Promise<void>;
};

const ContenderList = (props: iContenderListProps) => {
  const { category, contenders, isSelectable, onPressThumbnail, onPressItem } = props;

  const [data, setData] = useState<Contender[]>([]);

  useSubscriptionEffect(async () => {
    setData(contenders);
  }, []);

  return (
    <TouchableHighlight
      style={{
        display: 'flex',
        height: '100%',
        width: '100%',
        backgroundColor: COLORS.lightestGray,
      }}
    >
      <>
        {data.length === 0 ? (
          <View
            style={{
              width: '100%',
              height: '100%',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <BodyLarge>Add films to this list</BodyLarge>
          </View>
        ) : null}
        {data.map((c, i) => (
          <ContenderListItem
            contender={c}
            ranking={i + 1}
            category={category}
            onPressItem={onPressItem}
            onPressThumbnail={onPressThumbnail}
            selected={false}
            isSelectable={isSelectable}
          />
        ))}
      </>
    </TouchableHighlight>
  );
};

export default ContenderList;
