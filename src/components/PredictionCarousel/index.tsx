import React, { useEffect, useRef, useState } from 'react';
import { Animated, ScrollView, useWindowDimensions, View } from 'react-native';
import COLORS from '../../constants/colors';
import theme from '../../constants/theme';
import { iPredictionSet } from '../../types';
import { useNavigateAwayEffect } from '../../util/hooks';
import ProfilePredictionsList from '../UserPredictionList';
import CarouselArrow from './CarouselArrow';

const PredictionCarousel = ({
  predictionSets,
  userId,
}: {
  predictionSets: iPredictionSet[];
  userId: string;
}) => {
  const { width } = useWindowDimensions();

  const [currentPage, setCurrentPage] = useState<number>(0);
  const [disableManualScroll, setDisableManualScroll] = useState<boolean>(false);
  const scrollBarAnim = useRef(new Animated.Value(0)).current;

  const scrollRef = useRef<ScrollView>(null);

  const totalBarWidth = width - theme.windowMargin * 2;
  const barWidth = totalBarWidth / predictionSets.length;

  const isFinalPage = currentPage === predictionSets.length - 1;

  useEffect(() => {
    Animated.timing(scrollBarAnim, {
      toValue: currentPage * barWidth,
      duration: 250,
      useNativeDriver: true,
    }).start();
  }, [currentPage]);

  // Responsible for auto-animating the carousel
  const [interval, _setInterval] = useState<NodeJS.Timeout>();
  const terminateInterval = () => {
    if (interval) clearInterval(interval);
  };
  // NOTE: it doesn't reset when using tab navigation, but who knows if I'll keep the tabs anway, and for other users' profiles it won't use tab
  useEffect(() => {
    terminateInterval();
    const timer = setInterval(() => {
      scrollForward();
    }, 5000);
    _setInterval(timer);
  }, []);
  useNavigateAwayEffect(() => {
    // use this specifically because if profile is in a tab, the interval will never terminate / unmount
    terminateInterval();
    setCurrentPage(0);
    scrollRef.current?.scrollTo({ x: 0, animated: false });
  }, []);

  // lets us tap through the carousel faster; onMomentumScrollEnd doesn't fire in between taps
  const tempDisableManualScroll = () => {
    setDisableManualScroll(true);
    setTimeout(() => {
      setDisableManualScroll(false);
    }, 500);
  };

  const scrollForward = () => {
    scrollRef.current?.scrollTo({ x: width * currentPage + width, animated: true });
    // has to be written like this because the interval callback will use stale values for currentPage otherwise
    setCurrentPage((cp) => {
      if (cp >= predictionSets.length - 1) {
        scrollRef.current?.scrollTo({ x: 0, animated: true });
        return 0;
      }
      scrollRef.current?.scrollTo({ x: width * cp + width, animated: true });
      return cp + 1;
    });
  };

  const onPressForward = () => {
    terminateInterval();
    scrollForward();
    tempDisableManualScroll();
  };

  const onPressBack = () => {
    terminateInterval();
    setCurrentPage((cp) => {
      if (cp <= 0) {
        const newPage = predictionSets.length - 1;
        scrollRef.current?.scrollTo({ x: width * newPage, animated: true });
        return newPage;
      }
      scrollRef.current?.scrollTo({ x: width * currentPage - width, animated: true });
      return cp - 1;
    });
    tempDisableManualScroll();
  };

  return (
    <View
      style={{
        width: '100%',
        height: width * 0.8, // height of the box is proportionate to width
        backgroundColor: 'rgba(0,0,0,0.2)',
        borderWidth: 0.5,
        borderColor: 'rgba(255,255,255,0.3)',
        borderRadius: theme.borderRadius,
        paddingTop: 20,
        paddingBottom: 20,
      }}
    >
      <CarouselArrow
        direction={'back'}
        onPress={onPressBack}
        isDisabled={currentPage === 0}
      />
      <CarouselArrow
        direction={'forward'}
        onPress={onPressForward}
        isDisabled={isFinalPage}
      />
      <ScrollView
        horizontal
        pagingEnabled
        style={{ width: '100%', flex: 1 }}
        ref={scrollRef}
        onScrollBeginDrag={() => {
          // only fires when user manually scrolls, NOT when carousel automatically animates
          terminateInterval();
        }}
        showsHorizontalScrollIndicator={false}
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
          const newXPos = Math.ceil(offset);
          if (newXPos > currentPage && isFinalPage) return;
          setCurrentPage(newXPos);
        }}
      >
        <ProfilePredictionsList
          predictionSets={predictionSets}
          fixedSlots={10}
          userId={userId}
        />
      </ScrollView>
      {/* SCROLL BAR */}
      <Animated.View
        style={{
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
  );
};

export default PredictionCarousel;
