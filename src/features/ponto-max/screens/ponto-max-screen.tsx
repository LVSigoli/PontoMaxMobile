import { Linking, StatusBar, StyleSheet, View } from "react-native";
import { WebView } from "react-native-webview";

import { PONTO_MAX_WEB_URL } from "@/constants/urls";

import { ErrorOverlay } from "../components/error-overlay";
import { LoadingView } from "../components/loading-view";
import { BACKGROUND_COLOR, WEB_VIEW_ORIGIN_WHITELIST } from "../constants";
import { useWebViewController } from "../hooks/use-web-view-controller";
import { isAllowedWebViewUrl } from "../utils/is-allowed-web-view-url";

export default function PontoMaxScreen() {
  const {
    webViewRef,
    hasError,
    handleError,
    handleLoadEnd,
    handleLoadStart,
    handleNavigationChange,
    retry,
  } = useWebViewController();

  // Functions
  function handleShouldStartLoadWithRequest(event: any) {
    if (isAllowedWebViewUrl(event.url)) return true;

    void Linking.openURL(event.url).catch(() => {});
    return false;
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={BACKGROUND_COLOR} />

      <WebView
        ref={webViewRef}
        source={{ uri: PONTO_MAX_WEB_URL }}
        style={styles.webView}
        originWhitelist={WEB_VIEW_ORIGIN_WHITELIST}
        javaScriptEnabled
        domStorageEnabled
        sharedCookiesEnabled
        thirdPartyCookiesEnabled
        setSupportMultipleWindows={false}
        allowsBackForwardNavigationGestures
        startInLoadingState
        renderLoading={LoadingView}
        onLoadStart={handleLoadStart}
        onLoadEnd={handleLoadEnd}
        onError={handleError}
        onNavigationStateChange={(event) => {
          handleNavigationChange(event.canGoBack);
        }}
        onShouldStartLoadWithRequest={(event) =>
          handleShouldStartLoadWithRequest(event)
        }
      />

      {hasError ? <ErrorOverlay onRetry={retry} /> : null}
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
});
