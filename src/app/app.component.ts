import { Network } from '@ionic-native/network';
import { AngularFireAuth } from 'angularfire2/auth';
import { RegisterPage } from './../pages/register/register';
import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { StartPage } from '../pages/start/start';
import { LoginPage } from '../pages/login/login';
import { StatusProvider } from '../providers/status/status';

declare var navigator: any;

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = StartPage;

  pages: Array<{ title: string, component: any }>;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    private afAuth: AngularFireAuth,
    private status: StatusProvider,
    private network: Network
  ) {
    this.afAuth.auth.onAuthStateChanged((user) => {
      if (user) {
        console.log('logado');
        this.rootPage = HomePage;
        this.status.logged = true;
      } else {
        console.log('não logado');
        this.status.logged = false;
      }
    });
    this.network.onchange().subscribe(
      status => status.type == 'online' ? this.status.network = true : this.status.network = false
    );


    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'List', component: ListPage },
      { title: 'Start', component: StartPage },
      { title: 'Login', component: LoginPage },
      { title: 'Register', component: RegisterPage }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      if (navigator) {
        navigator.connection.downlink > 0 ? this.status.network = true : this.status.network = false;
      }

      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
