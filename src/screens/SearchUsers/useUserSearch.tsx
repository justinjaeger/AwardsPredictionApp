import { useState } from 'react';
import MongoApi from '../../services/api/requests';
import { User, WithId } from '../../types/api';
import { PAGINATED_LIMIT } from '../../services/api/requests/user';
import useQueryGetFollowingUsers from '../../hooks/queries/useQueryGetFollowingUsers';

const useUserSearch = () => {
  const { usersIdsAuthUserIsFollowing } = useQueryGetFollowingUsers();

  // have this expire - make it part of useQuery
  const [searchResults, setSearchResults] = useState<WithId<User>[] | undefined>(
    undefined,
  );
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [allUsersAreFetched, setAllUsersAreFetched] = useState<boolean>(false);
  const [lastSearchInput, setLastSearchInput] = useState<string>('');

  const fetchPage = async (s: string, pn: number) => {
    setLastSearchInput(s);
    setPageNumber((prev) => prev + 1);
    const { data } = await MongoApi.searchUsers({ query: s, pageNumber: pn });
    // sort by whether user follows them or not
    const newUsers = (data ?? []).sort((a) =>
      usersIdsAuthUserIsFollowing.includes(a._id) ? -1 : 1,
    );
    if (newUsers.length < PAGINATED_LIMIT) {
      setAllUsersAreFetched(true);
    }
    setSearchResults((prev) => [...(prev ?? []), ...newUsers]);
  };

  const handleSearch = async (s: string) => {
    reset();
    await fetchPage(s, 1);
  };

  const fetchMore = async () => {
    if (allUsersAreFetched) return;
    fetchPage(lastSearchInput, pageNumber);
  };

  const reset = () => {
    setSearchResults(undefined);
    setPageNumber(1);
    setAllUsersAreFetched(false);
    setLastSearchInput('');
  };

  return { searchResults, allUsersAreFetched, handleSearch, fetchMore, reset };
};

export default useUserSearch;
