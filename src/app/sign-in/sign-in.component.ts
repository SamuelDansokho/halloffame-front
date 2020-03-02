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
    let password = (<HTMLInputElement>document.getElementById("password")).value;
    let result = this.checkPassword(password);
    if(result===passwordEnum.ok){
      let username = (<HTMLInputElement>document.getElementById("username")).value;
      let email = (<HTMLInputElement>document.getElementById("email")).value;
      let displayname = "";
      let isAdmin = false;
      let user= new User(username,displayname,password,email,isAdmin);
      this.userService.createUser(user);
    }else if (result===passwordEnum.notMatching){
      console.log("Password not matching");
    }else if (result===passwordEnum.badPassword){
      console.log("Bad password");
    }
    
  }

  private checkPassword(password: string): passwordEnum{
    let passwordConfirm = (<HTMLInputElement>document.getElementById("passwordConfirm")).value;
    console.log(password ,"+", passwordConfirm)
    if (password===passwordConfirm){
      let regex= new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})");
      let bool = regex.test(password);
      console.log(bool)
      if(bool===true){
      return passwordEnum.ok;
      }else{
        return passwordEnum.badPassword;
      }
    } else{
      return passwordEnum.notMatching;
    }
    
  }

}

enum passwordEnum{
  ok = "OK",
  notMatching= "NOT_MATCHING",
  badPassword= "BAD_PASSWORD"
}
