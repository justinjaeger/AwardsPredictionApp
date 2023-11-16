import { trigger } from 'react-native-haptic-feedback';

// Optional configuration
const options = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: false,
};

// Trigger haptic feedback
trigger('impactLight', options);

export const triggerHaptic = () => {
  console.log('HAPTIC TRIGGERED');
  trigger('impactLight', options);
};
