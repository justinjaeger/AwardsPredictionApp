export const getSongKey = (title: string, movieTmdbId: number) => {
  const lowercaseTitleAndArtist = (title + movieTmdbId.toString()).toLowerCase();
  return lowercaseTitleAndArtist.replace(/[^0-9a-z]/gi, '').replace('the', ''); // stripe all non-alpha characters
};

// TODO: make this work for approximate keys
export const compareSongKeys = (key1: string, key2: string) => {
  return key1 === key2;
};
