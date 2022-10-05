import React from 'react';
import { View } from 'react-native';
import { Category, Contender } from '../../../models';
import { BodyLarge } from '../../Text';
import {
  NestableScrollContainer,
  NestableDraggableFlatList,
  ScaleDecorator,
} from 'react-native-draggable-flatlist';
import ContenderListItemDraggable from './ContenderListItemDraggable';
import { PosterSize } from '../../../constants/posterDimensions';

type iContenderListProps = {
  category: Category;
  contenders: Contender[];
  isSelectable?: boolean; // makes items appear "on" or "off"
  onDragEnd: (cs: Contender[]) => void;
  onPressThumbnail?: (c: Contender) => Promise<void>;
  onPressItem?: (c: Contender) => Promise<void>;
};

const ContenderList = (props: iContenderListProps) => {
  const {
    category,
    contenders,
    isSelectable,
    onDragEnd,
    onPressThumbnail,
    onPressItem,
  } = props;

  return (
    <View style={{ width: '100%' }}>
      {contenders.length === 0 ? (
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
          data={contenders}
          keyExtractor={(item) => item.id}
          style={{}}
          contentContainerStyle={{
            paddingBottom: PosterSize.SMALL,
            paddingTop: 20,
          }}
          renderItem={({ item: contender, index, drag, isActive }) => (
            <ScaleDecorator>
              <ContenderListItemDraggable
                contender={contender}
                ranking={(index || 0) + 1}
                category={category}
                onPressItem={onPressItem}
                onPressThumbnail={onPressThumbnail}
                selected={false}
                isSelectable={isSelectable}
                drag={drag}
                isActive={isActive}
              />
            </ScaleDecorator>
          )}
          onDragEnd={({ data }) => onDragEnd(data)}
        />
      </NestableScrollContainer>
    </View>
  );
};

export default ContenderList;
