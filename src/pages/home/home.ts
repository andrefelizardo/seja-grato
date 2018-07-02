import { MessageProvider } from './../../providers/message/message';
import { ModalMessagePage } from './../modal-message/modal-message';
import { AlertProvider } from './../../providers/alert/alert';
import { AngularFireAuth } from 'angularfire2/auth';
import { Component } from '@angular/core';
import { NavController, ModalController, NavParams } from 'ionic-angular';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  modalMessage;
  messages;

  constructor(
    public navCtrl: NavController,
    private afAuth: AngularFireAuth,
    private alert: AlertProvider,
    public modalCtrl: ModalController,
    public messageService: MessageProvider
  ) {

  }

  ionViewDidLoad() {
    this.messages = this.messageService.getMessages();
  }

  logoff() {
    this.afAuth.auth.signOut();
  }

  newMessage(index?: number) {
    this.modalMessage = this.modalCtrl.create(ModalMessagePage, {posArrayMessage: index});
    this.modalMessage.present();
  }

}
