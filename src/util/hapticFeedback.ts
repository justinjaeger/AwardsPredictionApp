import { trigger } from 'react-native-haptic-feedback';

// Optional configuration
const options = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: false,
};

// Trigger haptic feedback
trigger('impactLight', options);

export const triggerHaptic = () => {
  trigger('impactLight', options);
};
