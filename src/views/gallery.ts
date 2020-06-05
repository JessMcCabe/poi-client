import { autoinject } from 'aurelia-framework';
import { ImageStore } from '../services/image-store';

@autoinject
export class App {
  constructor(private imageStore: ImageStore) {}
}
