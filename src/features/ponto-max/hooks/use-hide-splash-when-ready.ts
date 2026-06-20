import * as SplashScreen from "expo-splash-screen";
import { useEffect, useRef } from "react";

export function useHideSplashWhenReady(isReady: boolean) {
  const hasHiddenSplashRef = useRef(false);

  useEffect(() => {
    if (!isReady || hasHiddenSplashRef.current) return;

    hasHiddenSplashRef.current = true;
    SplashScreen.hide();
  }, [isReady]);
}
