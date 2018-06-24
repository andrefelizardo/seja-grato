import { AlertProvider } from './../../providers/alert/alert';
import { AngularFireAuth } from 'angularfire2/auth';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  collection = ['Pelo gol do Neymar depois de 3 meses sem jogar',
    'Pelo passeio com a família',
    'Por comer caldo de ervilha',
    'Pela vitória do meu Vascão',
    'Por ter um filho muito inteligente',
    'Por estarmos na Copa do Mundo!'];

  constructor(
    public navCtrl: NavController,
    private afAuth: AngularFireAuth,
    private alert: AlertProvider
  ) {

  }

  logoff() {
    this.afAuth.auth.signOut();
  }

}
