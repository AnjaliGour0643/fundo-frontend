import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { REMINDER_ICON, COLLABRATOR_ICON, COLOR_PALATTE_ICON, IMG_ICON, ARCHIVE_ICON, MORE_ICON, DELETE_FOREVER_ICON, RESTORE_ICON, UNARCHIVE_ICON } from 'src/assets/svg-icons';

@Component({
  selector: 'app-note-card',
  templateUrl: './note-card.component.html',
  styleUrls: ['./note-card.component.scss']
})
export class NoteCardComponent {

  @Input() noteDetails: { title: string; description: string } = { title: '', description: '' };

  @Output() updateList = new EventEmitter

  constructor(private iconRegistry: MatIconRegistry, private sanitizer: DomSanitizer) {
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

  handleNoteIconsClick(action: string) {
    this.updateList.emit({ ...this.noteDetails, action });
  }
}