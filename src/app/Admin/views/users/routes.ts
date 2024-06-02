import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Users'
    },
    children: [
      {
        path: 'users',
        loadComponent: () => import('./table-users/table-users.component').then(m => m.TableUsersComponent),
        data: {
          title: 'Users'
        }
      },
      {
        path: 'update-user',
        loadComponent: () => import('./user/user.component').then(m => m.UserComponent),
        data: {
          title: 'Update'
        }
      },
      {
        path: 'add-user',
        loadComponent: () => import('./add-user/add-user.component').then(m => m.AddUserComponent),
        data: {
          title: 'Create'
        }
      },
    ]
  }
];
