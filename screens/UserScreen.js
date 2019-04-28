import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import UserLoginView from '../src/containers/user/UserLoginView';
import UserRegistrationView from '../src/containers/user/UserRegistrationView';
import {getUser, logout} from "../src/actions/user";
import CenteredLoadingIdicator from '../src/components/core/CenteredLoadingIdicator';
import {Button} from 'react-native-elements';
import {connect} from "react-redux";
import UserOrdersList from "../src/containers/user/UserOrdersList";
import UserLocalOrdersList from "../src/containers/user/UserLocalOrdersList"

export const REGISTER_PAGE = "register";
export const LOGIN_PAGE = "login";
export const LIST_PAGE = "list";

class UserScreen extends React.Component {

  static navigationOptions = ({navigation}) => {
    return {
      title: 'Профиль',
      headerRight: (
          <LogOutButton params={navigation.state.params}/>
      ),
    }
  };

  constructor() {
    super();
    this.state = {
      activePage: null,
      user: null
    };
  }

  componentDidMount() {
    this.userLogin();
  }

  userLogout = () => {
    this.props.dispatch(logout()).then(() => {
      this.setState({user: null, activePage: LOGIN_PAGE})
      this.props.navigation.setParams({
        user: null
      });
    });
  };

  userLogin = () => {
    getUser().then(user => {
      let activePage = LOGIN_PAGE;

      if (user) {
        activePage = LIST_PAGE;
      }

      this.setState({activePage, user});

      this.props.navigation.setParams({
        user: user,
        userLogout: this.userLogout
      });
    });
  };

  changeActivePage = (activePage) => {
    this.setState({activePage})
  };

  render() {
    const {navigation} = this.props;
    return (
        <ScrollView style={styles.container}>
          {this.state.activePage &&
          this.state.activePage === LOGIN_PAGE &&
          <UserLoginView navigation={navigation} userLogin={this.userLogin} changeActivePage={this.changeActivePage}/>}

          {this.state.activePage &&
          this.state.activePage === REGISTER_PAGE &&
          <UserRegistrationView navigation={navigation} userLogin={this.userLogin}
                                changeActivePage={this.changeActivePage}/>
          }
          {this.state.activePage &&
          this.state.activePage === LIST_PAGE &&
          this.state.user &&
          <UserOrdersList navigation={navigation}/>
          }
          {this.state.activePage &&
          this.state.activePage !== LIST_PAGE &&
          <UserLocalOrdersList navigation={navigation}/>
          }

          {!this.state.activePage && <CenteredLoadingIdicator/>}
        </ScrollView>
    );
  }
}

export default connect()(UserScreen);


const LogOutButton = ({params}) => {
  return <View>
    {params && params.user && <Button
        onPress={() => params.userLogout()}
        title="Выйти"
        style={styles.logoutButton}
    />}
  </View>
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
  logoutButton: {
    color: "#FFF",
    paddingRight: 5
  }
});
