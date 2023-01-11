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

/**
 * If last updated is today, display the time. If last upated is yesterday, display date
 */
export const formatLastUpdated = (date: Date) => {
  const locale = RNLocalize.getLocales();
  const tag = locale[0].languageTag;

  const today = new Date();
  if (today.getDate() === date.getDate()) {
    return date.toLocaleString(tag, {
      hour: 'numeric',
      minute: '2-digit',
    });
  }

  return date.toLocaleString(tag, {
    month: 'numeric',
    day: 'numeric',
  });
};
