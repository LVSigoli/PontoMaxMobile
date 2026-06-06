import { Image } from 'expo-image';
import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';

import { PONTO_MAX_WEB_URL } from '@/constants/urls';

export default function HomeScreen() {
  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    window.location.replace(PONTO_MAX_WEB_URL);
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require('@/assets/images/splash-icon.png')}
        style={styles.logo}
        contentFit="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    flex: 1,
    justifyContent: 'center',
  },
  logo: {
    height: 140,
    width: 140,
  },
});
