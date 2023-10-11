const getPosterDimensions = (height: number) => ({
  height,
  width: height * (27 / 40),
});

export const getPosterDimensionsByWidth = (width: number) => ({
  height: width * (40 / 27),
  width,
});

export enum PosterSize {
  XSMALL = 40,
  SMALL = 45,
  MEDIUM = 120,
  LARGE = 240,
}

export const POSTER_SIZE: {
  [key in PosterSize]: {
    width: number;
    height: number;
  };
} = {
  [PosterSize.XSMALL]: getPosterDimensions(PosterSize.XSMALL),
  [PosterSize.SMALL]: getPosterDimensions(PosterSize.SMALL),
  [PosterSize.MEDIUM]: getPosterDimensions(PosterSize.MEDIUM),
  [PosterSize.LARGE]: getPosterDimensions(PosterSize.LARGE),
};
