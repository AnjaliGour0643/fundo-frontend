import { HttpHeaders } from '@angular/common/http';
import { Component, Inject} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpService } from '../../services/http-service/http.service';

@Component({
  selector: 'app-update-note',
  templateUrl: './update-note.component.html',
  styleUrls: ['./update-note.component.scss']
})
export class UpdateNoteComponent{

  title: any = '';
  description: any = ''

  constructor(public httpService:HttpService, public dialogRef: MatDialogRef<UpdateNoteComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.title = data.title
    this.description = data.description
  }

  onNoClick(): void {
    this.dialogRef.close();
    const header = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    this.httpService.putApiCall(`/api/v1/notes/${this.data._id}`, {title:this.title, description:this.description}, header).subscribe({
      next: (res: any) => {
        console.log(res)
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

}