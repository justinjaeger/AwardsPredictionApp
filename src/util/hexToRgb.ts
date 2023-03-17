// @ts-ignore
// eslint-disable-next-line import/default, import/no-named-as-default-member
import lib from 'hex-rgb';

// => {red: 65, green: 131, blue: 196, alpha: 1}
export const hexToRgb = (hex: string, alpha: number) => {
  const { red, green, blue } = lib(hex);
  return 'rgba(' + red + ',' + green + ',' + blue + ',' + alpha + ')';
};
