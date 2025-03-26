import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { IonApp, IonRouterOutlet,IonContent } from '@ionic/angular/standalone';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [IonApp, IonRouterOutlet,RouterOutlet,IonContent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'user_interface';
  loggedUser : boolean = true;

  get isUser(){
    return this.loggedUser;
  }

  setLogUser(){
    this.loggedUser = false;
  }
}
