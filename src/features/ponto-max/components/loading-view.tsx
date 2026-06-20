import { Image } from "expo-image";
import { StyleSheet, View } from "react-native";

import { BACKGROUND_COLOR } from "../constants";

export function LoadingView() {
  return (
    <View style={styles.container}>
      <Image
        source={require("@/assets/images/splash-icon.png")}
        style={styles.logo}
        contentFit="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFill,
    alignItems: "center",
    backgroundColor: BACKGROUND_COLOR,
    justifyContent: "center",
  },
  logo: {
    height: 140,
    width: 140,
  },
});
