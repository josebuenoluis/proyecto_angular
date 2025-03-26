import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { IonRouterOutlet } from '@ionic/angular/standalone';
@Component({
  selector: 'app-ask-client-component',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './ask-client-component.component.html',
  styleUrl: './ask-client-component.component.css'
})
export class AskClientComponentComponent {

  showEntity(event:Event){
    event.preventDefault();
    let form = document.querySelector("form") as HTMLFormElement;
    let inputs = form.querySelectorAll("input");
    this.validateForm();
    this.getEntity().then(data =>{
      let entity = data[0].Table[0];
      for(let element = 0;element < inputs.length;element++){
        let input = inputs[element] as HTMLInputElement;
        if(input.type == "text" || input.type == "number" ||
          input.type == "date"
          && input != null
          && input != undefined
        ){
          if(input.id == "nome-entidade"){
            input.value = entity.NAME;
          }
          if(input.id == "tipo-entidade"){
            if(entity.EntityType == 0){
              input.value = "Cliente";
            }
            if(entity.EntityType == 1){
              input.value = "Forncedor";
            }
          }
          if(input.id == "nome-comercial"){
            input.value = entity.BusinessName == "" ? "" : entity.BusinessName;
          }
          if(input.id == "contribuinte"){
            input.value = entity.Country;
          }
          if(input.id == "contribuinte-id"){
            input.value = entity.Vat;
          }
          if(input.id == "pais-identidade"){
            input.value = entity.Country;
          }
          if(input.id == "n-identidade"){
            input.value = entity.Vat;
          }
          if(input.id == "morada"){
            input.value = entity.Address;
          }
          if(input.id == "n-porta"){
            input.value = entity.PortaNumber == null ? "" : entity.PortaNumber;
          }
          if(input.id == "localidade"){
            input.value = entity.City;
          }
          if(input.id == "distrito"){
            input.value = entity.State;
          }
          if(input.id == "cidade"){
            input.value = entity.City;
          }
          if(input.id == "pais"){
            input.value = entity.Country;
          }
          if(input.id == "postal"){
            input.value = entity.PostalCode;
          }
          if(input.id == "data-nascimento"){
            let dateBirth = new Date(entity.DateOfBirth).toISOString().substring(0, 10);
            input.value = dateBirth;
          }
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

  getEntity(){
    let inputId = document.getElementById("id-entidade") as HTMLInputElement;
    let keyId = inputId.value;
    return fetch(`http://localhost:5281/api/SalesDocument/entity?KeyId=${keyId}`,{
      method:"GET",
      headers:{
        "Content-Type":"application/json"
      }
    }).then(response => {
      return response.json();
    }).catch(error => {
      console.log("ERROR: "+error);
    })
  }
}
