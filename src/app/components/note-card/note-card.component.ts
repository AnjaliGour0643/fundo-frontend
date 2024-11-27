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

  @Input() noteDetails: { title: string; description: string; _id: string } = {title: '', description: '', _id: ''};
  isHovering = false;

  @Output() updateList = new EventEmitter

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
    
    if (action === 'archive') {
      this.httpService.putApiCall(`/api/v1/notes/${this.noteDetails._id}/archive`, {}, header).subscribe({
        next: (res: any) => {
          console.log('Archive status toggled:', res);
          this.updateList.emit({ _id: this.noteDetails._id, action: 'archive' });
        },
        error: (err) => console.error('Error archiving note:', err),
      });
    } else if (action === 'trash') {
      this.httpService.putApiCall(`/api/v1/notes/${this.noteDetails._id}/trash`, {}, header).subscribe({
        next: (res: any) => {
          console.log('Trash status toggled:', res);
          this.updateList.emit({ _id: this.noteDetails._id, action: 'trash' });
        },
        error: (err) => console.error('Error trashing note:', err),
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

}