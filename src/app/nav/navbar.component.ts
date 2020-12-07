import { Component, OnInit } from '@angular/core';
import { AuthService } from '../user/auth.service';
import { EventService, IEvent, ISession } from '../events';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: [
    `
      .nav.navbar-nav {
        font-size: 15px;
      }
      #searchForm {
        margin-right: 100px;
      }

      li > a.active {
        color: #f97924;
      }

      .modal {
        margin-top: 25px;
      }
      @media (max-width: 1200px) {
        #searchForm {
          display: none;
        }
      }
    `,
  ],
})
export class NavBarComponent implements OnInit {
  auth = this.authService;
  searchTerm = '';
  foundSessions: ISession[];
  eventsName: IEvent[];
  constructor(
    private authService: AuthService,
    private eventService: EventService
  ) {}

  ngOnInit(): any {
    this.eventService.getEventNames().subscribe((events) => {
      this.eventsName = events;
      // console.log(this.eventsName);
    });
  }

  // tslint:disable-next-line: typedef
  searchSessions(searchTerm) {
    this.eventService.searchSessions(searchTerm).subscribe((sessions) => {
      this.foundSessions = sessions;
    });
  }
}
