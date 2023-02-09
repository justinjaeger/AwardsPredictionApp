import { useEffect, useState } from 'react';
import { useSearch } from '../../context/ContenderSearchContext';
import { useAuth } from '../../context/UserContext';
import searchUsers from '../../services/queryFuncs/searchUsers';
import { iUser } from '../../types';

const useFriendSearch = () => {
  const { searchInput, debouncedSearch } = useSearch();
  const { userId: authUserId } = useAuth();

  // have this expire - make it part of useQuery
  const [searchResults, setSearchResults] = useState<iUser[]>([]);

  const resetSearch = () => {
    setSearchResults([]);
  };

  const handleSearch = async (s: string) => {
    if (s === '') {
      resetSearch();
      return;
    }
    const result = await searchUsers(s, authUserId);
    setSearchResults(result);
  };

  useEffect(() => {
    handleSearch(searchInput);
  }, [debouncedSearch]);

  return { searchResults };
};

export default useFriendSearch;
