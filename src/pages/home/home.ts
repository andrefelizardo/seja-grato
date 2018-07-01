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

  collection = [
    { data: '01/01/2018', texto: 'Pelo gol do Neymar depois de 3 meses sem jogar' },
    { data: '02/01/2018', texto: 'Pelo passeio com a família. Vamos aumentar esse texto apenas com o intuito de textar os 3 pontinhos' },
    { data: '03/01/2018', texto: 'Por comer caldo de ervilha' },
    { data: '04/01/2018', texto: 'Pela vitória do meu Vascão' },
    { data: '05/01/2018', texto: 'Por ter um filho muito inteligente' },
    { data: '06/01/2018', texto: 'Por estarmos na Copa do Mundo!' }
  ];

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
