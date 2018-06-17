import { Injectable } from '@angular/core';
import { AlertController } from 'ionic-angular';

/*
  Generated class for the AlertProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AlertProvider {

  alert;

  constructor(private alertCtrl: AlertController) {
  }

  showAlert(title: string, subtitle?: string) {
    this.alert = this.alertCtrl.create({
      title: title,
      subTitle: subtitle
    });
  }

}
