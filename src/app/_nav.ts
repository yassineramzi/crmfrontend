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
    name: 'Société',
    url: '/societe',
    icon: 'icon-home',
    badge: {
      variant: 'info',
      text: 'Nouveau'
    }
  }, 
  

  {
    name: 'Utilisateur',
    url: '/user',
    icon: 'icon-user',
    badge: {
      variant: 'info',
      text: 'Nouveau'
    }
  }, 

];
