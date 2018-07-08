import { StatusProvider } from './../status/status';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from '@firebase/util';
import { Storage } from '@ionic/storage';

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
    public status: StatusProvider,
    private storage: Storage
  ) {
    this.status.user ? this.uid = this.status.user.uid : null;
  }

  getMessages() {
    return this.storage.get('messages')
    .then((messages) => {
      this.messages = messages;
      return messages;
    })
    .catch((error) => {
      return error;
    });
    // return this.http.get(`https://seja-grato.firebaseio.com/mensagens/${this.uid}/mensagens.json`)
    //   .map((res: Response) => {
    //     this.messages = res;
    //     return res;
    //   })
  }

  getMessageByPosition(pos: number) {
    return this.messages[pos];
  }

  updateMessage(pos: number, message: any) {
    this.messages[pos] = message;
  }

  addMessage(message: Message) {
    if (!this.messages) {
      this.messages = [];
    }
    this.messages.push(message);
    this.storage.set('messages', this.messages);
    // if(this.status.logged) {
    //   const itemDb = this.db.database;
    //   itemDb.ref('mensagens/').child(this.uid).child('mensagens').push(message);
    // }
  }

  removeMessage(pos: number) {
    this.messages.splice(pos, 1);
    this.storage.set('messages', this.messages);
  }
}

export class Message {
  data: string;
  texto: string;
}
