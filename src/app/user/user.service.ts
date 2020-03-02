import { Injectable } from '@angular/core';
import { Http, Response } from "@angular/http";
import {User} from './user'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Headers, RequestOptions } from '@angular/http';

@Injectable()
export class UserService {

 private apiSignInUrl = 'http://localhost:8080/user/create';


  constructor(private http:Http) {
   }

   createUser(user : User){
     let userHeaders= new Headers({'Content-Type': 'application/json'});
     return this.http
     .post(this.apiSignInUrl, JSON.stringify(user),{headers: userHeaders})
     .toPromise()
     .then(response => response.json() as User[])
     .catch(this.handleError);
   }

   private handleError(error: any): Promise<Array<any>> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
    }


}

enum CreationStatusEnum {
  Created = "CREATED",
  Already = "ALREADY_IN_DB",
  Ko= "KO"
}
