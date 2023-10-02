import React, { useEffect, useState } from 'react';
import TmdbServices, { iSearchData } from '../../../services/tmdb';
import { Body } from '../../../components/Text';
import { View } from 'react-native';
import { useEvent } from '../../../context/EventContext';
import COLORS from '../../../constants/colors';
import MovieListSearch from '../../../components/MovieList/MovieListSearch';
import LoadingStatueModal from '../../../components/LoadingStatueModal';
import { FAB } from '../../../components/Buttons/FAB';
import BasicModal from '../../../components/BasicModal';
import useMutationCreateSongContender from '../../../hooks/mutations/useMutationCreateSongContender';
import FormInput from '../../../components/Inputs/FormInput';
import { iCreateContenderProps } from '.';
import { SubmitButton } from '../../../components/Buttons';
import SongListSelectable from '../../../components/MovieList/SongListSelectable';
import { useSearch } from '../../../context/ContenderSearchContext';
import useQueryGetCommunityPredictions from '../../../hooks/queries/useQueryGetCommunityPredictions';
import { useTmdbDataStore } from '../../../context/TmdbDataStore';
import { CategoryType, iPrediction } from '../../../types/api';

// TODO: should this func ACTUALLY accept a Contender??
const CreateSong = ({ onSelectPrediction }: iCreateContenderProps) => {
  const { itemsKeyedByTmdbId, getSongByTitleAndMovieTmdbId } = useTmdbDataStore();

  const { setIsLoadingSearch } = useSearch();
  const { category: _category, event: _event } = useEvent();
  const category = _category!;
  const event = _event!;

  // when adding a contender to the list of overall contenders
  const {
    mutate: createSongContender,
    isComplete,
    response,
  } = useMutationCreateSongContender();

  const { searchInput, debouncedSearch, resetSearchHack, setResetSearchHack } =
    useSearch();
  const { data: communityData } = useQueryGetCommunityPredictions();
  const communityPredictions = communityData?.categories[category].predictions || [];

  const [movieSearchResults, setMovieSearchResults] = useState<iSearchData>([]);
  const [searchMessage, setSearchMessage] = useState<string>('');
  const [selectedMovieTmdbId, setSelectedMovieTmdbId] = useState<number | undefined>();
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
    setSongTitle('');
    setArtist('');
  };

  const getSongPrediction = (movieTmdbId: number, title: string) => {
    const song = getSongByTitleAndMovieTmdbId(title, movieTmdbId);
    const maybeSongPrediction =
      song && communityPredictions.find((p) => p.songId === song._id);
    return maybeSongPrediction;
  };

  // handles the search
  useEffect(() => {
    handleSearch(searchInput);
  }, [debouncedSearch]);

  // block runs after createContender mutation succeeds
  useEffect(() => {
    if (response) {
      onSelectPrediction({
        contenderId: response._id,
        movieId: response.movieId,
        personId: response.personId,
        songId: response.songId,
        ranking: 0,
      });
      resetSearch();
    }
  }, [response]);

  const handleSearch = (s: string) => {
    if (s === '') {
      resetSearch();
      return;
    }
    setIsLoadingSearch(true);
    TmdbServices.searchMovies(s, minReleaseYear)
      .then((res) => {
        setSelectedMovieTmdbId(undefined);
        const r = res.data || [];
        setMovieSearchResults(r);
        if (r.length === 0) {
          setSearchMessage('No Results');
        }
      })
      .finally(() => setIsLoadingSearch(false));
  };

  const commuintyMoviesWithSong = communityPredictions.filter(
    (p) => p.movieId === itemsKeyedByTmdbId[selectedMovieTmdbId!]?._id,
  );

  const onSelectMovie = async () => {
    if (!selectedMovieTmdbId) return;
    setModalState(commuintyMoviesWithSong.length > 0 ? 'create' : 'select');
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
    await createSongContender({
      eventId: event._id,
      category,
      movieTmdbId: selectedMovieTmdbId,
      artist: artist,
      title: songTitle,
    });
  };

  // these are sort of "fake" values
  const movieSearchResultsFormatted: iPrediction[] = movieSearchResults.map((m) => ({
    id: m.tmdbId.toString(),
    ranking: 0,
    contenderId: m.tmdbId.toString(),
    movieId: m.tmdbId.toString(),
  }));

  return (
    <>
      <LoadingStatueModal visible={!isComplete} text={'Saving song...'} />
      <View
        style={{
          height: '100%',
          width: '100%',
          alignItems: 'center',
          flex: 1,
        }}
      >
        <View style={{ width: '100%', alignItems: 'center', height: '100%' }}>
          {movieSearchResultsFormatted.length === 0 ? (
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
                  predictions={movieSearchResultsFormatted}
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
              data={commuintyMoviesWithSong}
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

const SelectSongList = ({
  data,
  getSongPrediction,
  onCreateNew,
  onSelectPrediction,
}: {
  data: iPrediction[];
  getSongPrediction: (tmdbId: number, title: string) => iPrediction | undefined;
  onCreateNew: () => void;
  onSelectPrediction: (p: iPrediction) => void;
}) => {
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
