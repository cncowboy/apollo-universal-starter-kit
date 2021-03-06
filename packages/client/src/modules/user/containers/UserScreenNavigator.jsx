import { DrawerNavigator } from 'react-navigation';
import React from 'react';
import PropTypes from 'prop-types';
import { pickBy } from 'lodash';
import { withUser } from './Auth';
import { DrawerComponent } from '../../common/components/native';

class UserScreenNavigator extends React.Component {
  static propTypes = {
    currentUser: PropTypes.object,
    currentUserLoading: PropTypes.bool.isRequired,
    routeConfigs: PropTypes.object
  };

  navItemsFilter = () => {
    const { currentUser, currentUserLoading, routeConfigs } = this.props;

    const userFilter = value => {
      if (!value.userInfo) return true;
      const { showOnLogin, role } = value.userInfo;
      return showOnLogin && (!role || (Array.isArray(role) ? role : [role]).includes(currentUser.role));
    };

    const guestFilter = value => !value.userInfo || (value.userInfo && !value.userInfo.showOnLogin);

    return pickBy(routeConfigs, currentUser && !currentUserLoading ? userFilter : guestFilter);
  };

  getInitialRoute = () => {
    const { currentUser } = this.props;
    return currentUser ? 'Profile' : 'Counter';
  };

  render() {
    const MainScreenNavigatorComponent = DrawerNavigator(
      { ...this.navItemsFilter() },
      {
        contentComponent: DrawerComponent,
        initialRouteName: this.getInitialRoute()
      }
    );

    return <MainScreenNavigatorComponent />;
  }
}

const drawerNavigator = routeConfigs => {
  const withRoutes = Component => {
    const ownProps = { routeConfigs };
    const WithRoutesComponent = ({ ...props }) => <Component {...props} {...ownProps} />;
    return WithRoutesComponent;
  };

  return withRoutes(withUser(UserScreenNavigator));
};

export default drawerNavigator;
