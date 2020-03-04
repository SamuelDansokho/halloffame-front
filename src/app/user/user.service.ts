import { Injectable } from '@angular/core';
import { Http, Response } from "@angular/http";
import {User} from './user'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map'

@Injectable()
export class UserService {

 private apiSignInUrl = 'http://localhost:8080/user/create';
 private status: CreationStatusEnum;

 getStatus(){
   return this.status;
 }


  constructor(private http:Http) {
   }

   createUserRequest(user : User){
    const httpOptions = {
      headers: new Headers({
        'Content-Type':  'application/json'
      }),
      observe: 'response'
  };
     return this.http
     .post(this.apiSignInUrl, JSON.stringify(user),httpOptions).map(response => response.json())
   }


}

enum CreationStatusEnum {
  Created = "CREATED",
  UsernameAlready = "USERNAME_ALREADY_IN_BDD",
  EmailAlready="MAIL_ALREADY_IN_BDD",
  Ko= "KO"
}
