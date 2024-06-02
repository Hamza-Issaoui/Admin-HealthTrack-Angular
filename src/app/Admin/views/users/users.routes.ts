import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Users'
    },
    children: [
      {
        path: '',
        loadComponent: () => import('./table-users/table-users.component').then(m => m.TableUsersComponent),
        data: {
          title: 'Users'
        }
      },
      {
        path: ':id',
        loadComponent: () => import('./user/user.component').then(m => m.UserComponent),
        data: {
          title: 'View'
        }
      },
      {
        path: 'update/:id',
        loadComponent: () => import('./user/user.component').then(m => m.UserComponent),
        data: {
          title: 'Update'
        }
      },
      {
        path: 'create',
        loadComponent: () => import('./user/user.component').then(m => m.UserComponent),
        data: {
          title: 'Create'
        }
      },
    ]
  }
];
