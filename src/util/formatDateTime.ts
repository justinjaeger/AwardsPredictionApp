import * as RNLocalize from 'react-native-localize';

/**
 * Formats datetime for locale of user
 */
export const formatDateTime = (date: Date) => {
  const locale = RNLocalize.getLocales();
  const tag = locale[0].languageTag;

  return date.toLocaleString(tag, {
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
};
