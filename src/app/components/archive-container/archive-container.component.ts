import { HttpHeaders } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { HttpService } from 'src/app/services/http-service/http.service';

@Component({
  selector: 'app-archive-container',
  templateUrl: './archive-container.component.html',
  styleUrls: ['./archive-container.component.scss']
})
export class ArchiveContainerComponent {
  archiveList: any[] = [];
  loader:string = 'flex'
  @Input() action: string = '';

  constructor(public httpService: HttpService) {}

  ngOnInit() {
    this.fetchArchivedNotes();
  }

  fetchArchivedNotes() {
    const header = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    this.httpService.getApiCall('/api/v1/notes', header).subscribe({
      next: (res: any) => {
        let list = res.notes.map((note: { title: string; description: string; _id: string; color:string; isArchive: boolean }) => ({
          title: note.title, 
          description: note.description, 
          _id: note._id, 
          color: note.color,
          isArchive: note.isArchive}));
        this.archiveList = list.filter((note: any) => note.isArchive === true);
        console.log(this.archiveList);
        this.loader = 'none'
      },
      error: (err) => console.error(err),
    });
  }

  handleUpdate() {
    this.fetchArchivedNotes();
  }
}
