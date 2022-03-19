import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    icon: 'icon-speedometer',
    badge: {
      variant: 'info',
      text: 'Nouveau'
    }
  },
  {
    name: 'Médecins',
    url: '/medecins',
    icon: 'icon-user',
    badge: {
      variant: 'info',
      text: 'Nouveau'
    }
  },
  {
    name: 'Pharmacies',
    url: '/pharmacie',
    icon: 'icon-heart',
    badge: {
      variant: 'info',
      text: 'Nouveau'
    }
  },
  {
    name: 'Agenda',
    url: '/agenda',
    icon: 'icon-calendar',
    badge: {
      variant: 'info',
      text: 'Nouveau'
    }
  }
];
