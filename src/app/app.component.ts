import { Component } from '@angular/core';
import { PathAiService } from './path-ai.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'path';
  public grid = [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ];
  public gridCopy: any;
  constructor(public path: PathAiService){

  }
  ngOnInit(){
    this.gridCopy = this.getCopy(this.grid);
  }
  public selectMode = '';
  public lastMarioIndex = [999, 999];
  public lastPrincessIndex = [999, 999];
  selectMario() {
    this.selectMode = 'mario';
  }

  selectPrincess() {
    this.selectMode = 'princess';
  }

  selectChunk(i: any, j: any) {
    switch(this.selectMode){
      case 'mario':
        if(this.lastMarioIndex[0] !== 999 && this.lastMarioIndex[1] !== 999){
          this.grid[this.lastMarioIndex[0]][this.lastMarioIndex[1]] = '';
        }
        this.grid[i][j] = 'M';
        this.lastMarioIndex = [i, j]
        break;
      case 'princess':
        if(this.lastPrincessIndex[0] !== 999 && this.lastPrincessIndex[1] !== 999){
          this.grid[this.lastPrincessIndex[0]][this.lastPrincessIndex[1]] = '';
        }
        this.grid[i][j] = 'P';
        this.lastPrincessIndex = [i, j];
        break;
    }
  }


  clearAll(){
    this.grid = this.getCopy(this.gridCopy);
  }

  getCopy(obj: any): any{
    return obj ? JSON.parse(JSON.stringify(obj)): obj;
  }

  start(){}
}
