import { Route } from '@angular/router';
import { MainLayoutComponent } from './layout/app-layout/main-layout/main-layout.component';
import { AuthGuard } from '@core/guard/auth.guard';
import { AuthLayoutComponent } from './layout/app-layout/auth-layout/auth-layout.component';
import { Page404Component } from './authentication/page404/page404.component';
import { TableComponent } from '@shared/components/table/table.component';
import { PortComponent } from './pages/ports/ports.component';

export const APP_ROUTE: Route[] = [
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: '/authentication/signin', pathMatch: 'full' },
      {path:'table',redirectTo:'ports',title:'table'},
      {path:'ports',component:PortComponent,title:'ports'},
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./dashboard/dashboard.routes').then((m) => m.DASHBOARD_ROUTE),
      },
      {
        path: 'advance-table',
        loadChildren: () =>
          import('./advance-table/advance-table.routes').then(
            (m) => m.ADVANCE_TABLE_ROUTE
          ),
      },
      {
        path: 'extra-pages',
        loadChildren: () =>
          import('./extra-pages/extra-pages.routes').then(
            (m) => m.EXTRA_PAGES_ROUTE
          ),
      },
      {
        path: 'multilevel',
        loadChildren: () =>
          import('./multilevel/multilevel.routes').then(
            (m) => m.MULTILEVEL_ROUTE
          ),
      },
      {
        path:'info',
        loadChildren: () => 
          import('./add-basic-info/add-basic.routes').then((m)=>m.ADD_BASIC_INFO_ROUTE)
      },
      {
        path:'declarAccount',
        loadChildren: ()=>
          import('./declar-accounts/declar.routes').then((m)=>m.DECLAR_ROUTES)
      },
      {
        path:'makeOrder',
        loadChildren:()=>
          import('./make-order/make-order.routes').then((m)=>m.ADD_Make_Order_ROUTES)
      }
    ],
  },
  {
    path: 'authentication',
    component: AuthLayoutComponent,
    loadChildren: () =>
      import('./authentication/auth.routes').then((m) => m.AUTH_ROUTE),
  },
  { path: '**', component: Page404Component },
];
