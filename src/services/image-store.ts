import * as environment from '../../config/environment.json';
import { HttpClient } from 'aurelia-http-client';
import { autoinject } from 'aurelia-framework';

interface Image {
  url: string;
  id: string;
}

@autoinject
export class ImageStore {
  images: Image[] = [];

  constructor(private http: HttpClient) {
  this.http.configure(http => {
  http.withBaseUrl(`https://api.cloudinary.com/v1_1/${environment.cloudinary.name}`);
  });
  }

  getAllImages(): Image[] {
  return this.images;
  }

  async uploadImage(imageFile) {
  const formData = new FormData();
  formData.append('file', imageFile);
  formData.append('upload_preset', `${environment.cloudinary.preset}`);

  try {
  const response = await this.http.post('/image/upload', formData);
  this.images.push({ url: response.content.url, id: response.content.asset_id });
  } catch (err) {
  console.log(err);
  }
  }

  deleteImage(id) {}
  }
