import React from 'react';
import { View } from 'react-native';
import { BodyLarge } from '../../Text';
import {
  NestableScrollContainer,
  NestableDraggableFlatList,
  ScaleDecorator,
} from 'react-native-draggable-flatlist';
import ContenderListItemDraggable from './ContenderListItemDraggable';
import { PosterSize } from '../../../constants/posterDimensions';

type iContenderListProps = {
  categoryId: string;
  contenderIds: string[];
  isSelectable?: boolean; // makes items appear "on" or "off"
  onDragEnd: (contenderIds: string[]) => void;
  onPressThumbnail?: (contenderId: string) => void;
  onPressItem?: (contenderId: string) => void;
};

// NOTE: Has a lot in common with ContenderList
const ContenderList = (props: iContenderListProps) => {
  const {
    categoryId,
    contenderIds,
    isSelectable,
    onDragEnd,
    onPressThumbnail,
    onPressItem,
  } = props;

  return (
    <View style={{ width: '100%' }}>
      {contenderIds.length === 0 ? (
        <View
          style={{
            width: '100%',
            height: '100%',
            alignItems: 'center',
          }}
        >
          <BodyLarge>Add films to this list</BodyLarge>
        </View>
      ) : null}
      {/* @ts-ignore not actually broken */}
      <NestableScrollContainer>
        <NestableDraggableFlatList
          data={contenderIds}
          keyExtractor={(item) => item}
          style={{}}
          contentContainerStyle={{
            paddingBottom: PosterSize.SMALL,
            paddingTop: 20,
          }}
          renderItem={({ item: contenderId, index, drag, isActive }) => {
            return (
              <ScaleDecorator>
                <ContenderListItemDraggable
                  contenderId={contenderId}
                  ranking={(index || 0) + 1}
                  categoryId={categoryId}
                  onPressItem={onPressItem}
                  onPressThumbnail={onPressThumbnail}
                  selected={false}
                  isSelectable={isSelectable}
                  drag={drag}
                  isActive={isActive}
                />
              </ScaleDecorator>
            );
          }}
          onDragEnd={({ data }) => {
            onDragEnd(data);
          }}
        />
      </NestableScrollContainer>
    </View>
  );
};

export default ContenderList;
