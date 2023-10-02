/* eslint-disable sonarjs/no-duplicate-string */
import MaskedView from '@react-native-masked-view/masked-view';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Animated, TouchableHighlight, useWindowDimensions, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import COLORS from '../../../constants/colors';
import { getPosterDimensionsByWidth } from '../../../constants/posterDimensions';
import theme from '../../../constants/theme';
import { useEvent } from '../../../context/EventContext';
import { getNumPredicting } from '../../../util/getNumPredicting';
import { IconButton } from '../../Buttons/IconButton';
import AnimatedPoster from '../../Images/AnimatedPoster';
import { Body, SubHeader } from '../../Text';
import CustomIcon from '../../CustomIcon';
import { hexToRgb } from '../../../util/hexToRgb';
import { MainScreenNavigationProp } from '../../../navigation/types';
import useListItemAnimation from './useListItemAnimation';
import { CategoryName, CategoryType, EventStatus, iPrediction } from '../../../types/api';
import { useTmdbDataStore } from '../../../context/TmdbDataStore';
import { categoryNameToTmdbCredit } from '../../../util/categoryNameToTmdbCredit';

export type iContenderListItemProps = {
  variant: 'community' | 'personal' | 'selectable' | 'search';
  prediction: iPrediction;
  categoryType: CategoryType;
  ranking: number;
  isSelected: boolean;
  disabled?: boolean;
  highlighted?: boolean;
  posterWidth?: number;
  draggable?: {
    isActive: boolean;
    drag: () => void;
  };
  subtitle?: string;
  onPressItem: (prediction: iPrediction) => void;
  onPressThumbnail?: (prediction: iPrediction) => void;
  isAuthProfile?: boolean;
};

