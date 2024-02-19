import * as RNLocalize from 'react-native-localize';

/**
 * Formats datetime for locale of user
 * Like "7:00pm"
 */
export const formatDateTime = (date: Date, showTime?: boolean) => {
  const locale = RNLocalize.getLocales();
  const tag = locale[0].languageTag;

  const options: Intl.DateTimeFormatOptions = {
    month: 'numeric',
    day: 'numeric',
  };

  if (showTime) {
    options.hour = 'numeric';
    options.minute = '2-digit';
  }

  return date.toLocaleString(tag, options);
};

/**
 * Formats datetime for locale of user
 * Like "7PM"
 */
export const formatDateTimeShort = (date: Date, showTime?: boolean) => {
  const locale = RNLocalize.getLocales();
  const tag = locale[0].languageTag;

  const options: Intl.DateTimeFormatOptions = {
    month: 'numeric',
    day: 'numeric',
  };

  if (showTime) {
    options.hour = 'numeric';
  }

  // make it like "7PM"
  return date.toLocaleString(tag, options);
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
