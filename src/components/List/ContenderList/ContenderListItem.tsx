/* eslint-disable sonarjs/no-duplicate-string */
import MaskedView from '@react-native-masked-view/masked-view';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, TouchableHighlight, useWindowDimensions, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
  CategoryIsShortlisted,
  CategoryType,
  ContenderAccolade,
  EventStatus,
  PredictionType,
} from '../../../API';
import { getCategorySlots } from '../../../constants/categories';
import COLORS from '../../../constants/colors';
import { getPosterDimensionsByWidth } from '../../../constants/posterDimensions';
import theme from '../../../constants/theme';
import { useCategory } from '../../../context/CategoryContext';
import { iCachedTmdbMovie, iCachedTmdbPerson } from '../../../services/cache/types';
import TmdbServices from '../../../services/tmdb';
import { iCategory, iEvent, iPrediction } from '../../../types';
import { getNumPredicting } from '../../../util/getNumPredicting';
import { useAsyncEffect } from '../../../util/hooks';
import { IconButton } from '../../Buttons/IconButton';
import AnimatedPoster from '../../Images/AnimatedPoster';
import { Body, SubHeader } from '../../Text';
import AccoladeTag from './AccoladeTag';
import CustomIcon from '../../CustomIcon';
import { hexToRgb } from '../../../util/hexToRgb';
import { MainScreenNavigationProp } from '../../../navigation/types';

export type iContenderListItemProps = {
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
  subtitle?: string;
  onPressItem: (prediction: iPrediction) => void;
  onPressThumbnail?: (prediction: iPrediction) => void;
  isAuthProfile?: boolean;
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
  const BODY_WIDTH_SELECTED =
    windowWidth - LARGE_POSTER - theme.windowMargin * 2 - RIGHT_COL_WIDTH;
  const BODY_WIDTH_UNSELECTED =
    windowWidth - SMALL_POSTER - theme.windowMargin * 2 - RIGHT_COL_WIDTH;
  const ITEM_WIDTH_SELECTED = RIGHT_COL_WIDTH + BODY_WIDTH_SELECTED;
  const ITEM_WIDTH_UNSELECTED = RIGHT_COL_WIDTH + BODY_WIDTH_UNSELECTED;

  const { category: _category, event: _event, date } = useCategory();
  const isHistory = !!date;
  const disableEditing = isHistory || !isAuthProfile;
  const category = _category as iCategory;
  const event = _event as iEvent;

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

  const eventIsArchived = event.status === EventStatus.ARCHIVED;

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

  const categoryName = category.name;
  const catInfo = tmdbMovie?.categoryInfo?.[categoryName];
  const categoryInfo = catInfo ? catInfo?.join(', ') : undefined;
  const indexedRankings =
    variant === 'community' ? prediction.indexedRankings : undefined;

  let title = '';
  let subtitle = '';
  switch (categoryType) {
    case CategoryType.FILM:
      title = tmdbMovie?.title || '';
      subtitle = categoryInfo || movieStudio || '';
      break;
    case CategoryType.PERFORMANCE:
      if (!tmdbPerson) break;
      title = tmdbPerson?.name || '';
      subtitle = tmdbMovie?.title || '';
      break;
    case CategoryType.SONG:
      title = prediction.contenderSong?.title || '';
      subtitle = tmdbMovie?.title || '';
      break;
  }

  const fadeBottom = selected !== true && variant === 'search';

  const { win, nom } = getNumPredicting(
    indexedRankings || {},
    getCategorySlots(event, category.name, prediction.predictionType),
  );

  const showBotomButtons = selected && tmdbMovie;

  const nominationsHaveHappened = prediction.predictionType === PredictionType.WIN;

  const predictionIsNotNominated =
    ['personal', 'selectable'].includes(variant) &&
    nominationsHaveHappened &&
    prediction.accolade !== ContenderAccolade.NOMINEE &&
    prediction.accolade !== ContenderAccolade.WINNER;

  const predictionIsNotShortlisted =
    ['personal', 'selectable'].includes(variant) &&
    category.isShortlisted === CategoryIsShortlisted.TRUE &&
    !prediction.accolade;

  if (!eventIsArchived) {
    if (predictionIsNotNominated) {
      subtitle =
        variant === 'selectable' ? 'Not nominated' : 'Not nominated. Tap +/- to remove';
    } else if (predictionIsNotShortlisted) {
      subtitle =
        variant === 'selectable'
          ? 'Not shortlisted'
          : 'Not shortlisted. Tap +/- to remove';
    }
  }

  const isUnqualified =
    !eventIsArchived && (predictionIsNotNominated || predictionIsNotShortlisted);

  return (
    <TouchableHighlight
      onPress={() => {
        onPressItem(prediction);
      }}
      style={{
        backgroundColor:
          isUnqualified && (variant !== 'selectable' || highlighted) // if variant IS selectable (false), must be selected
            ? COLORS.error
            : isActive
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
              ? tmdbPerson?.profilePath || null
              : tmdbMovie?.posterPath || null
          }
          title={tmdbMovie?.title || ''}
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
                  {isHistory && prediction.accolade ? (
                    <AccoladeTag
                      accolade={prediction.accolade}
                      type={prediction.predictionType}
                    />
                  ) : null}
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
            {indexedRankings ? (
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
          {showBotomButtons && tmdbMovie ? (
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
                text={'More Info'}
                onPress={() => {
                  navigation.navigate('WebView', {
                    uri: `https://www.themoviedb.org/movie/${tmdbMovieId}/`,
                    title: tmdbMovie?.title || '',
                  });
                }}
              />
              <ExternalLinkButton
                text={'Cast'}
                onPress={() => {
                  navigation.navigate('WebView', {
                    uri: `https://www.themoviedb.org/movie/${tmdbMovieId}/cast/`,
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
