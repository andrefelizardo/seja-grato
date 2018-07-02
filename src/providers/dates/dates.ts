import { Injectable } from '@angular/core';

/*
  Generated class for the DatesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DatesProvider {

  constructor() {
  }

  getActualDate() {
			const data = new Date();
			const dia = data.getDate();
			const mes = data.getMonth() + 1;
			const ano = data.getFullYear();
			const dataAtual = [dia, mes, ano].join('/');
			return dataAtual;
  }

}
