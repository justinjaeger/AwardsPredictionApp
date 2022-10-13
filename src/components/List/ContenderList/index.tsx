import React, { useState } from 'react';
import { TouchableHighlight, View } from 'react-native';
import { ListContendersQuery } from '../../../API';
import COLORS from '../../../constants/colors';
import { getContenderRank } from '../../../util/getContenderRank';
import { useSubscriptionEffect } from '../../../util/hooks';
import { BodyLarge } from '../../Text';
import ContenderListItem from './ContenderListItem';

type iContenderListProps = {
  categoryId: string;
  contenders: ListContendersQuery;
  isSelectable?: boolean; // makes items appear "on" or "off"
  onPressThumbnail?: (contenderId: string) => void;
  onPressItem?: (contenderId: string) => void;
};

const ContenderList = (props: iContenderListProps) => {
  const {
    categoryId,
    contenders: _contenders,
    isSelectable,
    onPressThumbnail,
    onPressItem,
  } = props;

  const [data, setData] = useState<ListContendersQuery>();

  useSubscriptionEffect(async () => {
    setData(_contenders);
  }, [_contenders]);

  const contenders = data?.listContenders;

  // TODO: better loading state
  if (!contenders) return null;

  // TODO: order contenders in display
  const orderedContenders = contenders.items.sort((c1, c2) => {
    if (!c1 || !c2) return 0;
    const c1Rank = getContenderRank(
      c1.numberOfUsersPredictingWin,
      c1.numberOfUsersPredictingNom,
      c1.numberOfUsersPredictingUnranked,
    );
    const c2Rank = getContenderRank(
      c2.numberOfUsersPredictingWin,
      c2.numberOfUsersPredictingNom,
      c2.numberOfUsersPredictingUnranked,
    );
    if (c1Rank > c2Rank) return 1;
    return -1;
  });

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
        {orderedContenders.length === 0 ? (
          <View
            style={{
              width: '100%',
              height: '100%',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <BodyLarge>No films in this list</BodyLarge>
          </View>
        ) : null}
        {orderedContenders.map((c, i) => {
          if (!c) return null; // should never happen
          return (
            <ContenderListItem
              contenderId={c.id}
              ranking={i + 1}
              categoryId={categoryId}
              onPressItem={onPressItem}
              onPressThumbnail={onPressThumbnail}
              selected={false}
              isSelectable={isSelectable}
            />
          );
        })}
      </>
    </TouchableHighlight>
  );
};

export default ContenderList;
