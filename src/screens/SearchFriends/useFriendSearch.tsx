import { useEffect, useState } from 'react';
import { useSearch } from '../../context/ContenderSearchContext';
import ApiServices from '../../services/graphql';

type iUserSearchResult = {
  id: string;
  username: string;
  name: string;
  image: string;
  bio: string;
};

const useFriendSearch = () => {
  const { searchInput, debouncedSearch } = useSearch();

  const [searchResults, setSearchResults] = useState<iUserSearchResult[]>([]);

  const resetSearch = () => {
    setSearchResults([]);
  };

  const handleSearch = (s: string) => {
    if (s === '') {
      resetSearch();
      return;
    }
    ApiServices.searchUsers(s.toLowerCase()).then((res) => {
      const result: iUserSearchResult[] = (res.data?.listUsers?.items || []).map(
        (item) => ({
          id: item?.id || '',
          username: item?.username || '',
          name: item?.name || '',
          image: item?.image || '',
          bio: item?.bio || '',
        }),
      );
      setSearchResults(result);
    });
  };

  useEffect(() => {
    handleSearch(searchInput);
  }, [debouncedSearch]);

  return { searchResults };
};

export default useFriendSearch;
