import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {

  registerForm!: FormGroup

  constructor(private formBuilder: FormBuilder){}

  ngOnInit(){

    this.registerForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', Validators.required, Validators.minLength(1)],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirm: ['', Validators.required]
    })

  }

  get regFormControls() { return this.registerForm.controls; }

}