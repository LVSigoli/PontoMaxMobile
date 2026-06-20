import { Pressable, StyleSheet, Text, View } from "react-native";

import { BACKGROUND_COLOR, BRAND_BLUE } from "../constants";

type ErrorOverlayProps = {
  onRetry: () => void;
};

export function ErrorOverlay({ onRetry }: ErrorOverlayProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>PontoMax could not load.</Text>
      <Text style={styles.description}>
        Check your connection and try again.
      </Text>
      <Pressable onPress={onRetry} style={styles.retryButton}>
        <Text style={styles.retryButtonText}>Try again</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFill,
    alignItems: "center",
    backgroundColor: BACKGROUND_COLOR,
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  title: {
    color: "#0F172A",
    fontSize: 20,
    fontWeight: "700",
    textAlign: "center",
  },
  description: {
    color: "#475569",
    fontSize: 15,
    lineHeight: 22,
    marginTop: 10,
    textAlign: "center",
  },
  retryButton: {
    backgroundColor: BRAND_BLUE,
    borderRadius: 999,
    marginTop: 20,
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  retryButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700",
  },
});
