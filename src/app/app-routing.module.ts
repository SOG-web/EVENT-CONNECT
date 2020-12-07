import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {
  EventsListComponent,
  EventDetailComponent,
  EventListResolverService,
  CreateEventsComponent,
  CreateSessionComponent,
  EventResolverService,
} from './events/index';
import { Error404Component } from './errors/404.component';

const routes: Routes = [
  {
    path: 'events',
    component: EventsListComponent,
    resolve: { events: EventListResolverService },
  },
  {
    path: 'events/:id',
    component: EventDetailComponent,
    resolve: { event: EventResolverService },
  },
  {
    path: 'event/new',
    component: CreateEventsComponent,
    canDeactivate: ['canDeactivateCreateEvent'],
  },
  { path: 'events/session/new', component: CreateSessionComponent },
  { path: '404-bad-error', component: Error404Component },
  { path: '', redirectTo: '/events', pathMatch: 'full' },
  { path: 'user', loadChildren: './user/user.module#UserModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
