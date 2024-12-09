import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SignupComponent } from './components/signup/signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NotesContainerComponent } from './components/notes-container/notes-container.component';
import { ArchiveContainerComponent } from './components/archive-container/archive-container.component';
import { TrashContainerComponent } from './components/trash-container/trash-container.component';
import { NoteCardComponent } from './components/note-card/note-card.component';
import { AddNoteComponent } from './components/add-note/add-note.component';
import { UpdateNoteComponent } from './components/update-note/update-note.component';
import { FilterPipe } from './pipes/filter.pipe';
import { IconsComponent } from './components/icons/icons.component';
import { EditLabelComponent } from './components/edit-label/edit-label.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    DashboardComponent,
    NotesContainerComponent,
    ArchiveContainerComponent,
    TrashContainerComponent,
    NoteCardComponent,
    AddNoteComponent,
    UpdateNoteComponent,
    FilterPipe,
    IconsComponent,
    EditLabelComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatSidenavModule,
    MatIconModule,
    MatDialogModule,
    MatTooltipModule,
    MatButtonToggleModule,
    MatToolbarModule,
    MatListModule,
    MatMenuModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }