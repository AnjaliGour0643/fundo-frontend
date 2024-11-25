import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http-service/http.service';
import { MatDialog } from '@angular/material/dialog';
import { UpdateNoteComponent } from '../update-note/update-note.component';

@Component({
  selector: 'app-notes-container',
  templateUrl: './notes-container.component.html',
  styleUrls: ['./notes-container.component.scss']
})
export class NotesContainerComponent implements OnInit {
  notesList: Array<{ title: string; description: string, _id: string }> = []; // Ensure title & description are included.
  // notesList: any[] = [];
  constructor(private httpService: HttpService, public dialog: MatDialog) {}

  ngOnInit() {
    const header = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);

    this.httpService.getApiCall('/api/v1/notes/', header).subscribe({
      next: (res: any) => {
        console.log(res);

        // Map the response to include both title and description.
        this.notesList = res.notes.map((note: { title: string; description: string, _id:string }) => ({
          title: note.title,
          description: note.description,
          _id :note._id
        }));
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  handleUpdateList($event: any) {
    let {title, description, _id, action} = $event

    if (action === 'add') {
      this.notesList.push({title, description, _id: ''});
    } else if (action === 'archive') {
      this.notesList = this.notesList.filter((element) => element._id != _id);
    }
  }

  editNotesDialog(note: any){
    let dialogRef = this.dialog.open(UpdateNoteComponent, {
      height: 'auto',
      width: '600px',
      data: note
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log('closed');
    });
  }
}
