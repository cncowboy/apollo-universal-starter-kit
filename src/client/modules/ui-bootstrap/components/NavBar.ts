import { Component } from '@angular/core';

import settings from '../../../../../settings';
import modules from '../../../modules';

@Component({
  selector: 'nav-bar',
  template: `
    <nav class="navbar navbar-light bg-faded">
      <div class="container">
        <ul class="nav col-md-6 left-side">
          <menu-item>
            <nav-link [name]="'${settings.app.name}'" [to]="'/'" [className]="'navbar-brand active'"></nav-link>
          </menu-item>
          ${modules.navItems}
        </ul>
        <ul class="nav col-md-6 right-side">
          <li class="nav-item">
            <a href="/graphiql" class="nav-link">GraphiQL</a>
          </li>
          ${modules.navItemsRight}
        </ul>
      </div>
    </nav>`,
  styles: ['ul.right-side { display: block; }', 'ul.right-side li { float: right; display: inline-block; }']
})
export default class {}