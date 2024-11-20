import { Component } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/services/http-service/http.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private httpService: HttpService, private router: Router) { }

  ngOnInit() {
      this.loginForm = this.formBuilder.group({
          email: ['', [Validators.required, Validators.email]],
          password: ['', [Validators.required, Validators.minLength(6)]],
      });
  }

  // convenience getter for easy access to form fields
  get loginFormControls() { return this.loginForm.controls; }

  handleLogin(){
    if(this.loginForm.valid){
      const { email, password } = this.loginForm.value
      this.httpService.postApiCall<LoginResponse>('/api/v1/users/login', {email, password}).subscribe({
        next: (res) => {
          console.log(res)
          localStorage.setItem("token", res.user.token)
          this.router.navigate(['/dashboard/notes'])
        },
        error: (err) => {
          console.log(err)
        }
      })
    }
  }
  
}

interface LoginResponse {
  code: number;
  message: string;
  user: {
    token: string;
  };
}