import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { LoginComponent } from "./login.component";
import { HttpService } from "src/app/services/http-service/http.service";
import { of, throwError } from "rxjs";
import { Router } from "@angular/router";

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let httpService: HttpService;
  let router: Router;
  let mockRouter: any;

  const mockSuccessResponse = {
    code: 200,
    message: "Success",
    user: {
      token: "mockToken",
      email: "user@example.com",
      firstname: "John",
    },
  };

  const mockErrorResponse = {
    status: 400,
    error: { message: "Invalid email or password" },
  };

  const mockHttpService = {
    postApiCall: jasmine.createSpy('postApiCall').and.returnValue(of(mockSuccessResponse)),
  };

  beforeEach(async () => {
    mockRouter = {
      navigate: jasmine.createSpy('navigate'),
    };
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        ReactiveFormsModule,
        FormsModule,
        HttpClientTestingModule,
        RouterTestingModule,
        MatFormFieldModule,
        MatInputModule,
        BrowserAnimationsModule,
      ],
      providers: [{ provide: HttpService, useValue: mockHttpService },
        { provide: Router, useValue: mockRouter },],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    httpService = TestBed.inject(HttpService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the login form with empty values', () => {
    expect(component.loginForm.value).toEqual({ email: '', password: '' });
  });

  it('should validate email and password fields', () => {
    const emailControl = component.loginFormControls['email'];
    const passwordControl = component.loginFormControls['password'];

    emailControl.setValue('');
    passwordControl.setValue('');
    expect(emailControl.hasError('required')).toBeTrue();
    expect(passwordControl.hasError('required')).toBeTrue();

    emailControl.setValue('invalid-email');
    expect(emailControl.hasError('email')).toBeTrue();

    emailControl.setValue('valid@example.com');
    passwordControl.setValue('123');
    expect(passwordControl.hasError('minlength')).toBeTrue();

    passwordControl.setValue('ValidPassword123');
    expect(component.loginForm.valid).toBeTrue();
  });  

  it('should call HttpService on valid form submission', () => {
    component.loginForm.setValue({
      email: 'valid@example.com',
      password: 'ValidPassword123',
    });
    component.handleLogin();

    expect(httpService.postApiCall).toHaveBeenCalledWith(
      '/api/v1/users/login',
      { email: 'valid@example.com', password: 'ValidPassword123' }
    );
  });

  it('should handle login failure and log error', () => {
    spyOn(console, 'error');
    mockHttpService.postApiCall.and.returnValue(throwError(mockErrorResponse));

    component.loginForm.setValue({
      email: 'invalid@example.com',
      password: 'InvalidPassword',
    });
    component.handleLogin();

    expect(console.error).toHaveBeenCalledWith(mockErrorResponse);
  });
});