const ContenderListItem = (props: iContenderListItemProps) => {
  const {
    variant,
    prediction,
    isSelected,
    ranking,
    disabled,
    draggable,
    highlighted,
    categoryType,
    subtitle: _subtitle,
    onPressThumbnail,
    onPressItem,
    isAuthProfile,
  } = props;
  const { isActive, drag } = draggable || {};
  const navigation = useNavigation<MainScreenNavigationProp>();
  const { width: windowWidth } = useWindowDimensions();

  const LARGE_POSTER = windowWidth / 3;
  const SMALL_POSTER = windowWidth / 10;
  const RIGHT_COL_WIDTH =
    variant === 'personal' ? 45 : variant === 'community' ? 100 : 10;

  const { category: _category, event: _event } = useEvent();
  const disableEditing = !isAuthProfile;
  const category = _category!;
  const event = _event!;
  const { name, slots: _slots } = event.categories[category];
  const slots = _slots || 5;
  const categoryName = name as CategoryName;

  const width = isSelected ? LARGE_POSTER : SMALL_POSTER;
  const { height } = getPosterDimensionsByWidth(width);

  const { imageWidth, imageHeight, hiddenOpacity, bodyWidth } = useListItemAnimation(
    isSelected,
    RIGHT_COL_WIDTH,
    width,
    height,
    LARGE_POSTER,
    SMALL_POSTER,
    windowWidth,
  );

  // note: numPredicting is only commnuity
  const { numPredicting } = prediction;

  const { getTmdbDataFromPrediction } = useTmdbDataStore();
  const { movie, person, song } = getTmdbDataFromPrediction(prediction)!;

  const { status, nomDateTime } = event;
  const nominationsHaveHappened =
    (nomDateTime && nomDateTime < new Date()) || status === EventStatus.WINS_LIVE;

  const onPressPoster = () => {
    if (disabled) return;
    onPressThumbnail && onPressThumbnail(prediction);
  };

  const categoryInfo = categoryNameToTmdbCredit(categoryName, movie.categoryCredits);

  const showBotomButtons = isSelected && movie;

  const fadeBottom = isSelected !== true && variant === 'search';

  let title = '';
  let subtitle = '';
  switch (categoryType) {
    case CategoryType.FILM:
      title = movie?.title || '';
      subtitle = categoryInfo ? categoryInfo.join(',') : movie.studio || '';
      break;
    case CategoryType.PERFORMANCE:
      if (!person) break;
      title = person?.name || '';
      subtitle = movie?.title || '';
      break;
    case CategoryType.SONG:
      title = song?.title || '';
      subtitle = song?.title || '';
      break;
  }

  const { win, nom } = getNumPredicting(numPredicting || {}, slots);

  return (
    <TouchableHighlight
      onPress={() => {
        onPressItem(prediction);
      }}
      style={{
        backgroundColor: isActive
          ? COLORS.secondaryDark
          : highlighted
          ? hexToRgb(COLORS.secondaryLight, 0.15)
          : 'transparent',
        width: '100%',
        paddingTop: theme.windowMargin / 8,
        paddingBottom: theme.windowMargin / 8,
        flexDirection: 'row',
        paddingLeft: theme.windowMargin,
      }}
      underlayColor={COLORS.secondaryDark}
      onLongPress={disableEditing ? undefined : drag}
      disabled={isActive}
    >
      <>
        <AnimatedPoster
          path={
            categoryType === CategoryType.PERFORMANCE
              ? person?.posterPath || null
              : movie?.posterPath || null
          }
          title={movie?.title || ''}
          animatedWidth={imageWidth}
          animatedHeight={imageHeight}
          ranking={['selectable', 'search'].includes(variant) ? undefined : ranking}
          onPress={onPressPoster}
        />
        <Animated.View
          style={{
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: imageHeight,
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              height: '100%',
            }}
          >
            <MaskedView
              maskElement={
                <LinearGradient
                  colors={[
                    'rgba(0,0,0,1)',
                    'rgba(0,0,0,1)',
                    'rgba(0,0,0,1)',
                    fadeBottom ? 'rgba(0,0,0,0.1)' : 'rgba(0,0,0,1)',
                    fadeBottom ? 'transparent' : 'rgba(0,0,0,1)',
                  ]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 0, y: 1 }}
                  style={{
                    flex: 1,
                    maxHeight: fadeBottom ? height + 15 : height,
                    minHeight: height,
                    overflow: 'hidden',
                    height: '100%',
                  }}
                />
              }
            >
              <Animated.View
                style={{
                  width: bodyWidth,
                  paddingBottom: showBotomButtons ? 70 : 0, // For not conflicting with the bottom buttons
                }}
              >
                <View style={{ flexDirection: 'row' }}>
                  <SubHeader style={{ marginLeft: 10, marginRight: 5 }}>
                    {title}
                  </SubHeader>
                </View>
                <Body
                  style={{
                    marginTop: 0,
                    marginLeft: 10,
                  }}
                >
                  {_subtitle || subtitle}
                </Body>
              </Animated.View>
            </MaskedView>
            {numPredicting ? (
              <View
                style={{
                  width: RIGHT_COL_WIDTH,
                  flexDirection: 'row',
                  paddingRight: theme.windowMargin,
                }}
              >
                {nominationsHaveHappened ? (
                  <View />
                ) : (
                  <View style={{ width: RIGHT_COL_WIDTH / 2 }}>
                    <Body
                      style={{
                        textAlign: 'right',
                        marginRight: 10,
                      }}
                    >
                      {nom.toString()}
                    </Body>
                  </View>
                )}
                <Body style={{ textAlign: 'right', width: RIGHT_COL_WIDTH / 2 }}>
                  {win.toString()}
                </Body>
              </View>
            ) : null}
            {variant === 'personal' && !disableEditing ? (
              <IconButton
                iconProps={{ name: 'menu', size: 24 }}
                color={COLORS.white}
                enableOnPressIn
                onPress={drag || (() => {})}
                styles={{
                  height: SMALL_POSTER,
                  width: 40,
                  justifyContent: 'center',
                  marginRight: 13,
                  alignSelf: 'center',
                  alignItems: 'center',
                }}
              />
            ) : highlighted ? (
              <View style={{ justifyContent: 'center' }}>
                <CustomIcon
                  name="checkmark-circle-2"
                  size={24}
                  color={COLORS.secondary}
                  styles={{ right: 15 }}
                />
              </View>
            ) : null}
          </View>
          {/* TODO: Instead of linking to IMDB, display a bunch of info from TMDB */}
          {showBotomButtons && movie ? (
            <Animated.View
              style={{
                position: 'absolute',
                bottom: 0,
                opacity: hiddenOpacity,
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: theme.windowMargin,
                width: '94%',
                marginLeft: theme.windowMargin,
              }}
            >
              {person ? (
                <>
                  <ExternalLinkButton
                    text={'More Info'}
                    onPress={() => {
                      navigation.navigate('WebView', {
                        uri: `https://www.themoviedb.org/person/${person.tmdbId}/`,
                        title: person.name || '',
                      });
                    }}
                  />
                  <ExternalLinkButton
                    text={'Film'}
                    onPress={() => {
                      navigation.navigate('WebView', {
                        uri: `https://www.themoviedb.org/movie/${movie.tmdbId}/`,
                        title: movie?.title || '',
                      });
                    }}
                  />
                </>
              ) : (
                <>
                  <ExternalLinkButton
                    text={'More Info'}
                    // eslint-disable-next-line sonarjs/no-identical-functions
                    onPress={() => {
                      navigation.navigate('WebView', {
                        uri: `https://www.themoviedb.org/movie/${movie.tmdbId}/`,
                        title: movie?.title || '',
                      });
                    }}
                  />
                  <ExternalLinkButton
                    text={'Cast'}
                    onPress={() => {
                      navigation.navigate('WebView', {
                        uri: `https://www.themoviedb.org/movie/${movie.tmdbId}/cast/`,
                        title: movie?.title || '',
                      });
                    }}
                  />
                </>
              )}
            </Animated.View>
          ) : null}
        </Animated.View>
      </>
    </TouchableHighlight>
  );
};

const ExternalLinkButton = (props: { text: string; onPress: () => void }) => {
  const { text, onPress } = props;
  return (
    <TouchableHighlight
      onPress={onPress}
      style={{
        alignItems: 'center',
        padding: 5,
        paddingHorizontal: 10,
        borderRadius: theme.borderRadius,
        backgroundColor: COLORS.secondary,
      }}
      underlayColor={COLORS.secondaryDark}
    >
      <Body
        style={{
          fontWeight: '700',
          color: COLORS.white,
        }}
      >
        {text}
      </Body>
    </TouchableHighlight>
  );
};

export default ContenderListItem;
