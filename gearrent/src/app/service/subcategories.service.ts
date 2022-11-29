import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class SubcategoriesService {
  // Create url to json-data-students
  url = 'https://starwarz-soleit.herokuapp.com/subcategories.php';

  // Inject HttpClient module into Constructor
  constructor(private http: HttpClient) {}

  // Create getData() function thats makes http request
  public getData() {
    // Make http request using Http Client;
    return this.http.get(this.url);
  }
}
