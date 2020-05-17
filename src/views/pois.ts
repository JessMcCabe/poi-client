import { inject } from 'aurelia-framework';
import { Poi } from "../services/poi-types";
import { PoiService } from '../services/poi-service';

@inject(PoiService)
export class Pois {
  pois: Poi[] = [];
  category = ['Castle', 'Forest'];

  constructor(private ds: PoiService){
    this.pois = ds.pois;
    this.category = ds.category;
  }
}
