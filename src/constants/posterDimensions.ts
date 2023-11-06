export const POSTER_DIMENSIONS = {
  height: 40,
  width: 27,
};

export const getPosterDimensionsByHeight = (height: number) => ({
  height,
  width: height * (POSTER_DIMENSIONS.width / POSTER_DIMENSIONS.height),
});

export const getPosterDimensionsByWidth = (width: number) => ({
  height: width * (POSTER_DIMENSIONS.height / POSTER_DIMENSIONS.width),
  width,
});

export enum PosterSize {
  XSMALL = 40,
  SMALL = 45,
  MEDIUM = 80,
  LARGE = 240,
}

export const POSTER_SIZE: {
  [key in PosterSize]: {
    width: number;
    height: number;
  };
} = {
  [PosterSize.XSMALL]: getPosterDimensionsByHeight(PosterSize.XSMALL),
  [PosterSize.SMALL]: getPosterDimensionsByHeight(PosterSize.SMALL),
  [PosterSize.MEDIUM]: getPosterDimensionsByHeight(PosterSize.MEDIUM),
  [PosterSize.LARGE]: getPosterDimensionsByHeight(PosterSize.LARGE),
};
