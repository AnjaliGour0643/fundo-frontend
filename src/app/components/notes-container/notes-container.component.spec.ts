import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NotesContainerComponent } from './notes-container.component';
import { AddNoteComponent } from '../add-note/add-note.component';
import { FilterPipe } from 'src/app/pipes/filter.pipe';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of, Subject } from 'rxjs';
import { DataService } from 'src/app/services/dataService/data.service';
import { HttpService } from 'src/app/services/http-service/http.service';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

describe('NotesContainerComponent', () => {
  let component: NotesContainerComponent;
  let fixture: ComponentFixture<NotesContainerComponent>;
  let httpService: HttpService;

  const mockNotes = [
    { _id: '1', title: 'Note 1', description: 'Description 1', isArchive: false, isTrash: false },
    { _id: '2', title: 'Note 2', description: 'Description 2', isArchive: false, isTrash: false },
  ];

  beforeEach(async () => {
    const dataServiceMock = {
      incomingData: new Subject(),
    };

    const httpServiceMock = {
      getApiCall: jasmine.createSpy('getApiCall').and.returnValue(of({ notes: mockNotes })),
    };

    await TestBed.configureTestingModule({
      declarations: [NotesContainerComponent, AddNoteComponent, FilterPipe],
      imports: [
        HttpClientTestingModule,
        MatDialogModule,
        BrowserAnimationsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        FormsModule,
        ReactiveFormsModule,
        MatSidenavModule,
        MatIconModule,
        MatButtonToggleModule,
        MatMenuModule,
        MatGridListModule,
        MatProgressSpinnerModule,
      ],
      providers: [
        { provide: DataService, useValue: dataServiceMock },
        { provide: HttpService, useValue: httpServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(NotesContainerComponent);
    component = fixture.componentInstance;
    httpService = TestBed.inject(HttpService);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch notes on initialization', () => {
    expect(httpService.getApiCall).toHaveBeenCalledWith(
      '/api/v1/notes/',
      jasmine.any(Object) // The headers
    );
    expect(component.notesList.length).toBe(2);
    expect(component.loader).toBe('none');
  });

  it('should remove a note when handleUpdateList is called with action "trash"', () => {
    component.handleUpdateList({ _id: '1', action: 'trash' });

    expect(component.notesList.length).toBe(1);
    expect(component.notesList.some((note) => note._id === '1')).toBe(false);
  });

  it('should update the note color when handleUpdateList is called with a color change', () => {
    const updatedColor = '#ff0000';
    component.handleUpdateList({ _id: '1', color: updatedColor });
  
    const updatedNote = component.notesList.find((note) => note._id === '1');
    expect(updatedNote?.color).toBe(updatedColor);
  });

  it('should show the spinner while loading', () => {
    component.loader = 'flex';
    fixture.detectChanges();

    const spinner = fixture.nativeElement.querySelector('.spinner');
    expect(spinner.style.display).toBe('flex');
  });

  it('should display "Add a note to display" when notesList is empty', () => {
    component.loader = 'none';
    component.notesList = [];
    fixture.detectChanges();

    const noNoteMessage = fixture.nativeElement.querySelector('.no_note span');
    expect(noNoteMessage.textContent).toBe('Add a note to display');
  });
  
});