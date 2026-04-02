import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.spectre.io',
  appName: 'spectre.io',
  webDir: 'dist',
  server: {
    url: 'https://slither.io',
    androidScheme: 'https'
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 0
    },
    LiveUpdates: {
      appId: 'db63dc52',
      channel: 'Production',
      autoUpdateMethod: 'background',
      maxVersions: 2
    }
  }
};

export default config;
