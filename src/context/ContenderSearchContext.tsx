import React, { createContext, useContext, useEffect, useState } from 'react';
import { useDebounce } from '../util/hooks';

/**
 * Context that wraps the "read only" screens shared by global and personal
 */

type iSearchContext = {
  isSearching: boolean;
  setIsSearching: (isSearching: boolean) => void;
  searchInput: string;
  setSearchInput: (searchInput: string) => void;
  debouncedSearch: string;
  resetSearchHack: boolean;
  setResetSearchHack: (resetSearchHack: boolean) => void;
  isLoadingSearch: boolean;
  setIsLoadingSearch: (isLoadingSearch: boolean) => void;
  resetSearch: () => void;
};

const SearchContext = createContext<iSearchContext>({
  isSearching: false,
  setIsSearching: () => {},
  searchInput: '',
  setSearchInput: () => {},
  debouncedSearch: '',
  resetSearchHack: false,
  setResetSearchHack: () => {},
  isLoadingSearch: false,
  setIsLoadingSearch: () => {},
  resetSearch: () => {},
});

export const SearchProvider = (props: { children: React.ReactNode }) => {
  const [searchInput, setSearchInput] = useState<string>('');
  const [isSearching, setIsSearching] = useState<boolean>(false); // when search input contains a value
  // isLoadingSearch: Must set from component making the api call - true before the call, false when finished
  const [isLoadingSearch, setIsLoadingSearch] = useState<boolean>(false); // when search is loading (shows spinner)
  const [resetSearchHack, setResetSearchHack] = useState<boolean>(false);

  const debouncedSearch = useDebounce(searchInput, 500, { trailing: true });

  const resetSearch = () => {
    setSearchInput('');
    setIsSearching(false);
    setIsLoadingSearch(false);
  };

  // Enables us to reset the search bar from the outer component
  useEffect(() => {
    resetSearch();
  }, [resetSearchHack]);

  useEffect(() => {
    if (searchInput === '') {
      setIsSearching(false);
      setIsLoadingSearch(false);
    } else {
      setIsSearching(true);
    }
  }, [searchInput]);

  return (
    <SearchContext.Provider
      value={{
        isSearching,
        setIsSearching,
        searchInput,
        setSearchInput,
        debouncedSearch,
        resetSearchHack,
        setResetSearchHack,
        isLoadingSearch,
        setIsLoadingSearch,
        resetSearch,
      }}
    >
      {props.children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => useContext(SearchContext);
