import { HomePage } from './../home/home';
import { AlertProvider } from './../../providers/alert/alert';
import { LoaderProvider } from './../../providers/loader/loader';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Component, EventEmitter } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ValidateConfirmPassword } from '../../validators/confirmPassword';
import { AngularFireAuth } from 'angularfire2/auth';

@IonicPage({
  name: 'register'
})
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  registerForm: FormGroup;
  errorsEvent: EventEmitter<any> = new EventEmitter();

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    private loader: LoaderProvider,
    private afAuth: AngularFireAuth,
    private alert: AlertProvider
  ) {
    this.registerForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(6)]],
      confirmPassword: [null, [Validators.required, Validators.minLength(6), ValidateConfirmPassword]]
    });
  }

  ionViewDidLoad() {
  }

  onSubmit() {
    this.loader.showLoader('Criando usuário');
    this.afAuth.auth.createUserWithEmailAndPassword(this.registerForm.value.email, this.registerForm.value.password)
    .then(() => {
      this.loader.exitLoader();
      this.alert.showAlert('Conta criada com sucesso', 'Agora todas as suas mensagens ficarão sincornizadas na nuvem!');
      this.navCtrl.push(HomePage);
    })
    .catch((error) => {
      this.loader.exitLoader();
      if(error.code == 'auth/weak-password') {
        this.registerForm.controls['password'].setErrors({ weakPassword: true });
        this.registerForm.controls['confirmPassword'].setValue(null);
      } else if (error.code == 'auth/email-already-in-use') {
        this.registerForm.controls['email'].setErrors({ emailAlreadyUsed: true });
      } else {
        this.alert.showAlert('Erro', error.message);
        this.registerForm.controls['password'].setValue(null);
        this.registerForm.controls['confirmPassword'].setValue(null);
      }
    })
  }
}
