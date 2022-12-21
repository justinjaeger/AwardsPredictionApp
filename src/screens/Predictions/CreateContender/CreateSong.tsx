import React, { useEffect, useState } from 'react';
import SearchInput from '../../../components/Inputs/SearchInput';
import TmdbServices from '../../../services/tmdb';
import { iSearchData } from '../../../services/tmdb/search';
import { Body } from '../../../components/Text';
import { useWindowDimensions, View } from 'react-native';
import { useCategory } from '../../../context/CategoryContext';
import { iCategory, iEvent, iPrediction } from '../../../types';
import COLORS from '../../../constants/colors';
import MovieListSearch from '../../../components/MovieList/MovieListSearch';
import LoadingStatueModal from '../../../components/LoadingStatueModal';
import useQueryCommunityEvent from '../../../hooks/queries/getCommunityEvent';
import { FAB } from '../../../components/Buttons/FAB';
import { CategoryType, ContenderVisibility } from '../../../API';
import BasicModal from '../../../components/BasicModal';
import useMutationCreateSongContender from '../../../hooks/mutations/createSongContender';
import { compareSongKeys, getSongKey } from '../../../util/songKeys';
import FormInput from '../../../components/Inputs/FormInput';
import { iCreateContenderProps } from '.';
import { CategoryHeader } from '../styles';
import HeaderButton from '../../../components/HeaderButton';
import { SubmitButton } from '../../../components/Buttons';
import SongListSelectable from '../../../components/MovieList/SongListSelectable';

// TODO: should only be able to do this if logged in
const CreateSong = (props: iCreateContenderProps) => {
  const { onSelectPrediction, onClose } = props;
  const { width } = useWindowDimensions();

  const { category: _category, event: _event } = useCategory();

  const category = _category as iCategory;
  const event = _event as iEvent;

  // when adding a contender to the list of overall contenders
  const { mutate, isComplete } = useMutationCreateSongContender();

  const { data: communityData } = useQueryCommunityEvent(event);
  const communityPredictions = communityData ? communityData[category.id] || [] : [];

  const [movieSearchResults, setMovieSearchResults] = useState<iSearchData>([]);
  const [searchMessage, setSearchMessage] = useState<string>('');
  const [selectedMovieTmdbId, setSelectedMovieTmdbId] = useState<number | undefined>();
  const [resetSearchHack, setResetSearchHack] = useState<boolean>(false);
  const [showSongModal, setShowSongModal] = useState<boolean>(false);
  const [modalState, setModalState] = useState<'select' | 'create'>('select');
  const [songTitle, setSongTitle] = useState<string>('');
  const [artist, setArtist] = useState<string>('');

  const minReleaseYear = event.year - 1;

  const resetSearch = () => {
    setSelectedMovieTmdbId(undefined);
    setMovieSearchResults([]);
    setSearchMessage('');
    setResetSearchHack(!resetSearchHack); // resets searchbar
    setShowSongModal(false);
  };

  const getSongPrediction = (tmdbId: number, title: string) => {
    return communityPredictions.find((p) => {
      const storedSongKey = getSongKey(p.contenderSong?.title || '', tmdbId);
      const newSongKey = getSongKey(title, tmdbId);
      return compareSongKeys(storedSongKey, newSongKey);
    });
  };

  useEffect(() => {
    if (isComplete && selectedMovieTmdbId) {
      const newPrediction = getSongPrediction(selectedMovieTmdbId, songTitle);
      if (newPrediction) {
        onSelectPrediction(newPrediction);
        resetSearch();
      }
    }
  }, [isComplete]);

  const handleSearch = (s: string) => {
    if (s === '') {
      resetSearch();
      return;
    }
    TmdbServices.searchMovies(s, minReleaseYear).then((res) => {
      setSelectedMovieTmdbId(undefined);
      const r = res.data || [];
      setMovieSearchResults(r);
      if (r.length === 0) {
        setSearchMessage('No Results');
      }
    });
  };

  const onSelectMovie = async () => {
    if (!selectedMovieTmdbId) return;
    // get songs associated with movie
    // if songs associated, show modal to select song
    // if no songs associated, show modal to create song
    const songs = communityPredictions.filter(
      (p) => p.contenderMovie?.tmdbId === selectedMovieTmdbId,
    );
    setModalState(songs.length === 0 ? 'create' : 'select');
    setShowSongModal(true);
  };

  const onConfirmContender = async () => {
    if (!selectedMovieTmdbId) return;
    // can check that selectedTmdbId is not already associated with a contender in our category list
    const maybeAlreadyExistingPrediction = getSongPrediction(
      selectedMovieTmdbId,
      songTitle,
    );
    if (maybeAlreadyExistingPrediction) {
      // this song has already been added to community predictions
      onSelectPrediction(maybeAlreadyExistingPrediction);
      return;
    }
    await mutate({
      eventId: event.id,
      categoryId: category.id,
      movieTmdbId: selectedMovieTmdbId,
      artist: artist,
      title: songTitle,
    });
  };

  // these are sort of "fake" values
  const movieData: iPrediction[] = movieSearchResults.map((m) => ({
    ranking: 0,
    visibility: ContenderVisibility.VISIBLE,
    contenderId: m.tmdbId.toString(),
    contenderMovie: {
      id: m.tmdbId.toString(),
      tmdbId: m.tmdbId,
    },
  }));

  return (
    <>
      <LoadingStatueModal visible={!isComplete} text={'Saving song...'} />
      <CategoryHeader>
        <SearchInput
          resetSearchHack={resetSearchHack}
          placeholder={'Search By Movie Title'}
          handleSearch={(s: string) => handleSearch(s)}
          style={{ width: width * 0.8 }}
        />
        <View style={{ flexDirection: 'row' }}>
          <HeaderButton onPress={onClose} icon={'close'} />
        </View>
      </CategoryHeader>
      <View
        style={{
          height: '100%',
          width: '100%',
          alignItems: 'center',
          flex: 1,
        }}
      >
        <View style={{ width: '100%', alignItems: 'center', height: '100%' }}>
          {movieData.length === 0 ? (
            <Body style={{ marginTop: 40, color: COLORS.white }}>{searchMessage}</Body>
          ) : null}
          <View
            style={{
              height: '100%',
              width: '100%',
              alignItems: 'center',
            }}
          >
            {movieSearchResults.length > 0 ? (
              <View style={{ flex: 10 }}>
                <MovieListSearch
                  predictions={movieData}
                  onSelect={(tmdbId) => {
                    if (selectedMovieTmdbId === tmdbId) {
                      setSelectedMovieTmdbId(undefined);
                    } else {
                      setSelectedMovieTmdbId(tmdbId);
                    }
                  }}
                  categoryType={CategoryType.FILM}
                  disablePaddingBottom
                />
              </View>
            ) : null}
          </View>
        </View>
        <BasicModal
          visible={showSongModal}
          onClose={() => {
            setShowSongModal(false);
          }}
          width={'90%'}
          height={'70%'}
          header={{
            title: modalState === 'create' ? 'Enter Song Details' : 'Select Song',
          }}
        >
          {modalState === 'create' ? (
            <>
              <View style={{ alignSelf: 'center', width: '80%', height: '100%' }}>
                <FormInput
                  label="Song Title"
                  value={songTitle}
                  setValue={setSongTitle}
                  textContentType={'name'}
                />
                <FormInput
                  label="Artist (optional)"
                  value={artist}
                  setValue={setArtist}
                  textContentType={'name'}
                />
              </View>
              <FAB
                iconName="plus"
                text="Submit"
                onPress={() => {
                  setShowSongModal(false);
                  onConfirmContender();
                }}
                visible={songTitle.length > 0}
                bottomPercentage={'50%'}
              />
            </>
          ) : (
            <SelectSongList
              data={communityPredictions.filter(
                (p) => p.contenderMovie?.tmdbId === selectedMovieTmdbId,
              )}
              getSongPrediction={getSongPrediction}
              onCreateNew={() => setModalState('create')}
              onSelectPrediction={onSelectPrediction}
            />
          )}
        </BasicModal>
        <FAB
          iconName="plus"
          text="Add"
          onPress={onSelectMovie}
          visible={selectedMovieTmdbId !== undefined}
        />
      </View>
    </>
  );
};

