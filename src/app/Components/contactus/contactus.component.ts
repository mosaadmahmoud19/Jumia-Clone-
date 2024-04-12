import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';
import { MessageService } from '../../Services/message.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-contactus',
  standalone: true,
  imports: [RouterLink,FooterComponent,ReactiveFormsModule ,FormsModule],


  templateUrl: './contactus.component.html',
  styleUrl: './contactus.component.css'
})
export class ContactusComponent {
constructor(private _message:MessageService){}
message:any=''
messagecolor:any=''
messageForm:FormGroup=new FormGroup({

  name:new FormControl('',[Validators.required , Validators.minLength(3), Validators.maxLength(20) ]),

  email:new FormControl('',[Validators.required ,Validators.email]),

  message:new FormControl('',[Validators.required , Validators.minLength(15), Validators.maxLength(100) ]),
  phone:new FormControl('',[Validators.required ,Validators.pattern(/^01[0152][1-9]{8}$/)]),

})
handelForm(){
  if (this.messageForm.valid) {
    this._message.sendMessage(this.messageForm.value).subscribe({
      next:(response)=>{
        this.message="Message Sent"
        this.messagecolor="text-success"
      }
    })
  }else{
    this.message="Please Complate Your Data"
    this.messagecolor="text-danger"
  }
 
}
}
