import React from 'react';
import {Platform, StatusBar, StyleSheet, View} from 'react-native';
import {AppLoading, Asset, Font, Icon} from 'expo';
import AppNavigator from './navigation/AppNavigator';
import store from './src/store';
import {connect, Provider} from 'react-redux';
import {_storeConfig} from './src/constants/SettingsManager';
import {CONFIG_PATH} from "./app.cofig";
import {fetchApi} from "./src/actions/config/api";

class App extends React.Component {

  state = {
    isLoadingComplete: false,
    isConfigLoadingComplete: false
  };

  async componentDidMount() {

    console.log("AAAAAA");

    this.props.dispatch(fetchApi()).then((rsp) => {
      console.log(rsp);
      // return rsp;
    });

    try {
      const configData = await fetch(CONFIG_PATH);
      const config = await configData.json();
      await (_storeConfig(config));
      this.setState({isConfigLoadingComplete: true})
    } catch (err) {
      console.log("Error fetching data-----------", err); //TODO
    }
  }

  render() {
    if (!this.state.isConfigLoadingComplete && !this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
          <AppLoading
              startAsync={this._loadResourcesAsync}
              onError={this._handleLoadingError}
              onFinish={this._handleFinishLoading}
          />
      );
    } else {
      return (
          <Provider store={store}>
            <View style={styles.container}>
              {Platform.OS === 'ios' && <StatusBar barStyle="default"/>}
              <AppNavigator/>
            </View>
          </Provider>
      );
    }
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        require('./assets/images/robot-dev.png'),
        require('./assets/images/robot-prod.png'),
      ]),
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Icon.Ionicons.font,
        // We include SpaceMono because we use it in HomeScreen.js. Feel free
        // to remove this if you are not using it in your app
        'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
      }),
    ]);
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({isLoadingComplete: true});
  };
}

// export default connect()(App);
export default (App);


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
