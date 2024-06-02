import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Notification'
    },
    children: [
      {
        path: '',
        loadComponent: () => import('./notifications/notifications.component').then(m => m.NotificationsComponent),
        data: {
          title: 'List Notifications'
        }
      },
/*       {
        path: 'update-user',
        loadComponent: () => import('./user/user.component').then(m => m.UserComponent),
        data: {
          title: 'Update'
        }
      },*/
      {
        path: 'create',
        loadComponent: () => import('./add-notif/add-notif.component').then(m => m.AddNotifComponent),
        data: {
          title: 'Create'
        }
      }, 
    ]
  }
];
