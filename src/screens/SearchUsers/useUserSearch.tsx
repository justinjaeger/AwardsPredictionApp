import { useEffect, useState } from 'react';
import { useSearch } from '../../context/ContenderSearchContext';
import MongoApi from '../../services/api/requests';
import { User, WithId } from '../../types/api';

const useUserSearch = () => {
  const { searchInput, debouncedSearch, setIsLoadingSearch } = useSearch();

  // have this expire - make it part of useQuery
  const [searchResults, setSearchResults] = useState<WithId<User>[]>([]);

  const resetSearch = () => {
    setSearchResults([]);
  };

  const handleSearch = async (s: string) => {
    if (s === '') {
      resetSearch();
      return;
    }
    setIsLoadingSearch(true);
    const { data } = await MongoApi.searchUsers({ query: s, pageNumber: 0 });
    setIsLoadingSearch(false);
    setSearchResults(data ?? []);
  };

  useEffect(() => {
    handleSearch(searchInput);
  }, [debouncedSearch]);

  return { searchResults };
};

export default useUserSearch;
