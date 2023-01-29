import React, { useEffect, useRef, useState } from 'react';
import { Animated, ScrollView, useWindowDimensions, View } from 'react-native';
import COLORS from '../../constants/colors';
import theme from '../../constants/theme';
import { iPredictionSet } from '../../types';
import ProfilePredictionsList from '../UserPredictionList';
import CarouselArrow from './CarouselArrow';

const PredictionCarousel = ({ predictionSets }: { predictionSets: iPredictionSet[] }) => {
  const { width } = useWindowDimensions();

  const [currentPage, setCurrentPage] = useState<number>(0);
  const [disableManualScroll, setDisableManualScroll] = useState<boolean>(false);
  const scrollBarAnim = useRef(new Animated.Value(0)).current;

  const scrollRef = useRef<ScrollView>(null);

  const totalBarWidth = width - theme.windowMargin * 2;
  const barWidth = totalBarWidth / predictionSets.length;

  useEffect(() => {
    Animated.timing(scrollBarAnim, {
      toValue: currentPage * barWidth,
      duration: 250,
      useNativeDriver: true,
    }).start();
  }, [currentPage]);

  // lets us tap through the carousel faster; onMomentumScrollEnd doesn't fire in between taps
  const tempDisableManualScroll = () => {
    setDisableManualScroll(true);
    setTimeout(() => {
      setDisableManualScroll(false);
    }, 500);
  };

  const onPressForward = () => {
    scrollRef.current?.scrollTo({ x: width * currentPage + width, animated: true });
    setCurrentPage(currentPage + 1);
    tempDisableManualScroll();
  };

  const onPressBack = () => {
    scrollRef.current?.scrollTo({ x: width * currentPage - width, animated: true });
    setCurrentPage(currentPage - 1);
    tempDisableManualScroll();
  };

  return (
    <>
      <View style={{ width: '100%', height: '60%' }}>
        <CarouselArrow
          direction={'back'}
          onPress={onPressBack}
          isDisabled={currentPage === 0}
        />
        <CarouselArrow
          direction={'forward'}
          onPress={onPressForward}
          isDisabled={currentPage === predictionSets.length - 1}
        />
        <ScrollView
          horizontal
          pagingEnabled
          style={{ width: '100%', flex: 1 }}
          ref={scrollRef}
          onScroll={(e) => {
            // animates the scrollbar as you scroll
            const xPos = e.nativeEvent.contentOffset.x / width;
            Animated.timing(scrollBarAnim, {
              toValue: xPos * barWidth,
              duration: 0,
              useNativeDriver: true,
            }).start();
          }}
          scrollEventThrottle={16}
          onMomentumScrollEnd={(e) => {
            if (disableManualScroll) return;
            // get x position of event
            const offset = e.nativeEvent.contentOffset.x / width;
            const newXPos = offset < currentPage ? Math.ceil(offset) : Math.floor(offset);
            setCurrentPage(newXPos);
          }}
        >
          <ProfilePredictionsList predictionSets={predictionSets} fixedSlots={10} />
        </ScrollView>
        {/* SCROLL BAR */}
        <Animated.View
          style={{
            position: 'absolute',
            bottom: 0,
            transform: [{ translateX: scrollBarAnim }],
            width: barWidth,
            backgroundColor: COLORS.white,
            height: 4,
            borderRadius: 5,
            zIndex: 2,
            marginLeft: theme.windowMargin,
          }}
        />
      </View>
    </>
  );
};

export default PredictionCarousel;
