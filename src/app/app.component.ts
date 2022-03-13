import { Component } from '@angular/core';
import { timer, Observable } from 'rxjs';
import { PathAiService } from './path-ai.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'path';
  public grid: Array<any> = [];
  public gridCopy: any;
  public updateInterval = timer(1000, 1000);
  constructor(public path: PathAiService){}
  ngOnInit(){
    this.grid = this.path.createGrid(10, 10);
    this.gridCopy = this.path.getCopy(this.grid);
  }
  public selectMode = '';
  public pathFinder: any;
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
          this.grid[this.lastMarioIndex[0]][this.lastMarioIndex[1]] = {
            label: '',
            checked: false
          };
        }
        this.grid[i][j] = {
          label: 'M',
          checked: false
        };
        this.lastMarioIndex = [i, j]
        break;
      case 'princess':
        if(this.lastPrincessIndex[0] !== 999 && this.lastPrincessIndex[1] !== 999){
          this.grid[this.lastPrincessIndex[0]][this.lastPrincessIndex[1]] = {
            label: '',
            checked: false
          };
        }
        this.grid[i][j] = {
          label: 'P',
          checked: false,
          person: 'princess'
        };
        this.lastPrincessIndex = [i, j];
        break;
    }
  }
  start(){
      this.path.vI = this.lastMarioIndex;
      this.path.pI = this.lastPrincessIndex;
      this.path.grid = this.grid;
      this.path.max = this.grid.length;
      this.clearFinder();
      this.pathFinder = this.path.varioPosition.subscribe((bestCase: any) => {
        let foundPrincess = false;
        let surr = this.path.getSurroundings(this.lastMarioIndex[0], this.lastMarioIndex[1]);
        for (let coord of surr) {
          if (this.grid[coord[0]][coord[1]]?.person == 'princess') {
            console.log("FOUND IT NIGGA");
            foundPrincess = true;
          }
        }
        if(!foundPrincess){
          this.selectMario();
          setTimeout(()=>{
            this.selectChunk(bestCase.moveTo[0], bestCase.moveTo[1]);
            this.start();
          }, 500)
        }
      })
  }

  clearFinder(){
    if (this.pathFinder) { 
      this.pathFinder.unsubscribe();
    }
  }

  clearAll(){
    this.clearFinder();
    this.grid = this.path.getCopy(this.gridCopy);
  }

}
