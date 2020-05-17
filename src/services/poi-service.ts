import { inject } from 'aurelia-framework';
import { Poi } from './poi-types';
import { HttpClient } from 'aurelia-http-client';
import { EventAggregator } from 'aurelia-event-aggregator';
import {TotalUpdate} from "./messages";

@inject(HttpClient, EventAggregator)
export class PoiService {
  pois: Poi[] = [];
  category = ['Castle', 'Forest'];
  total = 0;

  constructor(private httpClient: HttpClient, private ea: EventAggregator) {
    httpClient.configure(http => {
      http.withBaseUrl('http://localhost:8080');
    });
    this.getPois();
  }
  async getPois() {
    const response = await this.httpClient.get('/api/pois.json');
    this.pois = await response.content;
    console.log (this.pois);
  }
  async poi(name: string, category: string, description: string, image: string) {
    const poi = {
      name: name,
      description: description,
      category: category,
      image: image
    };
    this.pois.push(poi);
    this.total = this.total + 1;
    this.ea.publish(new TotalUpdate(this.total));
    console.log('Total so far ' + this.total);
  }

}
