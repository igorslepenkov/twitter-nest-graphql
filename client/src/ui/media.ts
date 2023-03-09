export enum Media {
  XS = "@media(min-width: 0px)",
  SM = "@media(min-width: 600px)",
  MD = "@media(min-width: 900px)",
  LG = "@media(min-width: 1200px)",
  XL = "@media(min-width: 1568px)",
}

interface IMediaBreakpoints {
  XS: number;
  SM: number;
  MD: number;
  LG: number;
  XL: number;
}

export const MediaBreakpoints: IMediaBreakpoints = {
  XS: 0,
  SM: 600,
  MD: 900,
  LG: 1200,
  XL: 1568,
};
