import React from 'react';
import PropTypes from 'prop-types';
import { SimpleLineIcons } from '@expo/vector-icons';
import { StackNavigator } from 'react-navigation';
import { AsyncStorage } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { createTabBarIconWrapper } from '../../../common/components/native';
import Profile from './containers/Profile';
import Login from './containers/Login';
import Logout from '../../common/containers/Logout';
import UsersList from './containers/UsersList';
import resolvers from './resolvers';

import Feature from '../../../connector';

async function tokenMiddleware(req, options, next) {
  options.headers['x-token'] = await AsyncStorage.getItem('token');
  options.headers['x-refresh-token'] = await AsyncStorage.getItem('refreshToken');
  next();
}

async function tokenAfterware(res, options, next) {
  const token = options.headers['x-token'];
  const refreshToken = options.headers['x-refresh-token'];
  if (token) {
    await AsyncStorage.setItem('token', token);
  }
  if (refreshToken) {
    await AsyncStorage.setItem('refreshToken', refreshToken);
  }
  next();
}

async function connectionParam() {
  return {
    token: await AsyncStorage.getItem('token'),
    refreshToken: await AsyncStorage.getItem('refreshToken')
  };
}

class LoginScreen extends React.Component {
  static navigationOptions = () => ({
    title: 'Sign In'
  });
  render() {
    return <Login navigation={this.props.navigation} onLogin={() => this.props.navigation.navigate('Profile')} />;
  }
}

LoginScreen.propTypes = {
  navigation: PropTypes.object
};

class LogoutScreen extends React.Component {
  static navigationOptions = () => ({
    title: 'Logout'
  });
  render() {
    return <Logout navigation={this.props.navigation} />;
  }
}

LogoutScreen.propTypes = {
  navigation: PropTypes.object
};

class UsersLisScreen extends React.Component {
  static navigationOptions = () => ({
    title: 'Users'
  });
  render() {
    return <UsersList navigation={this.props.navigation} />;
  }
}

UsersLisScreen.propTypes = {
  navigation: PropTypes.object
};

class ProfileScreen extends React.Component {
  static navigationOptions = () => ({
    title: 'Profile'
  });
  render() {
    return <Profile navigation={this.props.navigation} />;
  }
}

ProfileScreen.propTypes = {
  navigation: PropTypes.object
};

export default new Feature({
  tabItem: {
    Profile: {
      screen: ProfileScreen,
      userInfo: {
        requiredLogin: true
      },
      navigationOptions: {
        tabBarIcon: createTabBarIconWrapper(SimpleLineIcons, {
          name: 'user',
          size: 30
        })
      }
    },
    Login: {
      screen: LoginScreen,
      userInfo: {
        requiredLogin: false
      },
      navigationOptions: {
        tabBarIcon: createTabBarIconWrapper(SimpleLineIcons, {
          name: 'login',
          size: 30
        })
      }
    },
    Users: {
      screen: UsersLisScreen,
      userInfo: {
        requiredLogin: true,
        role: 'admin'
      },
      navigationOptions: {
        tabBarIcon: createTabBarIconWrapper(Ionicons, {
          name: 'ios-browsers-outline',
          size: 30
        })
      }
    },
    Logout: {
      screen: LogoutScreen,
      userInfo: {
        requiredLogin: true
      },
      navigationOptions: {
        tabBarIcon: createTabBarIconWrapper(SimpleLineIcons, {
          name: 'logout',
          size: 30
        })
      }
    }
  },
  resolver: resolvers,
  middleware: tokenMiddleware,
  afterware: tokenAfterware,
  connectionParam: connectionParam
});