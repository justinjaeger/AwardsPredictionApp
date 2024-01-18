import { StackActions, useNavigation } from '@react-navigation/native';
import { Divider } from '@ui-kitten/components';
import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  ScrollView,
  StyleProp,
  TouchableOpacity,
  useWindowDimensions,
  View,
  ViewStyle,
} from 'react-native';
import COLORS from '../../constants/colors';
import { getPosterDimensionsByWidth } from '../../constants/posterDimensions';
import theme from '../../constants/theme';
import useDevice from '../../util/device';
import { hexToRgb } from '../../util/hexToRgb';
import ProfileImage from '../ProfileImage';
import { SubHeader } from '../Text';
import UserPredictionList from '../UserPredictionList';
import CarouselArrow from './CarouselArrow';
import { iRecentPrediction } from '../../types/api';
import { PredictionsNavigationProp, iUserInfo } from '../../navigation/types';

const PredictionCarousel = ({
  predictionSets,
  userInfo,
  hideUserInfo,
  enableArrows,
  style,
}: {
  predictionSets: iRecentPrediction[];
  userInfo: iUserInfo | undefined;
  hideUserInfo?: boolean;
  enableArrows?: boolean;
  style?: StyleProp<ViewStyle>;
}) => {
  const { width } = useWindowDimensions();
  const navigation = useNavigation<PredictionsNavigationProp>();
  const { isPad } = useDevice();

  const [currentPage, setCurrentPage] = useState<number>(0);
  const [disableManualScroll, setDisableManualScroll] = useState<boolean>(false);
  const scrollBarAnim = useRef(new Animated.Value(0)).current;
  const scrollRef = useRef<ScrollView>(null);
  const totalBarWidth = width - theme.windowMargin * 2;
  const barWidth = totalBarWidth / (predictionSets.length || 1);
  const isFinalPage = currentPage === predictionSets.length - 1;

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
    scrollForward();
    tempDisableManualScroll();
  };
  const onPressBack = () => {
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

  if (predictionSets.length === 0) {
    return null;
  }

  return (
    <View
      style={{
        borderWidth: 1,
        borderColor: hexToRgb(COLORS.white, 0.2),
        backgroundColor: hexToRgb(COLORS.white, 0.02),
        borderRadius: theme.borderRadius,
        marginTop: 10,
        marginBottom: 10,
      }}
    >
      {!hideUserInfo ? (
        <TouchableOpacity
          style={{
            alignSelf: 'flex-start',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',
            marginTop: 10,
            marginLeft: theme.windowMargin,
            marginRight: theme.windowMargin,
            marginBottom: 10,
            borderRadius: theme.borderRadius,
          }}
          onPress={() => {
            navigation.dispatch(StackActions.push('Profile', { userInfo }));
          }}
        >
          <>
            <ProfileImage
              image={userInfo?.userImage}
              imageSize={40}
              style={{ marginRight: 15 }}
              isDisabled
            />
            <SubHeader>{userInfo?.userName ?? ''}</SubHeader>
          </>
        </TouchableOpacity>
      ) : null}
      <View
        style={[
          {
            width: '100%',
            borderRadius: theme.windowMargin, // basically acts as a marginLeft and marginRight to top/bottom borders
            borderLeftWidth: 0,
            borderRightWidth: 0,
            paddingBottom: 10,
            height:
              getPosterDimensionsByWidth(
                (width - theme.posterMargin * (5 - 1) - theme.windowMargin) / 5,
              ).height + (isPad ? 100 : 70), // messy, but prevents a bug. has to be a factor of width since poster height is
          },
          style,
        ]}
      >
        {isPad || enableArrows ? (
          <>
            <CarouselArrow direction={'back'} onPress={onPressBack} />
            <CarouselArrow direction={'forward'} onPress={onPressForward} />
          </>
        ) : null}
        <ScrollView
          horizontal
          pagingEnabled
          style={{ width: '100%', flex: 1 }}
          ref={scrollRef}
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
          <UserPredictionList predictionSets={predictionSets} userInfo={userInfo} />
        </ScrollView>
        {/* SCROLL BAR */}
        <Animated.View
          style={{
            transform: [{ translateX: scrollBarAnim }],
            width: barWidth,
            backgroundColor: hexToRgb(COLORS.white, 0.8),
            height: 2,
            borderRadius: 5,
            zIndex: 2,
            marginLeft: theme.windowMargin,
          }}
        />
        <Divider
          style={{
            width: '92%',
            alignSelf: 'center',
            opacity: 0.2,
            marginTop: -2,
          }}
        />
      </View>
    </View>
  );
};

export default PredictionCarousel;
