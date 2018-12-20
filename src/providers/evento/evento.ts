import { HttpClient } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import 'rxjs/add/operator/map';

@Injectable()
export class EventoProvider {
  private PATH = 'eventos/';

  constructor(public http: HttpClient, private db: AngularFireDatabase) {
  }

  listarTodos() {
    return this.db.list(this.PATH, ref => ref.orderByChild('nome'))
      .snapshotChanges()
      .map(changes => {
        return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
      })
  }

  listar(key: string) {
    return this.db.object(this.PATH + key).snapshotChanges().map(c => {
      return { key: c.key, ...c.payload.val()};
    });
  }

  salvar(evento: any) {
    return new Promise((resolve, reject) => {
      if(evento.key) {
        this.db.list(this.PATH)
        .update(evento.key, { nome: evento.nome, local: evento.local, terreno: evento.terreno, calendario: evento.calendario})
        .then(() => resolve())
        .catch((e) => reject(e));
      } else {
        this.db.list(this.PATH)
        .push({ nome: evento.nome, local: evento.local, terreno: evento.terreno, calendario: evento.calendario})
        .then(() => resolve());
      }
    })
  }

  remover(key: string) {
    return this.db.list(this.PATH).remove(key);
  }

}
