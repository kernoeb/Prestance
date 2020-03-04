import * as React from 'react';
import {useEffect, useState} from 'react';
import {
  Appbar,
  Avatar,
  Button,
  Card,
  DefaultTheme,
  Dialog,
  FAB,
  Menu,
  Modal,
  Paragraph,
  Portal,
  Provider as PaperProvider,
  Searchbar,
  Title,
} from 'react-native-paper';

import DrawerView from './components/DrawerView';

import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';

import MyWebComponent from './webview.js';
import ReaderScreen from './reader.js';

import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';

import {
  ActivityIndicator,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';

import * as rssParser from 'react-native-rss-parser';

// Decode values
let map = {
  "'": '&apos;',
  '<': '&lt;',
  '>': '&gt;',
  ' ': '&nbsp;',
  '¡': '&iexcl;',
  '¢': '&cent;',
  '£': '&pound;',
  '¤': '&curren;',
  '¥': '&yen;',
  '¦': '&brvbar;',
  '§': '&sect;',
  '¨': '&uml;',
  '©': '&copy;',
  ª: '&ordf;',
  '«': '&laquo;',
  '¬': '&not;',
  '®': '&reg;',
  '¯': '&macr;',
  '°': '&deg;',
  '±': '&plusmn;',
  '²': '&sup2;',
  '³': '&sup3;',
  '´': '&acute;',
  µ: '&micro;',
  '¶': '&para;',
  '·': '&middot;',
  '¸': '&cedil;',
  '¹': '&sup1;',
  º: '&ordm;',
  '»': '&raquo;',
  '¼': '&frac14;',
  '½': '&frac12;',
  '¾': '&frac34;',
  '¿': '&iquest;',
  À: '&Agrave;',
  Á: '&Aacute;',
  Â: '&Acirc;',
  Ã: '&Atilde;',
  Ä: '&Auml;',
  Å: '&Aring;',
  Æ: '&AElig;',
  Ç: '&Ccedil;',
  È: '&Egrave;',
  É: '&Eacute;',
  Ê: '&Ecirc;',
  Ë: '&Euml;',
  Ì: '&Igrave;',
  Í: '&Iacute;',
  Î: '&Icirc;',
  Ï: '&Iuml;',
  Ð: '&ETH;',
  Ñ: '&Ntilde;',
  Ò: '&Ograve;',
  Ó: '&Oacute;',
  Ô: '&Ocirc;',
  Õ: '&Otilde;',
  Ö: '&Ouml;',
  '×': '&times;',
  Ø: '&Oslash;',
  Ù: '&Ugrave;',
  Ú: '&Uacute;',
  Û: '&Ucirc;',
  Ü: '&Uuml;',
  Ý: '&Yacute;',
  Þ: '&THORN;',
  ß: '&szlig;',
  à: '&agrave;',
  á: '&aacute;',
  â: '&acirc;',
  ã: '&atilde;',
  ä: '&auml;',
  å: '&aring;',
  æ: '&aelig;',
  ç: '&ccedil;',
  è: '&egrave;',
  é: '&eacute;',
  ê: '&ecirc;',
  ë: '&euml;',
  ì: '&igrave;',
  í: '&iacute;',
  î: '&icirc;',
  ï: '&iuml;',
  ð: '&eth;',
  ñ: '&ntilde;',
  ò: '&ograve;',
  ó: '&oacute;',
  ô: '&ocirc;',
  õ: '&otilde;',
  ö: '&ouml;',
  '÷': '&divide;',
  ø: '&oslash;',
  ù: '&ugrave;',
  ú: '&uacute;',
  û: '&ucirc;',
  ü: '&uuml;',
  ý: '&yacute;',
  þ: '&thorn;',
  ÿ: '&yuml;',
  Œ: '&OElig;',
  œ: '&oelig;',
  Š: '&Scaron;',
  š: '&scaron;',
  Ÿ: '&Yuml;',
  ƒ: '&fnof;',
  ˆ: '&circ;',
  '˜': '&tilde;',
  Α: '&Alpha;',
  Β: '&Beta;',
  Γ: '&Gamma;',
  Δ: '&Delta;',
  Ε: '&Epsilon;',
  Ζ: '&Zeta;',
  Η: '&Eta;',
  Θ: '&Theta;',
  Ι: '&Iota;',
  Κ: '&Kappa;',
  Λ: '&Lambda;',
  Μ: '&Mu;',
  Ν: '&Nu;',
  Ξ: '&Xi;',
  Ο: '&Omicron;',
  Π: '&Pi;',
  Ρ: '&Rho;',
  Σ: '&Sigma;',
  Τ: '&Tau;',
  Υ: '&Upsilon;',
  Φ: '&Phi;',
  Χ: '&Chi;',
  Ψ: '&Psi;',
  Ω: '&Omega;',
  α: '&alpha;',
  β: '&beta;',
  γ: '&gamma;',
  δ: '&delta;',
  ε: '&epsilon;',
  ζ: '&zeta;',
  η: '&eta;',
  θ: '&theta;',
  ι: '&iota;',
  κ: '&kappa;',
  λ: '&lambda;',
  μ: '&mu;',
  ν: '&nu;',
  ξ: '&xi;',
  ο: '&omicron;',
  π: '&pi;',
  ρ: '&rho;',
  ς: '&sigmaf;',
  σ: '&sigma;',
  τ: '&tau;',
  υ: '&upsilon;',
  φ: '&phi;',
  χ: '&chi;',
  ψ: '&psi;',
  ω: '&omega;',
  ϑ: '&thetasym;',
  ϒ: '&Upsih;',
  ϖ: '&piv;',
  '–': '&ndash;',
  '—': '&mdash;',
  '‘': '&lsquo;',
  '’': '&rsquo;',
  '‚': '&sbquo;',
  '“': '&ldquo;',
  '”': '&rdquo;',
  '„': '&bdquo;',
  '†': '&dagger;',
  '‡': '&Dagger;',
  '•': '&bull;',
  '…': '&hellip;',
  '‰': '&permil;',
  '′': '&prime;',
  '″': '&Prime;',
  '‹': '&lsaquo;',
  '›': '&rsaquo;',
  '‾': '&oline;',
  '⁄': '&frasl;',
  '€': '&euro;',
  ℑ: '&image;',
  '℘': '&weierp;',
  ℜ: '&real;',
  '™': '&trade;',
  ℵ: '&alefsym;',
  '←': '&larr;',
  '↑': '&uarr;',
  '→': '&rarr;',
  '↓': '&darr;',
  '↔': '&harr;',
  '↵': '&crarr;',
  '⇐': '&lArr;',
  '⇑': '&UArr;',
  '⇒': '&rArr;',
  '⇓': '&dArr;',
  '⇔': '&hArr;',
  '∀': '&forall;',
  '∂': '&part;',
  '∃': '&exist;',
  '∅': '&empty;',
  '∇': '&nabla;',
  '∈': '&isin;',
  '∉': '&notin;',
  '∋': '&ni;',
  '∏': '&prod;',
  '∑': '&sum;',
  '−': '&minus;',
  '∗': '&lowast;',
  '√': '&radic;',
  '∝': '&prop;',
  '∞': '&infin;',
  '∠': '&ang;',
  '∧': '&and;',
  '∨': '&or;',
  '∩': '&cap;',
  '∪': '&cup;',
  '∫': '&int;',
  '∴': '&there4;',
  '∼': '&sim;',
  '≅': '&cong;',
  '≈': '&asymp;',
  '≠': '&ne;',
  '≡': '&equiv;',
  '≤': '&le;',
  '≥': '&ge;',
  '⊂': '&sub;',
  '⊃': '&sup;',
  '⊄': '&nsub;',
  '⊆': '&sube;',
  '⊇': '&supe;',
  '⊕': '&oplus;',
  '⊗': '&otimes;',
  '⊥': '&perp;',
  '⋅': '&sdot;',
  '⌈': '&lceil;',
  '⌉': '&rceil;',
  '⌊': '&lfloor;',
  '⌋': '&rfloor;',
  '⟨': '&lang;',
  '⟩': '&rang;',
  '◊': '&loz;',
  '♠': '&spades;',
  '♣': '&clubs;',
  '♥': '&hearts;',
  '♦': '&diams;',
};

function decodeAscii(string) {
  var entityMap = map;
  for (var key in entityMap) {
    var entity = entityMap[key];
    var regex = new RegExp(entity, 'g');
    string = string.replace(regex, key);
  }
  string = string.replace(/&quot;/g, '"');
  string = string.replace(/&amp;/g, '&');
  return string;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F0F0',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: '#5546A5',
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

function Main({navigation}) {
  const [val, setValues] = useState(null);
  const [searchBar, setSearchBar] = useState(false);
  const [query, setQuery] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [menu, setMenu] = useState(false);
  const [modal, setModal] = useState(false);
  const [dialog, setDialog] = useState(false);

  const [nomFlux, setNomFlux] = useState('');
  const [urlFlux, setURLFlux] = useState('');

  const HAS_LAUNCHED = '@hasLaunched';

  useEffect(() => {
    async function testLaunch() {
      checkIfFirstLaunch().then(v => {
        console.log('Premier démarrage' + v);
        if (v) {
          setFirst().then(() => {
            getRss('', false);
          });
        } else {
          getRss('', false);
        }
      });
    }

    testLaunch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function addFluxToStorage(nom, url) {
    AsyncStorage.getItem('@newsSources').then(async journaux => {
      let j = JSON.parse(journaux);
      j.push({
        title: nom,
        flux: url,
        icon: null,
      });
      await AsyncStorage.setItem('@newsSources', JSON.stringify(j));
    });
  }

  async function setFirst() {
    await AsyncStorage.setItem(HAS_LAUNCHED, 'true');
    await AsyncStorage.setItem(
      '@newsSources',
      JSON.stringify([
        {
          title: 'Ouest France',
          flux: 'https://www.ouest-france.fr/rss.xml',
          icon:
            'https://podcasts.ouest-france.fr/attachments/images/channel/1/itunes.png',
        },
        {
          title: 'France TV Info',
          flux: 'https://www.francetvinfo.fr/titres.rss',
          icon: 'https://www.francetvinfo.fr/favicon.ico',
        },
      ]),
    );
  }

  async function checkIfFirstLaunch() {
    try {
      const value = await AsyncStorage.getItem(HAS_LAUNCHED);

      if (value === null) {
        return true;
      }
      return false;
    } catch (e) {
      return false;
    }
  }

  function callback(values) {
    console.log('Set values OK');
    setValues(values);
    setRefreshing(false);
    setLoading(false);
  }

  function getRss(search, ptr) {
    if (ptr) {
      setRefreshing(true);
    }

    AsyncStorage.getItem('@newsSources').then(journaux => {
      let v = [];
      let inc = 0;

      let j = JSON.parse(journaux);

      j.forEach(a => {
        fetch(a.flux)
          .then(response => response.text())
          .then(responseData => rssParser.parse(responseData))
          .then(rss => {
            rss.items.forEach(r => {
              if (r.title.toUpperCase().includes(search.toUpperCase())) {
                v.push({
                  titleNews: a.title,
                  icon: a.icon,
                  titleArticle: decodeAscii(r.title),
                  published: r.published,
                  description: decodeAscii(r.description),
                  img: r.enclosures[0].url,
                  url: r.links[0].url,
                });
              }
            });

            inc++;
            if (inc === j.length) {
              v.sort(function(b1, b2) {
                b1 = new Date(b1.published);
                b2 = new Date(b2.published);
                return b1 > b2 ? -1 : b1 < b2 ? 1 : 0;
              });
              callback(v);
            }
          });
      });
    });
  }

  function dateFormatted(date) {
    const d = new Date(date);
    const months = [
      'Janvier',
      'Février',
      'Mars',
      'Avril',
      'Mai',
      'Juin',
      'Juillet',
      'Août',
      'Septembre',
      'Octobre',
      'Novembre',
      'Décembre',
    ];
    return (
      ('0' + d.getDate()).slice(-2) +
      ' ' +
      months[d.getMonth()] +
      ' ' +
      d.getFullYear() +
      ' | ' +
      ('0' + d.getHours()).slice(-2) +
      ':' +
      ('0' + d.getMinutes()).slice(-2)
    );
  }

  function getJson() {
    fetch('https://bonjourmadame.ml/test.json')
      .then(response => response.json())
      .then(responseJson => {
        console.log('Chargement des données');
        setValues(responseJson.values);
      })
      .catch(error => {
        console.error(error);
      });
  }

  var goToTop;

  return (
    <PaperProvider theme={theme}>
      <Portal>
        <Modal visible={modal} onDismiss={() => setModal(false)}>
          <View>
            <Searchbar
              onChangeText={u => {
                setNomFlux(u);
              }}
              value={nomFlux}
              icon="text"
              placeholder="Nom du flux"
              inputStyle={{fontSize: 18}}
              style={{marginLeft: 10, marginRight: 10, marginBottom: 10}}
            />
            <Searchbar
              icon="web"
              onChangeText={n => {
                setURLFlux(n);
              }}
              value={urlFlux}
              placeholder="URL du flux"
              inputStyle={{fontSize: 18}}
              style={{marginLeft: 10, marginRight: 10, marginBottom: 10}}
            />
            <Button
              icon="check"
              mode="contained"
              style={{marginLeft: 110, marginRight: 110}}
              onPress={async () => {
                addFluxToStorage(nomFlux, urlFlux).then(() => {
                  setModal(false);
                  getRss('', false);
                });
              }}>
              Valider
            </Button>
          </View>
        </Modal>
      </Portal>

      <Portal>
        <Dialog visible={dialog} onDismiss={() => setDialog(false)}>
          <Dialog.Title>Bref</Dialog.Title>
          <Dialog.Content>
            <Paragraph>Souhaitez-vous supprimer cet article ?</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setDialog(false)}>Non</Button>
            <Button onPress={() => setDialog(false)}>Oui</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>

      <SafeAreaView style={styles.container}>
        <Appbar.Header style={{backgroundColor: '#5546A5'}}>
          {!searchBar && (
            <Appbar.Content
              title="PrestanceApp"
              onPress={() => goToTop.scrollTo({x: 0})}
              style={{flex: 1}}
            />
          )}
          {searchBar && (
            <Searchbar
              onChangeText={query => {
                setQuery(query);
              }}
              value={query}
              placeholder="Search"
              onIconPress={() => getRss(query, false)}
              inputStyle={{fontSize: 12, padding: 5}}
              style={{flex: 1, height: 30, marginLeft: 10}}
            />
          )}
          {!searchBar ? (
            <Appbar.Action
              icon="magnify"
              onPress={() => {
                setSearchBar(!searchBar);
              }}
            />
          ) : (
            <Appbar.Action
              icon="close"
              onPress={() => {
                setSearchBar(!searchBar);
              }}
            />
          )}
          <Menu
            visible={menu}
            onDismiss={() => setMenu(false)}
            anchor={
              <Appbar.Action
                icon="dots-vertical"
                color="#FFFFFF"
                onPress={() => setMenu(true)}
              />
            }>
            <Menu.Item onPress={() => {}} title="Ajouter un flux" />
            <Menu.Item onPress={() => {}} title="Paramètres" />
            <Menu.Item onPress={() => {}} title="Crédits" />
          </Menu>
        </Appbar.Header>

        {loading && (
          <ActivityIndicator
            style={{marginTop: 50}}
            size="large"
            color="#0000ff"
          />
        )}
        <ScrollView
          ref={ref => (goToTop = ref)}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => getRss('', true)}
            />
          }>
          {val &&
            val.map((c, index) => {
              return [
                <View key={index++} style={{padding: 10}}>
                  <Card
                    onPress={() => {
                      navigation.push('WebView', {url: c.url});
                    }}
                    onLongPress={() => {
                      setDialog(true);
                      console.log(c.titleNews);
                    }}
                    style={{marginBottom: 0}}>
                    <Card.Title
                      title={c.titleNews}
                      subtitle={dateFormatted(c.published)}
                      left={props => (
                        <Avatar.Image
                          {...props}
                          style={{backgroundColor: 'white'}}
                          source={{uri: c.icon}}
                        />
                      )}
                    />
                    <Card.Content>
                      <Title style={{textAlign: 'justify', lineHeight: 23}}>
                        {c.titleArticle}
                      </Title>
                      <Paragraph style={{textAlign: 'justify'}}>
                        {c.description}
                      </Paragraph>
                    </Card.Content>
                    <Card.Cover style={{marginTop: 10}} source={{uri: c.img}} />
                  </Card>
                </View>,
              ];
            })}
        </ScrollView>
        <FAB
          style={styles.fab}
          small={false}
          icon="plus"
          onPress={() => setModal(true)}
        />
      </SafeAreaView>
    </PaperProvider>
  );
}

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function DrawerApp() {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={props => <DrawerView values="" />}>
      <Drawer.Screen name="Home" component={Main} />
    </Drawer.Navigator>
  );
}

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Home" component={DrawerApp} />
        <Stack.Screen name="WebView" component={MyWebComponent} />
        <Stack.Screen name="ReaderScreen" component={ReaderScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
