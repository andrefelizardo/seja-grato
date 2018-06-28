import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalMessagePage } from './modal-message';

@NgModule({
  declarations: [
    ModalMessagePage,
  ],
  imports: [
    IonicPageModule.forChild(ModalMessagePage),
  ],
})
export class ModalMessagePageModule {}
