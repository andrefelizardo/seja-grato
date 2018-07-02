import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the MessageProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MessageProvider {

  messages = [
    { data: '01/01/2018', texto: 'Pelo gol do Neymar depois de 3 meses sem jogar' },
    { data: '02/01/2018', texto: 'Pelo passeio com a família. Vamos aumentar esse texto apenas com o intuito de textar os 3 pontinhos' },
    { data: '03/01/2018', texto: 'Por comer caldo de ervilha' },
    { data: '04/01/2018', texto: 'Pela vitória do meu Vascão' },
    { data: '05/01/2018', texto: 'Por ter um filho muito inteligente' },
    { data: '06/01/2018', texto: 'Por estarmos na Copa do Mundo!' }
  ];

  constructor(public http: HttpClient) {

  }

  getMessages() {
    return this.messages;
  }

  getMessageByPosition(pos: number) {
    return this.messages[pos];
  }

  updateMessage(pos: number, message: any) {
    this.messages[pos] = message;
  }

  addMessage(message: any) {
    this.messages.push(message);
  }

}
