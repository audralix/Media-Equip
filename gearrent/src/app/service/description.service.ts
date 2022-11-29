import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DescriptionService {
  // Create url to json-data-students
  url = 'https://starwarz-soleit.herokuapp.com/description.php?itemId=';

  // Inject HttpClient module into Constructor
  constructor(private http: HttpClient) {}

  // Create getData() function thats makes http request
  public getData(itemId) {
    // Make http request using Http Client;
    return this.http.get(this.url.concat(itemId));
  }
}
