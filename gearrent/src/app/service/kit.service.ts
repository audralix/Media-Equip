import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class KitService {
  url = 'https://starwarz-soleit.herokuapp.com/kit.php';

  constructor(private http: HttpClient) {}

  public getData() {
    // Make http request using Http Client;
    return this.http.get(this.url);
  }
}
