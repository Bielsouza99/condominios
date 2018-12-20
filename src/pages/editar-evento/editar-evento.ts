import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, Platform } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventoProvider } from '../../providers/evento/evento';
import { SMS } from '@ionic-native/sms';
import { Calendar } from '@ionic-native/calendar'

@IonicPage()
@Component({
  selector: 'page-editar-evento',
  templateUrl: 'editar-evento.html',
})
export class EditarEventoPage {
  title: string;
  form: FormGroup;
  evento: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    public toast: ToastController,
    private provider: EventoProvider,
    private sms: SMS,
    private calendar: Calendar,
    private plt: Platform) {
    this.evento = this.navParams.data.evento || {};
    this.createForm();

    this.plt.ready().then(() => {
      this.calendar.listCalendars().then(data => {
        this.calendar = data;
      });
    });

    this.calendar.requestReadWritePermission();

    if (this.calendar.hasReadPermission() && this.calendar.hasReadWritePermission()) {
      console.log('deu boa');
    }

    this.setupPageTitle();

  }

  private setupPageTitle() {
    this.title = this.navParams.data.evento ? 'Alterando evento' : 'Novo evento';
  }

  createForm() {
    this.form = this.formBuilder.group({
      key: [this.evento.key],
      nome: [this.evento.nome, Validators.required],
      local: [this.evento.local, Validators.required],
      terreno: [this.evento.terreno, Validators.required],
      dataInicio: [this.evento.dataInicio, Validators.required],
      dataFinal: [this.evento.dataFinal, Validators.required]
    })
  }

  enviar() {
    if (this.form.valid) {
      this.provider.salvar(this.form.value)
        .then(() => {
          this.toast.create({ message: 'Evento salvo com sucesso', duration: 3000 }).present();
          this.sms.send('048999305262', 'Teste app');
          this.calendar.createEvent(this.evento.nome, this.evento.local, 'Evento', new Date(this.evento.dataInicio), new Date(this.evento.dataFinal))
            .then(() => console.log('integrou com o calendario'))
            .catch((e) => console.log('não integrou com o calendario'));
          this.navCtrl.pop();
        })
        .catch((e) => {
          this.toast.create({ message: 'Erro ao salvar evento', duration: 3000 }).present();
          console.error(e);
        })
    }
  }
}
