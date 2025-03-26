import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-ask-price',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './ask.price.component.component.html',
  styleUrl: './ask.price.component.component.css'
})
export class AskPriceComponentComponent {
  
  showProduct(event:Event){
    event.preventDefault();
    let form = document.querySelector("form") as HTMLFormElement;
    this.validateForm();
    this.getProduct().then(data =>{
      if(data.length > 0){
        if (form) {
          const children = Array.from(form.children);
          let product = data[0].Table[0];
          for (const element of children) {
            let input = element.querySelector("input") as HTMLInputElement;
            if(input != null && input.id != "ref-produto"){
              if(input.id == "nome-produto"){
                input.value = product.ShortName1;
              }
              if(input.id == "preço"){
                input.value = product.PurchasePrice;
              }
            }
          }
        }
      }
    });
  }
  
  validateForm(){
    let form = document.querySelector("form") as HTMLFormElement;
    if(!form.classList.contains("was-validated")){
      form.classList.add("was-validated");
    }
  }

  getProduct(){
    let inputReference = document.getElementById("ref-produto") as HTMLInputElement;  
    let referenceProduct = inputReference.value;
    return fetch(`http://localhost:5281/api/SalesDocument/product?KeyId=${referenceProduct}`,{
        method: 'GET',
        headers: {
        'Content-Type': 'application/json'
      }
    }).then(response =>{
      return response.json();
    })
  }
}
