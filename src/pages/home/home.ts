import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { EventoProvider } from '../../providers/evento/evento';
import { Observable } from 'rxjs/Observable';
import { EditarEventoPage } from '../editar-evento/editar-evento';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  eventos: Observable<any>;

  constructor(public navCtrl: NavController, private toast: ToastController, private provider: EventoProvider) {
    this.eventos = this.provider.listarTodos();
    console.log('Iniciou a página inicial');
  }

  novoEvento() {
    this.navCtrl.push(EditarEventoPage);
  }

  editarEvento(evento: any) {
    this.navCtrl.push(EditarEventoPage, {evento: evento});
  }

  apagarEvento(key: string) {
    if (key) {
      this.provider.remover(key)
      .then(() => {
        this.toast.create({ message: 'Evento excluído com sucesso.', duration: 3000}).present();
      })
      .catch(() => {
        this.toast.create({ message: 'Erro ao excluir o evento.', duration: 3000}).present();
      });
    }
  }




}
