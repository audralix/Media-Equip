import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { from } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root',
})
export class ItemsService {
  url = 'https://starwarz-soleit.herokuapp.com/items.php';

  constructor(private http: HttpClient) {}

  public getData() {
    // Make http request using Http Client;
    return this.http.get(this.url);
  }

  /*  getData(){
    // Make http request using Http Client;
    return this.http.get("https://starwarz-soleit.herokuapp.com/items.php")
    .pipe(
      map((res:any)=> {
        console.log("Before mapping:", res);
        return res.data.items.filter( post => {
          return post.data.name == "NIKON D200";
        });
      })
      
      
    );
  } */

  /*   getData(){
    // Make http request using Http Client;
    return this.http.get("https://starwarz-soleit.herokuapp.com/items.php")
    .pipe(
      map((res:any)=> {
        console.log("Before mapping:", res);
        return res.data.items.filter( post => {
          return post.data.name == "NIKON D200";
        });
      })
      
      
    );
  } */

  /*   getRemoteData() {
    return this.http.get(
      "https://starwarz-soleit.herokuapp.com/items.php")
      .pipe(
        map((res:any) => {
          console.log("Before mapping:", res);
          return res.data.filter((post) => {
           return post.data.items.name == "NIKON D200"; 
          })
        
        }),
        filter((res: any) => {
          return res.lenght == 5;
        })
      );
  }
 */
}
