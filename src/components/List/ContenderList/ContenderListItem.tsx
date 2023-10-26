/* eslint-disable sonarjs/no-duplicate-string */
import MaskedView from '@react-native-masked-view/masked-view';
import React, { memo } from 'react';
import { TouchableHighlight, useWindowDimensions, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import COLORS from '../../../constants/colors';
import {
  getPosterDimensionsByWidth,
  PosterSize,
} from '../../../constants/posterDimensions';
import { useEvent } from '../../../context/EventContext';
import { getTotalNumPredicting } from '../../../util/getNumPredicting';
import { IconButton } from '../../Buttons/IconButton';
import { Body, SubHeader } from '../../Text';
import CustomIcon from '../../CustomIcon';
import { hexToRgb } from '../../../util/hexToRgb';
import { CategoryType, iPrediction } from '../../../types/api';
import { useTmdbDataStore } from '../../../context/TmdbDataStore';
import { categoryNameToTmdbCredit } from '../../../util/categoryNameToTmdbCredit';
import Poster from '../../Images/Poster';
import ListItemSkeleton from '../../Skeletons/ListItemSkeleton';
import theme from '../../../constants/theme';

export type iContenderListItemProps = {
  variant: 'community' | 'personal' | 'selectable' | 'search';
  prediction: iPrediction;
  categoryType: CategoryType;
  ranking: number;
  disabled?: boolean;
  highlighted?: boolean;
  draggable?: {
    isActive: boolean;
    drag: () => void;
  };
  subtitle?: string;
  onPressItem: (prediction: iPrediction) => void;
  onPressThumbnail?: (prediction: iPrediction) => void;
  isAuthProfile?: boolean;
  totalNumPredictingTop?: number; // important when rendering histogram
};

const IMAGE_SIZE = PosterSize.SMALL;

const ContenderListItem = ({
  variant,
  prediction,
  ranking,
  draggable,
  highlighted,
  categoryType,
  subtitle: _subtitle,
  onPressItem,
  isAuthProfile,
  totalNumPredictingTop,
}: iContenderListItemProps) => {
  const { isActive, drag } = draggable || {};
  const { width: windowWidth } = useWindowDimensions();

  const SMALL_POSTER = windowWidth / 10;

  const { category: _category, event: _event } = useEvent();
  const disableEditing = !isAuthProfile;
  const category = _category!;
  const event = _event!;
  const { slots: _slots } = event.categories[category];
  const slots = _slots || 5;

  const { width: posterWidth, height: posterHeight } =
    getPosterDimensionsByWidth(SMALL_POSTER);

  // note: numPredicting is only commnuity
  const { numPredicting } = prediction;

  const { getTmdbDataFromPrediction } = useTmdbDataStore();
  const { movie, person, song } = getTmdbDataFromPrediction(prediction) ?? {};

  const dataHasNotLoaded = !movie && !person && !song;

  const categoryInfo = movie?.categoryCredits
    ? categoryNameToTmdbCredit(category, movie?.categoryCredits)
    : undefined;

  let title = '';
  let subtitle = '';
  switch (categoryType) {
    case CategoryType.FILM:
      title = movie?.title || '';
      subtitle = categoryInfo ? categoryInfo.join(',') : movie?.studio ?? '';
      break;
    case CategoryType.PERFORMANCE:
      if (!person) break;
      title = person?.name || '';
      subtitle = movie?.title || '';
      break;
    case CategoryType.SONG:
      title = song?.title || '';
      subtitle = movie?.title || '';
      break;
  }

  // The bar should be at 100% if everybody is predicting a nomination.
  // So like, every bar is out of 100% of all users
  const totalNumPredicting = getTotalNumPredicting(numPredicting || {});

  const thumbnailContainerWidth = posterWidth * 1.5;
  const thumbnailContainerHeight = posterHeight;
  const barsToShow = slots * 2;

  if (dataHasNotLoaded) {
    return (
      <View style={{ marginLeft: theme.windowMargin / 2 }}>
        <ListItemSkeleton posterWidth={IMAGE_SIZE} />
      </View>
    );
  }

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
        flexDirection: 'row',
        height: posterHeight * 1.2,
      }}
      underlayColor={COLORS.secondaryDark}
      onLongPress={disableEditing ? undefined : drag}
      disabled={isActive}
    >
      <>
        <View
          style={{
            width: thumbnailContainerWidth,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Poster
            path={
              categoryType === CategoryType.PERFORMANCE
                ? person?.posterPath || null
                : movie?.posterPath || null
            }
            title={movie?.title || ''}
            ranking={['selectable', 'search'].includes(variant) ? undefined : ranking}
            onPress={undefined}
            width={IMAGE_SIZE}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            width: windowWidth - thumbnailContainerWidth,
            justifyContent: 'space-between',
            height: thumbnailContainerHeight,
            alignItems: 'flex-start',
          }}
        >
          <View
            style={{
              position: 'absolute',
              flexDirection: 'column',
              paddingLeft: 5,
              zIndex: 2,
              width: '80%',
            }}
          >
            <MaskedView
              maskElement={
                <LinearGradient
                  colors={[
                    'rgba(0,0,0,1)',
                    'rgba(0,0,0,1)',
                    'rgba(0,0,0,1)',
                    'rgba(0,0,0,1)',
                    'transparent',
                  ]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 0, y: 1 }}
                  style={{
                    flex: 1,
                    maxHeight: posterHeight,
                    minHeight: posterHeight,
                    overflow: 'hidden',
                    height: '100%',
                  }}
                />
              }
            >
              <SubHeader>{title}</SubHeader>
              <Body>{subtitle}</Body>
            </MaskedView>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              height: thumbnailContainerHeight * 1.1,
              flex: 1,
              zIndex: 1,
              borderBottomWidth: 1,
              borderBottomColor: hexToRgb(COLORS.secondary, 0.1),
              marginRight: 10,
            }}
          >
            {variant === 'community' || variant === 'selectable'
              ? new Array(barsToShow).fill(null).map((x, i) => {
                  const place = barsToShow - i;
                  const numPredictingPlace = numPredicting?.[place] || 0;
                  const h =
                    posterHeight *
                    ((numPredictingPlace || 1) / (totalNumPredicting || 1)) *
                    (totalNumPredictingTop
                      ? totalNumPredicting / totalNumPredictingTop
                      : 1);
                  return (
                    <View
                      key={i}
                      style={{
                        width: (windowWidth - thumbnailContainerWidth) / barsToShow - 5,
                        height: numPredictingPlace > 0 ? h : 0,
                        backgroundColor:
                          place <= slots ? COLORS.secondaryLight : COLORS.secondaryMiddle,
                      }}
                    />
                  );
                })
              : null}
          </View>
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
          ) : variant === 'selectable' ? (
            <View style={{ top: SMALL_POSTER / 2, marginLeft: 5, marginRight: 5 }}>
              {highlighted ? (
                <CustomIcon
                  name="checkmark-circle-2"
                  size={24}
                  color={COLORS.secondaryLight}
                  styles={{
                    display: highlighted ? 'flex' : 'none',
                  }}
                />
              ) : (
                <View
                  style={{
                    width: 24,
                    height: 24,
                    borderRadius: 24,
                    borderColor: COLORS.secondaryDark,
                    borderWidth: 1,
                  }}
                />
              )}
            </View>
          ) : null}
          {/* TODO: Put this info in its own modal */}
          {/* {showBotomButtons && movie ? (
            <View
              style={{
                position: 'absolute',
                bottom: 0,
                // opacity: hiddenOpacity,
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
            </View>
          ) : null} */}
        </View>
      </>
    </TouchableHighlight>
  );
};

export default memo(ContenderListItem);
