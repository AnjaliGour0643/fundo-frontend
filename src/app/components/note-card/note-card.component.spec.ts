import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoteCardComponent } from './note-card.component';
import { MatDialogModule, MatDialog} from '@angular/material/dialog';
import { UpdateNoteComponent } from '../update-note/update-note.component';
import { By } from '@angular/platform-browser';
import { Component } from '@angular/core';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { of } from 'rxjs';
import { MatMenuModule } from '@angular/material/menu';

// Mocking the UpdateNoteComponent to avoid complexity in the test
@Component({selector: 'app-update-note', template: ''})
class MockUpdateNoteComponent {}

describe('NoteCardComponent', () => {
  let component: NoteCardComponent;
  let fixture: ComponentFixture<NoteCardComponent>;
  let matDialog: MatDialog;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NoteCardComponent, UpdateNoteComponent],
      imports: [MatDialogModule,HttpClientModule, MatIconModule, MatMenuModule],
      providers: [MatDialog],
      schemas: [NO_ERRORS_SCHEMA], 
    });
    
    fixture = TestBed.createComponent(NoteCardComponent);
    component = fixture.componentInstance;
    matDialog = TestBed.inject(MatDialog);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

    it('should emit updateList event with correct data on handleNoteIconsClick for "archive"', () => {
        spyOn(component.updateList, 'emit');
        spyOn(component['httpService'], 'putApiCall').and.returnValue(of({}));
    
        component.noteDetails = { title: 'Test', description: 'Test Desc', _id: '12345', color: '#ffffff' };
        component.handleNoteIconsClick('archive');
    
        expect(component['httpService'].putApiCall).toHaveBeenCalledWith(
        '/api/v1/notes/12345/archive',
        {},
        jasmine.any(Object)
        );
        expect(component.updateList.emit).toHaveBeenCalledWith({ _id: '12345', action: 'archive' });
    });      

      it('should update note color when handleNoteColor is called', () => {
        spyOn(component['httpService'], 'putApiCall').and.returnValue(of({}));
        spyOn(component.updateList, 'emit');
      
        const color = '#f39f76';
        component.noteDetails = { title: 'Test', description: 'Test Desc', _id: '12345', color: '#ffffff' };
      
        component.handleNoteColor(color);
      
        expect(component['httpService'].putApiCall).toHaveBeenCalledWith(
          '/api/v1/notes/12345',
          { color },
          jasmine.any(Object)
        );
        expect(component.updateList.emit).toHaveBeenCalledWith({ _id: '12345', color });
      });
      
      it('should display correct background color for note card', () => {
        component.noteDetails.color = '#faafa8';
        fixture.detectChanges();
      
        const noteCardElement = fixture.debugElement.query(By.css('.notecard')).nativeElement;
        expect(noteCardElement.style.backgroundColor).toBe('rgb(250, 175, 168)');
      });
      
});
