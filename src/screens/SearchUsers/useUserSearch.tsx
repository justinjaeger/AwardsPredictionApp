import { useState } from 'react';
import MongoApi from '../../services/api/requests';
import { User, WithId } from '../../models';
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
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchPage = async (s: string, pn: number) => {
    if (isLoading || s.length === 0) return;
    setIsLoading(true);
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
    setIsLoading(false);
  };

  const handleSearch = async (s: string) => {
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

  return { searchResults, allUsersAreFetched, handleSearch, fetchMore, reset, isLoading };
};

export default useUserSearch;
