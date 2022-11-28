import React, { useState } from 'react';
import SearchInput from '../../../components/Inputs/SearchInput';
import TmdbServices from '../../../services/tmdb';
import { iSearchData } from '../../../services/tmdb/search';
import Snackbar from '../../../components/Snackbar';
import { Body } from '../../../components/Text';
import { View } from 'react-native';
import { useCategory } from '../../../context/CategoryContext';
import { iCategory, iEvent, iPrediction } from '../../../types';
import COLORS from '../../../constants/colors';
import MovieListSearch from '../../../components/MovieList/MovieListSearch';
import LoadingStatueModal from '../../../components/LoadingStatueModal';
import { useAsyncEffect } from '../../../util/hooks';
import useQueryCommunityEvent from '../../../hooks/getCommunityEvent';
import { FAB } from '../../../components/Buttons/FAB';
import { CategoryType } from '../../../API';
import BasicModal from '../../../components/BasicModal';
import useMutationCreateSongContender from '../../../hooks/createSongContender';
import { compareSongKeys, getSongKey } from '../../../util/songKeys';
import FormInput from '../../../components/Inputs/FormInput';

// TODO: should only be able to do this if logged in
const CreateSong = () => {
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

  useAsyncEffect(async () => {
    if (isComplete && selectedMovieTmdbId) {
      Snackbar.success('Added song to predictions');
      //   resetSearch();
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
    setShowSongModal(true);
  };

  const onConfirmContender = async () => {
    if (!selectedMovieTmdbId) return;
    // can check that selectedTmdbId is not already associated with a contender in our category list
    const maybeAlreadyExistingContender = communityPredictions.find((p) => {
      const storedSongKey = getSongKey(p.contenderSong?.title || '', selectedMovieTmdbId);
      const newSongKey = getSongKey(songTitle, selectedMovieTmdbId);
      return compareSongKeys(storedSongKey, newSongKey);
    });
    if (maybeAlreadyExistingContender) {
      Snackbar.warning('This song has already been added');
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
    contenderId: m.tmdbId.toString(),
    contenderMovie: {
      id: m.tmdbId.toString(),
      tmdbId: m.tmdbId,
    },
  }));

  return (
    <>
      <LoadingStatueModal visible={!isComplete} text={'Saving song...'} />
      <BasicModal
        visible={showSongModal}
        onClose={() => {
          setShowSongModal(false);
        }}
        width={'90%'}
        height={'70%'}
        header={{ title: 'Enter Song Details' }}
      >
        <>
          <View style={{ alignSelf: 'center', width: '80%', height: '100%' }}>
            <FormInput
              label="Song Title"
              value={songTitle}
              setValue={setSongTitle}
              textContentType={'name'}
            />
            <FormInput
              label="Artist"
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
            visible={songTitle.length > 0 && artist.length > 0}
            bottomPercentage={'50%'}
          />
        </>
      </BasicModal>
      <View
        style={{
          height: '100%',
          width: '100%',
          alignItems: 'center',
          flex: 1,
        }}
      >
        <View style={{ width: '100%', alignItems: 'center', height: '100%' }}>
          <SearchInput
            resetSearchHack={resetSearchHack}
            placeholder={'Search Movies'}
            handleSearch={(s: string) => handleSearch(s)}
            style={{ width: '80%', marginTop: '5%' }}
          />
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

export default CreateSong;
