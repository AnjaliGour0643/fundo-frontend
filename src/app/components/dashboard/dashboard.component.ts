  
  import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/services/dataService/data.service';
import { ARCHIVE_ICON, BELL_ICON, BULB_ICON, EDIT_ICON, LABEL_ICON, LIST_VIEW_ICON, MENU_ICON, OTHER_MENU_ICON, PROFILE_ICON, REFRESH_ICON, SETTING_ICON, SIGN_OUT_ICON, TRASH_ICON } from 'src/assets/svg-icons';
import { EditLabelComponent } from '../edit-label/edit-label.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy{
  email: any = localStorage.getItem('email')
  firstname: any = localStorage.getItem('firstname')

  currentRoute: string = '';
  subscription!: Subscription;
  drawerState: boolean = false;

  labels: string[] = []

  constructor(private iconRegistry: MatIconRegistry, private sanitizer: DomSanitizer, public router: Router, public dataService: DataService,public dialog:MatDialog) {
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
    iconRegistry.addSvgIconLiteral('label-icon', sanitizer.bypassSecurityTrustHtml(LABEL_ICON)); 
  }

  ngOnInit(): void {
    this.subscription=this.router.events.subscribe(() => {
      this.currentRoute = this.router.url;
      console.log(this.currentRoute)
    });
  }

  handleDrawerClick(click?: string){
    if(click === 'menu')
      this.drawerState = !this.drawerState
    else if(this.drawerState === true)
      this.drawerState = false
  }

  search(event: any) {
    console.log(event.target.value)
    this.dataService.outgoingData(event.target.value);
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['']);
  }

  editlabels(){
    let dialogRef = this.dialog.open(EditLabelComponent, {
      height: 'auto',
      width: '300px',
      data: this.labels
    }
  );

    dialogRef.afterClosed().subscribe(result => {
      this.labels = result
      console.log('The dialog was closed');
    });
  }
  
  ngOnDestroy(): void {
      this.subscription.unsubscribe()

  }
}
