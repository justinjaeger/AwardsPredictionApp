import React, { createContext, useContext, useEffect, useState } from 'react';
import { useDebounce } from '../util/hooks';

/**
 * Context that wraps the "read only" screens shared by global and personal
 */

type iCategoryContext = {
  isSearching: boolean;
  setIsSearching: (isSearching: boolean) => void;
  searchInput: string;
  setSearchInput: (searchInput: string) => void;
  debouncedSearch: string;
  resetSearchHack: boolean;
  setResetSearchHack: (resetSearchHack: boolean) => void;
  isLoadingSearch: boolean;
  setIsLoadingSearch: (isLoadingSearch: boolean) => void;
};

const CategoryContext = createContext<iCategoryContext>({
  isSearching: false,
  setIsSearching: () => {},
  searchInput: '',
  setSearchInput: () => {},
  debouncedSearch: '',
  resetSearchHack: false,
  setResetSearchHack: () => {},
  isLoadingSearch: false,
  setIsLoadingSearch: () => {},
});

export const SearchProvider = (props: { children: React.ReactNode }) => {
  const [searchInput, setSearchInput] = useState<string>('');
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [isLoadingSearch, setIsLoadingSearch] = useState<boolean>(false);
  const [resetSearchHack, setResetSearchHack] = useState<boolean>(false);

  const debouncedSearch = useDebounce(searchInput, 500, { trailing: true });

  // Enables us to reset the search bar from the outer component
  useEffect(() => {
    setSearchInput('');
    setIsSearching(false);
  }, [resetSearchHack]);

  useEffect(() => {
    setIsSearching(true);
    if (searchInput === '') setIsSearching(false);
  }, [searchInput]);

  return (
    <CategoryContext.Provider
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
      }}
    >
      {props.children}
    </CategoryContext.Provider>
  );
};

export const useSearch = () => useContext(CategoryContext);
