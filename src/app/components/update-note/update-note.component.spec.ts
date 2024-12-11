import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UpdateNoteComponent } from './update-note.component';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { BrowserModule } from '@angular/platform-browser';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { of } from 'rxjs';

describe('UpdateNoteComponent', () => {
  let component: UpdateNoteComponent;
  let fixture: ComponentFixture<UpdateNoteComponent>;
  let dialogRefMock: jasmine.SpyObj<MatDialogRef<UpdateNoteComponent>>;
  let httpServiceMock: jasmine.SpyObj<any>;

  beforeEach(() => {
    dialogRefMock = jasmine.createSpyObj('MatDialogRef', ['close', 'backdropClick']);
    dialogRefMock.backdropClick.and.returnValue(of());

    httpServiceMock = jasmine.createSpyObj('HttpService', ['putApiCall']);
    httpServiceMock.putApiCall.and.returnValue(of({ success: true }));  

    TestBed.configureTestingModule({
      declarations: [UpdateNoteComponent],
      imports: [
        BrowserModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        BrowserAnimationsModule,
        FormsModule,
        HttpClientModule,
        MatIconModule,
        MatDialogModule,
        MatMenuModule,
      ],
      providers: [
        { provide: MatDialogRef, useValue: dialogRefMock },
        { provide: MAT_DIALOG_DATA, useValue: { title: 'Test Note', description: 'Test Description', color: '#fff', _id: '1' } },
        { provide: 'HttpService', useValue: httpServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UpdateNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with provided dialog data', () => {
    expect(component.title).toBe('Test Note');
    expect(component.description).toBe('Test Description');
    expect(component.color).toBe('#fff');
    expect(component._id).toBe('1');
  });

  it('should change note color when setColor is called', () => {
    component.setColor('#000');

    expect(component.color).toBe('#000');
  });

  it('should handle backdrop click and close dialog', () => {
    dialogRefMock.backdropClick().subscribe(() => {
      expect(dialogRefMock.close).toHaveBeenCalled();
    });
  });
});
