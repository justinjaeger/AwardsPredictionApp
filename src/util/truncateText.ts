const DEFAULT_CHAR_LIMIT = 20;

export const truncateText = (s: string, charLimit?: number) => {
  const limit = charLimit || DEFAULT_CHAR_LIMIT;
  return s.length > limit ? s.slice(0, limit) + '...' : s;
};
