import { DatesProvider } from './../../providers/dates/dates';
import { MessageProvider } from './../../providers/message/message';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController } from 'ionic-angular';

/**
 * Generated class for the ModalMessagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modal-message',
  templateUrl: 'modal-message.html',
})
export class ModalMessagePage {

  editMessagePos: number;
  message;
  editMode: boolean;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    private messageService: MessageProvider,
    private dates: DatesProvider,
    private alertCtrl: AlertController
  ) {
    this.editMessagePos = navParams.get('posArrayMessage');
    this.message = {};
  }

  ionViewDidLoad() {
    if(this.editMessagePos >= 0) {
      this.message = this.messageService.getMessageByPosition(this.editMessagePos);
      this.editMode = true;
    }
  }

  closeModal() {
    this.viewCtrl.dismiss();
  }

  saveMessage() {
    const dateActual = this.dates.getActualDate();
    this.message.data = dateActual;
    if(this.editMode) {
      this.messageService.updateMessage(this.editMessagePos, this.message);
      this.closeModal();
    } else {
      this.messageService.addMessage(this.message);
      this.closeModal();
    }
  }

  removeMessage() {
    const deleteAlert = this.alertCtrl.create({
      title: 'Excluir mensagem',
      message: 'Tem certeza que deseja excluir essa mensagem?',
      buttons: [
        {
          text: 'Não',
          handler: () => {
            console.log('faz nada');
          }
        },
        {
          text: 'Tenho certeza',
          handler: () => {
            this.messageService.removeMessage(this.editMessagePos);
            this.closeModal();
          }
        }
      ]
    });
    deleteAlert.present();
  }

}
