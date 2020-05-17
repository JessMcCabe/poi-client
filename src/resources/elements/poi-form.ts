import { bindable } from 'aurelia-framework';
import { Poi } from '../../services/poi-types';

export class PoiForm {
  name: string;
  description: string;
  image: string;
  @bindable
  pois: Poi[];
  @bindable
  category: string[];

  selectedCategory = '';

  addPoi() {
    const poi = {
      name: this.name,
      description: this.description,
      category: this.selectedCategory,
      image: this.image
    };
    this.pois.push(poi);
    console.log(poi);
  }
}
