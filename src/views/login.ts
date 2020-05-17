import { inject } from 'aurelia-framework';
import { PoiService } from '../services/poi-service';

@inject(PoiService)
export class Login {
  email = 'marge@simpson.com';
  password = 'secret';

  constructor(private ds: PoiService) {}
  login(e) {
    console.log(`Trying to log in ${this.email}`);
    this.ds.login(this.email, this.password);

  }
}
