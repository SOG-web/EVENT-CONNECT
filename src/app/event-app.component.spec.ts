import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { EventAppComponent } from './event-app.component';

describe('EventAppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        EventAppComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(EventAppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'Event-Connect'`, () => {
    const fixture = TestBed.createComponent(EventAppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('Event-Connect');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(EventAppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.content span').textContent).toContain('Event-Connect app is running!');
  });
});
