export const getSongKey = (movieTmdbId: number, title: string) =>
  `${movieTmdbId}-${title}`;
