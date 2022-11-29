import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ItemregisterService {
  // Create url to json-data-students
  url = 'https://starwarz-soleit.herokuapp.com/itemregister.php';
  // Inject HttpClient module into Constructor
  constructor(private http: HttpClient) {}

  // Create getData() function thats makes http request
  postData(data: any) {
    console.log(data);
    // Make http request using Http Client;
    //alert(data['studentID']);
    return this.http.post(this.url, data, {
      headers: new HttpHeaders({
        Accept: 'text/plain',
        'Content-Type': 'text/plain',
      }),
      responseType: 'text',
    });
  }

  //read operation
  /*  getData(){
   // Make http request using Http Client;
   return this.http.get(this.url);
 } */
}
