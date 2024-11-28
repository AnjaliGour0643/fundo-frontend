import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/dataService/data.service';
import { MENU_ICON } from 'src/assets/svg-icons';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  drawerState: boolean = false;

  constructor(private iconRegistry: MatIconRegistry, private sanitizer: DomSanitizer, private router: Router, private dataService: DataService) {
    iconRegistry.addSvgIconLiteral('menu-icon', sanitizer.bypassSecurityTrustHtml(MENU_ICON));
  }

  handleDrawerClick(): void {
    this.drawerState = !this.drawerState;
  }

  updateSearchTerm(event: Event): void {
    const input = event.target as HTMLInputElement;
    console.log('User entered search text:', input.value);
    this.dataService.updateSearchText(input.value); // Send search term to DataService
  }
  
}
