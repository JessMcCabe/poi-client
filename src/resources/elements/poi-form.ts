import { bindable } from 'aurelia-framework';
import { Poi } from '../../services/poi-types';

export class PoiForm {
  name: string;
  description: string;
  category: string;
  image: string;
  @bindable
  pois: Poi[];

  addPoi() {
    const poi = {
      name: this.name,
      description: this.description,
      category: this.category,
      image: this.image
    };
    this.pois.push(poi);
    console.log(poi);
  }
}
