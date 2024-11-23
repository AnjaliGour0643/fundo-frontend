import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http-service/http.service';

@Component({
  selector: 'app-notes-container',
  templateUrl: './notes-container.component.html',
  styleUrls: ['./notes-container.component.scss']
})
export class NotesContainerComponent implements OnInit {
  notesList: Array<{ title: string; description: string }> = []; // Ensure title & description are included.

  constructor(private httpService: HttpService) {}

  ngOnInit() {
    const header = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);

    this.httpService.getApiCall('/api/v1/notes/', header).subscribe({
      next: (res: any) => {
        console.log(res);

        // Map the response to include both title and description.
        this.notesList = res.notes.map((note: { title: string; description: string }) => ({
          title: note.title || 'Untitled',
          description: note.description || 'No description available',
        }));
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  handleUpdateList($event: any) {
    const { data, action } = $event;

    if (action === 'add') {
      this.notesList.push(data);
    } else if (action === 'archive') {
      this.notesList = this.notesList.filter((element) => element !== data);
    }
  }
}
