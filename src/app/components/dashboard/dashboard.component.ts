import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { MENU_ICON } from 'src/assets/svg-icons';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent {
  drawerState: boolean = false
  
  constructor(private iconRegistry: MatIconRegistry, private sanitizer: DomSanitizer) {
    iconRegistry.addSvgIconLiteral('menu-icon', sanitizer.bypassSecurityTrustHtml(MENU_ICON));
  }
  handleDrawerClick(){
    this.drawerState = !this.drawerState
  }
}