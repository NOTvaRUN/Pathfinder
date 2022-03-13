import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class PathAiService {
  public vI: Array<Number> = [0, 0];
  public pI: Array<Number> = [0, 0];
  public max: Number = 0;
  public range = 1;
  public range3Array = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
  ];

  public gridObject = {
    label: '',
    checked: false
  }

  public grid: Array<any> = [];
  constructor() { }

  varioPosition = new Observable((subscriber)=>{
    let sur = this.getSurroundings(this.vI[0], this.vI[1]);
    this.checkGrid(sur);
    this.checkWhereVarioIsStanding(this.vI);
    let bestCase = this.getBestToMoveTo(sur);
    subscriber.next(bestCase);
  })
  // varioPosition(vario: Array<any>, princess: Array<any>, grid: any){

  // }

  getSurroundings(x: Number, y: Number){
    let cx: any = x;
    let cy: any = y;
    let surr = [];
    let randomizer = this.getCopy(this.range3Array);
    randomizer.sort(() => Math.random() - 0.5);
    for (let range of randomizer) {
      let x = cx + range[0];
      let y = cy + range[1];
      if((x >= 0 && x < this.max) && (y >= 0 && y < this.max)){
        surr.push([x, y])
      }
    }
    return surr;
  }

  getBestToMoveTo(options: Array<any>){
    let coord;
    let moveTo;
    let max = 0;
    for (let option of options) {
      let surr = this.getSurroundings(option[0], option[1]);
      coord = surr ?? coord;
      moveTo = moveTo ?? [option[0], option[1]];
      let ch = this.checkedCount(surr);
      if (ch.length > max) {
        max = ch.length;
        coord = surr;
        moveTo = [option[0], option[1]];
      }
    }
    return {coord, max, moveTo};
  }

  checkedCount(coords: Array<Array<number>>){
    return coords.filter((value) => {
      return !this.grid[value[0]][value[1]].checked;
    })
  }

  checkGrid(grid: Array<any>){
    for(let a of grid){
      this.grid[a[0]][a[1]].checked = true;
    }
  }

  checkWhereVarioIsStanding(pos: Array<any>){
    this.grid[pos[0]][pos[1]].checked = true;
  }

  createGrid(row: number, col: number): Array<any>{
    let t = []
    for(let i = 0; i < row; i ++){
      let r = []
      for(let j = 0; j < row; j ++){
        r.push(this.getCopy(this.gridObject))
      }
      t.push(r);
    }
    return t;
  }


  getCopy(obj: any): any{
    return obj ? JSON.parse(JSON.stringify(obj)): obj;
  }
}
