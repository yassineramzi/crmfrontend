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
  /*
  {
    name: 'Pharmacies',
    url: '/pharmacies',
    icon: 'icon-heart',
    badge: {
      variant: 'info',
      text: 'Nouveau'
    }
  },*/
  {
    name: 'Agenda',
    url: '/agenda',
    icon: 'icon-calendar',
    badge: {
      variant: 'info',
      text: 'Nouveau'
    }
  },
  {
    name: 'Paramétrage',
    url: '/settings',
    icon: 'icon-settings',
    badge: {
      variant: 'info',
      text: 'Nouveau'
    }
  },
  {
    name: 'Produits',
    url: '/produits',
    icon: 'icon-plus',
    badge: {
      variant: 'info',
      text: 'Nouveau'
    }
  },
];
