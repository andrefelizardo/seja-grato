import { Injectable } from '@angular/core';

/*
  Generated class for the StatusProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class StatusProvider {
  public logged: boolean;
  public network: boolean;
  public user: any;

  constructor() {
  }

}
