import { useEffect, useState } from 'react';
import { useSearch } from '../../context/SearchContext';
import MongoApi from '../../services/api/requests';
import { User, WithId } from '../../types/api';
import { PAGINATED_LIMIT } from '../../services/api/requests/user';
import useQueryGetFollowingUsers from '../../hooks/queries/useQueryGetFollowingUsers';

const useUserSearch = () => {
  const { searchInput, isLoadingSearch, setIsLoadingSearch } = useSearch();
  const { usersIdsAuthUserIsFollowing } = useQueryGetFollowingUsers();

  // have this expire - make it part of useQuery
  const [searchResults, setSearchResults] = useState<WithId<User>[]>([]);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [allUsersAreFetched, setAllUsersAreFetched] = useState<boolean>(false);

  const fetchPage = async (pn: number) => {
    if (isLoadingSearch || searchInput === '') return;
    setIsLoadingSearch(true);
    const { data } = await MongoApi.searchUsers({ query: searchInput, pageNumber: pn });
    // sort by whether user follows them or not
    const newUsers = (data ?? []).sort((a) =>
      usersIdsAuthUserIsFollowing.includes(a._id) ? -1 : 1,
    );
    if (newUsers.length < PAGINATED_LIMIT) {
      setAllUsersAreFetched(true);
    }
    setPageNumber((prev) => prev + 1);
    setIsLoadingSearch(false);
    setSearchResults((prev) => [...prev, ...newUsers]);
  };

  const handleSearch = async () => {
    setPageNumber(1);
    fetchPage(1);
    setAllUsersAreFetched(false);
  };

  const fetchMore = async () => {
    if (allUsersAreFetched) return;
    fetchPage(pageNumber);
  };

  useEffect(() => {
    if (searchInput === '') {
      setSearchResults([]);
    }
  }, [searchInput]);

  return { searchResults, allUsersAreFetched, handleSearch, fetchMore };
};

export default useUserSearch;
