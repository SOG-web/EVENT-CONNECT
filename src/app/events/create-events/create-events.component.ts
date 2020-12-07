import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventService } from '../shared';

@Component({
  selector: 'app-create-events',
  templateUrl: './create-events.component.html',
  styleUrls: ['./create-events.component.css'],
})
export class CreateEventsComponent implements OnInit {
  constructor(private router: Router, private eventService: EventService) {}
  isDirty = true;
  newEvent;

  ngOnInit(): void {}

  // tslint:disable-next-line: typedef
  saveEvent(formsValues) {
    this.eventService.saveEvent(formsValues).subscribe(() => {
      this.isDirty = false;
      this.router.navigate(['/events']);
    });
  }

  cancel(): any {
    this.router.navigate(['/events']);
  }
}
