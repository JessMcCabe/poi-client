import { bindable } from 'aurelia-framework';
import { User } from '../../services/poi-types';

export class UserList {
  @bindable
  users: User;
}
