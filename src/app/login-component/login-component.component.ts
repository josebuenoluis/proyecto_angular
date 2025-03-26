import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { LoginResponse } from '../models/loginResponse.interface';
import { BehaviorSubject } from 'rxjs';
import { IonRouterOutlet } from '@ionic/angular/standalone';

@Component({
  selector: 'app-login-component',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './login-component.component.html',
  styleUrl: './login-component.component.css'
})
export class LoginComponentComponent {
  @ViewChild("username") username! : ElementRef;
  @ViewChild("password") password! : ElementRef;
  private errorResponse : LoginResponse = {sucess:false,user:false,password:false};
  private authService : AuthService = inject(AuthService);
  public logged : BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private router : Router) {}

    login(event:Event){
      event.preventDefault();
      this.validateLogin();
      let user = this.username.nativeElement.value;
      let password = this.password.nativeElement.value;
      localStorage.setItem("user",user);
      localStorage.setItem("password",password);
 
      this.authService.validateUser().then(logged =>{
        if(logged){
          this.authService.setLogged(true)
          this.router.navigate(["/"]);
        }else{
          this.showError();
        }
      });  
    }
    
    showError() : void{
      let userInput = document.getElementById("username") as HTMLInputElement;
      let passwordInput = document.getElementById("password") as HTMLInputElement;
      this.authService.response.subscribe(value =>{
        this.errorResponse = value;
      });
      let feedbacks = document.querySelectorAll(".invalid-feedback");
      if(userInput.value != "" && passwordInput.value != ""){
        for(let element = 0; element < feedbacks.length; element++){
          let feedback = feedbacks[element] as HTMLElement;
          if(this.errorResponse.user == false
          && this.errorResponse.password == false){
            if(feedback.classList.contains("username")){
              feedback.textContent = "Utilizador incorreto";
              userInput.value = "";
            }else{
              feedback.textContent = "Senha incorreta";
              passwordInput.value = "";
            }
          }
          if(feedback.classList.contains("password") && this.errorResponse.user == true
          && this.errorResponse.password == false){
            feedback.textContent = "Senha incorrecta";
            passwordInput.value = "";
          }
        }
      }else{
        for(let element = 0; element < feedbacks.length;element++){
          let feedback = feedbacks[element] as HTMLElement;
          if(feedback.classList.contains("username")){
            feedback.textContent = "Deve digitar um nome de utilizador";
          }else if(feedback.classList.contains("password")){
            feedback.textContent = "Deve digitar uma senha";
          }
        }
      }
    }

    validateLogin(){
      let form = document.querySelector("form");
      if(!form?.classList.contains("was-validated")){
        form?.classList.add("was-validated");
      }
    }

}
