import { HttpHeaders } from '@angular/common/http';
import { Component, EventEmitter, Output } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpService } from 'src/app/services/http-service/http.service';
import { REMINDER_ICON, COLLABRATOR_ICON, COLOR_PALATTE_ICON, IMG_ICON, ARCHIVE_ICON, MORE_ICON, DELETE_FOREVER_ICON, RESTORE_ICON, UNARCHIVE_ICON } from 'src/assets/svg-icons';

@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.component.html',
  styleUrls: ['./add-note.component.scss']
})
export class AddNoteComponent {
  isHovering = false;

  title: string = ''
  description: string = ''

  addnote: boolean = true

  @Output() updateList = new EventEmitter()

  constructor(private iconRegistry: MatIconRegistry, private sanitizer: DomSanitizer, private httpService: HttpService) {
    iconRegistry.addSvgIconLiteral('reminder-icon', sanitizer.bypassSecurityTrustHtml(REMINDER_ICON));
    iconRegistry.addSvgIconLiteral('collabrator-icon', sanitizer.bypassSecurityTrustHtml(COLLABRATOR_ICON));
    iconRegistry.addSvgIconLiteral('color-palatte-icon', sanitizer.bypassSecurityTrustHtml(COLOR_PALATTE_ICON));
    iconRegistry.addSvgIconLiteral('img-icon', sanitizer.bypassSecurityTrustHtml(IMG_ICON));
    iconRegistry.addSvgIconLiteral('archive-icon', sanitizer.bypassSecurityTrustHtml(ARCHIVE_ICON));
    iconRegistry.addSvgIconLiteral('more-icon', sanitizer.bypassSecurityTrustHtml(MORE_ICON));
    iconRegistry.addSvgIconLiteral('delete-forever-icon', sanitizer.bypassSecurityTrustHtml(DELETE_FOREVER_ICON));
    iconRegistry.addSvgIconLiteral('restore-icon', sanitizer.bypassSecurityTrustHtml(RESTORE_ICON));
    iconRegistry.addSvgIconLiteral('unarchive-icon', sanitizer.bypassSecurityTrustHtml(UNARCHIVE_ICON));
  }

  addNoteToggle(action: string){
    let title = this.title.trim();
    let description = this.description.trim();
    let color = 'white';

    this.addnote = !this.addnote

    if(action==='save' && (title && description)){
      const header = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
      
      this.httpService.postApiCall('/api/v1/notes', {title, description, color}, header).subscribe({
        next: (res: any) => {
          const _id = res.data._id;
          console.log(res)
          this.updateList.emit({ title, description, _id, action: 'add' });
        },
        error: (err) => {
          console.log(err)
        }
      })
    }
    // Reset the input fields
    this.title = '';
    this.description = '';
  }

}