export interface Location {
  lat: number;
  lng: number;
}

export interface Poi {
  name: string;
  description: string;
  category: string;
  link: string;
  author: string
  _id: string
  location: Location
}
export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}
