import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { CANCEL_ICON, LABELS_ICON, TICK2_ICON, TRASH2_ICON, TRASH_ICON } from 'src/assets/svg-icons';

@Component({
  selector: 'app-edit-label',
  templateUrl: './edit-label.component.html',
  styleUrls: ['./edit-label.component.scss']
})
export class EditLabelComponent {

  labels: string[] = [];

  constructor(private iconRegistry: MatIconRegistry, private sanitizer: DomSanitizer,
    public dialogRef: MatDialogRef<EditLabelComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    iconRegistry.addSvgIconLiteral('trash2-icon', sanitizer.bypassSecurityTrustHtml(TRASH2_ICON));
    iconRegistry.addSvgIconLiteral('tick2-icon', sanitizer.bypassSecurityTrustHtml(TICK2_ICON));
    iconRegistry.addSvgIconLiteral('trash-icon', sanitizer.bypassSecurityTrustHtml(TRASH_ICON));

    iconRegistry.addSvgIconLiteral('labels-icon', sanitizer.bypassSecurityTrustHtml(LABELS_ICON));
    iconRegistry.addSvgIconLiteral('cancel-icon', sanitizer.bypassSecurityTrustHtml(CANCEL_ICON));



    this.labels = data

  }

  onNoClick(): void {
    this.dialogRef.close(this.labels);
  }

  labelhandle(inputElement: any, action: string, newLabel?: any): void {
    if (action === 'add' && newLabel.trim()) { // Avoid adding empty or whitespace-only labels
      this.labels.push(newLabel.trim());
      console.log(this.labels);
      inputElement.value = ''
    }

    else if(action === 'cancel'){
      inputElement.value = ''
    }

    else if(action === 'remove'){
      if (inputElement > -1 && inputElement < this.labels.length) {
        this.labels.splice(inputElement, 1); // Remove the label at the specified index
      }
    }

    else if(action === 'edit'){
      if (newLabel.trim()) { // Ensure the value is not empty or whitespace
        this.labels[inputElement] = newLabel.trim();
      }
    }
  }
}
