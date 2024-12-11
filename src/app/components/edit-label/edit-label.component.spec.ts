import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditLabelComponent } from './edit-label.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';

describe('EditLabelComponent', () => {
  let component: EditLabelComponent;
  let fixture: ComponentFixture<EditLabelComponent>;
  let matDialogRefMock: any;

  const mockData = ['Label 1', 'Label 2'];

  beforeEach(() => {
    matDialogRefMock = {
      close: jasmine.createSpy('close'),
    };

    TestBed.configureTestingModule({
      declarations: [EditLabelComponent],
      imports: [
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
      ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: mockData },
        { provide: MatDialogRef, useValue: matDialogRefMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EditLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should clear input field when "cancel" action is triggered', () => {
    const inputElement = { value: 'Some text' };
    component.labelhandle(inputElement, 'cancel');

    expect(inputElement.value).toBe('');
  });

  it('should remove a label when "remove" action is triggered', () => {
    const initialLength = component.labels.length;

    component.labelhandle(0, 'remove');

    expect(component.labels.length).toBe(initialLength - 1);
    expect(component.labels).not.toContain('Label 1');
  });

  it('should update a label when "edit" action is triggered', () => {
    const updatedLabel = 'Updated Label';
    component.labelhandle(0, 'edit', updatedLabel);

    expect(component.labels[0]).toBe(updatedLabel);
  });

  it('should not update a label with an empty or whitespace-only value', () => {
    const originalLabel = component.labels[0];
    component.labelhandle(0, 'edit', '   ');

    expect(component.labels[0]).toBe(originalLabel);
  });

  it('should close the dialog and return updated labels when "onNoClick" is called', () => {
    component.onNoClick();

    expect(matDialogRefMock.close).toHaveBeenCalledWith(component.labels);
  });

  it('should call the console log when a new label is added', () => {
    const consoleSpy = spyOn(console, 'log');
    const newLabel = 'Console Label';

    component.labelhandle({ value: '' }, 'add', newLabel);

    expect(consoleSpy).toHaveBeenCalledWith(component.labels);
  });
});
