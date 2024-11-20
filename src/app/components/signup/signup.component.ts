import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from 'src/app/services/http-service/http.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {

  registerForm!: FormGroup

  constructor(private formBuilder: FormBuilder, private httpService: HttpService){}

  ngOnInit(){

    this.registerForm = this.formBuilder.group({
      firstname: ['', [Validators.required, Validators.minLength(3)]],
      lastname: ['', [Validators.required, Validators.minLength(1)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirm: ['', Validators.required]
    })

  }

  get regFormControls() { return this.registerForm.controls; }

  handleRegistration(){
    if(this.registerForm.valid){
      console.log('hai')
      const { firstname, lastname, email, password } = this.registerForm.value
      this.httpService.postApiCall('/api/v1/users', {firstname, lastname, email, password}).subscribe({
        next: (res) => {
          console.log(res)
        },
        error: (err) => {
          console.log(err)
        }
      })
    }
  }

}