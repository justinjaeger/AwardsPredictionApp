import React from 'react';
import { View } from 'react-native';
import COLORS from '../../../constants/colors';
import { Contender } from '../../../models';
import { BodyLarge } from '../../Text';
import ContenderListItem from './ContenderListItem';

type iContenderListProps = {
  contenders: Contender[];
  onPressItem: (c: Contender) => void;
};

const ContenderList = (props: iContenderListProps) => {
  const { contenders, onPressItem } = props;

  return (
    <View
      style={{
        display: 'flex',
        height: '100%',
        width: '100%',
        backgroundColor: COLORS.lightestGray,
      }}
    >
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
      {contenders.map((c, i) => (
        <ContenderListItem
          tmdbId={c.movie.tmdbId}
          ranking={i + 1}
          onPress={() => onPressItem(c)}
        />
      ))}
    </View>
  );
};

export default ContenderList;
