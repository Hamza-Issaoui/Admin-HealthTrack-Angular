import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '404',
    loadComponent: () => import('./page404/page404.component').then(m => m.Page404Component),
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '500',
    loadComponent: () => import('./page500/page500.component').then(m => m.Page500Component),
    data: {
      title: 'Page 500'
    }
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.component').then(m => m.LoginComponent),
    data: {
      title: 'Login Page'
    }
  },
  {
    path: 'register',
    loadComponent: () => import('./register/register.component').then(m => m.RegisterComponent),
    data: {
      title: 'Register Page'
    }
  },
  {
    path: 'forgot-pass',
    loadComponent: () => import('./forgot-password/forgot-pass.component').then(m => m.ForgotPasswordComponent),
    data: {
      title: 'Forgot-Password Page'
    }
  },
  {
    path: 'reset-pass',
    loadComponent: () => import('./reset-pass/reset-pass.component').then(m => m.ResetPasswordComponent),
    data: {
      title: 'Reset-Password Page'
    }
  }
];
