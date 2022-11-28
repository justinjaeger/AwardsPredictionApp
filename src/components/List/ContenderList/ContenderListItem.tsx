/* eslint-disable sonarjs/no-duplicate-string */
import MaskedView from '@react-native-masked-view/masked-view';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, TouchableHighlight, useWindowDimensions, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { CategoryName, CategoryType } from '../../../API';
import COLORS from '../../../constants/colors';
import { getPosterDimensionsByWidth } from '../../../constants/posterDimensions';
import theme from '../../../constants/theme';
import { useCategory } from '../../../context/CategoryContext';
import { iCachedTmdbMovie, iCachedTmdbPerson } from '../../../services/cache/types';
import TmdbServices from '../../../services/tmdb';
import { iCategory, iPrediction } from '../../../store/types';
import { getNumPredicting } from '../../../util/getNumPredicting';
import { useAsyncEffect } from '../../../util/hooks';
import CustomIcon from '../../CustomIcon';
import AnimatedPoster from '../../Images/AnimatedPoster';
import { BodyLarge, Label, LabelBold } from '../../Text';

type iContenderListItemProps = {
  variant: 'community' | 'personal' | 'selectable' | 'search';
  prediction: iPrediction;
  categoryType: CategoryType;
  ranking: number;
  selected: boolean;
  disabled?: boolean;
  highlighted?: boolean;
  posterWidth?: number;
  draggable?: {
    isActive: boolean;
    drag: () => void;
  };
  onPressItem: (prediction: iPrediction) => void;
  onPressThumbnail?: (prediction: iPrediction) => void;
};

const TIMING = 250;
const TIMING_FADE = 500;

