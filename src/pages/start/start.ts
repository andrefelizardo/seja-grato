import { StatusProvider } from './../../providers/status/status';
import { HomePage } from './../home/home';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the StartPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-start',
  templateUrl: 'start.html',
})
export class StartPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public status: StatusProvider
  ) {
  }

  ionViewDidLoad() {
    if (this.status.logged) {
      this.goToHome();
    }
  }

  openPage(page: string) {
    this.navCtrl.push(page);
  }

  goToHome() {
    this.navCtrl.setRoot(HomePage);
  }

}
