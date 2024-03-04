/**
 * Purpose is to not let there be duplicate song entries
 * So if a user enters a song title slightly differently, it will be the same key
 */
export const getSongKey = (movieTmdbId: number, title: string) => {
  const strippedTitle = title.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
  return `${movieTmdbId}-${strippedTitle}`;
};
