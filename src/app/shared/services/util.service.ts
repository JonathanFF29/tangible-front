import { Injectable } from '@angular/core';
import { BehaviorSubject  } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilService {
  private dataNameLogin = new BehaviorSubject({name: 'Bienvenido'});
  currentData = this.dataNameLogin.asObservable();
  constructor() {}

  changeData(data: any) {
    this.dataNameLogin.next(data);
  }
}
