import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './components/auth/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { ItemComponent } from './components/item/item.component';
import { ExpressionComponent } from './components/expression/expression.component';
import { MenuComponent } from './components/shared/menu/menu.component';

import { AuthenticatedUserGuard } from './guards/authenticated-user';

const routes: Routes = [
  {
    path: 'login',
    children: [
      { path: '', component: LoginComponent },
    ],
  },
  {
    path: 'home',
    children: [
      { path: '', component: HomeComponent },
      { path: '', component: MenuComponent, outlet: 'menu' },
      // { path: '', component: InternalFooterComponent, outlet: 'foot' },
    ],
    canActivate: [AuthenticatedUserGuard]
  },
  {
    path: 'category/:nombreCategoria',
    children: [
      { path: '', component: ItemComponent },
      { path: '', component: MenuComponent, outlet: 'menu' },
      // { path: '', component: InternalFooterComponent, outlet: 'foot' },
    ],
    canActivate: [AuthenticatedUserGuard]
  },
  {
    path: 'category/:nombreCategoria/item/:nombreItem',
    children: [
      { path: '', component: ExpressionComponent },
      { path: '', component: MenuComponent, outlet: 'menu' },
      // { path: '', component: InternalFooterComponent, outlet: 'foot' },
    ],
    canActivate: [AuthenticatedUserGuard]
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'login',
  }
];

export const routing = RouterModule.forRoot(routes);
