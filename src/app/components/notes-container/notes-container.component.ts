import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notes-container',
  templateUrl: './notes-container.component.html',
  styleUrls: ['./notes-container.component.scss']
})
export class NotesContainerComponent implements OnInit {

  notesList: any[] = []

  ngOnInit() {

    this.notesList = ['learning', 'typescript', 'angular']
    
    //call the api to fetch the data
    
  }

  handleUpdateList($event: any){
    let {data, action} = $event
    if(action === 'add'){
      this.notesList.push(data)
    }
    else if(action === 'archive'){
      this.notesList = this.notesList.filter((element) => element != data)
    }
    
  }

}