import { inject ,Aurelia } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { PLATFORM } from 'aurelia-pal';
import { Poi, User , Location } from './poi-types';
import { HttpClient } from 'aurelia-http-client';
import { EventAggregator } from 'aurelia-event-aggregator';
import { TotalUpdate } from './messages';

@inject(HttpClient, EventAggregator, Aurelia, Router)
export class PoiService {
  users: Map<string, User> = new Map();
  usersById: Map<string, User> = new Map();
  pois: Poi[] = [];
  category = ['Castle', 'Forest'];
  total = 0;


  constructor(private httpClient: HttpClient, private ea: EventAggregator, private au: Aurelia, private router: Router) {
    httpClient.configure((http) => {
      http.withBaseUrl('http://localhost:3000');
    });
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
      this.usersById.set(user._id, user);
    });
  }

  async createPoi(name: string, description: string, category: string, link: string, author:string, location : Location) {
    const currentUser = await this.httpClient.get('/api/user/' + localStorage.localUser);
    let user = JSON.parse(currentUser.response)
    let id = user._id
    const poi = {
      name: name,
      description: description,
      category: category,
      link:link,
      author: id,
      location : location
    };
    const response = await this.httpClient.post('/api/user/'+ id +'/poi', poi);
    const newPoi = await response.content;
    this.pois.push(newPoi);
    this.ea.publish(new TotalUpdate(this.total, newPoi));
    this.changeRouter(PLATFORM.moduleName('app'))
  }

  async signup(firstName: string, lastName: string, email: string, password: string) {
    const user = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password
    };
    const response = await this.httpClient.post('/api/users', user);
    const newUser = await response.content;
    this.users.set(newUser.email, newUser);
    this.usersById.set(newUser._id, newUser);
    localStorage.localUser = email
    this.changeRouter(PLATFORM.moduleName('start'))
    return false;
  }

  async login(email: string, password: string) {
    let success = false;
    try {
      const response = await this.httpClient.post('/api/users/auth', { email: email, password: password });
      const status = await response.content;
      if (status.success) {
        this.httpClient.configure((configuration) => {
          configuration.withHeader('Authorization', 'bearer ' + status.token);
        });
        localStorage.pois = JSON.stringify(response.content)
        localStorage.list = JSON.stringify(response.content)
        localStorage.localUser = email
        await this.getUsers();
        await this.getPois();
        this.changeRouter(PLATFORM.moduleName('start'))
        success = status.success;
      }
    } catch (e) {
      success = false;
    }
    return success;
  }


  async loginAdmin(email: string, password: string) {
    let success = false;
    try {
      const response = await this.httpClient.post('/api/users/authAdmin', { email: email, password: password });
      const status = await response.content;
      if (status.success) {
        this.httpClient.configure((configuration) => {
          configuration.withHeader('Authorization', 'bearer ' + status.token);
        });
        localStorage.pois = JSON.stringify(response.content)
        localStorage.list = JSON.stringify(response.content)
        localStorage.localUser = email
        await this.getUsers();
        await this.getPois();
        this.changeRouter(PLATFORM.moduleName('appAdmin'))
        success = status.success;
      }
    } catch (e) {
      success = false;
    }
    return success;
  }


  logout() {
    localStorage.pois = null;
    localStorage.list = null;
    localStorage.localUser = null;
    this.httpClient.configure(configuration => {
      configuration.withHeader('Authorization', '');
    });
    this.changeRouter(PLATFORM.moduleName('start'));
  }


  checkIsAuthenticated() {
    let authenticated = false;
    if (localStorage.pois !== 'null') {
      authenticated = true;
      this.httpClient.configure(http => {
        const auth = JSON.parse(localStorage.pois);
        http.withHeader('Authorization', 'bearer ' + auth.token);
      });
      this.changeRouter(PLATFORM.moduleName('app'));
    }
  }
  changeRouter(module:string) {
    this.router.navigate('/', { replace: true, trigger: false });
    this.router.reset();
    this.au.setRoot(PLATFORM.moduleName(module));

  }


}


