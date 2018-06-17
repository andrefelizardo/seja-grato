import { Injectable } from '@angular/core';
import { LoadingController } from 'ionic-angular';

/*
  Generated class for the LoaderProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LoaderProvider {

  loader: any;

  constructor(
    public loadingCtrl: LoadingController
  ) {
  }

  showLoader(text?: string, time?: number) {
    this.loader = this.loadingCtrl.create({
      content: text ? text : 'Carregando',
      duration: time ? time : null
    });
    this.loader.present();
  }

  exitLoader() {
    this.loader.dismiss();
  }

}
