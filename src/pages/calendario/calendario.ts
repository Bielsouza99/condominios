import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { Calendar } from '@ionic-native/calendar';

@IonicPage()
@Component({
  selector: 'page-calendario',
  templateUrl: 'calendario.html',
})
export class CalendarioPage {
  calName = '';
  eventos = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private calendar: Calendar, private plt: Platform) {
    this.calName = this.navParams.get('name');

    if (this.plt.is('ios')) {
      this.calendar.findAllEventsInNamedCalendar(this.calName).then(data => {
        this.eventos = data;
      });
    } else if (this.plt.is('android')) {
      let start = new Date();
      let end = new Date();

      end.setDate(end.getDate() + 31);
      this.calendar.listEventsInRange(start, end).then(data => {
        this.eventos = data;
      });
    }

  }

}
