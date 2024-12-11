import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupComponent } from './signup.component';

import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { of } from 'rxjs';
import { EditLabelComponent } from '../edit-label/edit-label.component';
import { MatListModule } from '@angular/material/list';

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SignupComponent],
      imports: [
        BrowserModule,
        AppRoutingModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        MatSidenavModule,
        MatIconModule,
        MatDialogModule,
        MatButtonToggleModule,
        MatMenuModule,
        MatGridListModule,
        MatProgressSpinnerModule,
        MatListModule
      ],
    });
    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the registration form with default values', () => {
    const form = component.registerForm;
    expect(form).toBeDefined();
    expect(form.get('firstname')?.value).toBe('');
    expect(form.get('lastname')?.value).toBe('');
    expect(form.get('email')?.value).toBe('');
    expect(form.get('password')?.value).toBe('');
    expect(form.get('confirm')?.value).toBe('');
  });

  it('should mark the form as invalid if required fields are missing', () => {
    const form = component.registerForm;
    expect(form.valid).toBeFalse();

    form.get('firstname')?.setValue('');
    form.get('lastname')?.setValue('');
    form.get('email')?.setValue('');
    form.get('password')?.setValue('');
    form.get('confirm')?.setValue('');
    expect(form.valid).toBeFalse();
  });

  it('should validate last name field correctly', () => {
    const lastNameField = component.registerForm.get('lastname');

    lastNameField?.setValue('');
    expect(lastNameField?.valid).toBeFalse();
    expect(lastNameField?.errors?.['required']).toBeTrue();

    lastNameField?.setValue('Doe');
    expect(lastNameField?.valid).toBeTrue();
  });

  it('should validate email field correctly', () => {
    const emailField = component.registerForm.get('email');

    emailField?.setValue('invalid-email');
    expect(emailField?.valid).toBeFalse();
    expect(emailField?.errors?.['email']).toBeTrue();

    emailField?.setValue('valid.email@example.com');
    expect(emailField?.valid).toBeTrue();
  });
  
});
