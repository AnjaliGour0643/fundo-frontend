import { TestBed } from '@angular/core/testing';
import { DataService } from '../dataService/data.service';

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

  it('should emit updated values for messageSource when outgoingData is called multiple times', (done) => {
    const messages = [['Message 1'], ['Message 2'], ['Message 3']];
    let index = 0;

    service.incomingData.subscribe((value) => {
      expect(value).toEqual(messages[index]);
      index++;
      if (index === messages.length) {
        done();
      }
    });

    messages.forEach((msg) => service.outgoingData(msg));
  });

  it('should log the message when outgoingData is called', () => {
    const consoleSpy = spyOn(console, 'log');
    const testMessage = ['Log this message'];
    service.outgoingData(testMessage);
    expect(consoleSpy).toHaveBeenCalledWith(testMessage);
  });

  it('should allow multiple subscribers to get the latest messageSource value', (done) => {
    const testMessage = ['Shared message'];

    let firstSubscriberCalled = false;
    let secondSubscriberCalled = false;

    service.incomingData.subscribe((value) => {
      expect(value).toEqual(testMessage);
      firstSubscriberCalled = true;
      if (firstSubscriberCalled && secondSubscriberCalled) {
        done();
      }
    });

    service.incomingData.subscribe((value) => {
      expect(value).toEqual(testMessage);
      secondSubscriberCalled = true;
      if (firstSubscriberCalled && secondSubscriberCalled) {
        done();
      }
    });

    service.outgoingData(testMessage);
  });
});
