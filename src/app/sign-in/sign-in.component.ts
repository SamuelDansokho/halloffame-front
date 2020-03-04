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
    
  }

  createUser(){
    let passwordAlertDanger= (<HTMLInputElement>document.getElementById("passwordAlertDanger"));
    let passwordAlertWarning= (<HTMLInputElement>document.getElementById("passwordAlertWarning"));
    let emailAlert= (<HTMLInputElement>document.getElementById("emailAlert"));
    let usernameAlert= (<HTMLInputElement>document.getElementById("usernameAlert"));
    let username = (<HTMLInputElement>document.getElementById("username")).value;
    let email = (<HTMLInputElement>document.getElementById("email")).value;
    let displayname = "";
    let isAdmin = false;
    let password = (<HTMLInputElement>document.getElementById("password")).value;
    
    let result = this.checkPassword(password);
    if(result===passwordEnum.ok){

      let user= new User(username,displayname,password,email,isAdmin);
      this.userService.createUserRequest(user)
      .subscribe(res => 
        {
          emailAlert.style.display="none"
            usernameAlert.style.display="none"
          if(res===CreationStatusEnum.EmailAlready){
            emailAlert.style.display="block"
          }else if(res===CreationStatusEnum.UsernameAlready){
            usernameAlert.style.display="block"
          }
        }
    }else if (result===passwordEnum.notMatching){
      passwordAlertWarning.style.display="block";
      passwordAlertDanger.style.display="none";
    }else if (result===passwordEnum.badPassword){
      passwordAlertWarning.style.display="none";
      passwordAlertDanger.style.display="block";
    }
    
  }

  private checkPassword(password: string): passwordEnum{
    let passwordConfirm = (<HTMLInputElement>document.getElementById("passwordConfirm")).value;
    if (password===passwordConfirm){
      let regex= new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})");
      let bool = regex.test(password);
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

enum CreationStatusEnum {
  Created = "CREATED",
  UsernameAlready = "USERNAME_ALREADY_IN_BDD",
  EmailAlready="MAIL_ALREADY_IN_BDD",
  Ko= "KO"
}
