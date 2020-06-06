import { RouterConfiguration, Router } from 'aurelia-router';
import { PLATFORM } from 'aurelia-pal';

export class App {

  router: Router;

  configureRouter(config: RouterConfiguration, router: Router) {
    config.map([
      {
        route: ['', 'poi'],
        name: 'Poi',
        moduleId: PLATFORM.moduleName('views/pois'),
        nav: true,
        title: 'POI'
      },
      {
        route: 'map',
        name: 'map',
        moduleId: PLATFORM.moduleName('views/map'),
        nav: true,
        title: 'Map'
      },
      {
        route: 'list',
        name: 'List',
        moduleId: PLATFORM.moduleName('views/list'),
        nav: true,
        title: 'List'
      },
      {
        route: 'settings',
        name: 'settings',
        moduleId: PLATFORM.moduleName('views/settings'),
        nav: true,
        title: 'Settings'
      },
      {
        route: 'logout',
        name: 'logout',
        moduleId: PLATFORM.moduleName('views/logout'),
        nav: true,
        title: 'Logout'
      },
    ]);
    this.router = router;
  }



}
