import React from 'react';
import {Image, StyleSheet} from 'react-native';

import {Drawer} from 'react-native-paper';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function DrawerView(props) {
  console.log(props.values);
  return (
    <DrawerContentScrollView {...props}>
      <Drawer.Section style={styles.drawerSection}>
        <DrawerItem
          icon={({color, size}) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          )}
          label="Accueil"
          onPress={() => navigation.jumpTo('WebView')}
        />
        <DrawerItem
          icon={({color, size}) => (
            <MaterialCommunityIcons
              name="arrow-right-bold-circle-outline"
              color={color}
              size={size}
            />
          )}
          label="Crédits"
          onPress={() => navigation.jumpTo('WebView')}
        />
      </Drawer.Section>
    </DrawerContentScrollView>
  );
}
const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    marginTop: 20,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});
