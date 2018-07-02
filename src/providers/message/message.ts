import { StatusProvider } from './../status/status';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from '@firebase/util';

/*
  Generated class for the MessageProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MessageProvider {

  messages;
  item: Observable<any>;
  uid: string;

  constructor(
    public http: HttpClient,
    public db: AngularFireDatabase,
    public status: StatusProvider
  ) {
    this.uid = this.status.user.uid;
  }

  getMessages() {
    return this.http.get(`https://seja-grato.firebaseio.com/mensagens/${this.uid}/mensagens.json`)
      .map((res: Response) => {
        this.messages = res;
        return res;
      })
  }

  getMessageByPosition(pos: number) {
    return this.messages[pos];
  }

  updateMessage(pos: number, message: any) {
    this.messages[pos] = message;
  }

  addMessage(message: any) {
    this.messages.push(message);
    // if(this.status.logged) {
    //   const itemDb = this.db.database;
    //   itemDb.ref('mensagens/').child(this.uid).child('mensagens').push(message);
    // }
  }

}
