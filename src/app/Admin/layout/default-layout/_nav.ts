import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Home',
    url: '/admin/home',
    iconComponent: { name: 'cil-home' },
  },
  {
    name: 'Users',
    url: '/admin/users',
    iconComponent: { name: 'cil-user' }
  },
  {
    name: 'Notification',
    url: '/admin/notifications',
    iconComponent: { name: 'cil-bell' }
  },

];
