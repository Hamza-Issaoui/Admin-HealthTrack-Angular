import { Routes } from '@angular/router';
import { DefaultLayoutComponent } from './Admin/layout';
import { AuthGuard } from './shared/authGuard/authGard';


export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: '',
    canActivate : [AuthGuard],
    component: DefaultLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./Admin/views/dashboard/routes').then((m) => m.routes)
      },
     
      {
        path: 'base',
        loadChildren: () => import('./Admin/views/base/routes').then((m) => m.routes)
      },
      {
        path: 'buttons',
        loadChildren: () => import('./Admin/views/buttons/routes').then((m) => m.routes)
      },
      {
        path: 'forms',
        loadChildren: () => import('./Admin/views/forms/routes').then((m) => m.routes)
      },
      {
        path: 'icons',
        loadChildren: () => import('./Admin/views/icons/routes').then((m) => m.routes)
      },
      {
        path: 'notifications',
        loadChildren: () => import('./Admin/views/notifications/routes').then((m) => m.routes)
      },
      {
        path: 'widgets',
        loadChildren: () => import('./Admin/views/widgets/routes').then((m) => m.routes)
      },
      {
        path: 'charts',
        loadChildren: () => import('./Admin/views/charts/routes').then((m) => m.routes)
      },
      {
        path: 'pages',
        loadChildren: () => import('./Admin/views/pages/routes').then((m) => m.routes)
      },
      {
        path: 'users',
        loadChildren: () => import('./Admin/views/users/routes').then((m) => m.routes)
      },
      {
        path: 'notifs',
        loadChildren: () => import('./Admin/views/notifs/routes').then((m) => m.routes)
      },
    ]
  },
  {
    path: '404',
    loadComponent: () => import('./Admin/views/pages/page404/page404.component').then(m => m.Page404Component),
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '500',
    loadComponent: () => import('./Admin/views/pages/page500/page500.component').then(m => m.Page500Component),
    data: {
      title: 'Page 500'
    }
  },
  {
    path: 'login',
    loadComponent: () => import('./Admin/views/pages/login/login.component').then(m => m.LoginComponent),
    data: {
      title: 'Login Page'
    }
  },
  {
    path: 'register',
    loadComponent: () => import('./Admin/views/pages/register/register.component').then(m => m.RegisterComponent),
    data: {
      title: 'Register Page'
    }
  },
  {
    path: 'forgot-pass',
    loadComponent: () => import('./Admin/views/pages//forgot-password/forgot-pass.component').then(m => m.ForgotPasswordComponent),
    data: {
      title: 'Forgot-Password Page'
    }
  },
  {
    path: 'reset-pass',
    loadComponent: () => import('./Admin/views/pages//reset-pass/reset-pass.component').then(m => m.ResetPasswordComponent),
    data: {
      title: 'Reset-Password Page'
    }
  },
  {
    path: 'home',
    loadComponent: () => import('./Client/dashboard/home/home.component').then(m => m.HomeComponent),
    data: {
      title: 'Home Page'
    }
  },
  { path: '**', redirectTo: 'dashboard' }
];
