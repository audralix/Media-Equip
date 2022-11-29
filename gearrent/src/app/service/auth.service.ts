import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { tap } from 'rxjs/operators';
// import { Plugins } from '@capacitor/core';
import { Router } from '@angular/router';
import { Storage } from '@capacitor/storage';
// const { Storage } = Plugins;

const TOKEN_KEY = 'user-token';

export interface User {
  name: string;
  role: string;
  permissions: string[];
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // handle the current user information with a BehaviorSubject to which we can easily emit new values.
  private currentUser: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor(private router: Router) {
    this.loadUser();
  }

  // loadUser: Try to load a token or user information from Storage right in the beginning.
  // We have some plain information, but you usually have something like a JWT in there so you can directly log in a user
  loadUser() {
    // Normally load e.g. JWT at this point
    Storage.get({ key: TOKEN_KEY }).then((res) => {
      if (res.value) {
        this.currentUser.next(JSON.parse(res.value));
      } else {
        this.currentUser.next(this.signIn('admin'));
        //this.currentUser.next(false);
      }
    });
  }

  // signIn: Our dummy login function that simply checks the name and fakes information that you would get from a server.
  // We got a standard user with basic permissions and an admin user
  signIn(name) {
    console.log(name);
    // Local Dummy check, usually server request!
    let userObj: User;

    if (name === 'user') {
      userObj = {
        name: 'Tony Test',
        role: 'USER',
        permissions: ['read'],
      };
    } else if (name === 'admin') {
      userObj = {
        name: 'Adam Admin',
        role: 'ADMIN',
        permissions: ['read', 'write'],
      };
    }

    return of(userObj).pipe(
      tap((user) => {
        // Store the user or token
        Storage.set({ key: TOKEN_KEY, value: JSON.stringify(user) });
        this.currentUser.next(user);
      })
    );
  }

  // Access the current user
  getUser() {
    return this.currentUser.asObservable();
  }

  // Remove all information of the previous user
  // The logout in the end will clear all user information and bring us back to the login
  async logout() {
    await Storage.remove({ key: TOKEN_KEY });
    this.currentUser.next(false);
    this.router.navigateByUrl('/', { replaceUrl: true });
  }

  // Check if a user has a certain permission
  hasPermission(permissions: string[]): boolean {
    for (const permission of permissions) {
      if (
        !this.currentUser.value ||
        !this.currentUser.value.permissions.includes(permission)
      ) {
        return false;
      }
    }
    return true;
  }
}
