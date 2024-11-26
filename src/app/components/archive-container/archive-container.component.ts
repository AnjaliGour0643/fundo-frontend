import { HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { HttpService } from 'src/app/services/http-service/http.service';

@Component({
  selector: 'app-archive-container',
  templateUrl: './archive-container.component.html',
  styleUrls: ['./archive-container.component.scss']
})
export class ArchiveContainerComponent {
  archiveList: any[] = []; 
  constructor(public httpService: HttpService){}
  ngOnInit() {
    const header = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    this.httpService.getApiCall('/api/v1/notes', header).subscribe({
      next: (res: any) => {
        let list = res.notes.map((note: {title: string, description:string, _id:string , isArchive:boolean}) => ({title:note.title, description:note.description, _id:note._id, isArchive: note.isArchive}))
        this.archiveList = list.filter((note: any) => note.isArchive === true)
        console.log(this.archiveList)
      },
      error: (err) => {
        console.log(err)
      }
    })
    
  }
}
