import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { LoginResponse } from '../models/loginResponse.interface';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  public logged : boolean = false;
  public _logged = new BehaviorSubject<boolean>(false);
  public logged$ = this._logged.asObservable();
  public response = new BehaviorSubject<LoginResponse>({sucess:false,user:false,password:false});

  async validateUser(): Promise<boolean> {
    const user = localStorage.getItem("user");
    const password = localStorage.getItem("password");
    if (!user || !password) {
        return false;
    }
    try {
        const data = await this.postUser(user, password);
        if(data.sucess){ 
          this.setLogged(true);
        }else{
          this.setLogged(false);
        }

      } catch (error) {
        console.error('Error:', error);
        this.setLogged(false);
        return this.isLogged();
      }
      return this.isLogged();
}

  postUser(user:string,password:string) : Promise<any>{
    return fetch('http://localhost:5281/api/SalesDocument/login', {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({"user":user,"password":password}),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log('enviado');
      this.setResponse(data);
      if(data.sucess){
        this.setLogged(true);
      }
      return data;
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }

  isLogged() : boolean{
    return this._logged.getValue();
  }

  closeSesion(){
    
  }
  setLogged(value: boolean) {
    this._logged.next(value);
  }

  getResponse(){
    this.response.getValue();
  }

  setResponse(value: LoginResponse){
    this.response.next(value);
  }

  getLogged() : Observable<boolean>{
    return this._logged.asObservable();
  }

}
