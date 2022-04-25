/* eslint-disable arrow-body-style */
/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment.prod';
import { map } from 'rxjs/operators';

export interface MapboxOutput {
  attribution: string;
  features: Feature[];
  query: [];
}

export interface Feature {
  place_name: string;
}

@Injectable({
  providedIn: 'root',
})
export class ActivitiesService {
  constructor(private http: HttpClient) {}

  search_word(query: string) {
    const url =
      'https://api.mapbox.com/geocoding/v5/mapbox.places/' +
      query +
      '.json?types=region&access_token=' +
      'pk.eyJ1Ijoia2V2aW5uYW1tb3VyIiwiYSI6ImNsMmR0ZTJhZzAyOHozYnRjNzRlYzRlazYifQ.y46EJGbD0G8lPGDvwB5Anw';
    return this.http.get(url).pipe(
      map((res: MapboxOutput) => {
        return res.features;
      })
    );
  }
}
