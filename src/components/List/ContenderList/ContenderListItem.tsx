/* eslint-disable sonarjs/no-duplicate-string */
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, TouchableHighlight, useWindowDimensions, View } from 'react-native';
import { CategoryName, CategoryType } from '../../../API';
import COLORS from '../../../constants/colors';
import { getPosterDimensionsByWidth } from '../../../constants/posterDimensions';
import theme from '../../../constants/theme';
import { useCategory } from '../../../context/CategoryContext';
import { iPrediction } from '../../../context/PredictionContext';
import { iCachedTmdbMovie, iCachedTmdbPerson } from '../../../services/cache/types';
import TmdbServices from '../../../services/tmdb';
import { iCategory } from '../../../store/types';
import { useAsyncEffect } from '../../../util/hooks';
import CustomIcon from '../../CustomIcon';
import AnimatedPoster from '../../Images/AnimatedPoster';
import { BodyLarge, Label, LabelBold } from '../../Text';

type iContenderListItemProps = {
  tab: 'community' | 'personal';
  prediction: iPrediction;
  ranking: number;
  selected: boolean;
  toggleSelected: (id: string) => void;
  disabled?: boolean;
  posterWidth?: number;
  draggable?: {
    isActive: boolean;
    drag: () => void;
  };
  onPressThumbnail?: (contenderId: string, personTmdbId?: number) => void;
  onPressItem?: (prediction: iPrediction) => void;
};

const TIMING = 250;
const TIMING_FADE = 500;

const ContenderListItem = (props: iContenderListItemProps) => {
  const {
    tab,
    prediction,
    selected,
    toggleSelected,
    ranking,
    disabled,
    draggable,
    onPressThumbnail,
  } = props;
  const { isActive, drag } = draggable || {};
  const navigation = useNavigation();
  const { width: windowWidth } = useWindowDimensions();

  const LARGE_POSTER = windowWidth / 3;
  const SMALL_POSTER = windowWidth / 10;
  const RIGHT_COL_WIDTH = 75;
  const BODY_WIDTH_SELECTED =
    windowWidth - LARGE_POSTER - theme.windowMargin * 2 - RIGHT_COL_WIDTH;
  const BODY_WIDTH_UNSELECTED =
    windowWidth - SMALL_POSTER - theme.windowMargin * 2 - RIGHT_COL_WIDTH;
  const ITEM_WIDTH_SELECTED = RIGHT_COL_WIDTH + BODY_WIDTH_SELECTED;
  const ITEM_WIDTH_UNSELECTED = RIGHT_COL_WIDTH + BODY_WIDTH_UNSELECTED;

  const { category: _category } = useCategory();
  const category = _category as iCategory;

  const imageWidth = useRef(new Animated.Value(selected ? LARGE_POSTER : SMALL_POSTER))
    .current;
  const imageHeight = useRef(new Animated.Value(selected ? LARGE_POSTER : SMALL_POSTER))
    .current;
  const hiddenOpacity = useRef(new Animated.Value(0)).current;
  const itemWidth = useRef(new Animated.Value(ITEM_WIDTH_UNSELECTED)).current;
  const bodyWidth = useRef(new Animated.Value(BODY_WIDTH_UNSELECTED)).current;

  const [tmdbMovie, setTmdbMovie] = useState<iCachedTmdbMovie | undefined>();
  const [tmdbPerson, setTmdbPerson] = useState<iCachedTmdbPerson | undefined>();

  const tmdbMovieId = prediction.contenderMovie?.tmdbId;
  const tmdbPersonId = prediction.contenderPerson?.tmdbId;
  const movieStudio = prediction.contenderMovie?.studio;

  const width = selected ? LARGE_POSTER : SMALL_POSTER;
  const { height } = getPosterDimensionsByWidth(width);

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
    if (!tmdbMovieId) {
      console.error('No tmdbMovieId !!');
      return;
    }
    // get tmdb person info
    if (tmdbPersonId) {
      const { data: personData, status: personStatus } = await TmdbServices.getTmdbPerson(
        tmdbPersonId,
      );
      if (personStatus === 'success') {
        setTmdbPerson(personData);
      }
      const { status, data } = await TmdbServices.getTmdbMovie(tmdbMovieId);
      if (status === 'success') {
        setTmdbMovie(data);
      }
    }
    // get movie tmdb info
    const { data, status } = await TmdbServices.getTmdbMovie(tmdbMovieId);
    if (status === 'success') {
      setTmdbMovie(data);
    }
  }, [tmdbMovieId]);

  const onPress = () => {
    if (disabled) return;
    onPressThumbnail && onPressThumbnail(prediction.contenderId);
  };

  if (!tmdbMovieId) {
    return null;
  }

  let title = '';
  let subtitle = '';
  switch (CategoryType[category.type]) {
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
    tab === 'community' ? prediction.communityRankings : undefined;

  return (
    <TouchableHighlight
      onPress={() => {
        toggleSelected(prediction.contenderId);
      }}
      style={{
        backgroundColor: isActive ? COLORS.goldDark : 'transparent',
        width: '100%',
        paddingTop: theme.windowMargin / 4,
        paddingBottom: theme.windowMargin / 4,
      }}
      underlayColor={COLORS.secondaryDark}
      onLongPress={drag}
      disabled={isActive}
    >
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          marginLeft: theme.windowMargin,
        }}
      >
        <AnimatedPoster
          path={tmdbMovie?.posterPath || null}
          title={tmdbMovie?.title || ''}
          animatedWidth={imageWidth}
          animatedHeight={imageHeight}
          ranking={ranking}
          onPress={onPress}
        />
        <Animated.View
          style={{
            flexDirection: 'column',
            height,
            justifyContent: 'space-between',
            width: itemWidth,
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <Animated.View style={{ width: bodyWidth }}>
              <BodyLarge style={{ marginLeft: 10 }}>{title}</BodyLarge>
              <Label style={{ marginTop: 1, marginLeft: 10 }}>{subtitle}</Label>
              {categoryInfo ? (
                <Label style={{ marginLeft: 10 }}>{categoryInfo.join(', ')}</Label>
              ) : null}
            </Animated.View>
            {communityRankings ? (
              <View
                style={{
                  width: RIGHT_COL_WIDTH,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                <BodyLarge style={{ textAlign: 'right' }}>
                  {communityRankings.predictingWin.toString()}
                </BodyLarge>
                <BodyLarge style={{ textAlign: 'right' }}>
                  {communityRankings.predictingNom.toString()}
                </BodyLarge>
              </View>
            ) : null}
            {tab === 'personal' ? (
              <View style={{ height: '100%', justifyContent: 'center', marginRight: 5 }}>
                <CustomIcon name={'menu'} color={COLORS.white} size={24} />
              </View>
            ) : null}
          </View>
          {selected && tmdbMovie ? (
            <Animated.View
              style={{
                opacity: hiddenOpacity,
                width: '94%',
                marginLeft: theme.windowMargin,
              }}
            >
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: theme.windowMargin,
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
              </View>
            </Animated.View>
          ) : null}
        </Animated.View>
      </View>
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
