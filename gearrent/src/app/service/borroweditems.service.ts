import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BorroweditemsService {
  url = 'https://starwarz-soleit.herokuapp.com/borrowedItems.php';
  userUrl = 'https://starwarz-soleit.herokuapp.com/history.php?userId=';

  constructor(private http: HttpClient) {}

  public getData() {
    // Make http request using Http Client;
    return this.http.get(this.url);
  }

  public getUserHistory(userId) {
    return this.http.get(this.userUrl.concat(userId));
  }
}
