import { inject } from 'aurelia-framework';
import { Poi } from './poi-types';
import { HttpClient } from 'aurelia-http-client';

@inject(HttpClient)
export class PoiService {
  pois: Poi[] = [];
  category = ['Castle', 'Forest'];

  constructor(private httpClient: HttpClient) {
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
}
