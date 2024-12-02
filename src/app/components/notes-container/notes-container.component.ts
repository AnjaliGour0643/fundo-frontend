import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/dataService/data.service';
import { HttpService } from 'src/app/services/http-service/http.service';

@Component({
  selector: 'app-notes-container',
  templateUrl: './notes-container.component.html',
  styleUrls: ['./notes-container.component.scss']
})
export class NotesContainerComponent implements OnInit {
  notesList: Array<{ title: string; description: string, _id: string }> = [];
  filterNote: string = '';

  constructor(private httpService: HttpService, private dataService: DataService) {}

  ngOnInit() {
    const header = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);

    this.httpService.getApiCall('/api/v1/notes/', header).subscribe({
      next: (res: any) => {
        console.log(res);
    
        this.notesList = res.notes
          .filter((note: { isArchive: boolean; isTrash: boolean }) => !note.isArchive && !note.isTrash)
          .map((note: { title: string; description: string; _id: string; color: string }) => ({
            title: note.title,
            description: note.description,
            _id: note._id,
            color: note.color || '#fff'
          }));
      },
      error: (err) => {
        console.error(err);
      }
    });
    

    this.dataService.incomingSearchText.subscribe((text) => {
      console.log('Current search text:', text); 
      this.filterNote = text; 
    });

  }


  handleUpdateList($event: any) {
    const { title, description, _id, action, color } = $event;
  
    if (action === 'add') {
      this.notesList.push({ title, description, _id });
    } else if (action === 'archive' || action === 'trash') {
      this.notesList = this.notesList.filter((note) => note._id !== _id);
    } else if (color) {
      this.notesList = this.notesList.map((note) => 
        note._id === _id ? { ...note, color } : note
      );
    }
  }

}
