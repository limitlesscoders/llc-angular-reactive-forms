import { Component, VERSION, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent implements OnInit,OnDestroy {

  public bankForm: FormGroup;

  constructor(private fb:FormBuilder){

  }

  ngOnInit(){
    this.bankForm = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      nickName: new FormControl(''),
      accountNumber: new FormControl('', [Validators.required,  Validators.pattern("^[0-9]*$")]),
      routingNumber: new FormControl('', [Validators.required,Validators.pattern("^[0-9]*$")]),
      email: new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$") ]),
    });
  }



diableValidations() {  
   for (const key in this.bankForm.controls) {
        this.bankForm.get(key).clearValidators();
        this.bankForm.get(key).updateValueAndValidity();
   }
}

enableValidations(){

  for (const key in this.bankForm.controls) {

    switch (key){
      case "firstName":
      case "lastName":
        this.bankForm.get(key).setValidators([Validators.required]);
        this.bankForm.get(key).updateValueAndValidity(); 
        break;

      case "accountNumber":
      case "routingNumber":
      this.bankForm.get(key).setValidators([Validators.required,  Validators.pattern("^[0-9]*$")]);
        this.bankForm.get(key).updateValueAndValidity(); 
        break;

      case "email":
        this.bankForm.get(key).setValidators([Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$") ]);
        this.bankForm.get(key).updateValueAndValidity(); 
        break;
    }             
   }
}

validateAndSave() {
    this.bankForm.markAllAsTouched();
    
}

removeNickName() {
    this.bankForm.removeControl("nickName");
    this.bankForm.markAsUntouched();
}

  ngOnDestroy(){

  }
  
}
