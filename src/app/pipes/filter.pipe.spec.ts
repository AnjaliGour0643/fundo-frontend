import { FilterPipe } from './filter.pipe';

describe('FilterPipe', () => {
  let pipe: FilterPipe;

  beforeEach(() => {
    pipe = new FilterPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return the original value when filterNote is empty', () => {
    const notes = [
      { title: 'Meeting Notes', description: 'Discuss project timelines' },
      { title: 'Shopping List', description: 'Buy groceries' },
    ];
    const result = pipe.transform(notes, '');
    expect(result).toEqual(notes);
  });

  it('should return filtered notes when filterNote matches titles', () => {
    const notes = [
      { title: 'Meeting Notes', description: 'Discuss project timelines' },
      { title: 'Shopping List', description: 'Buy groceries' },
      { title: 'Daily Notes', description: 'Track daily tasks' },
    ];
    const result = pipe.transform(notes, 'Notes');
    expect(result).toEqual([
      { title: 'Meeting Notes', description: 'Discuss project timelines' },
      { title: 'Daily Notes', description: 'Track daily tasks' },
    ]);
  });

  it('should return an empty array when no title matches filterNote', () => {
    const notes = [
      { title: 'Meeting Notes', description: 'Discuss project timelines' },
      { title: 'Shopping List', description: 'Buy groceries' },
    ];
    const result = pipe.transform(notes, 'Work');
    expect(result).toEqual([]);
  });

  it('should perform case-sensitive filtering by default', () => {
    const notes = [
      { title: 'Meeting Notes', description: 'Discuss project timelines' },
      { title: 'shopping list', description: 'Buy groceries' },
    ];
    const result = pipe.transform(notes, 'Meeting');
    expect(result).toEqual([{ title: 'Meeting Notes', description: 'Discuss project timelines' }]);
  });

  it('should return an empty array when the input array is empty', () => {
    const notes: any[] = [];
    const result = pipe.transform(notes, 'Notes');
    expect(result).toEqual([]);
  });

});
