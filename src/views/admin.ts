import { inject } from 'aurelia-framework';
import {Poi, User} from "../services/poi-types";
import { PoiService } from '../services/poi-service';

@inject(PoiService)
export class List {

  users: Map<string, User> = new Map();


  constructor(private ds: PoiService){
    this.users = ds.users;

  }


}
