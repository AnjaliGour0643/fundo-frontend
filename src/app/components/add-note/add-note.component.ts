import { HttpHeaders } from '@angular/common/http';
import { Component, EventEmitter, Output } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpService } from 'src/app/services/http-service/http.service';
import { REMINDER_ICON, COLLABRATOR_ICON, COLOR_PALATTE_ICON, IMG_ICON, ARCHIVE_ICON, MORE_ICON, DELETE_FOREVER_ICON, RESTORE_ICON, UNARCHIVE_ICON, TICK_ICON, BRUSH_ICON, PIN_ICON } from 'src/assets/svg-icons';

@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.component.html',
  styleUrls: ['./add-note.component.scss']
})
export class AddNoteComponent {

  title: string = ''
  description: string = ''

  addnote: boolean = true

  @Output() updateList = new EventEmitter()

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
  
  color: string = '#ffffff';
  
  setNoteColor(color: string) {
    this.color = color; 
    this.color = color; 
  }

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
    iconRegistry.addSvgIconLiteral('tick-icon', sanitizer.bypassSecurityTrustHtml(TICK_ICON));
    iconRegistry.addSvgIconLiteral('brush-icon', sanitizer.bypassSecurityTrustHtml(BRUSH_ICON));
    iconRegistry.addSvgIconLiteral('pin-icon', sanitizer.bypassSecurityTrustHtml(PIN_ICON));

  }

  addNoteToggle(action: string) {
    
    let title = this.title.trim();
    let description = this.description.trim();
    
    if (action !== 'archive') {
      this.addnote = !this.addnote;
    }
  
    if ((action === 'save' || action === 'archive') && (title && description)) {
      const isArchive = action === 'archive';
      const header = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
      
      this.httpService.postApiCall('/api/v1/notes', { title, description, color: this.color, isArchive }, header).subscribe({
        next: (res: any) => {
          const _id = res.note._id;
          console.log(res);
  
          this.updateList.emit({ title, description, color: this.color, _id, action: isArchive ? 'archive' : 'add' });
        },
        error: (err) => {
          console.log(err);
        }
      });
    }
  
    // Reset input fields and color
    this.title = '';
    this.description = '';
    this.color = '#ffffff';
  }
  
  

}