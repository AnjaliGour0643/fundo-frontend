import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { MatDialog } from '@angular/material/dialog';
import { UpdateNoteComponent } from '../update-note/update-note.component';
import { REMINDER_ICON, COLLABRATOR_ICON, COLOR_PALATTE_ICON, IMG_ICON, ARCHIVE_ICON, MORE_ICON, DELETE_FOREVER_ICON, RESTORE_ICON, UNARCHIVE_ICON, TRASH_ICON } from 'src/assets/svg-icons';
import { HttpService } from 'src/app/services/http-service/http.service';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-note-card',
  templateUrl: './note-card.component.html',
  styleUrls: ['./note-card.component.scss']
})
export class NoteCardComponent {

  @Input() noteDetails: { title: string; description: string; _id: string; color: string } = {title: '', description: '', _id: '', color: ''};
  @Input() action: string = '';
  
  isHovering = false;
  
  @Output() updateList = new EventEmitter

  colorArray: Array<any> = [
    { code: '#faafa8', name: 'Tomato' },
    { code: '#f39f76', name: 'OrangeRed'},
    { code: '#fff8b8', name: 'yellow' },
    { code: '#e2f6d3', name: 'greenyellow' },
    { code: '#b4ddd3', name: 'LightSteelBlue' },
    { code: '#d4e4ed', name: 'PaleGoldenRod' },
    { code: '#aeccdc', name: 'Aquamarine' },
    { code: '#d3bfdb', name: 'Bisque' },
    { code: '#f6e2dd', name: 'Silver' },
    { code: '#e9e3d4', name: 'RosyBrown' },
    { code: '#efeff1', name: 'grey' },
  ];

  constructor(private iconRegistry: MatIconRegistry, private sanitizer: DomSanitizer, private dialog: MatDialog, private httpService: HttpService) {
    iconRegistry.addSvgIconLiteral('reminder-icon', sanitizer.bypassSecurityTrustHtml(REMINDER_ICON));
    iconRegistry.addSvgIconLiteral('collabrator-icon', sanitizer.bypassSecurityTrustHtml(COLLABRATOR_ICON));
    iconRegistry.addSvgIconLiteral('color-palatte-icon', sanitizer.bypassSecurityTrustHtml(COLOR_PALATTE_ICON));
    iconRegistry.addSvgIconLiteral('img-icon', sanitizer.bypassSecurityTrustHtml(IMG_ICON));
    iconRegistry.addSvgIconLiteral('archive-icon', sanitizer.bypassSecurityTrustHtml(ARCHIVE_ICON));
    iconRegistry.addSvgIconLiteral('more-icon', sanitizer.bypassSecurityTrustHtml(MORE_ICON));
    iconRegistry.addSvgIconLiteral('delete-forever-icon', sanitizer.bypassSecurityTrustHtml(DELETE_FOREVER_ICON));
    iconRegistry.addSvgIconLiteral('restore-icon', sanitizer.bypassSecurityTrustHtml(RESTORE_ICON));
    iconRegistry.addSvgIconLiteral('unarchive-icon', sanitizer.bypassSecurityTrustHtml(UNARCHIVE_ICON));
    iconRegistry.addSvgIconLiteral('trash-icon', sanitizer.bypassSecurityTrustHtml(TRASH_ICON));
  }

  handleNoteIconsClick(action: string) {
    const header = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    
    if (action === 'archive' || action === 'unarchive') {
      console.log(this.noteDetails._id)
      this.httpService.putApiCall(`/api/v1/notes/${this.noteDetails._id}/archive`, {}, header).subscribe({
        next: (res: any) => {
          console.log('Archive status toggled:', res);
          this.updateList.emit({ _id: this.noteDetails._id, action: 'archive' });
        },
        error: (err) => console.error('Error archiving note:', err),
      });
    } else if (action === 'trash' || action === 'restore') {
      this.httpService.putApiCall(`/api/v1/notes/${this.noteDetails._id}/trash`, {}, header).subscribe({
        next: (res: any) => {
          console.log('Trash status toggled:', res);
          this.updateList.emit({ _id: this.noteDetails._id, action: 'trash' });
        },
        error: (err) => console.error('Error trashing note:', err),
      });
    } else if (action === 'deleteForever' ) {
      this.httpService.deleteApiCall(`/api/v1/notes/${this.noteDetails._id}`, {}, header).subscribe({
        next: (res: any) => {
          console.log('Trash status toggled:', res);
          this.updateList.emit({ _id: this.noteDetails._id, action: 'deleteForever' });
        },
        error: (err) => console.error('Error deleting note:', err),
      });
    }
  }
  

  editNoteDialog() {
    const dialogRef = this.dialog.open(UpdateNoteComponent, {
      height: 'auto',
      width: '600px',
      data: this.noteDetails,
    });

    dialogRef.afterClosed().subscribe(result => {
      this.noteDetails = {...result, _id: this.noteDetails._id}
    });
  }

  handleNoteColor(color: string) {
    const header = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    this.httpService.putApiCall(`/api/v1/notes/${this.noteDetails._id}`, { color }, header).subscribe({
      next: (res: any) => {
        console.log('Color updated:', res);
        this.updateList.emit({ _id: this.noteDetails._id, color });
      },
      error: (err: any) => {
        console.error('Error updating color:', err);
      }
    });
  }
}