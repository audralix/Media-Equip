// Generate a service/provider called studentcreate, and import the http module into it
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class StudentCreateService {
  // Create url to json-data-students
  url = 'https://starwarz-soleit.herokuapp.com/addstudent.php';

  // Inject HttpClient module into Constructor
  constructor(private http: HttpClient) {}

  // Create getData() function thats makes http request
  postData(data: any) {
    // Make http request using Http Client;
    alert(`sucess, you are ${data['name']}`);
    return this.http.post(this.url, data, {
      headers: new HttpHeaders({
        Accept: 'text/plain',
        'Content-Type': 'text/plain',
      }),
      responseType: 'text',
    });
  }
}
