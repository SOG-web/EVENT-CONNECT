import { Component, Input, OnChanges } from '@angular/core';
import { AuthService } from 'src/app/user/auth.service';
import { ISession, VoterService } from '../shared';

@Component({
  selector: 'app-session-list',
  templateUrl: './session-list.component.html',
  styleUrls: ['./session-list.component.css'],
})
export class SessionListComponent implements OnChanges {
  @Input() sessions: ISession[];
  @Input() filterBy: string;
  @Input() sortBy: string;
  @Input() eventId: number;
  visibleSessions: ISession[] = [];

  constructor(public auth: AuthService, private voterService: VoterService) {}

  // tslint:disable-next-line: typedef
  ngOnChanges() {
    if (this.sessions) {
      this.filterSessions(this.filterBy);
      this.sortBy === 'name'
        ? this.visibleSessions.sort(sortByNameAscending)
        : this.visibleSessions.sort(sortByVotesDescending);
    }
  }

  // tslint:disable-next-line: typedef
  toggleVote(session: ISession) {
    if (this.userHasVoted(session)) {
      this.voterService.deleteVoter(
        this.eventId,
        session,
        this.auth.currentUser.userName
      );
    } else {
      this.voterService.addVoter(
        this.eventId,
        session,
        this.auth.currentUser.userName
      );
    }
    if (this.sortBy === 'votes') {
      this.visibleSessions.sort(sortByVotesDescending);
    }
  }

  // tslint:disable-next-line: typedef
  userHasVoted(session: ISession) {
    return this.voterService.userHasVoted(
      session,
      this.auth.currentUser.userName
    );
  }

  // tslint:disable-next-line: typedef
  filterSessions(filter) {
    if (filter === 'all') {
      this.visibleSessions = this.sessions.slice(0);
    } else {
      this.visibleSessions = this.sessions.filter((session) => {
        return session.level.toLowerCase() === filter;
      });
    }
  }
}

// tslint:disable-next-line: typedef
function sortByNameAscending(s1: ISession, s2: ISession) {
  if (s1.name > s2.name) {
    return 1;
  } else if (s1.name === s2.name) {
    return 0;
  } else {
    return -1;
  }
}
// tslint:disable-next-line: typedef
function sortByVotesDescending(s1: ISession, s2: ISession) {
  return s2.voters.length - s1.voters.length;
}
