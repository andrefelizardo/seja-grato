import { LoaderProvider } from './../../providers/loader/loader';
import { HomePage } from './../home/home';
import { RegisterPage } from './../register/register';
import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';
// import { auth } from 'firebase/app';

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
    private loader: LoaderProvider
  ) {
    this.loginForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(3)]]
    });
  }

  ngOnInit() {
    this.loginForm.controls['password'].setErrors({'wrongPassword': false});
  }

  onSubmit() {
    this.loader.showLoader('Fazendo login');
    this.afAuth.auth.signInWithEmailAndPassword(
      this.loginForm.value.email,
      this.loginForm.value.password
    )
      .then((data) => {
        this.navCtrl.setRoot(HomePage);
        this.loader.exitLoader();
      })
      .catch((error) => {
        if(error.code === 'auth/wrong-password') {
          this.loginForm.controls['password'].setErrors({'wrongPassword': true});
          this.loader.exitLoader();
        }
      })
  }

}
