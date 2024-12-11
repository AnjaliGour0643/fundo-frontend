import { TestBed } from '@angular/core/testing';
import { DataService } from './data.service';

describe('DataService', () => {
  let service: DataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have a default searchSource value as an empty string', (done) => {
    service.incomingSearchText.subscribe((value) => {
      expect(value).toBe('');
      done();
    });
  });

  it('should have a default messageSource value as an empty array', (done) => {
    service.incomingData.subscribe((value) => {
      expect(value).toEqual([]);
      done();
    });
  });

  it('should update messageSource when outgoingData is called', (done) => {
    const testMessage = ['Test message'];
    service.outgoingData(testMessage);
    service.incomingData.subscribe((value) => {
      expect(value).toEqual(testMessage);
      done();
    });
  });

  it('should log the message when outgoingData is called', () => {
    const consoleSpy = spyOn(console, 'log');
    const testMessage = ['Log this message'];
    service.outgoingData(testMessage);
    expect(consoleSpy).toHaveBeenCalledWith(testMessage);
  });

});
