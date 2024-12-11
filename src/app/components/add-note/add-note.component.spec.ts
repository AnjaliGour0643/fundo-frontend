import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNoteComponent } from './add-note.component';

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
import { of, throwError } from 'rxjs';
import { MatListModule } from '@angular/material/list';

describe('AddNoteComponent', () => {
  let component: AddNoteComponent;
  let fixture: ComponentFixture<AddNoteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddNoteComponent],
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
    fixture = TestBed.createComponent(AddNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have empty title and description initially', () => {
    expect(component.title).toBe('');
    expect(component.description).toBe('');
  });
  
  it('should toggle addnote when addNoteToggle is called', () => {
    component.addNoteToggle('');
    expect(component.addnote).toBeFalse();
    
    component.addNoteToggle('');
    expect(component.addnote).toBeTrue();
  });
  
  it('should toggle between "Take a Note" and expanded note view', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const takeNoteDiv = fixture.nativeElement.querySelector('[data-testid="take-note-div"]') as HTMLElement;
    
    expect(component.addnote).toBeTrue();
    takeNoteDiv.click();
    fixture.detectChanges();
  
    expect(component.addnote).toBeFalse();
  });
  
  it('should render all action icons', () => {
    const compiled = fixture.nativeElement as HTMLElement;
  
    // Check for icons in the "Take a note" view
    expect(compiled.querySelector('mat-icon[svgIcon="tick-icon"]')).toBeTruthy();
    expect(compiled.querySelector('mat-icon[svgIcon="brush-icon"]')).toBeTruthy();
    expect(compiled.querySelector('mat-icon[svgIcon="img-icon"]')).toBeTruthy();
  
    // Expand the note and check for other icons
    component.addnote = false;
    fixture.detectChanges();
  
    expect(compiled.querySelector('mat-icon[svgIcon="reminder-icon"]')).toBeTruthy();
    expect(compiled.querySelector('mat-icon[svgIcon="collabrator-icon"]')).toBeTruthy();
    expect(compiled.querySelector('mat-icon[svgIcon="color-palatte-icon"]')).toBeTruthy();
    expect(compiled.querySelector('mat-icon[svgIcon="archive-icon"]')).toBeTruthy();
    expect(compiled.querySelector('mat-icon[svgIcon="more-icon"]')).toBeTruthy();
  });

  it('should not call HTTP service when title or description is empty', () => {
    const httpServiceSpy = spyOn(component['httpService'], 'postApiCall');
    component.title = '';
    component.description = '';
  
    component.addNoteToggle('save');
  
    expect(httpServiceSpy).not.toHaveBeenCalled();
  });

    it('should call HTTP service to add a note when action is save', () => {
    const httpServiceSpy = spyOn(component['httpService'], 'postApiCall').and.callThrough();
    component.title = 'Test Title';
    component.description = 'Test Description';
  
    component.addNoteToggle('save');
  
    expect(httpServiceSpy).toHaveBeenCalledWith(
      '/api/v1/notes',
      { title: 'Test Title', description: 'Test Description', color: '#ffffff', isArchive: false},
      jasmine.any(Object)
    );
  });

});
