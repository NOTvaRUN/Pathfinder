import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PathAiService {
  public vI: Array<Number> = [0, 0];
  public pI: Array<Number> = [0, 0];
  constructor() { }

  varioPosition(vario: Array<any>, princess: Array<any>){
      this.vI = vario;
      this.pI = princess;

    console.log(this.vI)
    console.log(this.pI)
  }
}
