import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http-service/http.service';

@Component({
  selector: 'app-notes-container',
  templateUrl: './notes-container.component.html',
  styleUrls: ['./notes-container.component.scss']
})
export class NotesContainerComponent implements OnInit {

  notesList: any[] = []

  constructor(private httpService: HttpService){
    
  }

  ngOnInit() {
    const header = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    this.httpService.getApiCall('/api/v1/notes/', header).subscribe({
      next: (res: any) => {
        console.log(res);
        this.notesList = res.notes.map((note: {title: string}) => note.title)
      },
      error: (err) => {
        console.log(err)
      }
    })
    
  }

  handleUpdateList($event: any){
    let {data, action} = $event
    if(action === 'add'){
      this.notesList.push(data)
    }
    else if(action === 'archive'){
      this.notesList = this.notesList.filter((element) => element != data)
    }
    
  }

}