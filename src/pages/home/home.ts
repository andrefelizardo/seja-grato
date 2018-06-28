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

  collection = ['Pelo gol do Neymar depois de 3 meses sem jogar',
    'Pelo passeio com a família. Vamos aumentar esse texto apenas com o intuito de textar os 3 pontinhos',
    'Por comer caldo de ervilha',
    'Pela vitória do meu Vascão',
    'Por ter um filho muito inteligente',
    'Por estarmos na Copa do Mundo!'];

  constructor(
    public navCtrl: NavController,
    private afAuth: AngularFireAuth,
    private alert: AlertProvider,
    public modalCtrl: ModalController
  ) {

  }

  logoff() {
    this.afAuth.auth.signOut();
  }

  newMessage() {
    console.log('openModal');
    this.modalMessage = this.modalCtrl.create(ModalMessagePage);
    this.modalMessage.present();
  }

}
