import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { EventsAppComponent } from './event-app.component';
import { AuthService } from './user/auth.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { NavBarComponent } from './nav/navbar.component';
import {
  EventsListComponent,
  EventThumbnailComponent,
  EventService,
  EventDetailComponent,
  EventListResolverService,
  EventResolverService,
  CreateEventsComponent,
  CreateSessionComponent,
  SessionListComponent,
  DurationPipe,
  RESTRICTEDWORS,
  VoterService,
  LocationValidator,
} from './events/index';
import {
  TOASTR_TOKEN,
  Toastr,
  JQ_TOKEN,
  CollapsibleWellComponent,
  SimpleModalComponent,
  ModalTriggerDirective,
  UpvoteComponent,
} from './common/index';
import { Error404Component } from './errors/404.component';
import { UserModule } from './user/user.module';
import { from } from 'rxjs';

const toastr: Toastr = window[`toastr`];

const jQuery = window[`$`];
@NgModule({
  declarations: [
    EventsAppComponent,
    EventsListComponent,
    EventThumbnailComponent,
    NavBarComponent,
    EventDetailComponent,
    CreateEventsComponent,
    CreateSessionComponent,
    Error404Component,
    SessionListComponent,
    CollapsibleWellComponent,
    DurationPipe,
    SimpleModalComponent,
    ModalTriggerDirective,
    UpvoteComponent,
    LocationValidator,
  ],
  providers: [
    EventService,
    { provide: TOASTR_TOKEN, useValue: toastr },
    { provide: JQ_TOKEN, useValue: jQuery },
    { provide: 'canDeactivateCreateEvent', useValue: checkDirtyState },
    EventListResolverService,
    EventResolverService,
    AuthService,
    VoterService,
    RESTRICTEDWORS,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    UserModule,
    FormsModule,
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
  ],
  bootstrap: [EventsAppComponent],
})
export class AppModule {}

// tslint:disable-next-line: typedef
export function checkDirtyState(component: CreateEventsComponent) {
  if (component.isDirty) {
    return window.confirm(
      'You have not saved this event, do you really want to cancel?'
    );
  } else {
    return true;
  }
}
