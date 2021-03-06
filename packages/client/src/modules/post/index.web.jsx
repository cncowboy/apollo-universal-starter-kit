import React from 'react';
import { Route, NavLink } from 'react-router-dom';
import translate from '../../i18n';

import { MenuItem } from '../../modules/common/components/web';
import Post from './containers/Post';
import PostEdit from './containers/PostEdit';
import resources from './locales';
import resolvers from './resolvers';
import Feature from '../connector';

const MenuItemWithI18n = translate()(({ t }) => (
  <MenuItem key="/posts">
    <NavLink to="/posts" className="nav-link" activeClassName="active">
      {t('post:navLink')}
    </NavLink>
  </MenuItem>
));

export default new Feature({
  route: [<Route exact path="/posts" component={Post} />, <Route exact path="/post/:id" component={PostEdit} />],
  navItem: <MenuItemWithI18n />,
  resolver: resolvers,
  localization: { ns: 'post', resources }
});
