import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HomePage } from '../home/home';
import { AuthService } from '../../services/auth.service';

@IonicPage()
@Component({
  selector: 'page-cadastro',
  templateUrl: 'cadastro.html',
})
export class CadastroPage {

  cadastroError: string;
  form: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, fb: FormBuilder, private auth: AuthService) {
    this.form = fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      senha: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CadastroPage');
  }


  cadastro() {
    let data = this.form.value;

    let credenciais = {
      email: data.email,
      senha: data.senha
    };

    this.auth.cadastro(credenciais).then(
      () => this.navCtrl.setRoot(HomePage),
      error => this.cadastroError = error.message
    );
  }
}
