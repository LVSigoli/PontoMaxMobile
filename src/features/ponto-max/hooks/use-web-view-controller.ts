import { useCallback, useEffect, useRef, useState } from "react";
import { BackHandler } from "react-native";
import { WebView } from "react-native-webview";

import { useHideSplashWhenReady } from "./use-hide-splash-when-ready";

export function useWebViewController() {
  const webViewRef = useRef<WebView>(null);
  const [isReady, setIsReady] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [canGoBack, setCanGoBack] = useState(false);

  useHideSplashWhenReady(isReady);

  useEffect(() => {
    const subscription = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        if (!canGoBack) return false;

        webViewRef.current?.goBack();
        return true;
      },
    );

    return () => subscription.remove();
  }, [canGoBack]);

  const handleLoadStart = useCallback(() => {
    setHasError(false);
  }, []);

  const handleLoadEnd = useCallback(() => {
    setIsReady(true);
  }, []);

  const handleError = useCallback(() => {
    setHasError(true);
    setIsReady(true);
  }, []);

  const handleNavigationChange = useCallback((nextCanGoBack: boolean) => {
    setCanGoBack(nextCanGoBack);
  }, []);

  const retry = useCallback(() => {
    setHasError(false);
    setIsReady(false);
    webViewRef.current?.reload();
  }, []);

  return {
    webViewRef,
    hasError,
    handleError,
    handleLoadEnd,
    handleLoadStart,
    handleNavigationChange,
    retry,
  };
}
