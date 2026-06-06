import { useEffect } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

import { PONTO_MAX_WEB_URL } from '@/constants/urls';

const BRAND_BLUE = '#155DFC';

export default function HomeScreen() {
  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    window.location.replace(PONTO_MAX_WEB_URL);
  }, []);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={BRAND_BLUE} />
      <Text style={styles.text}>Opening PontoMax</Text>
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
  text: {
    color: '#0F172A',
    fontSize: 15,
    fontWeight: '600',
    marginTop: 14,
  },
});
