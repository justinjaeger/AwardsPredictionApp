import React, { useEffect, useState } from 'react';
import { TouchableHighlight, View } from 'react-native';
import COLORS from '../../../constants/colors';
import { BodyLarge } from '../../Text';
import ContenderListItem from './ContenderListItem';

type iContenderListProps = {
  categoryId: string;
  orderedContenderIds: string[];
  isSelectable?: boolean; // makes items appear "on" or "off"
  onPressThumbnail?: (contenderId: string) => void;
  onPressItem?: (contenderId: string) => void;
};

// NOTE: Has a lot in common with ContenderListDraggable
const ContenderList = (props: iContenderListProps) => {
  const {
    categoryId,
    orderedContenderIds,
    isSelectable,
    onPressThumbnail,
    onPressItem,
  } = props;

  const [contenerIds, setContenderIds] = useState<string[]>([]);

  useEffect(() => {
    setContenderIds(orderedContenderIds);
  }, [orderedContenderIds]);

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
        {contenerIds.length === 0 ? (
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
        {contenerIds.map((id, i) => {
          return (
            <ContenderListItem
              contenderId={id}
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
