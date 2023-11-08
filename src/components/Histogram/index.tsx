import React, { useState } from 'react';
import { PosterSize, getPosterDimensionsByWidth } from '../../constants/posterDimensions';
import { GestureResponderEvent, View, useWindowDimensions } from 'react-native';
import COLORS from '../../constants/colors';
import { hexToRgb } from '../../util/hexToRgb';
import { Body, Header, SubHeader, SubHeaderLight } from '../Text';
import theme from '../../constants/theme';
import { formatPercentage } from '../../util/formatPercentage';
import useDevice from '../../util/device';

const Histogram = ({
  numPredicting,
  totalNumPredicting,
  totalNumPredictingTop,
  slots = 5,
  totalWidth: _totalWidth,
  posterHeight: _posterHeight,
  enableHoverInfo,
}: {
  numPredicting: Record<number, number>;
  totalNumPredicting: number;
  totalNumPredictingTop: number;
  slots?: number;
  totalWidth?: number;
  posterHeight?: number;
  enableHoverInfo?: boolean;
}) => {
  const { isPad } = useDevice();
  const { width: windowWidth } = useWindowDimensions();
  const { height: pHeight } = getPosterDimensionsByWidth(
    isPad ? PosterSize.MEDIUM : PosterSize.SMALL,
  );
  const posterHeight = _posterHeight ?? pHeight;
  const totalWidth =
    ((_totalWidth ?? windowWidth) - 20) * (isPad ? theme.padHistogramContainerWidth : 1);

  const barsToShow = slots * 2;
  const barMaxHeight = posterHeight * 1;

  const [gesturePos, setGesturePos] = useState<{ x: number; y: number } | undefined>(
    undefined,
  );

  const handleGesture = (e: GestureResponderEvent) => {
    if (!enableHoverInfo) return;
    const x = e.nativeEvent.locationX;
    const y = e.nativeEvent.locationY;
    setGesturePos({ x, y });
  };

  const widthOfEachBar = totalWidth / barsToShow;

  const slotThatTouchIsIn =
    gesturePos && Math.floor((gesturePos.x / totalWidth) * barsToShow) + 1;
  const numPredictingInSelectedSlot =
    (slotThatTouchIsIn && numPredicting?.[slotThatTouchIsIn]) || 0;

  return (
    <View
      style={{
        flexDirection: 'row',
        alignSelf: 'flex-end',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        height: barMaxHeight,
        width: totalWidth,
        zIndex: 1,
        borderBottomWidth: 1,
        borderBottomColor: hexToRgb(COLORS.secondary, 0.1),
        marginRight: 10,
        marginLeft: 10,
        borderRadius: theme.borderRadius,
      }}
      onTouchStart={handleGesture}
      onTouchMove={handleGesture}
      onTouchEnd={() => setGesturePos(undefined)}
    >
      {new Array(barsToShow).fill(null).map((x, i) => {
        const place = i + 1;
        const isHighlighted = place === slotThatTouchIsIn;

        const numPredictingPlace = numPredicting?.[place] || 0;
        const h =
          barMaxHeight *
          ((numPredictingPlace || 1) / (totalNumPredicting || 1)) *
          (totalNumPredictingTop ? totalNumPredicting / totalNumPredictingTop : 1);
        const w = totalWidth / barsToShow - 5;
        return (
          <View
            key={i}
            style={{
              backgroundColor: isHighlighted
                ? hexToRgb(COLORS.secondaryLight, 0.3)
                : undefined,
              height: '100%',
              justifyContent: 'flex-end',
            }}
            pointerEvents="none"
          >
            <View
              style={{
                width: widthOfEachBar - 5,
                height: numPredictingPlace > 0 ? h : 0,
                backgroundColor:
                  place <= slots ? COLORS.secondaryLight : COLORS.secondaryMiddle,
                zIndex: 100,
              }}
              pointerEvents="none"
            />
            {gesturePos !== undefined ? (
              <Body
                style={{
                  position: 'absolute',
                  right: w / 4,
                  bottom: -20,
                }}
              >
                {place.toString()}
              </Body>
            ) : null}
          </View>
        );
      })}
      {gesturePos !== undefined ? (
        <View
          style={{
            position: 'absolute',
            right: 0,
            top: -barMaxHeight * 1.5,
            padding: 5,
            backgroundColor: COLORS.primary,
            borderRadius: theme.borderRadius,
            alignItems: 'flex-end',
            flexDirection: 'column',
            borderWidth: 1,
            borderColor: hexToRgb(COLORS.white, 0.2),
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
            <Header>{numPredictingInSelectedSlot.toString()}</Header>
            <SubHeaderLight style={{ marginLeft: 5 }}>{'predicting'}</SubHeaderLight>
          </View>
          <SubHeader style={{ marginLeft: 10, marginTop: 10 }}>
            {formatPercentage(numPredictingInSelectedSlot / totalNumPredicting)}
          </SubHeader>
        </View>
      ) : null}
    </View>
  );
};

export default Histogram;
