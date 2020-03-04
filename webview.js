import React from 'react';
import {SafeAreaView, StyleSheet, Linking} from 'react-native';
import {WebView} from 'react-native-webview';
import {
  Appbar,
  DefaultTheme,
  Provider as PaperProvider,
} from 'react-native-paper';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F0F0',
  },
});

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#5546A5',
    accent: '#f1c40f',
  },
  roundness: 20,
};

export default function MyWebComponent({route, navigation}) {
  return (
    <PaperProvider theme={theme}>
      <SafeAreaView style={styles.container}>
        <Appbar.Header style={{backgroundColor: '#5546A5'}}>
          <Appbar.BackAction onPress={() => navigation.popToTop()} />
          <Appbar.Content title="PrestanceApp" />
          <Appbar.Action
            icon="open-in-app"
            onPress={() => {
              Linking.openURL(route.params.url).catch(err => {
                alert('Erreur!');
              });
            }}
          />
          <Appbar.Action
            icon="card-text-outline"
            onPress={() =>
              navigation.replace('ReaderScreen', {url: route.params.url})
            }
          />
          <Appbar.Action icon="dots-vertical" />
        </Appbar.Header>
        <WebView source={{uri: route.params.url}} />
      </SafeAreaView>
    </PaperProvider>
  );
}
