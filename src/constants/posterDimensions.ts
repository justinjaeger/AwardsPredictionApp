const getPosterDimensions = (height: number) => ({
  height,
  width: height * (27 / 40),
});

export const getPosterDimensionsByWidth = (width: number) => ({
  height: width * (40 / 27),
  width,
});

export enum PosterSize {
  SMALL = 60,
  MEDIUM = 120,
  LARGE = 240,
}

export const POSTER_SIZE: {
  [key in PosterSize]: {
    width: number;
    height: number;
  };
} = {
  [PosterSize.SMALL]: getPosterDimensions(PosterSize.SMALL),
  [PosterSize.MEDIUM]: getPosterDimensions(PosterSize.MEDIUM),
  [PosterSize.LARGE]: getPosterDimensions(PosterSize.LARGE),
};
