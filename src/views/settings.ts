import { inject } from 'aurelia-framework';
import { PoiService } from '../services/poi-service';

@inject(PoiService)
export class Settings {
  firstName = '';
  lastName = '';
  email = '';
  password = '';
  prompt = '';
  deactivate = false;
  constructor(private ds: PoiService) {}

  settings(e) {
    console.log(`Trying to update account details for user ${this.email}`);
    const success = this.ds.settings(this.firstName, this.lastName, this.email, this.password, this.deactivate);
    if (!success) {
      this.prompt = 'Oops! Try again...';
    }
  }
}
