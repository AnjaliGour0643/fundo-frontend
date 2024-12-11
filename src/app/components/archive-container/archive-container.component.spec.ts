import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ArchiveContainerComponent } from './archive-container.component';
import { HttpService } from 'src/app/services/http-service/http.service';
import { of, throwError } from 'rxjs';
import { MatSpinner } from '@angular/material/progress-spinner';
import { By } from '@angular/platform-browser';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-note-card',
  template: '',
})
class MockNoteCardComponent {
  @Input() noteDetails: any;
  @Input() action: string = '';
  @Output() updateList = new EventEmitter<void>();
}

describe('ArchiveContainerComponent', () => {
  let component: ArchiveContainerComponent;
  let fixture: ComponentFixture<ArchiveContainerComponent>;
  let httpService: HttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ArchiveContainerComponent, MockNoteCardComponent, MatSpinner],
      providers: [HttpService],
    });

    fixture = TestBed.createComponent(ArchiveContainerComponent);
    component = fixture.componentInstance;
    httpService = TestBed.inject(HttpService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show spinner when loading', () => {
    component.loader = 'flex';
    fixture.detectChanges();

    const spinner = fixture.debugElement.query(By.css('mat-spinner'));
    expect(spinner).toBeTruthy();
  });

  it('should display "Archive is empty" message when no notes are archived', fakeAsync(() => {
    component.loader = 'none';
    component.archiveList = [];
    fixture.detectChanges();

    const emptyMessage = fixture.debugElement.query(By.css('.no_note span')).nativeElement;
    expect(emptyMessage.textContent).toBe('Archive is empty');
  }));

  it('should fetch and display archived notes on initialization', fakeAsync(() => {
    const mockResponse = {
      notes: [
        { _id: '1', title: 'Note 1', description: 'Description 1', color: '#FFFFFF', isArchive: true },
        { _id: '2', title: 'Note 2', description: 'Description 2', color: '#000000', isArchive: false },
      ],
    };
    spyOn(httpService, 'getApiCall').and.returnValue(of(mockResponse));

    component.ngOnInit();
    tick();
    fixture.detectChanges();

    expect(component.archiveList.length).toBe(1);
    expect(component.archiveList[0].title).toBe('Note 1');
  }));

  it('should handle errors during API call', fakeAsync(() => {
    spyOn(httpService, 'getApiCall').and.returnValue(throwError({ message: 'API Error' }));
    spyOn(console, 'error');

    component.ngOnInit();
    tick();

    expect(console.error).toHaveBeenCalledWith({ message: 'API Error' });
  }));

  it('should fetch notes again when handleUpdate is called', fakeAsync(() => {
    const mockResponse = { notes: [{ _id: '1', title: 'Note 1', description: 'Description 1', isArchive: true }] };
    spyOn(httpService, 'getApiCall').and.returnValue(of(mockResponse));
    spyOn(component, 'fetchArchivedNotes').and.callThrough();

    component.handleUpdate();
    tick();
    fixture.detectChanges();

    expect(component.fetchArchivedNotes).toHaveBeenCalled();
    expect(component.archiveList.length).toBe(1);
  }));

  it('should handle updateList event from app-note-card', fakeAsync(() => {
    const mockResponse = { notes: [{ _id: '1', title: 'Note 1', description: 'Description 1', isArchive: true }] };
    spyOn(httpService, 'getApiCall').and.returnValue(of(mockResponse));
    component.archiveList = [{ _id: '1', title: 'Mock Note', description: 'Test', isArchive: true }];
    fixture.detectChanges();

    const noteCard = fixture.debugElement.query(By.directive(MockNoteCardComponent));
    spyOn(component, 'handleUpdate');
    noteCard.componentInstance.updateList.emit();
    tick();
    fixture.detectChanges();

    expect(component.handleUpdate).toHaveBeenCalled();
  }));
});