const ContenderListItem = (props: iContenderListItemProps) => {
  const {
    variant,
    prediction,
    selected,
    ranking,
    disabled,
    draggable,
    highlighted,
    categoryType,
    onPressThumbnail,
    onPressItem,
  } = props;
  const { isActive, drag } = draggable || {};
  const navigation = useNavigation();
  const { width: windowWidth } = useWindowDimensions();

  const LARGE_POSTER = windowWidth / 3;
  const SMALL_POSTER = windowWidth / 10;
  const RIGHT_COL_WIDTH = variant === 'personal' ? 45 : variant === 'community' ? 75 : 10;
  const BODY_WIDTH_SELECTED =
    windowWidth - LARGE_POSTER - theme.windowMargin * 2 - RIGHT_COL_WIDTH;
  const BODY_WIDTH_UNSELECTED =
    windowWidth - SMALL_POSTER - theme.windowMargin * 2 - RIGHT_COL_WIDTH;
  const ITEM_WIDTH_SELECTED = RIGHT_COL_WIDTH + BODY_WIDTH_SELECTED;
  const ITEM_WIDTH_UNSELECTED = RIGHT_COL_WIDTH + BODY_WIDTH_UNSELECTED;

  const { category: _category } = useCategory();
  const category = _category as iCategory;

  const width = selected ? LARGE_POSTER : SMALL_POSTER;
  const { height } = getPosterDimensionsByWidth(width);

  const imageWidth = useRef(new Animated.Value(width)).current;
  const imageHeight = useRef(new Animated.Value(height)).current;
  const hiddenOpacity = useRef(new Animated.Value(0)).current;
  const itemWidth = useRef(new Animated.Value(ITEM_WIDTH_UNSELECTED)).current;
  const bodyWidth = useRef(new Animated.Value(BODY_WIDTH_UNSELECTED)).current;

  const [tmdbMovie, setTmdbMovie] = useState<iCachedTmdbMovie | undefined>();
  const [tmdbPerson, setTmdbPerson] = useState<iCachedTmdbPerson | undefined>();

  const tmdbMovieId = prediction.contenderMovie?.tmdbId;
  const tmdbPersonId = prediction.contenderPerson?.tmdbId;
  const movieStudio = prediction.contenderMovie?.studio;

  useEffect(() => {
    Animated.timing(imageWidth, {
      toValue: width,
      duration: TIMING,
      useNativeDriver: false,
    }).start();
    Animated.timing(imageHeight, {
      toValue: height,
      duration: TIMING,
      useNativeDriver: false,
    }).start();
    Animated.timing(hiddenOpacity, {
      toValue: selected ? 1 : 0,
      duration: TIMING_FADE,
      useNativeDriver: true,
    }).start();
    Animated.timing(bodyWidth, {
      toValue: selected ? BODY_WIDTH_SELECTED : BODY_WIDTH_UNSELECTED,
      duration: TIMING,
      useNativeDriver: false,
    }).start();
    Animated.timing(itemWidth, {
      toValue: selected ? ITEM_WIDTH_SELECTED : ITEM_WIDTH_UNSELECTED,
      duration: TIMING,
      useNativeDriver: false,
    }).start();
  }, [selected]);

  useAsyncEffect(async () => {
    if (tmdbPersonId) {
      // get tmdb person info
      const { data: personData, status: personStatus } = await TmdbServices.getTmdbPerson(
        tmdbPersonId,
      );
      if (personStatus === 'success') {
        setTmdbPerson(personData);
      }
    }
    if (tmdbMovieId) {
      // get movie tmdb info
      const { data, status } = await TmdbServices.getTmdbMovie(tmdbMovieId);
      if (status === 'success') {
        setTmdbMovie(data);
      }
    }
  }, [tmdbMovieId]);

  const onPressPoster = () => {
    if (disabled) return;
    onPressThumbnail && onPressThumbnail(prediction);
  };

  let title = '';
  let subtitle = '';
  switch (categoryType) {
    case CategoryType.FILM:
      title = tmdbMovie?.title || '';
      subtitle = movieStudio || '';
      break;
    case CategoryType.PERFORMANCE:
      if (!tmdbPerson) break;
      title = tmdbPerson?.name || '';
      subtitle = tmdbMovie?.title || '';
      break;
    case CategoryType.SONG:
      title =
        (prediction.contenderSong?.title || '') +
        ', ' +
        (prediction.contenderSong?.artist || '');
      subtitle = tmdbMovie?.title || '';
      break;
  }

  const categoryName = CategoryName[category.name];
  const categoryInfo = tmdbMovie?.categoryInfo?.[categoryName];
  const communityRankings =
    variant === 'community' ? prediction.communityRankings : undefined;

  const fadeBottom = selected !== true && variant === 'search';

  const { win, nom } = getNumPredicting(communityRankings || {});

  const showBotomButtons = selected && tmdbMovie;

  return (
    <TouchableHighlight
      onPress={() => {
        onPressItem(prediction);
      }}
      style={{
        backgroundColor: isActive || highlighted ? COLORS.goldDark : 'transparent',
        width: '100%',
        paddingTop: theme.windowMargin / 4,
        paddingBottom: theme.windowMargin / 4,
        flexDirection: 'row',
        paddingLeft: theme.windowMargin,
      }}
      underlayColor={COLORS.secondaryDark}
      onLongPress={drag}
      disabled={isActive}
    >
      <>
        <AnimatedPoster
          path={
            categoryType === CategoryType.PERFORMANCE
              ? tmdbPerson?.profilePath || null
              : tmdbMovie?.posterPath || null
          }
          title={tmdbMovie?.title || ''}
          animatedWidth={imageWidth}
          animatedHeight={imageHeight}
          ranking={variant !== 'search' ? ranking : undefined}
          onPress={onPressPoster}
        />
        <Animated.View
          style={{
            flexDirection: 'column',
            justifyContent: 'space-between',
            width: itemWidth,
            height: imageHeight,
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
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
                    minHeight: fadeBottom ? undefined : height,
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
                <BodyLarge style={{ marginLeft: 10 }}>{title}</BodyLarge>
                <Label
                  style={{
                    marginTop: 0,
                    marginLeft: 10,
                  }}
                >
                  {subtitle}
                </Label>
                {categoryInfo ? (
                  <Label style={{ marginLeft: 10 }}>{categoryInfo.join(', ')}</Label>
                ) : null}
              </Animated.View>
            </MaskedView>
            {communityRankings ? (
              <View
                style={{
                  width: RIGHT_COL_WIDTH,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingRight: theme.windowMargin,
                }}
              >
                <BodyLarge style={{ textAlign: 'right' }}>{nom.toString()}</BodyLarge>
                <BodyLarge style={{ textAlign: 'right' }}>{win.toString()}</BodyLarge>
              </View>
            ) : null}
            {variant === 'personal' ? (
              <View
                style={{
                  height: SMALL_POSTER,
                  justifyContent: 'center',
                  marginRight: 13,
                }}
              >
                <CustomIcon name={'menu'} color={COLORS.white} size={24} />
              </View>
            ) : null}
          </View>
          {/* TODO: Instead of linking to IMDB, display a bunch of info from TMDB */}
          {showBotomButtons ? (
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
              <ExternalLinkButton
                text={'IMDb'}
                onPress={() => {
                  navigation.navigate('WebView', {
                    uri: `https://www.imdb.com/title/${tmdbMovie.imdbId}/?mode=desktop`,
                    title: tmdbMovie?.title || '',
                  });
                }}
              />
              <ExternalLinkButton
                text={'Cast'}
                onPress={() => {
                  navigation.navigate('WebView', {
                    uri: `https://www.imdb.com/title/${tmdbMovie.imdbId}/fullcredits/cast/`,
                    title: tmdbMovie?.title || '',
                  });
                }}
              />
              <ExternalLinkButton
                text={'Crew'}
                onPress={() => {
                  navigation.navigate('WebView', {
                    uri: `https://www.imdb.com/title/${tmdbMovie.imdbId}/fullcredits/`,
                    title: tmdbMovie?.title || '',
                  });
                }}
              />
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
        padding: 4,
        borderRadius: theme.borderRadius,
        backgroundColor: COLORS.secondary,
        width: 50,
      }}
      underlayColor={COLORS.secondaryDark}
    >
      <LabelBold
        style={{
          fontWeight: '700',
          color: COLORS.white,
        }}
      >
        {text}
      </LabelBold>
    </TouchableHighlight>
  );
};

export default ContenderListItem;