const SelectSongList = (props: {
  data: iPrediction[];
  getSongPrediction: (tmdbId: number, title: string) => iPrediction | undefined;
  onCreateNew: () => void;
  onSelectPrediction: (p: iPrediction) => void;
}) => {
  const { data, getSongPrediction, onCreateNew, onSelectPrediction } = props;

  const [selectedSong, setSelectedSong] = useState<
    { tmdbId: number; songTitle: string } | undefined
  >(undefined);

  return (
    <>
      <View style={{ height: '84%' }}>
        <SongListSelectable
          predictions={data}
          onSelect={(tmdbId, songTitle) => {
            if (!songTitle) return;
            const songPrediction = getSongPrediction(tmdbId, songTitle);
            if (selectedSong?.songTitle === songTitle) {
              setSelectedSong(undefined);
            } else if (songPrediction) {
              setSelectedSong({ tmdbId, songTitle });
            }
          }}
          disablePaddingBottom
        />
      </View>
      <View style={{ height: '10%' }}>
        {selectedSong === undefined ? (
          <SubmitButton text={'Create New Song'} onPress={onCreateNew} />
        ) : null}
      </View>
      <FAB
        iconName="plus"
        text="Add"
        onPress={() => {
          if (selectedSong) {
            const prediction = getSongPrediction(
              selectedSong.tmdbId,
              selectedSong.songTitle,
            );
            if (prediction) {
              onSelectPrediction(prediction);
            }
          }
        }}
        visible={selectedSong !== undefined}
        bottomPercentage={'5%'}
      />
    </>
  );
};

export default CreateSong;
