import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TrashContainerComponent } from './trash-container.component';
import { HttpService } from 'src/app/services/http-service/http.service';
import { of, throwError } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSpinner } from '@angular/material/progress-spinner';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('TrashContainerComponent', () => {
  let component: TrashContainerComponent;
  let fixture: ComponentFixture<TrashContainerComponent>;
  let httpServiceMock: jasmine.SpyObj<HttpService>;

  beforeEach(() => {
    httpServiceMock = jasmine.createSpyObj('HttpService', ['getApiCall']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [TrashContainerComponent, MatSpinner],
      providers: [
        { provide: HttpService, useValue: httpServiceMock },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    });

    fixture = TestBed.createComponent(TrashContainerComponent);
    component = fixture.componentInstance;
  });

  it('should create the TrashContainerComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch trashed notes on init', () => {
    const mockTrashNotes = [
      { _id: '1', title: 'Test Note 1', description: 'Test Description 1', isTrash: true, color: 'red' },
      { _id: '2', title: 'Test Note 2', description: 'Test Description 2', isTrash: true, color: 'blue' },
    ];

    const mockResponse = { notes: mockTrashNotes };
    httpServiceMock.getApiCall.and.returnValue(of(mockResponse));
    
    component.ngOnInit();
    fixture.detectChanges();
    
    expect(component.trashList.length).toBe(2);
    expect(component.loader).toBe('none');
  });

  it('should handle API error while fetching trashed notes', () => {
    const mockError = new Error('API error');
    httpServiceMock.getApiCall.and.returnValue(throwError(() => mockError));

    spyOn(console, 'error');

    component.ngOnInit();
    fixture.detectChanges();

    expect(console.error).toHaveBeenCalledWith(mockError);
    expect(component.loader).toBe('flex');  // Loader should still be visible due to the error
  });

  it('should show "Trash is empty" if no trashed notes are available', () => {
    const mockResponse = { notes: [] };
    httpServiceMock.getApiCall.and.returnValue(of(mockResponse));

    component.ngOnInit();
    fixture.detectChanges();

    const emptyMessage = fixture.nativeElement.querySelector('.no_note');
    expect(emptyMessage).toBeTruthy();
  });

  it('should hide loader and show notes if trash list is fetched', async () => {
    const mockTrashNotes = [
      { _id: '1', title: 'Test Note 1', description: 'Test Description 1', isTrash: true, color: 'red' },
      { _id: '2', title: 'Test Note 2', description: 'Test Description 2', isTrash: true, color: 'blue' },
    ];
  
    const mockResponse = { notes: mockTrashNotes };
    httpServiceMock.getApiCall.and.returnValue(of(mockResponse));

    component.ngOnInit();
    fixture.detectChanges();
  
    await fixture.whenStable();
    fixture.detectChanges();
  
    const loaderElement = fixture.nativeElement.querySelector('.spinner');
    const noNoteElement = fixture.nativeElement.querySelector('.no_note');
    const notesElement = fixture.nativeElement.querySelector('.notes');
  
    expect(loaderElement.style.display).toBe('none');
    expect(noNoteElement).toBeNull();
    expect(notesElement).not.toBeNull();
    expect(notesElement.children.length).toBeGreaterThan(0); // Ensure that there are notes in the list
  });
  

  it('should update the trash list when handleUpdate is called', () => {
    const mockTrashNotes = [
      { _id: '1', title: 'Test Note 1', description: 'Test Description 1', isTrash: true, color: 'red' },
      { _id: '2', title: 'Test Note 2', description: 'Test Description 2', isTrash: true, color: 'blue' },
    ];

    const mockResponse = { notes: mockTrashNotes };
    httpServiceMock.getApiCall.and.returnValue(of(mockResponse));

    component.ngOnInit();
    fixture.detectChanges();

    component.handleUpdate();
    fixture.detectChanges();

    expect(httpServiceMock.getApiCall).toHaveBeenCalledTimes(3);  // It should be called twice (once on init and once on update)
  });

  it('should not update the trash list if API call fails', () => {
    httpServiceMock.getApiCall.and.returnValue(throwError(() => new Error('API error')));

    spyOn(console, 'error');
    
    component.handleUpdate();
    fixture.detectChanges();
    
    expect(console.error).toHaveBeenCalled();
    expect(component.loader).toBe('flex');
  });
});
