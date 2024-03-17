import { Divider } from '@ui-kitten/components';
import React, { useRef } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { ScaleDecorator } from 'react-native-draggable-flatlist';
import COLORS from '../../constants/colors';
import ContenderListItem from '../List/ContenderList/ContenderListItem';
import { CategoryType, iPrediction, Phase } from '../../models';
import SwipeableItem, { SwipeableItemImperativeRef } from 'react-native-swipeable-item';
import CustomIcon from '../CustomIcon';

const SWIPABLE_WIDTH = 60;

const MovieListDraggableItem = ({
  item: prediction,
  getIndex,
  drag,
  isActive,
  showAccolades,
  contenderIdsToPhase,
  phase,
  onDelete,
  onPressItem,
  categoryType,
  contenderIdToRiskiness,
  slots,
}: {
  item: iPrediction;
  getIndex: () => number | undefined;
  drag: () => void;
  isActive: boolean;
  showAccolades: boolean;
  contenderIdsToPhase:
    | {
        [contenderId: string]: Phase;
      }
    | undefined;
  phase: Phase | undefined;
  onDelete: () => void;
  onPressItem: () => void;
  categoryType: CategoryType;
  contenderIdToRiskiness: Record<string, number>;
  slots: number;
}) => {
  const swipableRef = useRef<SwipeableItemImperativeRef>(null);
  const ref = useRef<View>(null);
  const index = getIndex() || 0;
  const ranking = index + 1;
  const accolade = showAccolades
    ? contenderIdsToPhase && contenderIdsToPhase[prediction.contenderId]
    : undefined;
  const accoladeMatchesPhase = phase === accolade;

  /**
   * Maybe onStartSwipe, we can set the ref on the item to disable other touches.
   * Because right now it gets super weird
   */

  return (
    <SwipeableItem
      ref={swipableRef}
      item={{ key: prediction.contenderId }}
      key={prediction.contenderId}
      onChange={({ openDirection }) => {
        if (openDirection === 'left') {
          ref.current?.setNativeProps({ pointerEvents: 'none' });
        } else {
          ref.current?.setNativeProps({ pointerEvents: 'auto' });
        }
      }}
      renderUnderlayLeft={() => (
        <TouchableOpacity
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: COLORS.error,
            right: 0,
            position: 'absolute',
            alignItems: 'flex-end',
          }}
          activeOpacity={0.5}
          onPress={() => onDelete()}
        >
          <View
            style={{
              height: '100%',
              width: SWIPABLE_WIDTH,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <CustomIcon
              name={'trash-outline'}
              size={SWIPABLE_WIDTH / 2}
              color={COLORS.white}
              styles={{ borderRadius: 100 }}
            />
          </View>
        </TouchableOpacity>
      )}
      overSwipe={15}
      snapPointsLeft={[SWIPABLE_WIDTH]}
    >
      {index === slots ? (
        <Divider
          style={{
            margin: 10,
            backgroundColor: isActive ? 'transparent' : COLORS.secondary,
          }}
        />
      ) : null}
      <ScaleDecorator activeScale={1}>
        <ContenderListItem
          itemRef={ref}
          prediction={prediction}
          ranking={ranking}
          onPressItem={() => onPressItem()}
          draggable={{
            drag,
            isActive,
          }}
          categoryType={categoryType}
          iconRightProps={{
            iconName: 'menu',
            enableOnPressIn: true,
            onPress: () => drag(),
          }}
          accolade={accolade || undefined}
          isUnaccaloded={showAccolades && !accoladeMatchesPhase}
          riskiness={
            showAccolades ? contenderIdToRiskiness[prediction.contenderId] : undefined
          }
        />
      </ScaleDecorator>
    </SwipeableItem>
  );
};

export default MovieListDraggableItem;
