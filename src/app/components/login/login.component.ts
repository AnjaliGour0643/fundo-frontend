import { Component } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  registerForm!: FormGroup;
  submitted = false;
  showPass = "text"

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
      this.registerForm = this.formBuilder.group({
          email: ['', [Validators.required, Validators.email]],
          password: ['', [Validators.required, Validators.minLength(6)]],
      });
  }

  // convenience getter for easy access to form fields
  get regFormControls() { return this.registerForm.controls; }

  handleLogin(){
    console.log("Email required error:", this.regFormControls["email"]["errors"]?.["required"])
    console.log("Email format error:", this.regFormControls["email"]["errors"]?.["email"])

    console.log("Password required error:", this.regFormControls["password"]["errors"]?.["required"]);
    console.log("Password minLength error:", this.regFormControls["password"]["errors"]?.["minlength"])
  }
  
}
