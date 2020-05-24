import { inject } from 'aurelia-framework';
import { bindable } from 'aurelia-framework';
import { Poi } from '../../services/poi-types';
import { PoiService } from '../../services/poi-service';

@inject(PoiService)
export class PoiForm {
  name: string;
  description: string;
  link: string;
  @bindable pois: Poi[];
  @bindable category: string[];
  author: string;


  selectedCategory = '';

  constructor(private ds: PoiService) {}

  addPoi() {
    this.ds.createPoi(this.name, this.description, this.selectedCategory, this.link, this.author)
    }
  }

