import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';

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


describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardComponent],
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
      providers: [MatIconRegistry]
    }).compileComponents();;
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should fetch labels when editlabels is called and update the labels array', () => {
    const mockLabels = ['Label1', 'Label2'];
    spyOn(component.dialog, 'open').and.returnValue({
      afterClosed: () => of(mockLabels),
    } as any);
  
    component.editlabels();
  
    expect(component.labels).toEqual(mockLabels);
  });
  

  it('should call DataService.outgoingData when search input is entered', () => {
    spyOn(component.dataService, 'outgoingData');
  
    const event = { target: { value: 'test search' } } as any;
    component.search(event);
  
    expect(component.dataService.outgoingData).toHaveBeenCalledWith('test search');
  });
  
  
  it('should toggle drawer state when handleDrawerClick is called with "menu"', () => {
    component.drawerState = false;
  
    component.handleDrawerClick('menu');
    expect(component.drawerState).toBeTrue();
  
    component.handleDrawerClick('menu');
    expect(component.drawerState).toBeFalse();
  });
  
  
  it('should unsubscribe from subscription on destroy', () => {
    spyOn(component.subscription, 'unsubscribe');
    component.ngOnDestroy();
    expect(component.subscription.unsubscribe).toHaveBeenCalled();
  });


    // it('should render the email and firstname from localStorage in the profile menu', () => {
  //   const compiled = fixture.nativeElement as HTMLElement;
  
  //   // Trigger the profile menu
  //   const profileMenuButton = compiled.querySelector('[matMenuTriggerFor="profileMenu"]')!;
  //   profileMenuButton.dispatchEvent(new Event('click'));
  //   fixture.detectChanges(); // Update the DOM after the event
  
  //   const emailElement = compiled.querySelector('.profile-details span:first-child')!;
  //   const firstnameElement = compiled.querySelector('.profile-details span:nth-of-type(2)')!;
  
  //   expect(emailElement.textContent).toBe(localStorage.getItem('email'));
  //   expect(firstnameElement.textContent).toContain(`Hi, ${localStorage.getItem('firstname')}!`);
  // });

  
  // it('should initialize component with default values', () => {
  //   expect(component.email).toBe(localStorage.getItem('email'));
  //   expect(component.firstname).toBe(localStorage.getItem('fname'));
  //   expect(component.drawerState).toBeFalse();
  //   expect(component.currentRoute).toBe('');
  //   expect(component.labels).toEqual([]);
  // });
  
});