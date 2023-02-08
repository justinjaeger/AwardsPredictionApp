import { useEffect, useState } from 'react';
import { useSearch } from '../../context/ContenderSearchContext';
import { useAuth } from '../../context/UserContext';
import ApiServices from '../../services/graphql';

export type iUserSearchResult = {
  id: string;
  username: string | undefined;
  name: string | undefined;
  image: string | undefined;
  bio: string | undefined;
  signedInUserIsFollowing: boolean;
  isFollowingSignedInUser: boolean;
};

const useFriendSearch = () => {
  const { searchInput, debouncedSearch } = useSearch();
  const { userId } = useAuth();

  const [searchResults, setSearchResults] = useState<iUserSearchResult[]>([]);

  const resetSearch = () => {
    setSearchResults([]);
  };

  const handleSearch = (s: string) => {
    if (s === '') {
      resetSearch();
      return;
    }
    const Request = userId
      ? ApiServices.searchUsersSignedIn(s, userId)
      : ApiServices.searchUsersSignedOut(s);
    // TODO: add userId after success without it
    Request.then((res) => {
      const result: iUserSearchResult[] = (res.data?.searchUsers?.items || []).map(
        (item) => ({
          id: item?.id || '',
          username: item?.username || undefined,
          name: item?.name || undefined,
          image: item?.image || undefined,
          bio: item?.bio || undefined,
          signedInUserIsFollowing: (item?.followers?.items || []).length > 0,
          isFollowingSignedInUser: (item?.followers?.items || []).length > 0,
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
