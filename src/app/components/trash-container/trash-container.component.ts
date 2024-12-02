import { HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { HttpService } from 'src/app/services/http-service/http.service';

@Component({
  selector: 'app-trash-container',
  templateUrl: './trash-container.component.html',
  styleUrls: ['./trash-container.component.scss']
})
export class TrashContainerComponent {
  trashList: any[] = [];

  constructor(public httpService: HttpService) {}

  ngOnInit() {
    this.fetchTrashedNotes();
  }

  fetchTrashedNotes() {
    const header = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    this.httpService.getApiCall('/api/v1/notes', header).subscribe({
      next: (res: any) => {
        let list = res.notes.map((note: { title: string; description: string; _id: string; color: string; isTrash: boolean }) => ({
          title: note.title, 
          description: note.description, 
          _id: note._id, 
          color: note.color,
          isTrash: note.isTrash
        }));
        this.trashList = list.filter((note: any) => note.isTrash === true);
        console.log(this.trashList);
      },
      error: (err) => console.error(err),
    });
  }

  handleUpdate() {
    this.fetchTrashedNotes();
  }
}
