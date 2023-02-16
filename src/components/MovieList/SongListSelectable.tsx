import React, { useEffect, useState } from 'react';
import { FlatList, Keyboard } from 'react-native';
import { CategoryType } from '../../API';
import { iPrediction } from '../../types';
import ContenderListItem from '../List/ContenderList/ContenderListItem';

type iSongListSearchProps = {
  predictions: iPrediction[];
  disablePaddingBottom?: boolean;
  onSelect: (tmdbId: number, songTitle: string) => void;
};

const SongListSelectable = (props: iSongListSearchProps) => {
  const { predictions, disablePaddingBottom, onSelect } = props;

  const [selectedSong, setSelectedSong] = useState<
    { tmdbId: number; songTitle: string } | undefined
  >(undefined);

  // reset whenever list data changes
  useEffect(() => {
    setSelectedSong(undefined);
  }, [predictions.length]);

  const onPressItem = (prediction: iPrediction) => {
    Keyboard.dismiss();
    const tmdbId = prediction.contenderMovie?.tmdbId;
    const songTitle = prediction.contenderSong?.title;
    if (!tmdbId || !songTitle) return;
    if (tmdbId === undefined) return;
    if (tmdbId === selectedSong?.tmdbId && songTitle === selectedSong?.songTitle) {
      setSelectedSong(undefined);
    } else {
      setSelectedSong({ tmdbId, songTitle });
    }
    onSelect(tmdbId, songTitle);
  };

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
        const tmdbId = prediction.contenderMovie?.tmdbId;
        const songTitle = prediction.contenderSong?.title;
        const selected =
          tmdbId === selectedSong?.tmdbId && songTitle === selectedSong?.songTitle;
        return (
          <ContenderListItem
            prediction={prediction}
            ranking={i + 1}
            onPressItem={onPressItem}
            onPressThumbnail={onPressItem}
            selected={false}
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
