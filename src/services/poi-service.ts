import { inject ,Aurelia } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { PLATFORM } from 'aurelia-pal';
import { Poi, User  } from './poi-types';
import { HttpClient } from 'aurelia-http-client';
import { EventAggregator } from 'aurelia-event-aggregator';
import { TotalUpdate } from './messages';

@inject(HttpClient, EventAggregator, Aurelia, Router)
export class PoiService {
  users: Map<string, User> = new Map();
  pois: Poi[] = [];
  category = ['Castle', 'Forest'];
  total = 0;


  constructor(private httpClient: HttpClient, private ea: EventAggregator, private au: Aurelia, private router: Router) {
    httpClient.configure(http => {
      http.withBaseUrl('http://localhost:3000');
    });
    this.getPois();
    this.getUsers();
  }
  async getPois() {
    const response = await this.httpClient.get('/api/poi');
    this.pois = await response.content;
    console.log (this.pois);
  }

  async getUsers() {
    const response = await this.httpClient.get('/api/users');
    const users = await response.content;
    users.forEach(user => {
      this.users.set(user.email, user);
    });
  }

  signup(firstName: string, lastName: string, email: string, password: string) {
    //this.changeRouter(PLATFORM.moduleName('app'))
    return false;
  }

  async login(email: string, password: string) {
    const user = this.users.get(email);
    if (user && (user.password === password)) {
      this.changeRouter(PLATFORM.moduleName('app'))
      return true;
    } else {
      return false;
    }
  }

    logout() {
      this.changeRouter(PLATFORM.moduleName('start'))
    }

    changeRouter(module:string) {
      this.router.navigate('/', { replace: true, trigger: false });
      this.router.reset();
      this.au.setRoot(PLATFORM.moduleName(module));
    }
  }
