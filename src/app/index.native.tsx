import * as SplashScreen from 'expo-splash-screen';
import { Image } from 'expo-image';
import { useEffect, useRef, useState } from 'react';
import {
  BackHandler,
  Linking,
  Pressable,
  StyleSheet,
  StatusBar,
  Text,
  View,
} from 'react-native';
import { WebView } from 'react-native-webview';

import { PONTO_MAX_WEB_URL } from '@/constants/urls';

const BRAND_BLUE = '#155DFC';
const BACKGROUND_COLOR = '#FFFFFF';

export default function HomeScreen() {
  const webViewRef = useRef<WebView>(null);
  const hasHiddenSplashRef = useRef(false);
  const [isWebViewReady, setIsWebViewReady] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [canGoBack, setCanGoBack] = useState(false);

  useEffect(() => {
    if (!isWebViewReady || hasHiddenSplashRef.current) {
      return;
    }

    hasHiddenSplashRef.current = true;
    void SplashScreen.hideAsync();
  }, [isWebViewReady]);

  useEffect(() => {
    const subscription = BackHandler.addEventListener('hardwareBackPress', () => {
      if (canGoBack) {
        webViewRef.current?.goBack();
        return true;
      }

      return false;
    });

    return () => subscription.remove();
  }, [canGoBack]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={BACKGROUND_COLOR} />
      <WebView
        ref={webViewRef}
        source={{ uri: PONTO_MAX_WEB_URL }}
        style={styles.webView}
        originWhitelist={['http://*', 'https://*', 'about:blank']}
        javaScriptEnabled
        domStorageEnabled
        sharedCookiesEnabled
        thirdPartyCookiesEnabled
        setSupportMultipleWindows={false}
        allowsBackForwardNavigationGestures
        startInLoadingState
        renderLoading={() => (
          <View style={styles.loadingContainer}>
            <Image
              source={require('@/assets/images/splash-icon.png')}
              style={styles.loadingLogo}
              contentFit="contain"
            />
          </View>
        )}
        onLoadStart={() => {
          setHasError(false);
        }}
        onLoadEnd={() => {
          setIsWebViewReady(true);
        }}
        onError={() => {
          setHasError(true);
          setIsWebViewReady(true);
        }}
        onNavigationStateChange={(event) => {
          setCanGoBack(event.canGoBack);
        }}
        onShouldStartLoadWithRequest={(request) => {
          if (
            request.url.startsWith('http://') ||
            request.url.startsWith('https://') ||
            request.url === 'about:blank'
          ) {
            return true;
          }

          Linking.openURL(request.url).catch(() => {});
          return false;
        }}
      />

      {hasError ? (
        <View style={styles.errorOverlay}>
          <Text style={styles.errorTitle}>PontoMax could not load.</Text>
          <Text style={styles.errorText}>Check your connection and try again.</Text>
          <Pressable
            onPress={() => {
              setHasError(false);
              setIsWebViewReady(false);
              webViewRef.current?.reload();
            }}
            style={styles.retryButton}
          >
            <Text style={styles.retryButtonText}>Try again</Text>
          </Pressable>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
  },
  webView: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
  },
  loadingContainer: {
    ...StyleSheet.absoluteFill,
    alignItems: 'center',
    backgroundColor: BACKGROUND_COLOR,
    justifyContent: 'center',
  },
  loadingLogo: {
    height: 140,
    width: 140,
  },
  errorOverlay: {
    ...StyleSheet.absoluteFill,
    alignItems: 'center',
    backgroundColor: BACKGROUND_COLOR,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  errorTitle: {
    color: '#0F172A',
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
  },
  errorText: {
    color: '#475569',
    fontSize: 15,
    lineHeight: 22,
    marginTop: 10,
    textAlign: 'center',
  },
  retryButton: {
    backgroundColor: BRAND_BLUE,
    borderRadius: 999,
    marginTop: 20,
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  retryButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
});
