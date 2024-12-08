import { HttpHeaders } from '@angular/common/http';
import { Component, Inject} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpService } from '../../services/http-service/http.service';
import { REDO_ICON, UNDO_ICON } from 'src/assets/svg-icons';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-update-note',
  templateUrl: './update-note.component.html',
  styleUrls: ['./update-note.component.scss']
})
export class UpdateNoteComponent{

  title: any = '';
  description: any = '';
  color: string = '';
  _id: any = '';

  colorArray: Array<any> = [
    { code: '#faafa8', name: 'Tomato' },
    { code: '#f39f76', name: 'OrangeRed' },
    { code: '#fff8b8', name: 'Yellow' },
    { code: '#e2f6d3', name: 'GreenYellow' },
    { code: '#b4ddd3', name: 'LightSteelBlue' },
    { code: '#d4e4ed', name: 'PaleGoldenRod' },
    { code: '#aeccdc', name: 'Aquamarine' },
    { code: '#d3bfdb', name: 'Bisque' },
    { code: '#f6e2dd', name: 'Silver' },
    { code: '#e9e3d4', name: 'RosyBrown' },
    { code: '#efeff1', name: 'Grey' },
  ];
  
  setColor(color: string): void {
    this.color = color; 
  }  

  constructor(private iconRegistry: MatIconRegistry, private sanitizer: DomSanitizer,public httpService:HttpService, public dialogRef: MatDialogRef<UpdateNoteComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    iconRegistry.addSvgIconLiteral('undo-icon', sanitizer.bypassSecurityTrustHtml(UNDO_ICON));
    iconRegistry.addSvgIconLiteral('redo-icon', sanitizer.bypassSecurityTrustHtml(REDO_ICON));
    this.title = data.title,
    this.description = data.description,
    this.color = data.color
    this._id = data._id
  }

  ngOnInit(): void {
    this.dialogRef.backdropClick().subscribe(() => {
      this.onNoClick();
    });
  }

  onNoClick(): void {
    const header = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    this.httpService.putApiCall(`/api/v1/notes/${this.data._id}`, {title:this.title, description:this.description, color:this.data.color}, header).subscribe({
      next: (res: any) => {
        console.log(res)
        this.dialogRef.close({ title: this.title, description: this.description, color: this.color, _id: this._id });
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  archiveNote(): void {
  const header = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
  
  this.httpService.putApiCall(`/api/v1/notes/${this._id}`, { title: this.title, description: this.description, color: this.color }, header).subscribe({
    next: (res: any) => {
      console.log('Note updated before archiving:', res);

      this.httpService
        .putApiCall(`/api/v1/notes/${this.data._id}/archive`, {}, header)
        .subscribe({
          next: (res: any) => {
            console.log('Note archived:', res);
            this.dialogRef.close({ title: this.title, description: this.description, color: this.color, archived: true });
          },
          error: (err) => {
            console.error('Error archiving note:', err);
          },
        });
      },
      error: (err) => {
        console.log('Error updating note before archiving: ', err);
      }
    });
  }

  trashNote(): void {
    const header = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    this.httpService.putApiCall(`/api/v1/notes/${this._id}`, { title: this.title, description: this.description, color: this.color }, header).subscribe({
      next: (res: any) => {
        console.log('Note updated before trashing:', res);
    
        this.httpService.putApiCall(`/api/v1/notes/${this._id}/trash`, {}, header).subscribe({
          next: (res: any) => {
            console.log('Note moved to trash:', res);
            this.dialogRef.close({ _id: this._id, trashed: true });
          },
          error: (err) => {
            console.error('Error moving note to trash:', err);
          }
        });
      },
      error: (updateErr) => {
        console.error('Error updating note before trashing:', updateErr);
      },
    });
  }
}