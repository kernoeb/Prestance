import ReaderView from 'react-native-reader';
import React from 'react';
import {
  Appbar,
  DefaultTheme,
  Provider as PaperProvider,
} from 'react-native-paper';
import {SafeAreaView, StyleSheet} from 'react-native';

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

export default function ReaderScreen({route, navigation}) {
  return (
    <PaperProvider theme={theme}>
      <SafeAreaView style={styles.container}>
        <Appbar.Header style={{backgroundColor: '#5546A5'}}>
          <Appbar.BackAction onPress={() => navigation.popToTop()} />
          <Appbar.Content title="PrestanceApp" />
          <Appbar.Action
            icon="web"
            onPress={() =>
              navigation.replace('WebView', {url: route.params.url})
            }
          />
          <Appbar.Action icon="dots-vertical" />
        </Appbar.Header>
        <ReaderView url={route.params.url} />
      </SafeAreaView>
    </PaperProvider>
  );
}
