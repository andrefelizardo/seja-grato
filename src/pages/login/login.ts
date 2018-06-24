import { LoaderProvider } from './../../providers/loader/loader';
import { HomePage } from './../home/home';
import { RegisterPage } from './../register/register';
import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';
import { StatusProvider } from '../../providers/status/status';
import { AlertProvider } from '../../providers/alert/alert';

@IonicPage({
  name: 'login'
})
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage implements OnInit {

  RegisterPage: RegisterPage;
  loginForm: FormGroup;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    public afAuth: AngularFireAuth,
    private loader: LoaderProvider,
    private status: StatusProvider,
    private alert: AlertProvider
  ) {
    this.loginForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(3)]]
    });
  }

  ionViewDidLoad() {
    if (this.status.logged) {
      this.goToHome();
    }
  }

  ngOnInit() {
    this.loginForm.controls['password'].setErrors({ 'wrongPassword': false });
  }

  onSubmit() {
    this.loader.showLoader('Verificando sua conexão');
    if(this.status.network) {
      this.loader.showLoader('Fazendo login');
      this.afAuth.auth.signInWithEmailAndPassword(
        this.loginForm.value.email,
        this.loginForm.value.password
      )
        .then((data) => {
          this.goToHome();
          this.loader.exitLoader();
        })
        .catch((error) => {
          if (error.code === 'auth/wrong-password') {
            this.loginForm.controls['password'].setErrors({ 'wrongPassword': true });
            this.loader.exitLoader();
          } else if (error.code === 'auth/user-not-found') {
            this.loginForm.controls['email'].setErrors({ 'userNotFound': true });
            this.loader.exitLoader();
          } else {
            this.loader.exitLoader();
            this.loginForm.controls['email'].setValue(null);
            this.loginForm.controls['password'].setValue(null);
            this.alert.showAlert('Erro ao fazer login', error.message);
          }
        })
    } else {
      this.loader.exitLoader();
      this.alert.showAlert('Sem conexão', 'Verifique sua conexão a internet e tente novamente');
    }
  }

  goToHome() {
    this.navCtrl.setRoot(HomePage);
  }

}
