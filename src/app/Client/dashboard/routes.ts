import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'home',
        loadComponent: () => import('./home/home.component').then(m => m.HomeComponent),
        data: {
          title: 'Home'
        }
      },
/*       {
        path: 'update-user',
        loadComponent: () => import('./user/user.component').then(m => m.UserComponent),
        data: {
          title: 'Update'
        }
      },*/
    
    ]
  }
];
