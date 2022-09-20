import React, { useState } from 'react';
import { View } from 'react-native';
import { Category, Contender } from '../../../models';
import { BodyLarge } from '../../Text';
import {
  NestableScrollContainer,
  NestableDraggableFlatList,
  ScaleDecorator,
} from 'react-native-draggable-flatlist';
import ContenderListItemDraggable from './ContenderListItemDraggable';

type iContenderListProps = {
  category: Category;
  contenders: Contender[];
  isSelectable?: boolean; // makes items appear "on" or "off"
  onPressThumbnail?: (c: Contender) => Promise<void>;
  onPressItem?: (c: Contender) => Promise<void>;
};

const ContenderList = (props: iContenderListProps) => {
  const { category, contenders, isSelectable, onPressThumbnail, onPressItem } = props;

  const [data, setData] = useState<Contender[]>(contenders);

  return (
    <>
      {contenders.length === 0 ? (
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
      <NestableScrollContainer>
        <NestableDraggableFlatList
          data={data}
          keyExtractor={(item) => item.id}
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
          onDragEnd={({ data }) => setData(data)}
        />
      </NestableScrollContainer>
    </>
  );
};

export default ContenderList;
