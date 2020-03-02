import { Component, OnInit } from '@angular/core';
import { User } from '../user/user';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
  providers: [UserService]
})
export class SignInComponent implements OnInit {
  constructor(private userService: UserService) { }

  ngOnInit() {
    console.log("signin init");
  }

  createUser(){
    console.log("createUser CALLED");
    let username = (<HTMLInputElement>document.getElementById("username")).value;
    let email = (<HTMLInputElement>document.getElementById("email")).value;
    let password = (<HTMLInputElement>document.getElementById("password")).value;
    let displayname = ""
    let isAdmin = false
    let user= new User(username,displayname,password,email,isAdmin);
    this.userService.createUser(user)
    console.log(user);
  }

}
