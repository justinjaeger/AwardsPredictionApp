/* eslint-disable sonarjs/no-duplicate-string */
import React from 'react';
import { TouchableHighlight, useWindowDimensions, View } from 'react-native';
import { iSearchData } from '../../services/tmdb';
import { getPosterDimensionsByWidth, PosterSize } from '../../constants/posterDimensions';
import COLORS from '../../constants/colors';
import { hexToRgb } from '../../util/hexToRgb';
import Poster from '../Images/Poster';
import { Body, SubHeader } from '../Text';
import ExternalLinkButton from '../ExternalLinkButton';
import theme from '../../constants/theme';
import { CategoryType } from '../../types/api';
import { useNavigation } from '@react-navigation/native';
import { MainScreenNavigationProp } from '../../navigation/types';
import { truncateText } from '../../util/truncateText';

export type iSearchListItemProps = {
  isSelected: boolean;
  item: iSearchData;
  type: CategoryType;
  ranking: number;
  disabled?: boolean;
  subtitle?: string;
  onPressItem: (prediction: iSearchData) => void;
  onPressThumbnail?: (prediction: iSearchData) => void;
  isAuthProfile?: boolean;
  totalNumPredictingTop?: number;
};

const IMAGE_SIZE = PosterSize.MEDIUM;

const ContenderListItem = ({
  item,
  isSelected,
  subtitle: _subtitle,
  onPressItem,
  type,
}: iSearchListItemProps) => {
  const { width: windowWidth } = useWindowDimensions();
  const navigation = useNavigation<MainScreenNavigationProp>();

  const { width: posterWidth, height: posterHeight } =
    getPosterDimensionsByWidth(IMAGE_SIZE);

  return (
    <TouchableHighlight
      onPress={() => {
        onPressItem(item);
      }}
      style={{
        backgroundColor: isSelected ? COLORS.secondaryDark : 'transparent',
        flexDirection: 'row',
        height: posterHeight,
        borderBottomWidth: 1,
        borderBottomColor: hexToRgb(COLORS.white, 0.2),
      }}
      underlayColor={COLORS.secondaryDark}
    >
      <>
        <View
          style={{
            width: posterWidth,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Poster
            path={item.image}
            title={item.title}
            onPress={undefined}
            width={IMAGE_SIZE}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            width: windowWidth - posterWidth,
            justifyContent: 'space-between',
            height: posterHeight,
            alignItems: 'flex-start',
            marginLeft: 10,
          }}
        >
          <View
            style={{
              position: 'absolute',
              flexDirection: 'column',
              zIndex: 2,
              width: '90%',
              marginTop: 2,
            }}
          >
            <SubHeader>{item.title}</SubHeader>
            <Body>{truncateText(item.description ?? '', posterHeight * 1)}</Body>
          </View>
          {/* TODO: Put this info in its own modal */}
          <View
            style={{
              position: 'absolute',
              bottom: 0,
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: theme.windowMargin,
              width: '90%',
              marginBottom: 10,
            }}
          >
            {type === CategoryType.PERFORMANCE ? (
              <>
                <ExternalLinkButton
                  text={'More Info'}
                  onPress={() => {
                    navigation.navigate('WebView', {
                      uri: `https://www.themoviedb.org/person/${item.tmdbId}/`,
                      title: item.name || '',
                    });
                  }}
                />
                <ExternalLinkButton
                  text={'Film'}
                  onPress={() => {
                    navigation.navigate('WebView', {
                      uri: `https://www.themoviedb.org/movie/${item.tmdbId}/`,
                      title: item?.title || '',
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
                      uri: `https://www.themoviedb.org/movie/${item.tmdbId}/`,
                      title: item?.title || '',
                    });
                  }}
                />
                <ExternalLinkButton
                  text={'Cast'}
                  onPress={() => {
                    navigation.navigate('WebView', {
                      uri: `https://www.themoviedb.org/movie/${item.tmdbId}/cast/`,
                      title: item?.title || '',
                    });
                  }}
                />
              </>
            )}
          </View>
        </View>
      </>
    </TouchableHighlight>
  );
};

export default ContenderListItem;
