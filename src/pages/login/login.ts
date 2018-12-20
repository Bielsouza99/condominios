import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HomePage } from '../home/home';
import { AuthService } from '../../services/auth.service';
import { CadastroPage } from '../cadastro/cadastro';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  loginForm: FormGroup;
  loginError: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private auth: AuthService, fb: FormBuilder ) {
    this.loginForm = fb.group({
      email: [ '', Validators.compose([Validators.required, Validators.email])],
      senha: [ '', Validators.compose([Validators.required, Validators.minLength(6)])]
    });
  }

  login() {
    let data = this.loginForm.value;

    if(!data.email){
      return;
    }

    let credenciais = {
      email: data.email,
      senha: data.senha
    };

    this.auth.signInWithEmail(credenciais)
      .then(
        () => this.navCtrl.setRoot(HomePage),
        error => this.loginError = error.message
      );
  }

  cadastro() {
    this.navCtrl.push(CadastroPage);
  }

  loginGoogle() {
    //this.auth.signInWithGoogle();
  }

}
