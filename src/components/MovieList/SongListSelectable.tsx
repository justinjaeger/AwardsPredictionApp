import React, { useEffect, useState } from 'react';
import { FlatList, Keyboard } from 'react-native';
import ContenderListItem from '../List/ContenderList/ContenderListItem';
import { CategoryType, iPrediction } from '../../types/api';
import { useTmdbDataStore } from '../../context/TmdbDataStore';

type iSongListSearchProps = {
  predictions: iPrediction[];
  disablePaddingBottom?: boolean;
  onSelect: (tmdbId: number, songTitle: string) => void;
};

const SongListSelectable = ({
  predictions,
  disablePaddingBottom,
  onSelect,
}: iSongListSearchProps) => {
  const { getTmdbDataFromPrediction } = useTmdbDataStore();

  const [selectedSong, setSelectedSong] = useState<
    { tmdbId: number; songTitle: string } | undefined
  >(undefined);

  // reset whenever list data changes
  useEffect(() => {
    setSelectedSong(undefined);
  }, [predictions.length]);

  return (
    <FlatList
      data={predictions}
      keyExtractor={(item) => item.contenderId}
      style={{ width: '100%' }}
      onScroll={() => {
        Keyboard.dismiss();
      }}
      keyboardShouldPersistTaps={'always'}
      contentContainerStyle={{ paddingBottom: disablePaddingBottom ? 0 : 200 }}
      renderItem={({ item: prediction, index: i }) => {
        const { movie, song } = getTmdbDataFromPrediction(prediction)!;
        const movieTmdbId = movie.tmdbId;
        const songTitle = song?.title;
        const selected =
          movieTmdbId === selectedSong?.tmdbId && songTitle === selectedSong?.songTitle;
        const onPressItem = () => {
          Keyboard.dismiss();
          const tmdbId = movie.tmdbId;
          const songTitle = song?.title;
          if (!songTitle) return;
          if (tmdbId === selectedSong?.tmdbId && songTitle === selectedSong?.songTitle) {
            setSelectedSong(undefined);
          } else {
            setSelectedSong({ tmdbId, songTitle });
          }
          onSelect(tmdbId, songTitle);
        };
        return (
          <ContenderListItem
            prediction={prediction}
            ranking={i + 1}
            onPressItem={onPressItem}
            onPressThumbnail={onPressItem}
            highlighted={selected}
            variant={'search'}
            categoryType={CategoryType.SONG}
          />
        );
      }}
    />
  );
};

export default SongListSelectable;
