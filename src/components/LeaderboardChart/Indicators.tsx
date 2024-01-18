import { View } from 'react-native';
import { Body } from '../Text';
import React from 'react';
import COLORS from '../../constants/colors';

const Indicators = ({ chartWidth }: { chartWidth: number }) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        width: '100%',
        height: 40,
      }}
    >
      {new Array(100).fill(0).map((_, i) => {
        const percentage = 100 - i;
        const shouldShowIndicator = i % 5 === 0;
        const shouldShowPercentage = i % 10 === 0;
        return (
          <View style={{ width: chartWidth / 100, position: 'relative' }}>
            {shouldShowIndicator ? (
              <View
                style={{
                  position: 'absolute',
                  width: 50,
                  flexDirection: 'column',
                }}
              >
                <View
                  style={{
                    height: 10,
                    width: 1,
                    backgroundColor: COLORS.white,
                    alignSelf: 'flex-start',
                  }}
                />
                {shouldShowPercentage ? (
                  <Body
                    style={{
                      color: COLORS.white,
                      marginTop: 4,
                      right: 9,
                    }}
                    numberOfLines={1}
                  >{`${percentage}%`}</Body>
                ) : null}
              </View>
            ) : null}
          </View>
        );
      })}
    </View>
  );
};

export default Indicators;
