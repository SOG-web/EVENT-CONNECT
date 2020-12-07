import { Component, OnInit, Input } from '@angular/core';
import { from } from 'rxjs';
import { IEvent } from '../shared';

@Component({
  selector: 'app-event-thumbnail',
  // ? is called save navigator to prevent error when data is null
  template: `
    <div [routerLink]="['/events', event.id]" class="well hoverwell thumbnail">
      <h2>{{ event?.name | uppercase }}</h2>
      <div>Date: {{ event?.date | date }}</div>
      <div [ngClass]="getStartTimeClass()" [ngSwitch]="event?.time">
        Time: {{ event?.time }}
        <span *ngSwitchCase="'8:00 am'">(Early Start)</span>
        <span *ngSwitchCase="'10:00 am'">(Late Start)</span>
        <span *ngSwitchDefault>(Normal Start)</span>
      </div>
      <div>Price: {{ event?.price | currency: 'USD' }}</div>
      <div *ngIf="event?.location">
        <span>Location: {{ event?.location?.address }}</span>
        <span class="pad-left"
          >{{ event?.location?.city }}, {{ event?.location?.country }}</span
        >
      </div>
      <div *ngIf="event?.onlineUrl">
        <a [href]="event?.onlineUrl">OnlineUrl: {{ event?.onlineUrl }}</a>
      </div>
    </div>
  `,
  styleUrls: ['./event-thumbnail.component.css'],
})
export class EventThumbnailComponent implements OnInit {
  /* The Input decorator helps the
  component receives and expect data as input
  from another(parent) component*/
  @Input() event: IEvent;

  constructor() {}

  ngOnInit(): void {}

  // tslint:disable-next-line: typedef
  getStartTimeClass() {
    // const isEarlyStart = this.event && this.event.time === '8:00 am';
    // const isLateStart = this.event && this.event.time === '10:00 am';
    // return { green: isEarlyStart, bold: isEarlyStart, red: isLateStart };
    // tslint:disable-next-line: triple-equals
    if (this.event && this.event.time == '8:00 am') {
      return ['green', 'bold'];
      // tslint:disable-next-line: triple-equals
    } else if (this.event && this.event.time == '10:00 am') {
      return ['bold', 'red'];
    } else {
      return ['blue', 'bold'];
    }
  }
}
