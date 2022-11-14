import React from 'react';
import { WebView } from 'react-native-webview';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { MainParamList } from '../../navigation/types';
import { ActivityIndicator, View } from 'react-native';
import COLORS from '../../constants/colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import { IconButton } from '../../components/Buttons/IconButton';
import { BOTTOM_TAB_HEIGHT } from '../../constants';

const WebViewScreen = () => {
  const {
    params: { uri },
  } = useRoute<RouteProp<MainParamList, 'WebView'>>();
  const webviewRef = React.useRef(null);
  const navigation = useNavigation();

  const webViewgoback = () => {
    if (webviewRef.current) (webviewRef.current as any).goBack();
  };

  const webViewNext = () => {
    if (webviewRef.current) (webviewRef.current as any).goForward();
  };

  const goBack = () => navigation.goBack();

  const LoadingIndicatorView = () => (
    <ActivityIndicator
      color="#009b88"
      size="large"
      style={{
        flex: 1,
        justifyContent: 'center',
      }}
    />
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <WebView
        ref={webviewRef}
        source={{ uri }}
        renderLoading={LoadingIndicatorView}
        mediaPlaybackRequiresUserAction={false}
      />
      <View
        style={{
          borderTopWidth: 1,
          borderColor: COLORS.border,
          alignItems: 'center',
          flexDirection: 'row',
          paddingHorizontal: 16,
          justifyContent: 'space-between',
          height: BOTTOM_TAB_HEIGHT,
        }}
      >
        <IconButton
          iconProps={{
            name: 'arrow-ios-back-outline',
            styles: { color: COLORS.primary, width: 30, height: 30 },
          }}
          onPress={webViewgoback}
          styles={{ width: 30, height: 30, marginLeft: 10 }}
        />
        <IconButton
          iconProps={{
            name: 'close-outline',
            styles: { color: COLORS.primary, width: 30, height: 30 },
          }}
          onPress={goBack}
          styles={{ width: 30, height: 30, marginLeft: 10 }}
        />
        <IconButton
          iconProps={{
            name: 'arrow-ios-forward-outline',
            styles: { color: COLORS.primary, width: 30, height: 30 },
          }}
          onPress={webViewNext}
          styles={{ width: 30, height: 30, marginLeft: 10 }}
        />
      </View>
    </SafeAreaView>
  );
};

export default WebViewScreen;
