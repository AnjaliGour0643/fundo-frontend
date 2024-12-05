import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/dataService/data.service';
import { ARCHIVE_ICON, BELL_ICON, BULB_ICON, EDIT_ICON, LIST_VIEW_ICON, MENU_ICON, OTHER_MENU_ICON, PROFILE_ICON, REFRESH_ICON, SETTING_ICON, SIGN_OUT_ICON, TRASH_ICON } from 'src/assets/svg-icons';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent{
  email: any = localStorage.getItem('email')
  firstname: any = localStorage.getItem('firstname')

  drawerState: boolean = false;

  constructor(private iconRegistry: MatIconRegistry, private sanitizer: DomSanitizer, private router: Router, private dataService: DataService) {
    iconRegistry.addSvgIconLiteral('menu-icon', sanitizer.bypassSecurityTrustHtml(MENU_ICON));
    iconRegistry.addSvgIconLiteral('refresh-icon', sanitizer.bypassSecurityTrustHtml(REFRESH_ICON));
    iconRegistry.addSvgIconLiteral('list-view-icon', sanitizer.bypassSecurityTrustHtml(LIST_VIEW_ICON));
    iconRegistry.addSvgIconLiteral('setting-icon', sanitizer.bypassSecurityTrustHtml(SETTING_ICON)); 
    iconRegistry.addSvgIconLiteral('other-menu-icon', sanitizer.bypassSecurityTrustHtml(OTHER_MENU_ICON)); 
    iconRegistry.addSvgIconLiteral('profile-icon', sanitizer.bypassSecurityTrustHtml(PROFILE_ICON)); 
    iconRegistry.addSvgIconLiteral('sign-out-icon', sanitizer.bypassSecurityTrustHtml(SIGN_OUT_ICON));
    iconRegistry.addSvgIconLiteral('trash-icon', sanitizer.bypassSecurityTrustHtml(TRASH_ICON)); 
    iconRegistry.addSvgIconLiteral('edit-icon', sanitizer.bypassSecurityTrustHtml(EDIT_ICON)); 
    iconRegistry.addSvgIconLiteral('bulb-icon', sanitizer.bypassSecurityTrustHtml(BULB_ICON)); 
    iconRegistry.addSvgIconLiteral('archive-icon', sanitizer.bypassSecurityTrustHtml(ARCHIVE_ICON)); 
    iconRegistry.addSvgIconLiteral('bell-icon', sanitizer.bypassSecurityTrustHtml(BELL_ICON)); 
  }

  handleDrawerClick(click?: string){
    if(click === 'menu')
      this.drawerState = !this.drawerState
    else if(this.drawerState === true)
      this.drawerState = false
  }

  updateSearchTerm(event: Event): void {
    const input = event.target as HTMLInputElement;
    console.log('User entered search text:', input.value);
    this.dataService.updateSearchText(input.value); // Send search term to DataService
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['']);
  }

}
