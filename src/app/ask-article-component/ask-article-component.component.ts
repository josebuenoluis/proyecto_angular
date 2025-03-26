import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
@Component({
  selector: 'app-ask-article-component',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './ask-article-component.component.html',
  styleUrl: './ask-article-component.component.css'
})
export class AskArticleComponentComponent {


  showArticle(event:Event){
    event.preventDefault();
    this.validateForm();
    this.getProduct().then(data =>{
      let inputs = document.querySelectorAll("input");
      for(let element = 0; element < inputs.length; element++){
        let article = data[0].Table[0];
        let input = inputs[element] as HTMLInputElement;
        if(input.id == "nome-curto"){
          input.value = article.ShortName1;
        }
        if(input.id == "descriçao"){
          input.value = article.DESCRIPTION;
        }
        if(input.id == "familia"){
          input.value = article.Family;
        } 
        if(input.id == "taxa"){
          input.value = article.Tax1
        }
        if(input.id == "preço-compra"){
          input.value = article.PurchaseNetPrice;
        }
        if(input.id == "s-imposto"){
          input.value = article.NetPrice1;
        }
        if(input.id == "c-imposto"){
          input.value = article.PurchasePrice;
        }
        if(input.id == "und-venda"){

        }
        if(input.id == "stock"){
          input.value = article.CurrentStock;
        }
      }
    })
  }

  validateForm(){
    let form = document.querySelector("form") as HTMLFormElement;
    if(!form.classList.contains("was-validated")){
      form.classList.add("was-validated");
    }
  }


  getProduct(){
    let inputRef = document.getElementById("ref-artigo") as HTMLInputElement;
    let articleRef = inputRef.value;
    return fetch(`http://localhost:5281/api/SalesDocument/fullproduct?KeyId=${articleRef}`,{
      method:'GET',
      headers:{"Content-Type":"application/json"}
    }).then(datos =>{
      return datos.json();
    }).catch(error => {
      return {};
      console.log("Error: "+error);
    })
  }
}
